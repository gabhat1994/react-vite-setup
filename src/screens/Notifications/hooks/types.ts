import { type Event, type Maybe } from '@/apollo/generated/types';
import { type NotificationFragment } from '@/apollo/graphql/fragments';

interface CommonNotificationHandlerOptions {
  onNotificationRead: (notification: NotificationFragment) => Promise<void>;
}

export type UseEventNotificationHandlersOptions =
  CommonNotificationHandlerOptions & {
    onEventDetails: (event: Maybe<Event> | undefined) => void;
  };
export type UseConnectionNotificationHandlersOptions =
  CommonNotificationHandlerOptions;

export type UseMemberInvitationNotificationHandlersOptions =
  CommonNotificationHandlerOptions;
