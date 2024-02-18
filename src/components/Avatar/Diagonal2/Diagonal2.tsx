import { Icon } from '@/components/Icon';
import {
  type DiagonalAvatar2Props,
  DiagonalAvatar2Size,
  type DiagonalAvatar2SizeType,
} from './types';
import {
  StyledAvatar,
  StyledAvatarBottomRight,
  StyledAvatarTopLeftContainer,
  StyledDiagonalAvatar2Container,
} from './styles';

export const DIAGONAL_2_AVATAR_AREA: Record<DiagonalAvatar2SizeType, number> = {
  XL: 56,
  L: 40,
  M: 24,
  S: 16,
};

const DIAGONAL_2_AVATAR_BORDER: Record<DiagonalAvatar2SizeType, number> = {
  XL: 2,
  L: 2,
  M: 1,
  S: 1,
};

const DIAGONAL_2_AVATAR_SIZE: Record<DiagonalAvatar2SizeType, number> = {
  XL: 33.6,
  L: 24,
  M: 16,
  S: 10,
};

export const DIAGONAL_2_AVATAR_RADIUS: Record<DiagonalAvatar2SizeType, number> =
  {
    XL: 6,
    L: 6,
    M: 4,
    S: 2,
  };

export const DiagonalAvatar2 = ({
  urls,
  size = DiagonalAvatar2Size.L,
  onClick,
  isInline = false,
}: DiagonalAvatar2Props) => {
  const area = DIAGONAL_2_AVATAR_AREA[size];
  const height = DIAGONAL_2_AVATAR_SIZE[size];
  const borderRadius = DIAGONAL_2_AVATAR_RADIUS[size];
  const border = DIAGONAL_2_AVATAR_BORDER[size];

  const url1 = urls[0];
  const url2 = urls[1];

  return (
    <StyledDiagonalAvatar2Container size={area} borderRadius={borderRadius}>
      <StyledAvatarTopLeftContainer
        data-testid="diagonal-avatar-left"
        size={height}
        borderRadius={borderRadius}
        border={border}
        onClick={onClick}
        isInline={isInline}
      >
        {url1 ? (
          <StyledAvatar
            src={url1}
            size={height}
            borderRadius={borderRadius}
            alt="avatar"
          />
        ) : (
          <Icon imageIconName="avatar_m" size={height} />
        )}
      </StyledAvatarTopLeftContainer>
      <StyledAvatarBottomRight
        data-testid="diagonal-avatar-right"
        size={height}
        borderRadius={borderRadius}
        border={border}
        onClick={onClick}
        isInline={isInline}
      >
        {url2 ? (
          <StyledAvatar src={url2} size={height} borderRadius={borderRadius} />
        ) : (
          <Icon imageIconName="avatar_m" size={height} />
        )}
      </StyledAvatarBottomRight>
    </StyledDiagonalAvatar2Container>
  );
};
