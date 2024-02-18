import { type Maybe } from '@/common/types';
import { Avatar } from '@/components/Avatar/Avatar';
import { Icon } from '@/components/Icon';
import * as S from './styles';

type IAttendeeInCall = {
  profilePicture: Maybe<string>;
  onClickCancel: () => void;
};

export const SelectedAvatar = ({
  onClickCancel,
  profilePicture,
}: IAttendeeInCall) => (
  <S.AvatarWrapper>
    <Avatar url={profilePicture || ''} size="XL" />
    <S.CancelIconWrapper data-testid="muted_user" onClick={onClickCancel}>
      <Icon
        name="close_s"
        size={16}
        color="--icon-button-neutral-alt-default"
      />
    </S.CancelIconWrapper>
  </S.AvatarWrapper>
);
