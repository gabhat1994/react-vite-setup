import styled from 'styled-components';
import { systemInfoSmallTypography } from '@/components/Typography';
import type { TooltipPosition } from '../EventItem/types';

export const ImageWrapper = styled.div<{ position?: TooltipPosition }>`
  cursor: pointer;
  &[data-title]:hover::after {
    content: attr(data-title);
    position: absolute;
    background-color: var(--bg-tooltip-neutral-default);
    color: var(--text-tooltip-neutral-alt-default);
    padding: 6px 8px;
    border-radius: 4px;
    white-space: nowrap;
    text-transform: capitalize;
    z-index: 1000;
    ${systemInfoSmallTypography.systemInfoSmall}
    ${({ position }) => (position === 'bottom' ? 'top: 25px' : 'top: -25px')};
  }
`;
