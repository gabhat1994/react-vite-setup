import {
  createContext,
  type ReactNode,
  type FC,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/contexts';
import {
  useGetSingleNotificationLazyQuery,
  useNotificationSubscription,
} from '@/apollo/graphql';
import { NotificationType, UserStatus } from '@/apollo/generated/types';
import ROUTES from '@/constants/routes';
import { useGuestHome } from '@/hooks/guest';

const NotificationContext = createContext<{}>({});

const userStatusNotificationTypes: {
  [key: string]: NotificationType;
} = {
  [NotificationType.UserDeactivated]: NotificationType.UserDeactivated,
  [NotificationType.UserInactive]: NotificationType.UserInactive,
  [NotificationType.UserPending]: NotificationType.UserPending,
  [NotificationType.UserUnregisgtered]: NotificationType.UserUnregisgtered,
};

const userStatus: { [key: string]: UserStatus } = {
  [NotificationType.UserPending]: UserStatus.Pending,
  [NotificationType.UserInactive]: UserStatus.Inactive,
  [NotificationType.UserDeactivated]: UserStatus.Deactivated,
  [NotificationType.UserRejected]: UserStatus.Rejected,
  [NotificationType.UserUnregisgtered]: UserStatus.Unregistered,
};

export const NotificationProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { user, isUnregistered, signOut, updateUserStatus, refetchUserData } =
    useAuth();
  const navigate = useNavigate();
  const { refetchNoums } = useGuestHome();

  const { data } = useNotificationSubscription({
    skip: !user?._id,
    variables: { userId: user?._id || '' },
  });

  const handleDisconnect = useCallback(
    (id: string) => {
      const { pathname } = window.location;

      if (isUnregistered && pathname === `/noum/${id}`) {
        navigate(ROUTES.GUEST_HOME, { replace: true });
      } else if (isUnregistered && pathname === ROUTES.GUEST_HOME) {
        refetchNoums();
      }
    },
    [isUnregistered, navigate, refetchNoums],
  );

  const [getNotificationDetails] = useGetSingleNotificationLazyQuery({
    onCompleted: (response) => {
      if (!response.notificationV2) return;
      const { data: notification, type } = response.notificationV2;
      if (!notification) return;
      if (
        type === NotificationType.ConnectionDisconnected &&
        notification.chamberId
      ) {
        handleDisconnect(notification.chamberId);
      }
    },
  });

  const emptyValue = useMemo(() => ({}), []);

  useEffect(() => {
    if (data?.notification?.type) {
      if (data.notification.type === NotificationType.UserRejected) {
        signOut();
      } else if (userStatusNotificationTypes[data.notification.type]) {
        updateUserStatus(userStatus[data.notification.type]);
      } else if (isUnregistered && NotificationType.ConnectionDisconnected) {
        getNotificationDetails({
          variables: { id: data.notification._id },
        });
      }
    }
  }, [
    data,
    isUnregistered,
    signOut,
    updateUserStatus,
    refetchUserData,
    getNotificationDetails,
  ]);

  return (
    <NotificationContext.Provider value={emptyValue}>
      {children}
    </NotificationContext.Provider>
  );
};
