/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityType, type GlobalSearchEntity } from '@/apollo/generated/types';
import { useGlobalSearchQuery } from '@/apollo/graphql';
import AvatarM from '@/assets/icons/avatar-m.svg';
import { HelperText, LengthHelperText } from '@/components/TextArea/styles';
import useEvent from '@/hooks/useEvent';
import { Stack } from '@/layout';
import { isHTMLNode } from '@/utils/notEmpty';
import { debounce } from 'lodash';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ClipboardEvent,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Mention, type DisplayTransformFunc } from 'react-mentions';
import {
  MentionsInputStyled,
  StyledAvatar,
  StyledList,
  StyledRow,
  StyledText,
  Wrapper,
} from './styles';
import { type MentionUserList } from './types';
import defaultMentionStyle from './utils/defaultMentionStyle';
import defaultStyle from './utils/defaultStyle';
import { styledTextArea } from './utils/styledTextArea';
import styledTextAreaError from './utils/styledTextAreaError';
import styledTextAreaMention from './utils/styledTextAreaMention';

type PostMentionProps = {
  val: string;
  setVal: (val: string) => void;
  addTag: (id: string | number, display: string) => void;
  isTextArea?: boolean;
  placeholder?: string;
  maxLength?: number;
  error: boolean;
  helperText?: string;
  maxHeight?: number;
  textAreaHeight?: number;
  isFullHeight?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  onClipboard?: (type: string, content: string) => void;
  minHeight?: number;
};

export const PostMention = ({
  setVal,
  val,
  addTag,
  isTextArea = false,
  placeholder,
  maxLength,
  error,
  helperText,
  disabled,
  maxHeight,
  isFullHeight,
  textAreaHeight = 70,
  autoFocus = false,
  onClipboard,
  minHeight,
}: PostMentionProps) => {
  const variables = useMemo(
    () => ({
      query: '',
      entityType: EntityType.HomeNoum,
    }),
    [],
  );
  const { t } = useTranslation();
  const mentionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef(null);

  const { refetch } = useGlobalSearchQuery({
    variables,
  });

  const debouncedFetchUsers = useMemo(
    () =>
      debounce(
        (query: string, callback: (value: any) => any) => {
          if (!query) return;
          const data = refetch({ query }).then(
            (el) => el.data.globalSearch.data,
          );
          data
            .then((res: any) =>
              res?.map((userFromList: GlobalSearchEntity) => {
                const { firstName, lastName } = userFromList.user;
                const displayName =
                  firstName && lastName
                    ? `${firstName} ${lastName}`
                    : userFromList.user.name;
                return {
                  display: displayName,
                  id: userFromList?.user?.id,
                  profilePicture: userFromList?.user?.thumbnailUrl,
                } as MentionUserList;
              }),
            )
            .then(callback);
        },
        500,
        { leading: false },
      ),
    [refetch],
  );

  const handleContainer = useEvent((display) => (
    <StyledList>{display}</StyledList>
  ));
  const handleTransform = useEvent(
    (display) => `@${display}`,
  ) as DisplayTransformFunc;

  const handleRenderSuggestion = useEvent((e: MentionUserList) => (
    <StyledRow>
      <StyledAvatar src={e?.profilePicture || AvatarM} />
      <StyledText>{e?.display}</StyledText>
    </StyledRow>
  ));

  const defaultTextArea = error
    ? styledTextAreaError
    : styledTextArea(minHeight, maxHeight);
  const valueLength = `${val || ''}`.length;

  const onCopy = useCallback(() => {
    const content = document.getSelection()?.toString();
    if (content) onClipboard?.('copy', content);
  }, [onClipboard]);

  const onPaste = useCallback(
    (e: Event | ClipboardEvent<HTMLElement>) => {
      if ('clipboardData' in e && e.clipboardData.getData('text')) {
        onClipboard?.('paste', e.clipboardData.getData('text'));
      }
    },
    [onClipboard],
  );
  useEffect(() => {
    const node: HTMLElement | undefined | null = mentionRef.current;
    if (node && isHTMLNode(node)) {
      node.addEventListener('copy', onCopy);
      node.addEventListener('paste', onPaste);
    }
    return () => {
      node?.removeEventListener('copy', onCopy);
      node?.removeEventListener('paste', onPaste);
    };
  }, [mentionRef, onCopy, onPaste]);

  return (
    <Wrapper
      ref={mentionRef}
      maxHeight={maxHeight}
      isFullHeight={isFullHeight}
      textAreaHeight={textAreaHeight}
    >
      <MentionsInputStyled
        data-testid="mentionsInput"
        allowSuggestionsAboveCursor
        value={val}
        autoFocus={autoFocus}
        disabled={disabled}
        onChange={(e) => setVal(e.target.value)}
        style={isTextArea ? defaultTextArea : defaultStyle}
        placeholder={placeholder || t('noumena.comments.placeholder')}
        customSuggestionsContainer={handleContainer}
        inputRef={inputRef}
        allowSpaceInQuery
      >
        <Mention
          displayTransform={handleTransform}
          trigger="@"
          data={debouncedFetchUsers}
          style={isTextArea ? styledTextAreaMention : defaultMentionStyle}
          markup="@[__display__]"
          // @ts-ignore
          renderSuggestion={handleRenderSuggestion}
          onAdd={addTag}
        />
      </MentionsInputStyled>
      {Boolean(isTextArea) && (
        <Stack fullWidth justify="space-between" padding="2px 12px 0">
          <HelperText
            data-testid="pTestId"
            error={error}
            disabled={false}
            font="footnote"
            colorToken="--text-input-neutral-default"
          >
            {helperText ?? ''}{' '}
          </HelperText>
          {maxLength && (
            <LengthHelperText
              font="footnote"
              colorToken="--text-input-neutral-default"
              error={valueLength > maxLength}
            >{`${valueLength}/${maxLength}`}</LengthHelperText>
          )}
        </Stack>
      )}
    </Wrapper>
  );
};
