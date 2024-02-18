import { useUpsertDeviceTokenMutation } from '@/apollo/graphql';
import { FCMService } from '@/services/rest/firebase';
import { useCallback, useMemo } from 'react';
import { useSessionStorageItem } from './sessionStorageItem';

export const useFCMDeviceToken = () => {
  const [fcmToken, setFcmToken] = useSessionStorageItem('FCM_TOKEN', '');
  const [updateDeviceToken, { loading }] = useUpsertDeviceTokenMutation();

  const registerToken = useCallback(
    (token) => {
      if (token) {
        updateDeviceToken({
          onCompleted: () => setFcmToken(token),
          variables: { input: { token, isActive: true } },
        });
      }
    },
    [setFcmToken, updateDeviceToken],
  );

  const unregisterToken = useCallback(async () => {
    if (!fcmToken) return;

    await FCMService.deleteToken((wasDeleted) => {
      if (!wasDeleted) return;

      updateDeviceToken({
        onCompleted: async () => {
          setFcmToken('');
        },
        variables: { input: { token: fcmToken, isActive: false } },
      });
    });
  }, [fcmToken, setFcmToken, updateDeviceToken]);

  const getToken = useCallback(async () => {
    await FCMService.requestForToken(registerToken);
  }, [registerToken]);

  const refreshToken = useCallback(() => {
    // TODO: Add token refreshing logic if needed.
  }, []);

  const payload = useMemo(
    () => ({
      loading,
      fcmToken,
      getToken,
      refreshToken,
      registerToken,
      unregisterToken,
    }),
    [loading, fcmToken, getToken, refreshToken, registerToken, unregisterToken],
  );

  return payload;
};

export default useFCMDeviceToken;
