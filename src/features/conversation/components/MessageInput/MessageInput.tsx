import {
  type ChangeEvent,
  type FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
} from 'react';

import { useTranslation } from 'react-i18next';
import { SlackSelector } from '@charkour/react-reactions';
import { Icon } from '@/components/Icon';
import { TextArea } from '@/components/TextArea';
import { chromeSupportedVideoTypes } from '@/constants/fileTypes';
import { removeItemAtIndex } from '@/utils/list';
import { ActiveConversationContext } from '@/features/conversation/contexts/ActiveConversationContext';
import { Upload } from '@/features/upload/components';

import { PreviewFile } from './PreviewFile';
import {
  EmojiButton,
  EmojiContainer,
  FileChooserWrapper,
  FilesWrapper,
  InputWrapper,
  SendButtonWrapper,
  Wrapper,
} from './styles';
import { type MessageInputProps } from './types';

export const MessageInput: FC<MessageInputProps> = ({
  withLeftPadding,
  onSendMessage,
  disabled,
}) => {
  const { t } = useTranslation();

  const ref = useRef<HTMLTextAreaElement>(null);
  const { activeConversationSid } = useContext(ActiveConversationContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const active = isFocused || !!message.trim() || files.length > 0;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onFileChange = useCallback((file: File) => {
    if (file) {
      setFiles((prev) => [...prev, file]);
    }
  }, []);

  const onRemoveFile = useCallback((index: number) => {
    setFiles((prev) => removeItemAtIndex(prev, index));
  }, []);

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setMessage(e.target.value);

  const onAddEmoji = (id: string) => {
    const cursorPosition = ref.current?.selectionStart || 0;

    setMessage((prev) => {
      const before = prev.substring(0, cursorPosition);
      const after = prev.substring(cursorPosition);
      return `${before}${id}${after}`;
    });
    setShowEmojiPicker(false);
    ref.current?.focus();
  };

  const onTextFocus = useCallback(() => {
    setIsFocused(true);
    setShowEmojiPicker(false);
  }, []);

  const onTextBlur = () => setIsFocused(false);

  const handleSendMessage = useCallback(async () => {
    if (loading) return;

    setLoading(true);

    const trimmedMessage = message.trim();

    if (!trimmedMessage && !files.length) {
      setMessage('');
      setLoading(false);
      return;
    }
    await onSendMessage(trimmedMessage, files);

    setFiles([]);
    setMessage('');
    setLoading(false);
  }, [loading, message, files, onSendMessage]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage],
  );

  useEffect(() => {
    setFiles([]);
    setMessage('');
  }, [activeConversationSid]);

  const handlePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    if (e.clipboardData.files.length) {
      const fileObject = e.clipboardData.files[0] as File;

      setFiles((prev) => [...prev, fileObject]);
    }
  };

  return (
    <Wrapper>
      <Upload
        // exclude `video/quicktime` extension as it's not supported by chrome
        acceptedFileTypes={chromeSupportedVideoTypes}
        uploadToS3={false}
        onUploadFile={onFileChange}
        type="conversation"
      >
        {({ onClickHandler }) => (
          <>
            <FileChooserWrapper withLeftPadding={withLeftPadding}>
              <Icon
                name="picture_m"
                size={24}
                onClick={onClickHandler}
                color="--icon-button-neutral-default"
              />
            </FileChooserWrapper>
            <InputWrapper active={active}>
              <FilesWrapper>
                {files.map(
                  (file, index) =>
                    file && (
                      <PreviewFile
                        file={file}
                        index={index}
                        key={file.name}
                        onRemoveFile={onRemoveFile}
                      />
                    ),
                )}
              </FilesWrapper>
              <TextArea
                ref={ref}
                disabled={disabled}
                value={message}
                placeholder={t('noumena.message.input_placeholder')}
                noBorder
                autoResize
                showScroll
                hasRightIcon
                resize={false}
                maxHeight={136}
                lineHeight="130%"
                onChange={onTextChange}
                onFocus={onTextFocus}
                onBlur={onTextBlur}
                onKeyDown={onKeyDown}
                onPaste={handlePaste}
              />
              <EmojiButton
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                icon={
                  <Icon
                    color="--icon-button-neutral-default"
                    name="emoji_m"
                    size={24}
                  />
                }
                size="small"
              />
            </InputWrapper>

            {showEmojiPicker && (
              <EmojiContainer>
                <SlackSelector onSelect={onAddEmoji} scrollHeight="220px" />
              </EmojiContainer>
            )}
            <SendButtonWrapper active={!!message.trim() || files.length > 0}>
              <Icon
                name="send_m"
                size={24}
                color="--icon-button-neutral-pressed"
                onClick={handleSendMessage}
              />
            </SendButtonWrapper>
          </>
        )}
      </Upload>
    </Wrapper>
  );
};

export default MessageInput;
