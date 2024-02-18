import styled from 'styled-components';
import { cssVar, rgba } from 'polished';
import { sizes } from '@/constants/devices';
import { noScrollBar } from '@/common/globalStyles';
import { motion } from 'framer-motion';
import {
  type IModal,
  type IModalBodyProps,
  type IModalCloseButtonStyle,
  type ModalFooterProps,
} from './types';

export const StyledModal = styled.div`
  font-family: var(--font-family);
  display: fixed;
  inset: 0;
  z-index: 50;
  position: absolute;
`;

export const Inner = styled(motion.div)<
  Pick<IModal, 'overlayVariant' | 'isScrollableContent'>
>`
  z-index: -1;
  inset: 0;
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  overflow: ${({ isScrollableContent }) =>
    isScrollableContent ? 'auto' : 'none'};
  background-color: ${({ overlayVariant }) =>
    overlayVariant === 'light'
      ? rgba(cssVar('--bg-overlay-neutral-light'), 0.2)
      : overlayVariant === 'dark'
      ? rgba(cssVar('--bg-overlay-neutral-dark'), 0.9)
      : 'none'};
`;

type ContentProps = Pick<IModal, 'spacingMode'> & {
  style?: IModal['style'];
  noPaddingNoBorder?: boolean;
  width?: number;
  innerHeight: number;
  isFullScreen: boolean;
  translateY: number;
};

export const Content = styled.div<ContentProps>`
  background: ${(props) =>
    props.style?.background || 'var(--bg-modal-neutral-alt-default)'};
  border-radius: ${({ style }) =>
    style?.borderRadius === undefined
      ? '16px'
      : typeof style?.borderRadius === 'string'
      ? style?.borderRadius
      : `${style?.borderRadius}px;`};

  position: relative;
  margin: auto;
  max-height: calc(100vh - 96px);
  display: flex;
  flex-direction: ${(props) => props.style?.flexDirection || 'column'};
  box-sizing: border-box;
  transition: all 0.1s ease-in-out;
  gap: ${({ spacingMode }) => (spacingMode === 'gap-content' ? '24px' : 0)};

  ${({ noPaddingNoBorder }) =>
    noPaddingNoBorder &&
    `
    border-radius: 0;
    padding: 0;
  `}

  ${({ isFullScreen }) =>
    isFullScreen &&
    `
    border-radius: 0;
    max-height: 100vh;
    height: 100vh;
    width: 100vw;
    max-width: 100vw;
    min-width: 100vw;
  `}

  padding: ${({ style }) =>
    typeof style?.padding === 'undefined'
      ? '24px'
      : typeof style?.padding === 'string'
      ? style?.padding
      : `${style?.padding}px`};

  ${({ width }) => width && `width: ${width}px;`};

  @media (max-width: ${sizes.TABLET_L}) {
    ${({ isFullScreen, innerHeight }) =>
      isFullScreen &&
      `
       border-radius: 0;
       max-height: 100vh;
       height: ${innerHeight}px;
       width: 100vw;
       max-width: 100vw;
       min-width: 100vw;
       `}
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    ${({ isFullScreen, innerHeight, translateY }) =>
      isFullScreen &&
      `
        border-radius: 0;
        max-height: 100vh;
        height: ${innerHeight}px;
        transform: translateY(${translateY}px);
        width: 100vw;
        max-width: 100vw;
        min-width: 100vw;
      `}
  }
`;

export const CloseButtonWrapper = styled.div<IModalCloseButtonStyle>`
  position: absolute;
  z-index: 52;
  ${({ top }) => `top: ${top || 24}px;`}

  ${({ horizontal }) => `right: ${horizontal || 24}px;`}
  left: unset;
  ${({ enforceLeft, horizontal }) =>
    enforceLeft && `left: ${horizontal || 24}px; right: unset;`}
  ${({ enforceRight, horizontal }) =>
    enforceRight && `right: ${horizontal || 24}px; left: unset;`}
  
  button {
    ${({ transparentModalCloseButton }) =>
      transparentModalCloseButton && `background-color: transparent;`};

    :hover {
      ${({ transparentModalCloseButton }) =>
        transparentModalCloseButton && `background-color: transparent;`};
    }
    :active {
      ${({ transparentModalCloseButton }) =>
        transparentModalCloseButton && `background-color: transparent;`};
    }

    :disabled {
      ${({ transparentModalCloseButton }) =>
        transparentModalCloseButton && `background-color: transparent;`};

      :hover,
      :active {
        ${({ transparentModalCloseButton }) =>
          transparentModalCloseButton && `background-color: transparent;`};
      }
    }
  }

  svg {
    path {
      ${({ transparentModalCloseButton }) =>
        transparentModalCloseButton && `fill: white;`}
    }
  }

  @media (max-width: ${sizes.TABLET_L}) {
    ${({ isFullScreen, top, horizontal, enforceLeft, enforceRight }) =>
      isFullScreen &&
      `
    top: ${top || 16}px;
    left: ${horizontal || 16}px;
    right: unset;
    ${enforceLeft ? `left: ${horizontal || 16}px; right: unset;` : ''}
    ${enforceRight ? `right: ${horizontal || 16}px; left: unset;` : ''}
  `};
  }
`;

export const ModalBodyStyled = styled.div<IModalBodyProps>`
  display: flex;
  position: relative;
  visibility: ${({ loading }) => (loading ? 'hidden' : 'visible')};
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
  align-items: ${({ align }) => align || 'flex-start'};
  height: 100%;
  overflow-x: hidden;

  ${({ overflowY }) => `overflow-y: ${overflowY || 'auto'}`};

  margin: 0 -16px;
  padding: 0 16px;

  ${({ isFullScreen, noFooter }) =>
    !noFooter
      ? isFullScreen
        ? `max-height: calc(100vh - 200px)`
        : `max-height: calc(100vh - 296px)`
      : undefined};

  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight}`};

  ${({ minHeight }) =>
    minHeight &&
    `min-height: ${
      typeof minHeight === 'string' ? minHeight : `${minHeight}px`
    }`};

  ${({ hideScrollbar }) => hideScrollbar && noScrollBar};
  ${({ gap }) => gap && `gap: ${gap}px;`};

  @media (max-width: ${sizes.LAPTOP}) {
    ${({ tabletFlex }) => tabletFlex && 'flex: 1;'}
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    ${({ mobileFlex }) => mobileFlex && 'flex: 1;'}
  }
  ${({ overflow }) => (overflow ? `overflow: ${overflow}` : '')};
`;

export const ModalLoadingContainer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const SpinnerContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: 26px;
`;

type ModalFooterStyledProps = ModalFooterProps & Pick<IModal, 'spacingMode'>;

export const ModalFooterStyled = styled.div<ModalFooterStyledProps>`
  display: flex;
  visibility: ${({ loading }) => (loading ? 'hidden' : 'visible')};
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  margin-top: ${({ marginTop, spacingMode }) =>
    typeof marginTop === 'number'
      ? marginTop
      : spacingMode === 'padding-elements'
      ? 24
      : 0}px;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-end'};
  gap: ${({ gap }) => gap || 0}px;
  max-height: ${({ flexDirection }) =>
    flexDirection !== 'column' ? '72px' : 'auto'};

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: unset;
  }
`;
