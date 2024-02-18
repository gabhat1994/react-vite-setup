import { zIndex } from '@/constants/zIndex';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { type PopoverPosition } from './types';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const StyledMotionContainer = styled(motion.div)<{
  $position: PopoverPosition;
  $margin?: string;
}>`
  position: absolute;
  z-index: ${zIndex.popover};
  margin: ${({ $margin }) => $margin || `0px`};
  ${({ $position }) => {
    switch ($position) {
      case 'top':
        return `
          bottom: 100%;
          left: 0;
        `;
      case 'bottom':
        return `
          top: 100%;
          left: 0;
        `;
      case 'left':
        return `
          top: 0;
          right: 100%;
        `;
      case 'right':
        return `
          top: 0;
          left: 100%;
        `;
      default:
        return ``;
    }
  }}
`;

function parseDimension(value: string | number | undefined) {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  if (typeof value === 'string') {
    return `${value}`;
  }

  return `auto`;
}

const BasicPopoverContent = styled.div<{
  $width?: string | number;
  $height?: string | number;
}>`
  box-sizing: border-box;
  padding: 16px;
  background-color: var(--bg-card-neutral-alt-default);
  border-bottom: 1px solid var(--border-card-neutral-default);
  box-shadow: 0px 2px 16px rgba(32, 17, 62, 0.08);
  border-radius: 8px;
  width: ${(props) => parseDimension(props.$width)};
  height: ${(props) => parseDimension(props.$height)};
`;

export default {
  StyledMotionContainer,
  Container,
  BasicPopoverContent,
};
