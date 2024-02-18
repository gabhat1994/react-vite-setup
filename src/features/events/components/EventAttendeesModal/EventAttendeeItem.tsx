import { useCallback, useMemo } from 'react';
import { t } from 'i18next';

import { type DropdownValueType } from '@/components/Dropdown';
import { InvitationStatus, UserRole } from '@/apollo/generated/types';
import { Avatar } from '@/components/Avatar/Avatar';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { Chips } from '@/components/Chips/Chips';
import { getFullName } from '@/utils/fullName';
import { UserUtil } from '@/utils/user';
import { useAuth } from '@/features/auth/contexts';
import { useMultipleInvitation } from '@/features/socialHall/hooks';
import { useSocialHallEventContext } from '@/providers/SocialHallEventProvider';

import * as S from './styles';
import { ActionBtnContainer } from './styles';
import { type AttendeeItemProps } from './types';
import { UnregisteredUserDropDown } from './UnregisteredUserDropDown';

const options: DropdownValueType<string>[] = [
  {
    key: 'resent_invite',
    value: t('noumena.event.event_attendee_resend_invite'),
    type: 'value',
    label: t('noumena.event.event_attendee_resend_invite'),
  },
];

export const EventAttendeeItem: React.FC<AttendeeItemProps> = ({
  isHost,
  attendee,
  onCancel,
  isBlocked,
}) => {
  const { eventDetails } = useSocialHallEventContext();
  const { createMultipleInvitation } = useMultipleInvitation();
  const { isUnregistered } = useAuth();
  const isUnregisteredAttendee = useMemo(
    () => UserUtil.isUnregistered(attendee.userId),
    [attendee.userId],
  );

  const onResendInvite = useCallback(async () => {
    await createMultipleInvitation(
      eventDetails?._id!,
      [attendee.userId?._id!],
      '',
    );
  }, [createMultipleInvitation, eventDetails?._id, attendee.userId]);

  const goToUserProfile = useCallback(() => {
    if (!isUnregistered) {
      UserUtil.goToUserProfile(attendee.userId);
    }
  }, [isUnregistered, attendee.userId]);

  const handleCancel = useCallback(() => {
    onCancel(attendee);
  }, [attendee, onCancel]);

  const RightButton = useMemo(() => {
    if (
      attendee.invitationStatus === InvitationStatus.Accepted &&
      attendee.userRole &&
      [UserRole.Cohost, UserRole.Host].includes(attendee.userRole)
    ) {
      return (
        <Chips secondary size="large">
          {attendee.userRole === UserRole.Host
            ? t('noumena.social_hall.host')
            : t('noumena.social_hall.co_host')}
        </Chips>
      );
    }
    if (isHost) {
      if (isBlocked) {
        return (
          <Button
            testId="invite-cancel-button"
            tertiary
            size="small"
            title=""
            onClick={handleCancel}
          >
            {t('noumena.event.attendees.unblock')}
          </Button>
        );
      }
      return (
        <Button
          testId="invite-cancel-button"
          tertiary
          size="small"
          icon={
            <Icon
              name="close_m"
              size={16}
              color="--icon-button-neutral-default"
            />
          }
          onClick={handleCancel}
        />
      );
    }

    return null;
  }, [
    attendee.invitationStatus,
    attendee.userRole,
    handleCancel,
    isHost,
    isBlocked,
  ]);

  const fullName = useMemo(
    () =>
      getFullName(attendee.userId?.firstName, '', attendee.userId?.lastName),
    [attendee.userId?.firstName, attendee.userId?.lastName],
  );

  return (
    <S.UserWrapper data-testid="event-attendee-item">
      <S.UserBody>
        <S.UserDetails>
          <Avatar
            url={UserUtil.getProfilePicture(attendee.userId) ?? ''}
            onClick={goToUserProfile}
          />
          <S.UserName onClick={goToUserProfile}>
            <S.NameSpan
              font="body-l-bold"
              colorToken="--text-tablecell-header-neutral-highlighted"
            >
              {attendee.invitationStatus === InvitationStatus.Accepted &&
                attendee.userRole &&
                [UserRole.Cohost, UserRole.Host].includes(
                  attendee.userRole,
                ) && (
                  <Icon
                    name="star_s"
                    size={12}
                    color="--icon-call-ui-neutral-default"
                  />
                )}
              {fullName}
            </S.NameSpan>
            <S.UserCategory
              font="body-m"
              colorToken="--text-tablecell-body-neutral-default"
            >
              {isUnregisteredAttendee
                ? attendee.userId?.email
                : attendee.userId?.title}
            </S.UserCategory>
          </S.UserName>
        </S.UserDetails>
        <ActionBtnContainer onClick={(e) => e.stopPropagation()}>
          {isUnregisteredAttendee && (
            <UnregisteredUserDropDown
              options={options}
              onSelectOption={onResendInvite}
            />
          )}
          <S.PickedInviteStatus colorToken="--bg-skillbadge-neutral-default">
            {RightButton}
          </S.PickedInviteStatus>
        </ActionBtnContainer>
      </S.UserBody>
    </S.UserWrapper>
  );
};
