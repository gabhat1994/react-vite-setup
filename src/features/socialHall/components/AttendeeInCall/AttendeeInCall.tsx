import { useCallback, useMemo, useEffect, useState } from 'react';
import { t } from 'i18next';
import Lottie from 'lottie-react';
import equalizerAnimation from '@/assets/animations/Equalizer.json';
import { Avatar } from '@/components/Avatar/Avatar';
import { Dropdown, type DropdownTargetProps } from '@/components/Dropdown';
import {
  ActionType,
  MuteSpeakerType,
  type UserOutput,
} from '@/apollo/generated/types';
import { Icon } from '@/components/Icon';
import { type IconProps } from '@/components/Icon/Icon';
import { useAuth } from '@/features/auth/contexts';
import { useToggle } from '@/hooks';
import {
  useSocialHallCallContext,
  useSocialHallContext,
  useSocialHallEventContext,
} from '@/providers';
import { Spinner } from '@/components/Spinner';
import { AGORA_EVENT } from '@/constants/socialHall';
import { type UID } from '@/facade/agora';
import NonNMDefaultImage from '@/assets/images/non_noumena_member_profile_default.svg';
import { getFullName } from '@/utils/fullName';
import { useAttendeeManagement } from '@/features/socialHall/hooks';
import { EventCancelAttendeeModal } from '@/features/events/components';
import { kickUserModalData } from '../EventModals/EventModal';
import { type UserOptionMenuProps } from './types';
import {
  audienceUserMenuOptions,
  stageUserMenuOptions,
  stageEventCoHostMenuOptions,
  stageEventHostMenuOptions,
  invitedUserMenuOptions,
  prepostInstantEventAudience,
} from './data';
import {
  AttendeeWrapper,
  AvatarMask,
  AvatarWrapper,
  BorderContainer,
  EqualizerContainer,
  Microphone,
  NameSpan,
  CenterIconContainer,
  OptionMenuWrapper,
  InvitedContainer,
} from './styles';

type IAttendeeInCall = UserOutput & {
  isMuted?: boolean;
  isInvited?: boolean;
  isAudience?: boolean;
};

