import { Icon } from '@/components/Icon';
import { type Ref, forwardRef } from 'react';
import {
  AVATAR_EDIT_BUTTON,
  AVATAR_EDIT_ICON_POSITION,
  AVATAR_EDIT_ICON_RADIUS,
  AVATAR_EDIT_ICON,
} from './constants';
import { StyledButton } from './styles';
import { type AvatarEditIconProps, AvatarSize } from './types';

export const AvatarEditButton = forwardRef(
  (
    { name, size, color, edit, onClick }: AvatarEditIconProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const buttonSize = AVATAR_EDIT_BUTTON[size || AvatarSize.L];
    const position = AVATAR_EDIT_ICON_POSITION[size || AvatarSize.L];
    const radius = AVATAR_EDIT_ICON_RADIUS[size || AvatarSize.L];
    const iconSize = AVATAR_EDIT_ICON[size || AvatarSize.L];

    return (
      <StyledButton
        ref={ref}
        data-testid="avatarEditButton"
        size={buttonSize}
        position={position}
        radius={radius}
        edit={edit}
        onClick={onClick}
      >
        <Icon
          name={name}
          size={iconSize}
          color={color}
          data-testid="avatarEditButtonIcon"
        />
      </StyledButton>
    );
  },
);
