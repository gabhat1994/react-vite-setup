import { type MessageHandler } from '@/services/rest/firebase';
import { type Unsubscribe } from 'firebase/messaging';
import React, { useContext } from 'react';

type MessageListener = (messageHandler: MessageHandler) => Unsubscribe;

interface IPushNotificationContext {
  onForegroundMessage: MessageListener;
  onBackgroundMessage: MessageListener;
  onAnyMessage: MessageListener;
}

export const PushNotificationContext =
  React.createContext<IPushNotificationContext>(
    null as unknown as IPushNotificationContext,
  );

export function usePushNotification() {
  const context = useContext(PushNotificationContext);

  if (!context) {
    throw new Error(
      'usePushNotification must be called under PushNotificationProvider.',
    );
  }

  return context;
}
