import { zIndex } from '@/constants/zIndex';
import { Stack } from '@/layout';
import styled from 'styled-components';
import { footnoteTypography } from '../Typography';
import { type TooltipPosition } from './types';

const Container = styled(Stack)<{
  text: string;
  position: TooltipPosition;
  delay: number;
}>`
  position: relative;

  &[data-tooltip]:after {
    transition: 200ms opacity;
    opacity: 0;
    visibility: hidden;
    content: attr(data-tooltip);
    position: absolute;
    background-color: var(--bg-tooltip-neutral-default);
    color: var(--text-tooltip-neutral-alt-default);
    padding: 6px 8px;
    border-radius: 4px;
    width: max-content;
    bottom: ${(props) =>
      props.position?.startsWith('bottom') ? '-40px' : 'unset'};
    top: ${(props) => (props.position?.startsWith('top') ? '-40px' : 'unset')};
    left: ${(props) =>
      ['bottom-right', 'top-right'].includes(props.position ?? '')
        ? 0
        : ['top-center', 'bottom-center'].includes(props.position ?? '')
        ? '50%'
        : 'unset'};

    right: ${(props) =>
      ['bottom-left', 'top-left'].includes(props.position ?? '') ? 0 : 'unset'};

    transform: ${(props) =>
      ['top-center', 'bottom-center'].includes(props.position ?? '')
        ? 'translateX(-50%)'
        : 'none'};

    ${footnoteTypography.footnote};
    z-index: ${zIndex.tooltip};
  }

  &[data-tooltip]:hover::after {
    opacity: 1;
    transition-delay: ${({ delay }) => delay}ms;
    visibility: visible;
  }
`;

export default {
  Container,
};
