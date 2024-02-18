import { Icon } from '@/components/Icon';
import {
  type DiagonalAvatar3Props,
  DiagonalAvatar3Size,
  type DiagonalAvatar3SizeType,
} from './types';
import {
  StyledAvatar,
  StyledAvatarBottom,
  StyledAvatarLeftContainer,
  StyledAvatarTopContainer,
  StyledDiagonalAvatar3Container,
} from './styles';

export const DIAGONAL_3_AVATAR_AREA: Record<DiagonalAvatar3SizeType, number> = {
  XL: 56,
  L: 40,
  M: 24,
  S: 16,
};

const DIAGONAL_3_AVATAR_BORDER: Record<DiagonalAvatar3SizeType, number> = {
  XL: 2,
  L: 2,
  M: 1,
  S: 1,
};

const DIAGONAL_3_AVATAR_SIZE: Record<DiagonalAvatar3SizeType, number> = {
  XL: 37.33,
  L: 26.67,
  M: 16,
  S: 12,
};

const DIAGONAL_3_AVATAR_SIZE_SECONDARY: Record<
  DiagonalAvatar3SizeType,
  number
> = {
  XL: 28,
  L: 20,
  M: 12,
  S: 10,
};

const DIAGONAL_3_AVATAR_SPACIAL_CASE_SPACING: Record<
  DiagonalAvatar3SizeType,
  number | undefined
> = {
  XL: undefined,
  L: undefined,
  M: undefined,
  S: 2,
};

const DIAGONAL_3_AVATAR_SPACIAL_CASE_SPACING_SECONDARY: Record<
  DiagonalAvatar3SizeType,
  number | undefined
> = {
  XL: undefined,
  L: undefined,
  M: undefined,
  S: 2,
};

export const DIAGONAL_3_AVATAR_RADIUS: Record<DiagonalAvatar3SizeType, number> =
  {
    XL: 6,
    L: 6,
    M: 4,
    S: 2,
  };

export const DiagonalAvatar3 = ({
  urls = [],
  size = DiagonalAvatar3Size.L,
  onClick,
  isInline = false,
}: DiagonalAvatar3Props) => {
  const area = DIAGONAL_3_AVATAR_AREA[size];
  const height = DIAGONAL_3_AVATAR_SIZE[size];
  const heightSecondary = DIAGONAL_3_AVATAR_SIZE_SECONDARY[size];
  const spacingSpecial = DIAGONAL_3_AVATAR_SPACIAL_CASE_SPACING[size];
  const spacingSpecialSecondary =
    DIAGONAL_3_AVATAR_SPACIAL_CASE_SPACING_SECONDARY[size];
  const borderRadius = DIAGONAL_3_AVATAR_RADIUS[size];
  const border = DIAGONAL_3_AVATAR_BORDER[size];

  const url1 = urls[0];
  const url2 = urls[1];
  const url3 = urls[2];

  return (
    <StyledDiagonalAvatar3Container size={area} borderRadius={borderRadius}>
      <StyledAvatarTopContainer
        data-testid="diagonal-avatar-top"
        size={height}
        borderRadius={borderRadius}
        border={border}
        area={area}
        specialSpacing={spacingSpecial}
        onClick={onClick}
      >
        {url1 ? (
          <StyledAvatar
            src={url1 || ''}
            size={height}
            borderRadius={borderRadius}
          />
        ) : (
          <Icon imageIconName="avatar_m" size={height} />
        )}
      </StyledAvatarTopContainer>
      <StyledAvatarBottom
        data-testid="diagonal-avatar-bottom"
        size={heightSecondary}
        borderRadius={borderRadius}
        border={border}
        isInline={isInline}
        onClick={onClick}
      >
        {url2 ? (
          <StyledAvatar
            src={url2}
            size={heightSecondary}
            borderRadius={borderRadius}
            alt="avatar"
          />
        ) : (
          <Icon imageIconName="avatar_m" size={heightSecondary} />
        )}
      </StyledAvatarBottom>
      <StyledAvatarLeftContainer
        data-testid="diagonal-avatar-left"
        size={size === DiagonalAvatar3Size.S ? heightSecondary : height}
        borderRadius={borderRadius}
        border={border}
        sizeOfSmallest={heightSecondary}
        specialSpacing={spacingSpecialSecondary}
        onClick={onClick}
        isInline={isInline}
      >
        {url3 ? (
          <StyledAvatar
            src={url3}
            size={size === DiagonalAvatar3Size.S ? heightSecondary : height}
            borderRadius={borderRadius}
          />
        ) : (
          <Icon
            imageIconName="avatar_m"
            size={size === DiagonalAvatar3Size.S ? heightSecondary : height}
          />
        )}
      </StyledAvatarLeftContainer>
    </StyledDiagonalAvatar3Container>
  );
};
