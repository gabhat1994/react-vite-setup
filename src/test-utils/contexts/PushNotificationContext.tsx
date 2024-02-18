import { PushNotificationContext } from '@/features/push-notifications/contexts/PushNotification/context';

interface PushNotificationProviderProps {
  children: React.ReactNode;
}

const pushNotificationProviderValue = {
  onAnyMessage: vi.fn(),
  onBackgroundMessage: vi.fn(),
  onForegroundMessage: vi.fn(),
};

export function PushNotificationProvider({
  children,
}: PushNotificationProviderProps) {
  return (
    <PushNotificationContext.Provider value={pushNotificationProviderValue}>
      {children}
    </PushNotificationContext.Provider>
  );
}
