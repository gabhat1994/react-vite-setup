import { useAuth } from '@/features/auth/contexts';
import { useFCMDeviceToken } from '@/hooks';
import React, { useEffect } from 'react';
import { PushNotificationContext } from './context';
import { usePushNotificationSubscribers } from './subscribers';

interface PushNotificationProviderProps {
  children: React.ReactNode;
}

export function PushNotificationProvider({
  children,
}: PushNotificationProviderProps) {
  const { getToken } = useFCMDeviceToken();
  const subscribers = usePushNotificationSubscribers();

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    async function init() {
      await getToken();
    }

    init();
  }, [user, getToken]);

  return (
    <PushNotificationContext.Provider value={subscribers}>
      {children}
    </PushNotificationContext.Provider>
  );
}
