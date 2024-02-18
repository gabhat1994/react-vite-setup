import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { noScrollBar } from '@/common/globalStyles';
import { sizes } from '@/constants/devices';
import { type SideModalOverflow, type SideModalPlacement } from './types';

export const StyledModal = styled.div<{
  nonBlockingModal?: boolean;
  topOffset?: number;
  width?: string;
}>`
  position: fixed;
  inset: 0;
  z-index: 1;
  ${({ nonBlockingModal, width }) =>
    nonBlockingModal &&
    css`
      width: ${width || '400px'};
      left: calc(100vw - ${width || '400px'});
      @media (max-width: ${sizes.LAPTOP}) {
        width: ${width || `375px`};
        left: calc(100vw - ${width || '375px'});
      }
    `}
  ${({ nonBlockingModal, topOffset }) =>
    nonBlockingModal && `top:${topOffset}px`};
`;

export const Inner = styled(motion.div)<{
  topOffset: number;
  isBackgroundOpacity?: boolean;
}>`
  position: absolute;
  inset: 0;
  ${({ isBackgroundOpacity }) =>
    isBackgroundOpacity ? 'background-color: rgba(0, 0, 0, 0.4)' : undefined};

  @media (min-width: ${sizes.TABLET}) {
    top: ${({ topOffset }) => topOffset}px;
  }
`;

export const ContentWrapper = styled(motion.div)<{
  placement: SideModalPlacement;
  topOffset: number;
  width?: string;
  mobileWidth?: string;
}>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${({ placement }) => (placement === 'left' ? `left: 0` : `right: 0`)};

  width: ${({ width }) => width || `400px`};
  @media (max-width: ${sizes.LAPTOP}) {
    width: ${({ width }) => width || `375px`};
  }
  @media (max-width: ${sizes.MOBILE_L}) {
    width: ${({ mobileWidth }) => mobileWidth || '100%'};
  }

  @media (min-width: ${sizes.TABLET}) {
    top: ${({ topOffset }) => topOffset}px;
  }
`;

export const Content = styled.div<{
  placement: SideModalPlacement;
  borderColor?: string;
  overflowY?: SideModalOverflow;
  overflowX?: SideModalOverflow;
  showScroll?: boolean;
  height?: string;
}>`
  position: relative;
  background: var(--bg-modal-neutral-alt-default);
  ${(props) =>
    props.borderColor
      ? `
    border-${props.placement === 'left' ? 'right' : 'left'}: 1px solid var(${
          props.borderColor
        });
  `
      : ''}
  height: ${({ height }) => height || '100%'};
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: stretch;
  ${({ overflowX }) => !!overflowX && `overflow-x: ${overflowX};`}
  ${({ overflowY }) => !!overflowY && `overflow-y: ${overflowY};`}
  ${({ showScroll }) => !showScroll && noScrollBar};
`;

export const ContentTitleWrapper = styled.div<{
  fixed?: boolean;
}>`
  ${({ fixed }) =>
    fixed &&
    `
    position: sticky;
    top: 0;
    z-index: 10;
    background: inherit;
  `}
`;

export const Children = styled.div<{
  padding: number;
  overflowX?: SideModalOverflow;
  overflowY?: SideModalOverflow;
}>`
  padding: ${({ padding }) => `0 ${padding}px ${padding}px`};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  overflow-x: ${({ overflowX }) => overflowX ?? 'initial'};
  overflow-y: ${({ overflowY }) => overflowY ?? 'hidden'};
`;
