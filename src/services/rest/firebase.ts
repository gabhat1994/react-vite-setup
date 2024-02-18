import { initializeApp } from 'firebase/app';
import {
  getMessaging,
  onMessage,
  getToken,
  isSupported,
  deleteToken,
} from 'firebase/messaging';
import * as Sentry from '@sentry/react';
import { noop } from 'lodash';

type OnRegister = (fcmToken: string) => void;
type OnDelete = (wasDeleted: boolean) => void;

export type NotificationPayload = {
  /**
   * The notification's title.
   */
  title?: string;
  /**
   * The notification's body text.
   */
  body?: string;
  /**
   * The URL of an image that is downloaded on the device and displayed in the notification.
   */
  image?: string;
};

export type MessagePayload = {
  notification?: NotificationPayload;
  data?: {
    [key: string]: string;
  };
};
export type PushMessagePayload = ServiceWorkerContainerEventMap['message'];

export type MessageHandler = (message: MessagePayload) => void;
type PushMessageHandler = (event: PushMessagePayload) => void;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const iOSDevice =
  [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod',
  ].includes(navigator?.platform) ||
  (navigator?.userAgent.includes('Mac') && 'ontouchend' in document);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const checkMessaging = async () => {
  let firebaseSupported = process.env.NODE_ENV === 'test';
  if (!firebaseSupported) {
    firebaseSupported = await isSupported(); // This method is not supported on the test env.
  }
  /* For iOSDevice, isSupported() return true even though it does not support firebase push notification service. */
  return navigator?.serviceWorker && !iOSDevice && firebaseSupported
    ? getMessaging(firebaseApp)
    : null;
};

export const FCMService = {
  requestForToken: async (onRegister: OnRegister) => {
    const messaging = await checkMessaging();
    return messaging
      ? getToken(messaging, { vapidKey: process.env.VITE_FIREBASE_VAPID_KEY })
          .then((fcmToken) => {
            if (fcmToken) {
              // Perform any other necessary action with the token
              onRegister(fcmToken);
            }
          })
          .catch((e) => {
            Sentry.captureException(e);
          })
      : noop;
  },
  deleteToken: async (onDelete: OnDelete) => {
    const messaging = await checkMessaging();
    return messaging
      ? deleteToken(messaging)
          .then((wasDeleted) => onDelete(wasDeleted))
          .catch((e) => {
            Sentry.captureException(e);
          })
      : noop;
  },
  onForegroundMessage: async (messageHandler: MessageHandler) => {
    const messaging = await checkMessaging();
    return messaging
      ? onMessage(messaging, (payload) => {
          messageHandler({
            notification: payload.notification,
            data: payload.data,
          });
        })
      : noop;
  },
  onBackgroundMessage: async (messageHandler: PushMessageHandler) => {
    if (!('serviceWorker' in navigator)) {
      return noop;
    }

    navigator.serviceWorker.addEventListener('message', messageHandler);

    return () => {
      navigator.serviceWorker.removeEventListener('message', messageHandler);
    };
  },
};
