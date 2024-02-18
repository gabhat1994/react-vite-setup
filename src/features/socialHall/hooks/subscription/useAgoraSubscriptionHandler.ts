/* eslint-disable no-console */
import { useCallback, useEffect } from 'react';
import { type RtmMessage, type RtmTextMessage } from '@/facade/agoraRTM';
import {
  type SubscriptionContent,
  SubscriptionType,
} from '@/screens/SocialHall/types';
import { SUBSCRIPTION_MESSAGE } from '@/screens/SocialHall/const';
import { EventsStatus, type UserOutput } from '@/apollo/generated/types';
import { useUpdateGetEventByIdCache } from '@/features/events/hooks';
import {
  useSocialHallEventContext,
  useSocialHallCallContext,
} from '@/providers';
import { useUpdateUserActiveSocialHallGroupCache } from '../gql/useUpdateUserActiveSocialHallGroupCache';

export const useAgoraSubscriptionHandler = () => {
  const {
    updateGroupName,
    updateRaiseHandUsersCache,
    updateNewAttendeeOnCallCache,
    removeAttendeeFromCallCache,
  } = useUpdateUserActiveSocialHallGroupCache();
  const { updateEventStatus } = useUpdateGetEventByIdCache();
  const {
    rtmEngine,
    rtmChannel,
    onLeaveCall,
    onHostBlocked,
    toggleMuteCall,
    onRemoteUserLeftChannel,
  } = useSocialHallCallContext();

  const { onRedirectToEventFinished } = useSocialHallEventContext();

  const onChannelMessageSubscriptionHandler = useCallback(
    async (message: RtmMessage, memberId: string): Promise<void> => {
      console.log('===========Agora Subsctiption Start============');
      console.log(message, memberId);
      console.log('===========Agora Subsctiption End =============');

      try {
        const msg = message as RtmTextMessage;
        const { type, data, description } = JSON.parse(
          msg.text,
        ) as SubscriptionContent;

        if (description === SUBSCRIPTION_MESSAGE) {
          switch (type) {
            case SubscriptionType.RAISED_HAND:
              updateRaiseHandUsersCache(data as boolean, memberId);
              break;
            // Peer2Peer message
            case SubscriptionType.MUTE_ATTENDEE_IN_GROUP_CALL:
              toggleMuteCall();
              break;
            // Peer2Peer message
            case SubscriptionType.UNMUTE_ATTENDEE_IN_GROUP_CALL:
              toggleMuteCall();
              break;
            case SubscriptionType.NEW_ATTENDEE_IN_GROUP_CALL:
              updateNewAttendeeOnCallCache(data as UserOutput);
              break;
            // Peer2Peer message
            case SubscriptionType.BLOCK_ATTENDEE_ON_GROUP_CALL:
              onHostBlocked();
              break;
            case SubscriptionType.QUIT_ATTENDEE_ON_SOCIAL_HALL:
              setTimeout(() => onRemoteUserLeftChannel(memberId), 2000);
              removeAttendeeFromCallCache(memberId);
              break;
            case SubscriptionType.UPDATE_EVENT_STATUS:
              if ((data as EventsStatus) === EventsStatus.Cancelled) {
                await onLeaveCall();
                onRedirectToEventFinished();
              }
              updateEventStatus(data as EventsStatus);
              break;
            case SubscriptionType.UPDATE_GROUP_NAME:
              updateGroupName(data as EventsStatus);
              break;
            default:
              break;
          }
        }
      } catch (err) {
        // no error handling required
        console.log(err);
      }
    },
    [
      onLeaveCall,
      onHostBlocked,
      toggleMuteCall,
      updateGroupName,
      updateEventStatus,
      onRemoteUserLeftChannel,
      updateRaiseHandUsersCache,
      onRedirectToEventFinished,
      removeAttendeeFromCallCache,
      updateNewAttendeeOnCallCache,
    ],
  );

  const bindEvent = useCallback(() => {
    if (!rtmEngine && !rtmChannel) {
      return;
    }
    rtmEngine?.on('MessageFromPeer', onChannelMessageSubscriptionHandler);
    rtmChannel?.on('ChannelMessage', onChannelMessageSubscriptionHandler);
  }, [rtmEngine, rtmChannel, onChannelMessageSubscriptionHandler]);

  useEffect(() => {
    bindEvent();
    return () => {
      rtmEngine?.off('MessageFromPeer', onChannelMessageSubscriptionHandler);
      rtmChannel?.off('ChannelMessage', onChannelMessageSubscriptionHandler);
    };
  }, [bindEvent, rtmEngine, rtmChannel, onChannelMessageSubscriptionHandler]);

  return {
    onChannelMessageSubscriptionHandler,
  };
};

export default useAgoraSubscriptionHandler;
