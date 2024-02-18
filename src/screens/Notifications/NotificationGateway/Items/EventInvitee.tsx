import { t } from 'i18next';
import { useCallback } from 'react';
import { UserRole } from '@/apollo/generated/types';

import { type EventFragment } from '@/apollo/graphql';
import {
  type WithRecurringEventProps,
  withRecurringEvent,
} from '@/features/events/hooks/withRecurringEvent';

import NotificationItem, {
  NotificationButton,
  TranslatedBody,
} from '../../NotificationLayout';
import {
  formatMultipleUserNames,
  isInvitationPending,
  isStaleEvent,
} from '../utils';
import { type EventInviteeProps } from './types';

const EventInvitee = ({
  users,
  event,
  userRole,
  onAccept,
  onReject,
  onEventDeclined,
  onEventAccepted,
  ...basicProps
}: EventInviteeProps & Partial<WithRecurringEventProps>) => {
  const isCohost = userRole === UserRole.Cohost;

  const onAcceptHandler = useCallback(() => {
    onEventAccepted?.(event?.id as EventFragment, async (_, isAcceptAll) => {
      onAccept(isAcceptAll);
    });
  }, [event, onAccept, onEventAccepted]);

  const onRejectHandler = useCallback(() => {
    onEventDeclined?.(event?.id as EventFragment, async (_, isAcceptAll) => {
      onReject(isAcceptAll);
    });
  }, [event, onReject, onEventDeclined]);

  if (isCohost) {
    return (
      <NotificationItem
        {...basicProps}
        data-testid="EventCohostInvitee"
        body={
          <TranslatedBody
            i18nKey="noumena.notification_type.event_cohost_invitee.body"
            values={{
              usersList: formatMultipleUserNames(users),
              eventName: event?.id?.title,
            }}
          />
        }
        buttons={
          !isStaleEvent(event) &&
          isInvitationPending(event) && (
            <>
              <NotificationButton variant="primary" onClick={onAcceptHandler}>
                {t('noumena.notifications.events.become_host')}
              </NotificationButton>
              <NotificationButton variant="secondary" onClick={onRejectHandler}>
                {t('noumena.reject')}
              </NotificationButton>
            </>
          )
        }
      />
    );
  }

  return (
    <NotificationItem
      {...basicProps}
      data-testid="EventInvitee"
      body={
        <TranslatedBody
          i18nKey="noumena.notification_type.event_invitee.body"
          values={{
            usersList: formatMultipleUserNames(users),
            eventName: event?.id?.title,
          }}
        />
      }
      buttons={
        !isStaleEvent(event) &&
        isInvitationPending(event) && (
          <>
            <NotificationButton variant="primary" onClick={onAcceptHandler}>
              {t('noumena.Accept')}
            </NotificationButton>
            <NotificationButton variant="secondary" onClick={onRejectHandler}>
              {t('noumena.reject')}
            </NotificationButton>
          </>
        )
      }
    />
  );
};

export default withRecurringEvent(EventInvitee);