export const AttendeeInCall = ({
  _id: attendeeId,
  isMuted,
  isInvited,
  profile,
  chamber,
  firstName,
  middleName,
  lastName,
  isAudience,
  userStatus,
}: IAttendeeInCall) => {
  const { user } = useAuth();
  const [isOpen, toggleIsOpen] = useToggle();
  const {
    onBlockUser,
    onViewAttendeeProfile,
    onInviteAttendeeToStage,
    onCancelInvitationToStage,
    onRemoveSpeakerFromStage,
    onMuteSpeakerOnStage,
  } = useAttendeeManagement();
  const { userActiveGroupData } = useSocialHallContext();
  const { rtcEngine, raisedHandUsers, networkErrorUsers, agoraChannelUsers } =
    useSocialHallCallContext();
  const { eventDetails, eventOwner, isEventHost, isMainEvent } =
    useSocialHallEventContext();

  const [isActiveSpeaker, setIsActiveSpeaker] = useState(false);

  const isNetworkError = useMemo(
    () => networkErrorUsers.includes(attendeeId),
    [networkErrorUsers, attendeeId],
  );

  const avatarImg = useMemo(() => {
    if (userStatus === ActionType.Unregistered) return NonNMDefaultImage;
    return profile?.profilePicture || '';
  }, [userStatus, profile?.profilePicture]);

  const isSpeakerOnline = useMemo(
    () => agoraChannelUsers?.includes(attendeeId) || isAudience,
    [agoraChannelUsers, attendeeId, isAudience],
  );

  const name = useMemo(
    () => getFullName(firstName, middleName, lastName),
    [firstName, lastName, middleName],
  );

  useEffect(() => {
    rtcEngine?.on(
      AGORA_EVENT.VOLUME_INDICATOR,
      (volumes: Array<{ level: number; uid: UID }>) => {
        volumes.forEach((volume) => {
          const isSpeaker = volume.level > 5 && volume.uid === attendeeId;
          setIsActiveSpeaker(isSpeaker);
        });
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rtcEngine]);

  const userActiveSocialHallGroup = useMemo(
    () => userActiveGroupData?.data?.userActiveSocialHallGroup,
    [userActiveGroupData?.data],
  );

  const getMuteOptions = useCallback(
    (options: UserOptionMenuProps[]) => {
      if (isMuted) {
        const opts = options.map((op) => {
          if (op.key === 'mute_user') {
            const newOption: UserOptionMenuProps = {
              key: 'unmute_user',
              label: 'unmute_user',
              value: 'unmute_user',
              iconName: 'mic_on_m',
              labelColor: '--text-tablecell-header-neutral-highlighted',
              type: 'value',
            };
            return newOption;
          }
          return op;
        });
        return opts;
      }
      return options;
    },
    [isMuted],
  );

  const selectableOptions = useMemo(() => {
    let options;

    if (eventDetails?.isInstantEvent) {
      options = getMuteOptions(prepostInstantEventAudience);
    } else if (eventOwner?._id === attendeeId) {
      options = getMuteOptions(stageEventHostMenuOptions);
    } else if (userActiveSocialHallGroup?.hosts?.includes(attendeeId)) {
      options = getMuteOptions(stageEventCoHostMenuOptions);
    } else if (userActiveSocialHallGroup?.speakers?.includes(attendeeId)) {
      options = getMuteOptions(stageUserMenuOptions);
    } else if (isInvited) {
      options = invitedUserMenuOptions;
    } else {
      options = audienceUserMenuOptions;
    }

    const updatedOptions = options.map((option) => ({
      ...option,
      label: t(`noumena.social_hall.${option.label}`, { firstName }),
      description:
        option.label === 'cancel_invite_to_stage'
          ? t('noumena.social_hall.cancel_invite_description', { firstName })
          : '',
      icon: (
        <Icon
          name={option.iconName as IconProps['name']}
          color={option.labelColor}
          size={24}
        />
      ),
    }));
    return updatedOptions;
  }, [
    eventOwner?._id,
    attendeeId,
    eventDetails?.isInstantEvent,
    userActiveSocialHallGroup?.hosts,
    userActiveSocialHallGroup?.speakers,
    isInvited,
    getMuteOptions,
    firstName,
  ]);

  const handleSelectOptions = useCallback(
    (option) => {
      if (option.value === 'remove_from_event') {
        toggleIsOpen();
      }
      if (option.value === 'see_home_noum') {
        onViewAttendeeProfile(chamber?._id ?? '');
      }
      if (option.value === 'invite_to_stage') {
        onInviteAttendeeToStage(attendeeId);
      }
      if (option.value === 'move_to_audience') {
        onRemoveSpeakerFromStage(attendeeId);
      }
      if (option.value === 'cancel_invite_to_stage') {
        onCancelInvitationToStage(attendeeId);
      }
      if (option.value === 'mute_user') {
        onMuteSpeakerOnStage(
          userActiveSocialHallGroup?._id,
          attendeeId,
          MuteSpeakerType.Mute,
        );
      }
      if (option.value === 'unmute_user') {
        onMuteSpeakerOnStage(
          userActiveSocialHallGroup?._id,
          attendeeId,
          MuteSpeakerType.Unmute,
        );
      }
    },
    [
      toggleIsOpen,
      onViewAttendeeProfile,
      chamber?._id,
      onInviteAttendeeToStage,
      attendeeId,
      onRemoveSpeakerFromStage,
      onCancelInvitationToStage,
      onMuteSpeakerOnStage,
      userActiveSocialHallGroup?._id,
    ],
  );

  const handleKickUser = useCallback(() => {
    onBlockUser(attendeeId, eventDetails?._id!, name ?? '', true);
    toggleIsOpen();
  }, [attendeeId, eventDetails?._id, name, onBlockUser, toggleIsOpen]);

  const AttendeeContent = () => (
    <>
      <AvatarWrapper>
        {raisedHandUsers.includes(attendeeId) && (
          <>
            <CenterIconContainer data-testid="raise_hand">
              <Icon imageIconName="raise_hand_m" size={24} />
            </CenterIconContainer>
            <AvatarMask />
          </>
        )}
        <Avatar url={avatarImg} size="XL" disabled={isNetworkError} />
        {isNetworkError && (
          <>
            <CenterIconContainer data-testid="low_connection">
              <Icon
                name="low_connection_xs"
                color="--icon-call-ui-neutral-default"
                size={24}
              />
            </CenterIconContainer>
            <AvatarMask isOffline />
          </>
        )}
        {isInvited && (
          <>
            <InvitedContainer
              font="footnote-bold"
              colorToken="--text-call-ui-brand-primary-default"
              data-testid="invited_user"
            >
              {t('noumena.social_hall.invite_status.invited')}
            </InvitedContainer>
          </>
        )}
        {isMuted && (
          <Microphone data-testid="muted_user">
            <Icon
              name="mic_off_m"
              color="--icon-call-ui-neutral-default"
              size={16}
            />
          </Microphone>
        )}
        {isActiveSpeaker && !isMuted && !isNetworkError && !isAudience && (
          <>
            <EqualizerContainer data-testid="active_speaker">
              <Lottie
                animationData={equalizerAnimation}
                loop={true}
                style={{ height: '16px' }}
              />
            </EqualizerContainer>
            <BorderContainer />
          </>
        )}
        {!isSpeakerOnline && (
          <>
            <CenterIconContainer data-testid="inactive_speaker">
              <Spinner />
            </CenterIconContainer>
            <AvatarMask />
          </>
        )}
      </AvatarWrapper>
      <NameSpan colorToken="--text-call-ui-neutral-default">
        {userActiveSocialHallGroup?.hosts?.includes(attendeeId) && (
          <Icon
            name="star_s"
            color="--icon-call-ui-neutral-default"
            size={12}
          />
        )}
        {firstName}
      </NameSpan>
    </>
  );

  return (
    <>
      <OptionMenuWrapper data-testid="dropdown_wrapper">
        {attendeeId !== user?._id && isEventHost && isMainEvent ? (
          <Dropdown
            hideIcons={false}
            closeOnSelect
            placement="auto"
            onSelectOption={handleSelectOptions}
            options={selectableOptions}
            containerWidth="280px"
            usePortal={false}
            calRefTop={false}
            isAnimation={false}
            usePopStyle={true}
            minHeight={`${50 * selectableOptions.length}px`}
            containerStyle={{
              inset: '-60px auto auto 60px',
              minWidth: 'max-content',
            }}
          >
            {({
              targetRef,
              targetProps,
              toggle,
            }: DropdownTargetProps<HTMLDivElement>) => (
              <AttendeeWrapper
                data-testid="avatar_wrapper"
                ref={targetRef}
                onClick={toggle}
                {...targetProps}
              >
                <AttendeeContent />
              </AttendeeWrapper>
            )}
          </Dropdown>
        ) : (
          <AttendeeWrapper data-testid="avatar_wrapper">
            <AttendeeContent />
          </AttendeeWrapper>
        )}
      </OptionMenuWrapper>
      <EventCancelAttendeeModal
        isOpen={isOpen}
        onClose={toggleIsOpen}
        onConfirm={handleKickUser}
        {...kickUserModalData(name)}
      />
    </>
  );
};

export default { AttendeeInCall };
