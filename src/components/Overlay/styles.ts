import styled, { css } from 'styled-components';
import { zIndex } from '@/constants/zIndex';
import { type OverlayType } from './types';

const NonInteractiveCSS = css`
  background: transparent;
`;

export const Overlay = styled.div<{ $type: OverlayType; $zIndex?: number }>`
  position: absolute;
  inset: 0;
  ${({ $type }) => {
    switch ($type) {
      case 'non-interactive':
        return NonInteractiveCSS;
      default:
        return ``;
    }
  }}
  z-index: ${(props) => props.$zIndex || zIndex.overlay};
`;
