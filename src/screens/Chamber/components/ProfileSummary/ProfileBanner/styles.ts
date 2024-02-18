import { Button } from '@/components/Button';
import styled from 'styled-components';

export const StyledAvatarContainer = styled.div<{
  size: number | null;
  radius: number;
  disabled?: boolean;
  opacity?: number;
  isBanner: boolean;
  isCoverUrl?: boolean;
}>`
  width: ${(props) =>
    props.isBanner ? '100%' : props.size ? `${props.size}px` : '100%'};
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.size ? `${props.size}px` : 'fit-content')};
  border-radius: ${(props) => props.radius}px;
  overflow: hidden;
  img {
    object-fit: cover;
    ${(props) =>
      props.disabled &&
      `
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    `}
  }
  position: relative;
  opacity: ${({ opacity }) => opacity ?? 1};
  border: ${(props) =>
    props.isCoverUrl && `2px dashed var(--border-card-neutral-default)`};
`;

export const ProfileBannerImage = styled.img<{
  size?: number;
  isBanner?: boolean;
}>`
  height: ${({ size }) => size && size}px;
  width: inherit;
  object-fit: ${({ isBanner }) => (isBanner ? 'cover' : 'contain')};
`;

export const BannerDescription = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
`;

export const DropDownBannerbutton = styled(Button)<{ isFocused?: boolean }>`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: ${({ isFocused }) =>
    isFocused
      ? 'var(--color-base-gray-transparency-50)'
      : 'var(--color-base-gray-transparency-40)'};
`;
