import styled from 'styled-components';
import { type Placement } from '@popperjs/core';

export const StyledPopoverWrapper = styled.div`
  width: 100%;
`;

export const ReferenceContainer = styled.div``;

export const Arrow = styled.div`
  &,
  &::before {
    position: absolute;
    width: 32px;
    height: 32px;
    z-index: -1;
  }

  &::before {
    content: '';
    transform: rotate(45deg);
    background: var(--bg-card-neutral-alt-default);
  }
`;

export const PopoverContainer = styled.div<{
  placement: Placement;
  width?: number;
}>`
  position: relative;
  width: ${({ width }) => width && `${width}px`};
  min-height: 231px;
  border-radius: 16px;

  gap: 16px;
  filter: drop-shadow(0px 4px 32px rgba(32, 17, 62, 0.08));
  background: var(--bg-card-neutral-alt-default);
  background-size: cover;
  z-index: 10;

  &[data-popper-placement^='top'] > ${Arrow} {
    bottom: -16px;
  }

  &[data-popper-placement^='bottom'] > ${Arrow} {
    top: -16px;
  }

  &[data-popper-placement^='left'] > ${Arrow} {
    right: -16px;
  }

  &[data-popper-placement^='right'] > ${Arrow} {
    left: -16px;
  }
`;

export const CloseButtonWrapper = styled.div`
  position: absolute;
  right: 16px;
  z-index: 5;
`;
