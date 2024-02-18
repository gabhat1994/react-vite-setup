import { useEventSubscriber } from '@/hooks/eventSubscriber';
import {
  FCMService,
  type PushMessagePayload,
  type MessageHandler,
  type MessagePayload,
} from '@/services/rest/firebase';
import { type Unsubscribe } from 'firebase/messaging';
import { useCallback, useEffect, useMemo } from 'react';

export function usePushNotificationSubscribers() {
  const foregroundPubSub = useEventSubscriber<MessagePayload, MessageHandler>();
  const backgroundPubSub = useEventSubscriber<MessagePayload, MessageHandler>();

  /**
   * Adds a callback to be called when a push message comes while the app is active (in foreground).
   */
  const onForegroundMessage = useCallback(
    (messageHandler: MessageHandler) => {
      foregroundPubSub.subscribe(messageHandler);
      return () => foregroundPubSub.unsubscribe(messageHandler);
    },
    [foregroundPubSub],
  );

  /**
 * Adds a callback to be called when a push message comes while the app is inactive (in background).
 
 */
  const onBackgroundMessage = useCallback(
    (messageHandler: MessageHandler) => {
      backgroundPubSub.subscribe(messageHandler);
      return () => backgroundPubSub.unsubscribe(messageHandler);
    },
    [backgroundPubSub],
  );

  /**
   * FCMService supports registration of only one handler, so we have to create our own local PubSub to support multiple listeners.
   */
  useEffect(() => {
    let unsubscribeForeground: Unsubscribe;

    async function initForegroundHandler() {
      const dataHandler = (message: MessagePayload) => {
        if (!message.data) {
          return;
        }

        const payload: MessagePayload = {
          data: message.data,
          notification: message.data.notification
            ? JSON.parse(message.data.notification)
            : message.notification,
        };
        // Let the local pub-sub notify all subscribers.
        foregroundPubSub.publish(payload);
      };

      unsubscribeForeground = await FCMService.onForegroundMessage(dataHandler);
    }

    initForegroundHandler();

    return () => {
      unsubscribeForeground();
    };
  }, [foregroundPubSub]);

  /**
   * Relies on a special value injected by service-worker, __isBackgroundMessage, to distinguish from foreground messages.
   */
  useEffect(() => {
    let unsubscribeBackground: Unsubscribe;

    async function initBackgroundHandler() {
      const dataHandler = (event: PushMessagePayload) => {
        const eventData = event.data;
        // Check for a special value to ignore foreground messages sent by Firebase automatically.
        // This value is set by our service worker.
        if (!eventData?.data.__isBackgroundMessage) {
          return;
        }

        const payload: MessagePayload = {
          data: eventData.data,
          notification: eventData.notification,
        };
        // Let the local pub-sub notify all subscribers.
        backgroundPubSub.publish(payload);
      };

      unsubscribeBackground = await FCMService.onBackgroundMessage(dataHandler);
    }

    initBackgroundHandler();

    return () => {
      unsubscribeBackground();
    };
  }, [backgroundPubSub]);

  useEffect(() => {
    const cleanup = () => {
      foregroundPubSub.unsubscribeAll();
      backgroundPubSub.unsubscribeAll();
    };
    return cleanup;
  }, [backgroundPubSub, foregroundPubSub]);

  const subscribers = useMemo(
    () => ({
      onForegroundMessage,
      onBackgroundMessage,
      onAnyMessage: (messageHandler: MessageHandler) => {
        const unsubscribeForeground = onForegroundMessage(messageHandler);
        const unsubscribeBackground = onBackgroundMessage(messageHandler);

        return () => {
          unsubscribeForeground();
          unsubscribeBackground();
        };
      },
    }),
    [onBackgroundMessage, onForegroundMessage],
  );

  return subscribers;
}
