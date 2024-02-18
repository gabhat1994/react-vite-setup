/* eslint-disable @typescript-eslint/no-shadow */
import { EntityType } from '@/apollo/generated/types';
import { useGlobalSearchLazyQuery } from '@/apollo/graphql';
import OwnerDefaultImage from '@/assets/images/profile_default.png';
import { useGeniusCompletionModal } from '@/features/genius/hooks/useGeniusCompletionModal';
import { useLaunchDarkly } from '@/hooks';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { returnParsedTagsText } from '@/screens/Community/utils';
import { cleanList } from '@/utils/list';
import {
  BoldButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  ItalicButton,
  OrderedListButton,
  UnderlineButton,
  UnorderedListButton,
} from '@draft-js-plugins/buttons';
import Editor from '@draft-js-plugins/editor';
import { type MentionData } from '@draft-js-plugins/mention';
import '@draft-js-plugins/mention/lib/plugin.css';
import { Separator } from '@draft-js-plugins/static-toolbar';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import {
  CompositeDecorator,
  ContentState,
  EditorState,
  Modifier,
  convertFromRaw,
  convertToRaw,
  type DraftDecorator,
  type DraftHandleValue,
  type RawDraftContentState,
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import 'draft-js/dist/Draft.css';
import { flattenDeep } from 'lodash';
import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Container, ToolbarContainer } from './styles';
import { type EditorDataProps } from './type';
import { EditorUtils } from './utils';

type PostRichTextEditorProps = {
  initialData?: EditorDataProps;
  onSetEditorValue?: (value: string) => void;
  onSetEditorRawValue?: (value: RawDraftContentState | undefined) => void;
  isEdit?: boolean;
  maxLength?: number;
};

const { plugins, Toolbar, MentionSuggestions } = EditorUtils.getPlugins();

export default function PostRichTextEditor({
  initialData,
  onSetEditorValue,
  onSetEditorRawValue,
  isEdit = false,
  maxLength,
}: PostRichTextEditorProps): ReactElement {
  const { t } = useTranslation();
  const { isMobile } = useBreakpoints();
  const {
    flags: { geniusCompletionText },
  } = useLaunchDarkly();
  const ref = useRef<Editor>(null);
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<MentionData[]>([]);

  const GeniusCompletion = useGeniusCompletionModal({
    tooltipEnabled: true,
    onConfirm: (response) => {
      onHandlePastedText(response.text, undefined, editorState);
    },
    type: 'text',
    buttonType: 'icon',
    title: t('noumena.genius.generate_post'),
    iconSize: 24,
  });

  const init = useCallback(() => {
    const decorators = flattenDeep(
      cleanList(plugins.map((plugin) => plugin.decorators)),
    ) as DraftDecorator[];
    const decorator = new CompositeDecorator(
      decorators?.filter((_, index) => index !== 1),
    );

    if (
      initialData?.rawJSON &&
      initialData?.rawJSON?.blocks &&
      initialData.rawJSON?.entityMap
    ) {
      return EditorState.createWithContent(
        convertFromRaw({
          ...initialData?.rawJSON,
          blocks: EditorUtils.truncateBlocksByLength(
            initialData?.rawJSON?.blocks,
            maxLength,
          ),
        }),
        isEdit ? undefined : decorator,
      );
    }

    if (!initialData || !initialData?.text || initialData.text === '') {
      return EditorState.createEmpty();
    }

    let parsedText = returnParsedTagsText(initialData);

    if (!parsedText) return EditorState.createEmpty();
    if (maxLength) parsedText = parsedText.substring(0, maxLength);

    const state = stateFromHTML(parsedText);
    const raw = EditorUtils.parseRawWithMentions(convertToRaw(state));
    const contentState = convertFromRaw(raw);
    return EditorState.moveFocusToEnd(
      EditorState.createWithContent(
        contentState,
        isEdit ? undefined : decorator,
      ),
    );
  }, [initialData, isEdit, maxLength]);

  const [editorState, setEditorState] = useState<EditorState>(() => init());

  useEffect(() => {
    if (isEdit === false) setEditorState(init());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, isEdit]);

  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);

  const [searchUsers] = useGlobalSearchLazyQuery();

  const onSearchChange = useCallback(
    async ({ value }: { trigger: string; value: string }) => {
      const { data } = await searchUsers({
        variables: {
          query: value,
          limit: 10,
          entityType: EntityType.HomeNoum,
        },
      });
      const mentionSuggestions: MentionData[] =
        data?.globalSearch.data.map((record) => ({
          name: record.user.name || '',
          avatar: record.user.thumbnailUrl || OwnerDefaultImage,
          link: record.id,
          id: record.id,
          uid: record?.user?.id,
        })) || [];
      setSuggestions(mentionSuggestions);
    },
    [searchUsers],
  );

  useEffect(() => {
    if (!isEdit) {
      return;
    }
    const contentState = editorState.getCurrentContent();
    const editorPlainText = contentState.getPlainText();
    const markup =
      editorPlainText === ''
        ? undefined
        : stateToHTML(contentState, EditorUtils.htmlOptions);

    onSetEditorValue?.(markup || '');
    onSetEditorRawValue?.(convertToRaw(contentState));
  }, [editorState, isEdit, onSetEditorRawValue, onSetEditorValue]);

  const onHandlePastedText = (
    text: string,
    html: string | undefined,
    state: EditorState,
  ): DraftHandleValue => {
    if (!text || text === '') return 'not-handled';
    const sourceState = html
      ? stateFromHTML(html, EditorUtils.clipboardOptions)
      : EditorState.createWithContent(
          ContentState.createFromText(text),
        ).getCurrentContent();

    const sourceRaw = EditorUtils.parseRawWithMentions(
      convertToRaw(sourceState),
    );
    const parsedState = convertFromRaw(sourceRaw);
    const newState: ContentState = Modifier.replaceWithFragment(
      state.getCurrentContent(),
      state.getSelection(),
      parsedState.getBlockMap(),
    );
    setEditorState(EditorState.push(state, newState, 'insert-fragment'));

    return 'handled';
  };

  const onFocus = useCallback(() => {
    setTimeout(() => ref.current!.focus(), 50);
  }, []);

  return (
    <Container
      data-testid="post-rich-text-editor"
      isEdit={isEdit}
      onClick={onFocus}
    >
      {isEdit && (
        <ToolbarContainer isMobile={isMobile}>
          <Toolbar>
            {(externalProps) => (
              <Fragment>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                {GeniusCompletion.buttonElement}
                <Separator />
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <Separator />
                <HeadlineOneButton {...externalProps} />
                <HeadlineTwoButton {...externalProps} />
              </Fragment>
            )}
          </Toolbar>
        </ToolbarContainer>
      )}
      {editorState && (
        <Editor
          placeholder={
            geniusCompletionText
              ? 'Write something or use Genius to generate a post content'
              : t(`noumena.create_post_placeholder`)
          }
          readOnly={!isEdit}
          editorKey="editor"
          customStyleMap={EditorUtils.styleMap}
          editorState={editorState}
          onChange={setEditorState}
          blockRenderMap={EditorUtils.blockRenderMap}
          plugins={plugins}
          ref={ref}
          handlePastedText={onHandlePastedText}
        />
      )}
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
      />

      {GeniusCompletion.modalElement}
    </Container>
  );
}
