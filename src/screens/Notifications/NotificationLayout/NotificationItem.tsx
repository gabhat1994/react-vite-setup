import { useCallback, useEffect, useState } from 'react';
import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import { NotificationAvatars } from './Avatar';
import { NotificationButtons } from './NotificationButtons';
import { Body, Clickable, Content, Layout, MessageSpan, Title } from './styles';
import { NotificationTimestamp } from './NotificationTimestamp';
import { type NotificationItemProps } from './types';

export function NotificationItem({
  avatars,
  buttons,
  body,
  isViewed,
  timestamp,
  title,
  message,
  'data-testid': testId,
  onClick,
  avatarMode,
  hideButtonsAfterAction = false,
}: NotificationItemProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    if (message && message.length > 100) setCollapsed(true);
  }, [message, setCollapsed]);

  const handleClick = useCallback(() => {
    if (onClick && !collapsed) onClick();
  }, [collapsed, onClick]);

  const tree = (
    <Layout
      role="listitem"
      isViewed={isViewed}
      data-testid={testId}
      data-unread={!isViewed}
    >
      <NotificationAvatars avatars={avatars} mode={avatarMode} />
      <Content>
        {title && (
          <Title
            font="body-m"
            colorToken="--link-notification-tile-neutral-default"
          >
            {title}
          </Title>
        )}
        <Body
          font="body-m"
          colorToken="--text-notification-tile-neutral-default"
        >
          {body}
        </Body>
        <NotificationTimestamp value={timestamp} />
        {message && (
          <MessageSpan collaped={collapsed}>
            {collapsed ? `${message?.slice(0, 90)}...` : message}
            {collapsed && (
              <TSpan
                font="link-s"
                cursor="pointer"
                colorToken="--link-card-brand-primary-default"
                onClick={(e) => {
                  e.preventDefault();
                  setCollapsed(false);
                }}
              >
                {t('noumena.see_more')}
              </TSpan>
            )}
          </MessageSpan>
        )}
        {buttons ? (
          <NotificationButtons hideButtonsAfterAction={hideButtonsAfterAction}>
            {buttons}
          </NotificationButtons>
        ) : null}
      </Content>
    </Layout>
  );

  if (onClick) {
    return <Clickable onClick={handleClick}>{tree}</Clickable>;
  }

  return tree;
}
