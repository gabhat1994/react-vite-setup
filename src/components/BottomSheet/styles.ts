import { cssVar, rgba } from 'polished';
import styled, { type CSSProperties } from 'styled-components';
import { motion } from 'framer-motion';
import { defaultScrollBar, noScrollBar } from '@/common/globalStyles';
import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import { Button } from '../Button';
import { Separator } from '../Separator/Separator';
import { type IBottomSheet, type IBottomSheetBodyProps } from './types';

const StyledBottomSheet = styled.div<{
  zIndex?: string | number;
}>`
  display: fixed;
  z-index: ${({ zIndex }) => zIndex || 50};
  position: absolute;
  height: 100vh;
  width: 100vw;
  bottom: 0;
`;

const Inner = styled(motion.div)`
  z-index: -1;
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  align-items: flex-end;
  width: 100vw;
  background-color: ${rgba(cssVar('--bg-overlay-neutral-light'), 0.2)};
`;

const Sheet = styled(motion.div)<{ $fullHeight?: boolean }>`
  position: absolute;
  bottom: 0;
  width: 100%;
  zindex: 10;
  height: ${(props) => (props.$fullHeight ? '100%' : 'unset')};
`;

const Content = styled.div<{
  style?: IBottomSheet['style'];
  fullHeight?: boolean;
}>`
  width: 100%;
  background: ${(props) =>
    props.style?.background || 'var(--bg-sheet-neutral-default)'};
  border-radius: ${({ style }) =>
    style?.borderRadius === undefined
      ? '16px 16px 0'
      : typeof style?.borderRadius === 'string'
      ? style?.borderRadius
      : `${style?.borderRadius}px ${style?.borderRadius}px 0;`};

  position: relative;
  display: flex;
  flex-direction: ${(props) => props.style?.flexDirection || 'column'};
  box-sizing: border-box;

  @media (max-width: ${sizes.TABLET}) {
    max-height: calc(100vh - 96px);
    ${({ fullHeight }) => fullHeight && 'max-height: 100vh;'}
  }

  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;

  padding: ${({ style }) =>
    typeof style?.padding === 'undefined'
      ? '16px'
      : typeof style?.padding === 'string'
      ? style?.padding
      : `${style?.padding}px`};

  ${({ fullHeight }) =>
    fullHeight &&
    `
    border-radius: 0;
    width: 100vw;
    height: 100%;
    max-height: 50vh;
  `}
`;

const CloseButtonWrapper = styled.div<{
  padding?: CSSProperties['padding'];
}>`
  margin-bottom: ${({ padding }) =>
    typeof padding === 'string' ? padding : `${padding}px`};
  z-index: 52;
  display: flex;
  min-height: 40px;
  justify-content: flex-start;
  align-items: center;
`;

const BottomSheetBody = styled.div<IBottomSheetBodyProps>`
  display: flex;
  position: relative;
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
  align-items: ${({ align }) => align || 'flex-start'};
  width: 100%;
  height: 100%;

  ${({ overflowY }) => `overflow-y: ${overflowY || 'auto'}`};

  ${({ minHeight }) =>
    minHeight &&
    `min-height: ${
      typeof minHeight === 'string' ? minHeight : `${minHeight}px`
    }`};

  ${defaultScrollBar}
  ${({ hideScrollbar }) => hideScrollbar && noScrollBar};
`;

const BottomSheetListButton = styled(Button).attrs(() => ({
  size: 'full',
  neutral: true,
}))`
  &:hover {
    background-color: var(--bg-tablecell-neutral-pressed);
  }
`;

const BottomSheetList = styled(Stack).attrs(() => ({
  gap: 8,
  vertical: true,
  align: 'stretch',
  justify: 'flex-start',
}))``;

const BottomSheetListSeparator = styled(Separator).attrs(() => ({
  noMargin: true,
  fullWidth: true,
}))``;

export default {
  Wrapper: StyledBottomSheet,
  Inner,
  Sheet,
  Content,
  CloseButtonWrapper,
  BottomSheetBody,
  BottomSheetListButton,
  BottomSheetList,
  BottomSheetListSeparator,
};
