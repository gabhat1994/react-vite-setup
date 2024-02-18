import avatar_m from '@/assets/icons/avatar-m.svg';
import {
  INLINE_AVATAR_AREA_1,
  INLINE_AVATAR_AREA_2,
  INLINE_AVATAR_AREA_3,
  INLINE_AVATAR_BORDER,
  INLINE_AVATAR_MARGIN_2,
  INLINE_AVATAR_MARGIN_3,
  INLINE_AVATAR_RADIUS,
  INLINE_AVATAR_SIZE,
  INLINE_AVATAR_SIZE_SPACIAL_CASE,
} from '@/components/Avatar/Inline/consts';
import { cleanList } from '@/utils/list';
import {
  StyledAvatarContainer,
  StyledAvatarImage,
  StyledContentFrame,
  StyledInlineAvatarContainer,
} from './styles';
import { InlineAvatarSize, type InlineAvatarProps } from './types';

export const InlineAvatar = ({
  urls,
  size = InlineAvatarSize.L,
  borderedImage = false,
  onClick,
}: InlineAvatarProps) => {
  const areaWidthObj =
    urls.length === 1
      ? INLINE_AVATAR_AREA_1
      : urls.length === 2
      ? INLINE_AVATAR_AREA_2
      : INLINE_AVATAR_AREA_3;

  const areaWidth = areaWidthObj[size];

  const imageMarginLeft =
    urls.length === 2
      ? INLINE_AVATAR_MARGIN_2[size]
      : INLINE_AVATAR_MARGIN_3[size];
  const border = INLINE_AVATAR_BORDER[size];
  const height = INLINE_AVATAR_SIZE[size];
  const borderRadius = INLINE_AVATAR_RADIUS[size];
  return (
    <StyledInlineAvatarContainer
      height={height}
      width={areaWidth}
      borderRadius={borderRadius}
    >
      {cleanList(urls).map((url, index) => (
        <StyledContentFrame
          key={`${url + index}`}
          size={height}
          border={index !== 0 ? border : 0}
          radius={borderRadius}
          marginLeft={index !== 0 ? imageMarginLeft : 0}
        >
          <StyledAvatarContainer
            height={INLINE_AVATAR_SIZE_SPACIAL_CASE[size] || height}
            width={height}
            radius={borderRadius}
            onClick={onClick}
          >
            <StyledAvatarImage
              src={url || avatar_m}
              size={height}
              radius={borderRadius}
              alt="avatar"
              border={borderedImage}
            />
          </StyledAvatarContainer>
        </StyledContentFrame>
      ))}
    </StyledInlineAvatarContainer>
  );
};
