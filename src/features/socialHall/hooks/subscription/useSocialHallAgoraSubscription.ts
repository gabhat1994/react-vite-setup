import { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { type ReceivedMessageProperties } from '@/screens/SocialHall/types';
import {
  type RtmChannel,
  type RtmClient,
  type RtmMessage,
} from '@/facade/agoraRTM';
import { useAuth } from '@/features/auth/contexts';
import { useInitializeAgora } from '../useInitializeAgora';

type SocialHallAgoraSubscription = {
  rtmToken: string;
  channelName: string;
};

type SocialHallAgoraSubscriptionResult = {
  rtmEngine?: RtmClient;
  rtmChannel?: RtmChannel & {
    joinState?: string;
  };
  subscribeUser: () => Promise<void>;
  unsubscribeUser: () => Promise<void>;
  broadcastChannelEvent: <T>(json: T) => void;
  broadcastP2PEvent: <T>(json: T, uid: string) => Promise<boolean>;
  receivedEvent: (
    message: RtmMessage,
    senderUID: string,
    messageProps: ReceivedMessageProperties,
  ) => void;
};

export const useSocialHallAgoraSubscription = ({
  rtmToken,
  channelName,
}: SocialHallAgoraSubscription): SocialHallAgoraSubscriptionResult => {
  const { user } = useAuth();
  const [rtmEngine, setRtmEngine] = useState<RtmClient>();
  const [rtmChannel, setRtmChannel] = useState<RtmChannel>();
  const { initializeAgoraMessagingEngine } = useInitializeAgora();

  const initRtmEngine = useCallback(async () => {
    const rtmClient = await initializeAgoraMessagingEngine();
    setRtmEngine(rtmClient);
  }, [initializeAgoraMessagingEngine]);

  // remove user from social hall channel
  const unsubscribeUser = useCallback(async () => {
    await rtmChannel?.leave();
  }, [rtmChannel]);

  // broadcast message to channel
  const broadcastChannelEvent = useCallback(
    <T>(json: T) => {
      rtmChannel?.sendMessage(
        { text: JSON.stringify(json) },
        {
          enableHistoricalMessaging: true,
        },
      );
    },
    [rtmChannel],
  );

  const broadcastP2PEvent = useCallback(
    <T>(json: T, uid: string): Promise<boolean> =>
      new Promise((resolve, reject) => {
        rtmEngine
          ?.sendMessageToPeer({ text: JSON.stringify(json) }, uid, {
            enableHistoricalMessaging: true,
          })
          .then(({ hasPeerReceived }) => {
            resolve(hasPeerReceived);
          })
          .catch((err) => {
            reject(err);
          });
      }),
    [rtmEngine],
  );

  // process message in the channel
  const receivedEvent = useCallback(
    (
      message: RtmMessage,
      senderUID: string,
      messageProps: ReceivedMessageProperties,
    ) => {
      // eslint-disable-next-line no-console
      console.log(message);
      // eslint-disable-next-line no-console
      console.log(
        `Message received at: ${format(
          new Date(Date.now() - messageProps.serverReceivedTs),
          'hh:mm:ss',
        )}`,
      );
    },
    [],
  );

  // register rtmChannel events
  const registerRtmEvents = useCallback(
    (channel: RtmChannel) => {
      channel.on('ChannelMessage', receivedEvent);
      // refresh social hall user list
      channel.on('MemberCountUpdated', () => {});
    },
    [receivedEvent],
  );

  // join user to social hall channel
  const subscribeUser = useCallback(async () => {
    try {
      await rtmEngine?.login({
        uid: user?._id!,
        token: rtmToken,
      });

      const channel = rtmEngine?.createChannel(channelName);
      channel?.join();
      setRtmChannel(channel);
      registerRtmEvents(channel!);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, [rtmToken, user?._id, channelName, registerRtmEvents, rtmEngine]);

  useEffect(() => {
    initRtmEngine();
  }, [initRtmEngine]);

  return {
    rtmEngine,
    rtmChannel,
    receivedEvent,
    subscribeUser,
    unsubscribeUser,
    broadcastP2PEvent,
    broadcastChannelEvent,
  };
};

export default useSocialHallAgoraSubscription;
