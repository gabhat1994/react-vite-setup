import { PushNotificationTypes, type UserRole } from '@/apollo/generated/types';
import accessLocalStorage from '@/constants/accessLocalStorage';
import { useAuth } from '@/features/auth/contexts';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import generate from 'uniqid';

import { isNotificationExpired } from '@/features/alert-notifications/utils';
import {
  type NotificationPayload,
  type MessagePayload,
} from '@/services/rest/firebase';
import { usePushNotification } from '@/features/push-notifications/contexts/PushNotification';

type AlertNotificationsContextType = {
  notifications: AlertNotification[];
  dismissNotification: (id: string) => void;
  dismissNotificationByEventId: (eventId: string) => void;
};

const AlertNotificationsContext = createContext<AlertNotificationsContextType>({
  notifications: [],
  dismissNotification: () => {},
  dismissNotificationByEventId: () => {},
});

const handledAlertNotificationTypes = [
  PushNotificationTypes.EventLive,
  PushNotificationTypes.EventStarting,
  PushNotificationTypes.EventDeleted,
] as const;

export type SupportedAlertNotificationTypes =
  typeof handledAlertNotificationTypes[number];

type AlertMessagePayload<TPayload> = Omit<MessagePayload, 'data'> & {
  data?: TPayload;
};

export type AlertNotification = {
  eventId: string;
  eventTitle: string;
  socialHallId: string;
  userRole: UserRole;
  pnId: SupportedAlertNotificationTypes;
  id: string;
  pnPayload: NotificationPayload;
  userId: string;
  createdAt: string;
};

export const AlertNotificationsProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [notifications, setNotifications] = useState<AlertNotification[]>(
    () => getLocalStorage(accessLocalStorage.ALERT_NOTIFICATIONS) ?? [],
  );

  const { user } = useAuth();
  const { onAnyMessage } = usePushNotification();

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => {
      const filtered = prev.filter((n) => n.id !== id);

      setLocalStorage(accessLocalStorage.ALERT_NOTIFICATIONS, filtered);
      return filtered;
    });
  }, []);

  const dismissNotificationByEventId = useCallback((eventId: string) => {
    setNotifications((prev) => {
      const filtered = prev.filter((n) => n.eventId !== eventId);

      setLocalStorage(accessLocalStorage.ALERT_NOTIFICATIONS, filtered);
      return filtered;
    });
  }, []);

  const addNotification = useCallback((notification: AlertNotification) => {
    setNotifications((prev) => {
      const newList = [notification, ...prev];

      setLocalStorage(accessLocalStorage.ALERT_NOTIFICATIONS, newList);
      return newList;
    });
  }, []);

  useEffect(() => {
    notifications.forEach((notification) => {
      if (isNotificationExpired(notification)) {
        dismissNotification(notification.id);
      }
    });
  }, [dismissNotification, notifications]);

  useEffect(
    () =>
      onAnyMessage((message: MessagePayload) => {
        if (
          message.data?.pnId &&
          handledAlertNotificationTypes.includes(
            message.data.pnId as SupportedAlertNotificationTypes,
          )
        ) {
          const { data, notification: pnPayload } =
            message as AlertMessagePayload<AlertNotification>;

          if (!data || !pnPayload || user?._id !== data.userId) {
            return;
          }

          const { eventId, userRole, eventTitle, socialHallId, userId, pnId } =
            data;

          if (pnId === PushNotificationTypes.EventDeleted) {
            dismissNotificationByEventId(eventId);

            return;
          }

          const createdAt = new Date().toISOString();

          addNotification({
            id: generate(),
            pnId: data.pnId,
            eventId,
            userRole,
            pnPayload,
            eventTitle,
            socialHallId,
            userId,
            createdAt,
          });
        }
      }),
    [addNotification, dismissNotificationByEventId, onAnyMessage, user?._id],
  );

  const value = useMemo<AlertNotificationsContextType>(
    () => ({
      notifications: notifications ?? [],
      dismissNotification,
      dismissNotificationByEventId,
    }),
    [dismissNotification, dismissNotificationByEventId, notifications],
  );

  return (
    <AlertNotificationsContext.Provider value={value}>
      {children}
    </AlertNotificationsContext.Provider>
  );
};

export const useAlertNotifications = () => {
  const context = useContext(AlertNotificationsContext);

  if (!context) {
    throw new Error(
      'useAlertNotifications must be called under AlertNotificationsProvider.',
    );
  }

  return context;
};
