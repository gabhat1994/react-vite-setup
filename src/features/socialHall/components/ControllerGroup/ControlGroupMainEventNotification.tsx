import { useCallback, useEffect, useMemo, useState } from 'react';
import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import {
  useSocialHallCallContext,
  useSocialHallContext,
  useSocialHallEventContext,
} from '@/providers';
import { MainEventSpeakerNotificationTimer } from '@/screens/SocialHall/const';
import { SpeakerInvitationType } from '@/apollo/generated/types';
import { Avatar } from '@/components/Avatar/Avatar';
import { UserUtil } from '@/utils/user';
import { useRaiseHandApi, useSpeakerApi } from '@/features/socialHall/hooks';
import { useAuth } from '@/features/auth/contexts';
import { ControlGroupNotificationWrapper, Wrapper } from './styles';
import { MainEventNotification } from '../EventModals/MainEventNotification/MainEventNotification';

export const ControlGroupMainEventNotification = () => {
  const { user } = useAuth();
  const { onAcceptSpeakerInvitation, onDeclineSpeakerInvitation } =
    useSpeakerApi();
  const { toggleRaisedHand } = useRaiseHandApi();
  const { speakerInvitation, stageAttendees } = useSocialHallContext();
  const {
    joinLeaveMember,
    showUserJoined,
    showUserLeave,
    setShowUserJoined,
    setShowUserLeave,
    joinedUsers,
    isRaiseHandRejected,
    resetMembersNotification,
    showRaiseHand: isShowRaiseHand,
  } = useSocialHallCallContext();
  const { eventOwner } = useSocialHallEventContext();
  const { speakerSubscription } = useSocialHallCallContext();
  const [showMovedToAudienceNotification, setMovedToAudienceNotification] =
    useState(false);
  const [showHostInviteAsSpeaker, setShowHostInviteAsSpeaker] = useState(false);
  const [showDeclineToStageNotification, setShowDeclineToStageNotification] =
    useState(false);
  const [showRaiseHandNotification, setShowRaiseHandNotification] =
    useState(false);

  const resetAll = useCallback(
    (isShow?: boolean) => {
      setShowRaiseHandNotification(false);
      setMovedToAudienceNotification(
        isShow === undefined ? showMovedToAudienceNotification : isShow,
      );
      setShowHostInviteAsSpeaker(
        isShow === undefined ? showHostInviteAsSpeaker : isShow,
      );
      setShowDeclineToStageNotification(
        isShow === undefined ? showDeclineToStageNotification : isShow,
      );
    },
    [
      showDeclineToStageNotification,
      showHostInviteAsSpeaker,
      showMovedToAudienceNotification,
    ],
  );

  const resetUserJoinLeave = useCallback(
    (isShow?: boolean) => {
      resetMembersNotification();
      setShowUserJoined(isShow === undefined ? showUserJoined : isShow);
      setShowUserLeave(isShow === undefined ? showUserLeave : isShow);
    },
    [
      resetMembersNotification,
      setShowUserJoined,
      setShowUserLeave,
      showUserJoined,
      showUserLeave,
    ],
  );

  const resetRaiseHandNotification = useCallback(() => {
    setShowRaiseHandNotification(!!isShowRaiseHand);
  }, [isShowRaiseHand]);

  const removedBy = useMemo(
    () =>
      stageAttendees?.find(
        (attendee) => attendee._id === speakerSubscription?.inviterId,
      ),
    [stageAttendees, speakerSubscription],
  );

  const onConfirmHandler = useCallback(() => {
    onAcceptSpeakerInvitation();
    // incase user has already raised hand then cancel it.
    if (isShowRaiseHand) {
      toggleRaisedHand(false, user?._id!);
    }
  }, [isShowRaiseHand, onAcceptSpeakerInvitation, toggleRaisedHand, user?._id]);

  const onDeclineHandler = () => {
    onDeclineSpeakerInvitation();
    if (isShowRaiseHand) {
      toggleRaisedHand(!isShowRaiseHand, user?._id!);
    }
  };

  const showSpeakerRequestToJoinStage = useMemo(
    () => !!speakerInvitation && speakerInvitation?.invitee?._id === user?._id,
    [speakerInvitation, user?._id],
  );

  useEffect(() => {
    resetAll();
    resetRaiseHandNotification();
    const timeout = setTimeout(() => {
      resetAll(false);
      resetUserJoinLeave(false);
    }, MainEventSpeakerNotificationTimer);

    return () => {
      clearTimeout(timeout);
    };
  }, [resetAll, resetUserJoinLeave, resetRaiseHandNotification]);

  useEffect(() => {
    if (
      speakerSubscription?.actionType ===
        SpeakerInvitationType.SpeakerRemoved &&
      speakerSubscription?.inviteeId === user?._id
    ) {
      setMovedToAudienceNotification(true);
    }
  }, [speakerSubscription, user?._id]);

  useEffect(() => {
    if (speakerInvitation && speakerInvitation.inviter?._id === user?._id) {
      setShowHostInviteAsSpeaker(true);
    } else {
      setShowHostInviteAsSpeaker(false);
    }
  }, [speakerInvitation, user?._id]);

  useEffect(() => {
    if (isRaiseHandRejected) {
      setShowDeclineToStageNotification(true);
    }
  }, [isRaiseHandRejected]);

  useEffect(() => {
    if (isShowRaiseHand) {
      setShowDeclineToStageNotification(false);
    }
  }, [isShowRaiseHand]);

  return (
    <ControlGroupNotificationWrapper>
      {showRaiseHandNotification && (
        <Wrapper>
          <MainEventNotification
            isOpen={true}
            description={t('noumena.social_hall.main_event_raised_hand')}
            icon={<Icon imageIconName="raise_hand_m" size={22} />}
          />
        </Wrapper>
      )}
      {showSpeakerRequestToJoinStage && (
        <Wrapper>
          <MainEventNotification
            isOpen={true}
            onDecline={onDeclineHandler}
            onConfirm={onConfirmHandler}
            showButtons
            description={t('noumena.social_hall.main_event_speaker_request', {
              firstName: speakerInvitation?.inviter?.firstName,
            })}
            icon={
              <Icon
                name="mic_on_m"
                size={22}
                color="--icon-card-placeholder-neutral-default"
              />
            }
          />
        </Wrapper>
      )}
      {showHostInviteAsSpeaker && (
        <Wrapper>
          <MainEventNotification
            isOpen={true}
            description={t(
              'noumena.social_hall.main_event_speaker_request_host',
              {
                firstName: speakerInvitation?.invitee?.firstName,
              },
            )}
            icon={
              <Avatar
                url={
                  UserUtil.getProfilePicture(speakerInvitation?.invitee) ?? ''
                }
              />
            }
          />
        </Wrapper>
      )}
      {showUserJoined && (
        <Wrapper>
          <MainEventNotification
            isOpen={true}
            description={
              joinedUsers.length > 1
                ? t('noumena.socialhall.message.More_people_left_socialhall', {
                    numberOfUser: joinedUsers.length,
                  })
                : t('noumena.socialhall.message.userJoined_socialhall', {
                    firstName: joinLeaveMember?.firstName,
                    lastName: joinLeaveMember?.lastName,
                  })
            }
            showUserJoined={showUserJoined}
          />
        </Wrapper>
      )}
      {showUserLeave && (
        <Wrapper>
          <MainEventNotification
            isOpen={true}
            description={t('noumena.socialhall.message.userLeft_socialhall', {
              firstName: joinLeaveMember?.firstName,
              lastName: joinLeaveMember?.lastName,
            })}
            showUserLeave={showUserLeave}
          />
        </Wrapper>
      )}
      {showMovedToAudienceNotification ||
        (showDeclineToStageNotification && (
          <Wrapper>
            <MainEventNotification
              isOpen={true}
              description={
                showMovedToAudienceNotification
                  ? t('noumena.social_hall.main_event_speaker_remove', {
                      firstName: removedBy?.firstName,
                    })
                  : t('noumena.social_hall.main_event_speaker_decline', {
                      firstName: eventOwner?.firstName,
                    })
              }
              icon={
                <Icon
                  name="mic_off_m"
                  size={24}
                  color="--icon-card-placeholder-neutral-default"
                />
              }
            />
          </Wrapper>
        ))}
    </ControlGroupNotificationWrapper>
  );
};
