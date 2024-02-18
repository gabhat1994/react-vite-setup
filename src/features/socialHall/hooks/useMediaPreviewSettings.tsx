import { t } from 'i18next';
import { useCallback, useMemo } from 'react';
import { MuteSpeakerType, type UserOutput } from '@/apollo/generated/types';
import {
  audienceUserMenuOptions,
  invitedUserMenuOptions,
  prepostEventAudience,
  stageEventCoHostMenuOptions,
  stageEventHostMenuOptions,
  stageUserMenuOptions,
  prepostInstantEventAudience,
  type UserOptionMenuProps,
} from '@/features/socialHall/components/AttendeeInCall';
import Icon, { type IconProps } from '@/components/Icon/Icon';
import { MediaPreviewDropdownOption } from '@/features/socialHall/components/MediaPreview';
import { useAuth } from '@/features/auth/contexts';
import { useSocialHallContext } from '@/providers/SocialHallProvider';
import { useSocialHallEventContext } from '@/providers/SocialHallEventProvider';
import { useAttendeeManagement } from './useAttendeeManagement';

type MediaPreviewSettingsProps = UserOutput & {
  isInvited: boolean | undefined;
  isMuted: boolean | undefined;
  invitationStatus?: string | undefined;
  toggleBlockUserPopup: () => void;
  refetchAudience?: () => void;
};

export const useMediaPreviewSettings = ({
  _id,
  firstName,
  chamber,
  isInvited,
  isMuted,
  invitationStatus,
  toggleBlockUserPopup,
}: MediaPreviewSettingsProps) => {
  const {
    onViewAttendeeProfile,
    onInviteAttendeeToStage,
    onRemoveSpeakerFromStage,
    onMuteSpeakerOnStage,
    onCancelInvitationToStage,
  } = useAttendeeManagement();
  const { user } = useAuth();
  const { activeSocialHallGroup } = useSocialHallContext();
  const { eventOwner, eventDetails, isPreEvent, isPostEvent, isEventHost } =
    useSocialHallEventContext();

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

    // If user is not a event owner
    if (!isEventHost || (isEventHost && eventOwner?._id === _id)) {
      options = stageEventHostMenuOptions;
    } else if (isPreEvent || isPostEvent) {
      // User checking owners profile
      if (_id === eventOwner?._id) {
        options = stageEventHostMenuOptions;
      } else if (eventDetails?.isInstantEvent) {
        options = getMuteOptions(prepostInstantEventAudience);
      } else {
        options = prepostEventAudience;
      }
    } else if (activeSocialHallGroup?.hosts?.includes(_id!)) {
      options = getMuteOptions(stageEventCoHostMenuOptions);
    } else if (activeSocialHallGroup?.speakers?.includes(_id!)) {
      options = getMuteOptions(stageUserMenuOptions);
    } else if (isInvited) {
      options = invitedUserMenuOptions;
    } else if (invitationStatus) {
      options = prepostEventAudience;
    } else {
      options = audienceUserMenuOptions;
    }

    const fName = user?._id === _id ? 'My' : `${firstName}'s`;

    const updatedOptions = options.map((option) => ({
      ...option,
      label: t(`noumena.social_hall.${option.label}`, { firstName: fName }),
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
    _id,
    eventDetails?.isInstantEvent,
    activeSocialHallGroup?.hosts,
    activeSocialHallGroup?.speakers,
    eventOwner?._id,
    firstName,
    getMuteOptions,
    invitationStatus,
    isEventHost,
    isInvited,
    isPostEvent,
    isPreEvent,
    user?._id,
  ]);

  const handleSelectOptions = useCallback(
    ({ value }) => {
      switch (value) {
        case MediaPreviewDropdownOption.SeeHomeNoum: {
          onViewAttendeeProfile(chamber?._id ?? '');
          break;
        }
        case MediaPreviewDropdownOption.InviteToStage: {
          onInviteAttendeeToStage(_id!);
          break;
        }
        case MediaPreviewDropdownOption.cancelInviteToStage: {
          onCancelInvitationToStage(_id!);
          break;
        }
        case MediaPreviewDropdownOption.MoveToAudience: {
          onRemoveSpeakerFromStage(_id!);
          break;
        }
        case MediaPreviewDropdownOption.RemoveFromEvent: {
          toggleBlockUserPopup();
          break;
        }
        case MediaPreviewDropdownOption.MuteUser: {
          onMuteSpeakerOnStage(
            activeSocialHallGroup?._id,
            _id!,
            MuteSpeakerType.Mute,
          );
          break;
        }
        case MediaPreviewDropdownOption.UnmuteUser: {
          onMuteSpeakerOnStage(
            activeSocialHallGroup?._id,
            _id!,
            MuteSpeakerType.Unmute,
          );
          break;
        }
      }
    },
    [
      _id,
      activeSocialHallGroup?._id,
      chamber?._id,
      onCancelInvitationToStage,
      onInviteAttendeeToStage,
      onMuteSpeakerOnStage,
      onRemoveSpeakerFromStage,
      onViewAttendeeProfile,
      toggleBlockUserPopup,
    ],
  );

  return {
    handleSelectOptions,
    selectableOptions,
  };
};

export default useMediaPreviewSettings;
