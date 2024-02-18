import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { formatLastMessageSentDate } from '@/utils/date';

import { type Media, type Message } from '@twilio/conversations';
import { NoumLayoutViewMode, type UserData } from '../../types';
import { ChatItemAvatar } from './ChatItemAvatar';
import * as S from './styles';
import { type ChatItemProps } from './types';

interface ChatItemViewProps extends ChatItemProps {
  noumLayoutViewMode?: NoumLayoutViewMode;
  users: UserData[];
  title: string;
  messages: Message[];
  unread: number;
  lastMessageHasAsset?: Media;
  author: string;
  lastMessage: Message | undefined;
}

export const ChatItemView = ({
  sid,
  isActive = false,
  size = 'S',
  onClick,
  noumLayoutViewMode,
  users,
  title,
  messages,
  unread,
  lastMessageHasAsset,
  author,
  lastMessage,
}: ChatItemViewProps) => {
  const { t } = useTranslation();

  const fontSize = useMemo(() => {
    if (size === 'L') return unread !== 0 ? 'body-m-bold' : 'body-m';
    if (size === 'M') return 'body-m';
    return 'footnote';
  }, [size, unread]);

  return (
    <S.ChatItemWrapper
      data-testid="chatitem-testid"
      active={isActive}
      size={size}
      onClick={() => onClick(sid)}
    >
      <S.AvatarWrapper size={size}>
        <ChatItemAvatar
          users={users}
          size={
            noumLayoutViewMode === NoumLayoutViewMode.NOUMLAYOUTCOMPACT
              ? 'M'
              : size
          }
        />
      </S.AvatarWrapper>
      {noumLayoutViewMode !== NoumLayoutViewMode.NOUMLAYOUTCOMPACT && (
        <S.Content>
          <S.TitleTSPan
            font={size === 'S' ? 'body-m-bold' : 'body-l-bold'}
            colorToken="--text-tablecell-header-neutral-highlighted"
          >
            {title}
          </S.TitleTSPan>
          {!!users.length && messages && (
            <S.MessageContent>
              {unread !== 0 && (
                <S.MessageStatus data-testid="messagestatus-testid" />
              )}
              {lastMessageHasAsset && (
                <S.BlockTSPan
                  font={fontSize}
                  colorToken="--text-tablecell-body-neutral-default"
                >
                  {t('noumena.chat.user_sent_an_asset', { user: author })}
                </S.BlockTSPan>
              )}

              {lastMessage?.body && (
                <S.BlockTSPan
                  font={fontSize}
                  flex={1}
                  colorToken="--text-tablecell-body-neutral-default"
                >
                  {author && `${author}: `}
                  {`${lastMessage.body.trim()}`}
                </S.BlockTSPan>
              )}
              {lastMessage?.dateCreated && (
                <>
                  <S.DotSpan colorToken="--text-tablecell-body-neutral-disabled">
                    ·
                  </S.DotSpan>
                  <S.TimestampSpan colorToken="--text-timestamp-neutral-default">
                    {formatLastMessageSentDate(
                      new Date(lastMessage.dateCreated),
                    )}
                  </S.TimestampSpan>
                </>
              )}
            </S.MessageContent>
          )}
        </S.Content>
      )}
    </S.ChatItemWrapper>
  );
};
