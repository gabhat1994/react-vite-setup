import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import { Avatar } from '@/components/Avatar/Avatar';
import { Button } from '@/components/Button';
import { getFullName } from '@/utils/fullName';
import { Checkbox } from '@/components/Checkbox';
import { Icon } from '@/components/Icon';
import { InvitationStatus } from '@/apollo/generated/types';
import { UserUtil } from '@/utils/user';
import { type UserFragment } from '@/apollo/graphql/fragments';
import * as S from './styles';
import { type InviteAttendeeItemProps } from './types';

export const InviteAttendeeItem: React.FC<InviteAttendeeItemProps> = ({
  user,
  isChecked,
  onCheck,
}) => {
  const { t } = useTranslation();
  const RightButton = useMemo(() => {
    if (
      user.getEventUserRole?.invitation?.status === InvitationStatus.Accepted
    ) {
      return (
        <Button size="small" softDisabled>
          {t('noumena.social_hall.invite_status.attending')}
        </Button>
      );
    }
    if (
      user.getEventUserRole?.invitation?.status === InvitationStatus.Pending
    ) {
      return (
        <Button size="small" softDisabled>
          {t('noumena.social_hall.invite_status.invited')}
        </Button>
      );
    }
    if (
      user.getEventUserRole?.invitation?.status === InvitationStatus.Blocked
    ) {
      return (
        <Button size="small" softDisabled>
          {t('noumena.social_hall.invite_status.blocked')}
        </Button>
      );
    }
    return (
      <Checkbox
        isChecked={isChecked}
        icon={
          <Icon
            name="tick_m"
            size={24}
            color="--icon-checkbox-neutral-alt-default"
          />
        }
        onChange={() => onCheck()}
      />
    );
  }, [user.getEventUserRole?.invitation?.status, isChecked, onCheck, t]);

  return (
    <S.UserWrapper data-testid="invite-attendee-item">
      <Avatar url={UserUtil.getProfilePicture(user as UserFragment) ?? ''} />
      <S.UserBody>
        <S.UserName>
          <TSpan
            colorToken="--text-tablecell-header-neutral-highlighted"
            font="body-l-bold"
          >
            {getFullName(user.firstName, '', user.lastName)}
          </TSpan>
          <S.UserCategory
            font="body-m"
            colorToken="--text-tablecell-body-neutral-default"
            overflow="ellipsis"
          >
            {user.title}
          </S.UserCategory>
        </S.UserName>
        <S.PickedInviteStatus colorToken="--text-button-neutral-disabled">
          {RightButton}
        </S.PickedInviteStatus>
      </S.UserBody>
    </S.UserWrapper>
  );
};
