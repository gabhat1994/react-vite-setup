import { useMemo } from 'react';
import {
  useInviteAsSpeakerMutation,
  useCancelSpeakerInvitationMutation,
  useAcceptSpeakerInvitationMutation,
  useDeclineSpeakerInvitationMutation,
  useRemoveSpeakerMutation,
} from '@/apollo/graphql';
import { useError } from '@/hooks/useError';
import { useSocialHallContext } from '@/providers/SocialHallProvider';

export const useSpeakerApi = () => {
  const { logError } = useError();

  const { userActiveGroupData } = useSocialHallContext();

  const [inviteAsSpeakerMutation] = useInviteAsSpeakerMutation();

  const [acceptSpeakerInvitationMutation] =
    useAcceptSpeakerInvitationMutation();

  const [declineSpeakerInvitationMutation] =
    useDeclineSpeakerInvitationMutation();

  const [removeSpeakerMutation] = useRemoveSpeakerMutation();

  const [cancelSpeakerInvitation] = useCancelSpeakerInvitationMutation();

  const groupId = useMemo(
    () => userActiveGroupData?.data?.userActiveSocialHallGroup?._id ?? '',
    [userActiveGroupData?.data?.userActiveSocialHallGroup?._id],
  );

  const onDeclineSpeakerInvitation = async () => {
    try {
      await declineSpeakerInvitationMutation({
        variables: {
          groupId,
        },
      });
    } catch (err) {
      logError(err, '');
    }
  };

  const onAcceptSpeakerInvitation = async () => {
    try {
      await acceptSpeakerInvitationMutation({
        variables: {
          groupId,
        },
      });
    } catch (err) {
      logError(err, '');
    }
  };

  const onInviteAttendeeAsSpeaker = async (userId: string) => {
    try {
      await inviteAsSpeakerMutation({
        variables: {
          invitedUserIds: [userId],
          groupId,
        },
      });
    } catch (err) {
      logError(err, '');
    }
  };

  const onCancelSpeakerInvitation = async (invitedUserId: string) => {
    try {
      await cancelSpeakerInvitation({
        variables: {
          groupId,
          invitedUserId,
        },
      });
    } catch (err) {
      logError(err, '');
    }
  };

  const onRemoveSpeaker = async (speakerId: string) => {
    try {
      await removeSpeakerMutation({
        variables: {
          groupId,
          speakerId,
        },
      });
    } catch (err) {
      logError(err, '');
    }
  };

  return {
    onRemoveSpeaker,
    onAcceptSpeakerInvitation,
    onCancelSpeakerInvitation,
    onInviteAttendeeAsSpeaker,
    onDeclineSpeakerInvitation,
  };
};

export default useSpeakerApi;
