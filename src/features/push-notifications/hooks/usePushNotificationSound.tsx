import { useEffect } from 'react';
import { type MessagePayload } from '@/services/rest/firebase';
import PushNotificationAudio from '@/assets/media/chat-new-message.wav';
import IncomingCallAudio from '@/assets/media/incoming-call.wav';
import { URGENT_NOTIFICATION_TYPES } from '@/constants/pushNotifications';
import { PushNotificationTypes } from '@/apollo/generated/types';
import { playOnce } from '@/utils/audio';
import { usePushNotification } from '../contexts/PushNotification';

function getAudioFile(message: MessagePayload): string | null {
  if (!message.data?.pnId) {
    return null;
  }

  switch (message.data.pnId) {
    case PushNotificationTypes.EventLive:
    case PushNotificationTypes.EventStarting:
      return IncomingCallAudio;
    default:
      return PushNotificationAudio;
  }
}

function isUrgentNotification(message: MessagePayload) {
  if (!message.data?.pnId) {
    return false;
  }

  return URGENT_NOTIFICATION_TYPES.includes(
    message.data.pnId as PushNotificationTypes,
  );
}

export function usePushNotificationSound() {
  const { onAnyMessage } = usePushNotification();

  useEffect(() => {
    const handler = (message: MessagePayload) => {
      if (isUrgentNotification(message)) {
        const audioFile = getAudioFile(message);
        if (audioFile) {
          playOnce(audioFile);
        }
      }
    };

    const unsubscribe = onAnyMessage(handler);

    return unsubscribe;
  }, [onAnyMessage]);
}
