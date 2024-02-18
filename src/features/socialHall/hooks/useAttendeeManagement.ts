import { t } from 'i18next';

import {
  useBlockUserMutation,
  useMuteMainEventSpeakerMutation,
  useRemoveFromSocialHallMutation,
} from '@/apollo/graphql';
import { useToast } from '@/hooks/toast';
import { useError } from '@/hooks/useError';
import { MuteSpeakerType } from '@/apollo/generated/types';
import { SubscriptionType } from '@/screens/SocialHall/types';
import { useSocialHallCallContext, useSocialHallContext } from '@/providers';

import { useSpeakerApi } from './useSpeakerApi';

export const useAttendeeManagement = () => {
  const {
    onInviteAttendeeAsSpeaker,
    onRemoveSpeaker,
    onCancelSpeakerInvitation,
  } = useSpeakerApi();
  const { addToast } = useToast();
  const { logError } = useError();
  const [blockUserMutation] = useBlockUserMutation();
  const { isPersonalSocialHall, socialHallId } = useSocialHallContext();
  const { onSendPeerToPeerMessage } = useSocialHallCallContext();
  const [muteSpeakerOnStage] = useMuteMainEventSpeakerMutation();
  const [removeFromSocialHall] = useRemoveFromSocialHallMutation();

  const onBlockUserSuccess = (name: string, isBlocked: boolean) => {
    addToast(
      isBlocked ? 'error' : 'primary',
      'icon',
      t(
        isBlocked
          ? 'noumena.social_hall.kick_modal.notification'
          : 'noumena.social_hall.unblock_user.notification',
        {
          name,
        },
      ),
    );
  };

  const onSendBlockSubscription = (userId: string) => {
    onSendPeerToPeerMessage({
      type: SubscriptionType.BLOCK_ATTENDEE_ON_GROUP_CALL,
      peerId: userId,
    });
  };

  const blockScheduledEventUser = async (
    userId: string,
    eventId: string,
    isBlocked: boolean,
  ) => {
    await blockUserMutation({
      variables: {
        userId,
        eventId,
        isBlocked,
      },
    });
  };

  const blockPersonalEventUser = async (userId: string) => {
    await removeFromSocialHall({
      variables: {
        userId,
        socialHallId,
      },
    });
  };

  const onBlockUser = async (
    userId: string,
    eventId: string,
    name: string,
    isBlocked: boolean,
  ): Promise<boolean> => {
    if (!eventId && !isPersonalSocialHall) {
      return false;
    }

    if (isBlocked) {
      onSendBlockSubscription(userId);
    }

    try {
      if (!isPersonalSocialHall) {
        await blockScheduledEventUser(userId, eventId, isBlocked);
      }
      if (isBlocked && isPersonalSocialHall) {
        await blockPersonalEventUser(userId);
      }

      onBlockUserSuccess(name, isBlocked);
      return true;
    } catch (err) {
      logError(err, '');
      return false;
    }
  };

  const onViewAttendeeProfile = (chamberId: string) => {
    window.open(`${window.location.origin}/noum/${chamberId}`);
  };

  const onInviteAttendeeToStage = async (userId: string) => {
    await onInviteAttendeeAsSpeaker(userId);
  };

  const onCancelInvitationToStage = async (userId: string) => {
    await onCancelSpeakerInvitation(userId);
  };

  const onRemoveSpeakerFromStage = async (userId: string) => {
    onRemoveSpeaker(userId);
    onSendPeerToPeerMessage({
      type: SubscriptionType.BLOCK_ATTENDEE_ON_GROUP_CALL,
      peerId: userId,
    });
  };

  const onMuteSpeakerOnStage = async (
    groupId: string | undefined,
    speakerId: string,
    actionType: MuteSpeakerType,
  ) => {
    if (!groupId) return;
    muteSpeakerOnStage({
      variables: {
        groupId,
        speakerId,
        actionType,
      },
    });

    const type =
      actionType === MuteSpeakerType.Mute
        ? SubscriptionType.MUTE_ATTENDEE_IN_GROUP_CALL
        : SubscriptionType.UNMUTE_ATTENDEE_IN_GROUP_CALL;

    onSendPeerToPeerMessage({ type, peerId: speakerId });
  };

  return {
    onBlockUser,
    onViewAttendeeProfile,
    onInviteAttendeeToStage,
    onCancelInvitationToStage,
    onRemoveSpeakerFromStage,
    onMuteSpeakerOnStage,
  };
};

export default useAttendeeManagement;
