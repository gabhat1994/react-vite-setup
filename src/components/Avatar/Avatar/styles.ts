import styled from 'styled-components';
import { Icon } from '@/components/Icon';
import { type CommonAvatarProps } from './types';

export const StyledAvatarContainer = styled.div<{
  size: number | null;
  radius: number;
  disabled?: boolean;
  opacity?: number;
}>`
  width: ${(props) => (props.size ? `${props.size}px` : '100%')};
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
`;

export const StyledButton = styled.div<{
  size: number;
  radius: number;
  position: number;
  edit?: boolean;
}>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ radius }) => radius}px;
  position: absolute;
  bottom: ${({ position }) => position}px;
  right: ${({ position }) => position}px;
  cursor: pointer;
  vertical-align: middle;
  display: inline-flex;

  align-items: center;
  justify-content: center;
  background-color: var(
    ${({ edit }) =>
      edit
        ? '--bg-button-danger-secondary-default'
        : '--bg-button-neutral-alt-default'}
  );
`;

export const StyledIcon = styled(Icon)<{
  overridedIcon: CommonAvatarProps['overridedIcon'];
  borderRadius: number;
}>`
  position: absolute;
  bottom: 0;
  right: 0;
  background: ${({ overridedIcon }) =>
    overridedIcon === 'arrow_down_m'
      ? 'var(--bg-button-success-secondary-default)'
      : 'var(--bg-button-neutral-default)'};
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
  border: ${({ overridedIcon }) =>
    overridedIcon === 'arrow_down_m'
      ? '2px solid var(--border-avatar-neutral-alt-default)'
      : '2px solid var(--border-avatar-neutral-alt-default)'};
  box-shadow: 0px 4px 32px rgba(32, 17, 62, 0.08);
`;

export const StyledOverlay = styled.div<{ overlayColor: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  left: 0;
  top: 0;
  opacity: 0.5;
  ${({ overlayColor }) => overlayColor && `background-color: ${overlayColor};`}
`;
