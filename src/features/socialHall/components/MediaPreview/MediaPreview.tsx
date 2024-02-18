import { t } from 'i18next';
import Lottie from 'lottie-react';
import { forwardRef, memo, useEffect, useMemo } from 'react';

import {
  useSocialHallCallContext,
  useSocialHallContext,
  useSocialHallEventContext,
} from '@/providers';
import {
  useActiveSpeaker,
  useAttendeeManagement,
  useMediaPreviewSettings,
} from '@/features/socialHall/hooks';
import { useToggle } from '@/hooks';
import { TSpan, Icon } from '@/components';
import { getFullName } from '@/utils/fullName';
import { useAuth } from '@/features/auth/contexts';
import { Avatar } from '@/components/Avatar/Avatar';
import { ActionType, UserRole } from '@/apollo/generated/types';
import equalizerAnimation from '@/assets/animations/Equalizer.json';
import { EventCancelAttendeeModal } from '@/features/events/components';
import { Dropdown, type DropdownTargetProps } from '@/components/Dropdown';
import { type ICameraVideoTrack, type IRemoteVideoTrack } from '@/facade/agora';
import { AudioMuteUnmuteBadge } from '@/screens/SocialHall/AudioMuteUnmuteBadge';
import NonNMDefaultImage from '@/assets/images/non_noumena_member_profile_default.svg';

import * as S from './styles';
import { Offline } from './Offline';
import { type IMediaPreview } from './types';
import { Reconnecting } from './Reconnecting';
import { kickUserModalData } from '../EventModals/EventModal/data';

