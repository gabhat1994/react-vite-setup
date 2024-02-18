import { useEffect } from 'react';
import { useAuth } from '@/features/auth/contexts';
import { type MessagePayload } from '@/services/rest/firebase';
import { UserStatus } from '@/apollo/generated/types';
import { usePushNotification } from '../contexts/PushNotification';

const userStatusForPushNotificationType: { [key: string]: UserStatus } = {
  USER_PENDING: UserStatus.Pending,
  USER_ACTIVE: UserStatus.Active,
  USER_INACTIVE: UserStatus.Inactive,
  USER_DEACTIVATED: UserStatus.Deactivated,
  USER_REJECTED: UserStatus.Rejected,
  USER_UNREGISTERED: UserStatus.Unregistered,
  CONNECTION_APPROVED: UserStatus.Active,
};

export function useUserStatusListener() {
  const { user, updateUserStatus } = useAuth();
  const { onAnyMessage } = usePushNotification();

  const isAuthenticated = !!user;

  useEffect(() => {
    if (!isAuthenticated) return () => {};

    const handler = (message: MessagePayload) => {
      if (
        !!message.data?.pnId &&
        message.data.pnId in userStatusForPushNotificationType
      ) {
        updateUserStatus(userStatusForPushNotificationType[message.data.pnId]);
      }
    };

    const unsubscribe = onAnyMessage(handler);

    return unsubscribe;
  }, [updateUserStatus, isAuthenticated, onAnyMessage]);
}
