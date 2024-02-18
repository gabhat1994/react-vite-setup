import { useCallback, useEffect, useState, forwardRef, type Ref } from 'react';
import Quill from 'quill';
import MagicUrl from 'quill-magic-url';
import 'quill-paste-smart';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';

import { useGenerateUserS3SignedUrlMutation } from '@/apollo/graphql';
import { type FileInput } from '@/apollo/generated/types';
import { AttachmentBlot, ImageBlot, VideoBlot } from '../../plugins/blots';
import {
  AttachmentHandler,
  ImageHandler,
  VideoHandler,
  renderAttachmentHandler,
  renderImageHandler,
  renderVideoHandler,
} from '../../plugins/handlers';
import { EDITOR_ELEMENT_ID, EDITOR_ID, TOOLBAR_ID } from '../../constants';
import { type IEditorProps, type IQuillOptions } from '../../types';
import { InitializerWrapper } from '../initializer/initializerWrapper';
import { Initializer } from '../initializer/initializer';
import { Listeners } from '../initializer/listeners';
import { Toolbar } from './toolbar';
import { EditorWrapper, RTEArea } from './styles';

type TDelta = typeof Delta;

const Delta = Quill.import('delta');

export const Editor = forwardRef(
  (
    {
      editorUUID,
      editEnabled,
      refreshKey,
      placeholder,
      value,
      minHeight,
      toolbarOptions,
      theme,
      userId,
      awsS3,
      onEvent,
      contentPadding = 0,
    }: IEditorProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const [editor, setEditor] = useState<Quill | undefined>();

    const [generateS3SignedUrl] = useGenerateUserS3SignedUrlMutation();

    const onGenerateS3SignedUrl = useCallback(
      async (file: FileInput) => {
        const res = await generateS3SignedUrl({
          variables: {
            file,
          },
        });

        return res.data?.generateUserS3SignedUrl?.url || '';
      },
      [generateS3SignedUrl],
    );

    useEffect(() => {
      if (editor) return;
      const options: IQuillOptions = {
        userId,
        awsS3,
        editorUUID,
        onGenerateS3SignedUrl,
        onEvent,
      };
      AttachmentHandler.DEFAULTS = options;
      ImageHandler.DEFAULTS = options;
      VideoHandler.DEFAULTS = options;
      Quill.register('modules/magicUrl', MagicUrl, true);
      Quill.register('modules/attachmentHandler', AttachmentHandler, true);
      Quill.register('modules/imageHandler', ImageHandler, true);
      Quill.register('modules/videoHandler', VideoHandler, true);

      Quill.register('blots/image', ImageBlot, true);
      Quill.register('blots/attachment', AttachmentBlot, true);
      Quill.register('blots/video', VideoBlot, true);

      const uuid = `#${EDITOR_ID}-${editorUUID}`;

      const rte: Quill = new Quill(uuid, {
        modules: {
          magicUrl: true,
          toolbar: `#${TOOLBAR_ID}-${editorUUID}`,
          history: {
            userOnly: true,
            maxStack: 20,
          },
          attachmentHandler: {
            render: (url: string, node: Element) =>
              renderAttachmentHandler(url, node, editorUUID),
          },
          imageHandler: {
            render: (url: string, node: Element) =>
              renderImageHandler(url, node, editorUUID),
          },
          videoHandler: {
            render: (url: string, node: Element) =>
              renderVideoHandler(url, node, editorUUID),
          },
          clipboard: {
            magicPasteLinks: true,
            matchers: [
              [
                Node.ELEMENT_NODE,
                (_: Element, delta: TDelta) =>
                  delta.compose(
                    new Delta().retain(delta.length(), {
                      color: false,
                      background: false,
                      bold: false,
                      strike: false,
                      underline: false,
                    }),
                  ),
              ],
            ],
          },
        },
        placeholder: editEnabled ? placeholder : undefined,
        theme: theme || (editEnabled ? 'snow' : 'bubble'),
        bounds: uuid,
        readOnly: !editEnabled,
      });
      /** Customize link tooltip */
      // @ts-ignore
      const linkSaveTooltip = rte.theme.tooltip.save;
      // @ts-ignore
      rte.theme.tooltip.save = () => {
        // @ts-ignore
        const url = rte.theme.tooltip.textbox.value;
        if (!/(http|https)/gi.test(url)) {
          // @ts-ignore
          rte.theme.tooltip.textbox.value = `http://${url}`;
        }
        // @ts-ignore
        linkSaveTooltip.call(rte.theme.tooltip);
      };

      rte.root.innerHTML = value;
      setEditor(rte);
    }, [
      editor,
      editEnabled,
      placeholder,
      theme,
      userId,
      awsS3,
      editorUUID,
      value,
      onGenerateS3SignedUrl,
      onEvent,
    ]);

    return (
      <EditorWrapper
        ref={ref}
        data-testid="rte-element"
        id={`${EDITOR_ELEMENT_ID}-${editorUUID}`}
        className={`${editEnabled ? '' : 'rte-view-mode'}`}
        editEnabled={editEnabled}
      >
        <Toolbar
          editorUUID={editorUUID}
          toolbarOptions={toolbarOptions}
          editEnabled={editEnabled}
          onPasteText={(text) => {
            if (!editor) {
              return;
            }
            const lastIndex = editor.getText().length - 1;
            editor.insertText(lastIndex, text, 'user');
          }}
        />
        <RTEArea
          data-testid="rte-area"
          id={`${EDITOR_ID}-${editorUUID}`}
          minHeight={minHeight}
          editEnabled={editEnabled}
          contentPadding={contentPadding}
        />
        {editor && (
          <InitializerWrapper editorUUID={editorUUID}>
            <Initializer
              editor={editor}
              editorUUID={editorUUID}
              onEvent={onEvent}
            />
            <Listeners
              key={refreshKey}
              editEnabled={Boolean(editEnabled)}
              editorUUID={editorUUID}
              onEvent={onEvent}
            />
          </InitializerWrapper>
        )}
      </EditorWrapper>
    );
  },
);