export const MediaPreview = memo(
  forwardRef<HTMLDivElement, IMediaPreview>(
    (
      {
        _id,
        chamber,
        profile,
        lastName,
        firstName,
        middleName,
        userStatus,
        isFullScreen,
        isMinimalView,
        isReconnecting,
        isActiveSpeaker: _isActiveSpeaker,
        speakerCarouselPortal,
      },
      ref,
    ) => {
      const cameraFeedPlayer = `camera-feed_${_id}`;
      const { eventDetails, eventOwner } = useSocialHallEventContext();
      const { onBlockUser } = useAttendeeManagement();
      const { activeSpeaker } = useActiveSpeaker();
      const { user } = useAuth();
      const [showBlockUserPopup, toggleBlockUserPopup] = useToggle();
      const {
        isGridLayout,
        activeSocialHallGroup,
        socialHallAttendee,
        onCloseFullScreen,
      } = useSocialHallContext();

      const {
        mutedUsers,
        isShareScreen,
        raisedHandUsers,
        networkErrorUsers,
        isRemoteScreenSharing,
      } = useSocialHallCallContext();

      const isHostReconnecting =
        _id === eventOwner?._id &&
        networkErrorUsers.includes(eventOwner?._id ?? '');

      const isScreenSharing = isShareScreen || isRemoteScreenSharing;

      const isEventHost =
        socialHallAttendee?.attendeeId?._id === _id &&
        [UserRole.Host, UserRole.Cohost].includes(
          socialHallAttendee?.eventRole?.userRole!,
        );

      const isActiveSpeaker =
        (_isActiveSpeaker !== undefined
          ? _isActiveSpeaker
          : activeSpeaker === _id) && !isReconnecting;

      const isMuted = mutedUsers.includes(_id);

      const { isCameraEnable, localVideoTrack, remoteUserVideoFeeds } =
        useSocialHallCallContext();

      const videoFeed: IRemoteVideoTrack | ICameraVideoTrack | null =
        user?._id === _id
          ? isCameraEnable
            ? localVideoTrack!
            : null
          : remoteUserVideoFeeds?.[_id]!;

      const isInvited = useMemo(
        (): boolean =>
          activeSocialHallGroup?.invitedAsSpeakers?.findIndex(
            (speaker) => speaker?.invitee?._id === _id,
          ) !== -1,
        [activeSocialHallGroup, _id],
      );

      const isNetworkError = networkErrorUsers.includes(_id);

      const isRaiseHand = raisedHandUsers.includes(_id);

      const fullName = useMemo(
        () => getFullName(firstName, middleName, lastName),
        [firstName, middleName, lastName],
      );

      const removeUserFromEvent = () => {
        onBlockUser(_id, eventDetails?._id!, fullName, true);
        toggleBlockUserPopup();
      };

      const onToggleBlockUserPopup = () => {
        if (isFullScreen) {
          onCloseFullScreen();
        }
        toggleBlockUserPopup();
      };

      const { handleSelectOptions, selectableOptions } =
        useMediaPreviewSettings({
          _id,
          firstName,
          chamber,
          isInvited,
          isMuted,
          toggleBlockUserPopup: onToggleBlockUserPopup,
        });

      const avatarImg =
        userStatus === ActionType.Unregistered
          ? NonNMDefaultImage
          : profile?.profilePicture ?? '';

      const dropDownSpeakerCarouselPortal =
        speakerCarouselPortal &&
        (!isGridLayout || (isScreenSharing && isGridLayout));

      useEffect(() => {
        if (videoFeed?.play) {
          videoFeed.play(cameraFeedPlayer);
        }
      }, [videoFeed, cameraFeedPlayer]);

      const showContainerOverlay = !!isReconnecting || !!isNetworkError;

      return (
        <S.Container
          isFullScreen={isFullScreen}
          active={!!isActiveSpeaker && !isMuted}
          isMinimalView={isMinimalView}
          className="speaker-badge"
          data-testid={`speaker-badge-${_id}`}
          ref={ref}
        >
          {videoFeed ? (
            <S.MediaPreviewWrapper id={cameraFeedPlayer} />
          ) : (
            <Avatar url={avatarImg} size="XVL" disabled={isReconnecting} />
          )}

          <S.ContainerOverlay
            handRaised={!!isRaiseHand}
            isNetworkError={showContainerOverlay}
          >
            <Dropdown
              containerWidth="max-content"
              hideIcons={false}
              closeOnSelect
              onSelectOption={handleSelectOptions}
              options={selectableOptions}
              usePortal={dropDownSpeakerCarouselPortal}
              isAnimation={false}
              observerMinHeight="0"
              placement={dropDownSpeakerCarouselPortal ? 'auto' : 'bottom-end'}
            >
              {({
                targetRef,
                targetProps,
                toggle,
              }: DropdownTargetProps<HTMLDivElement>) => (
                <S.ThreeDotsIconWrapper
                  ref={targetRef}
                  onClick={toggle}
                  {...targetProps}
                >
                  <Icon
                    name="more_m"
                    size={16}
                    color="--icon-call-ui-neutral-alt-default"
                  />
                </S.ThreeDotsIconWrapper>
              )}
            </Dropdown>

            {isRaiseHand && !isReconnecting && (
              <S.HandRaisedContainer>
                <Icon imageIconName="raise_hand_m" size={32} />
                {!isGridLayout && (
                  <TSpan
                    font="body-m-bold"
                    colorToken="--text-card-header-neutral-alt-default"
                  >
                    {t('noumena.social_hall.hands_up.hand_raised')}
                  </TSpan>
                )}
              </S.HandRaisedContainer>
            )}
            {(isReconnecting || isHostReconnecting) && <Reconnecting />}
            {isNetworkError && !isHostReconnecting && <Offline />}
            <S.Userbadge>
              <AudioMuteUnmuteBadge isMuted={isMuted ?? false} />
              <S.NameContainer active={!!isActiveSpeaker}>
                {isActiveSpeaker && !isMuted && (
                  <Lottie
                    animationData={equalizerAnimation}
                    loop={true}
                    style={{ height: '16px', width: '16px' }}
                  />
                )}
                {isEventHost && (
                  <Icon
                    name="star_s"
                    color="--icon-call-ui-neutral-alt-default"
                    size={10}
                  />
                )}
                <TSpan
                  singleLine
                  font="body-m-bold"
                  colorToken="--text-card-header-neutral-alt-default"
                  style={{ textTransform: 'capitalize' }}
                >
                  {firstName}
                </TSpan>
              </S.NameContainer>
            </S.Userbadge>
          </S.ContainerOverlay>
          <EventCancelAttendeeModal
            isOpen={showBlockUserPopup}
            onClose={toggleBlockUserPopup}
            onConfirm={removeUserFromEvent}
            {...kickUserModalData(fullName)}
          />
        </S.Container>
      );
    },
  ),
);
