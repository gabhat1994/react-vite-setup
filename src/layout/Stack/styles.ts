import styled, { css } from 'styled-components';
import { defaultScrollBar } from '@/common/globalStyles';
import {
  wrapToFlexWrap,
  alignToAlignItems,
  alignToJustify,
  growShrinkToVal,
  numToPx,
} from './helper';
import { type StackProps, type ItemProps, type SpacerProps } from './types';

export const StackItemStyled = styled.div<ItemProps>`
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  outline: none;
  list-style: none;

  ${(props) =>
    props.flex &&
    `
    flex: ${props.flex};
  `}

  ${(props) =>
    props.justifySelf &&
    `
    justify-self: ${props.justifySelf};
  `}

  ${(props) =>
    props.alignSelf &&
    `
    align-self: ${props.alignSelf};
  `}

  ${(props) =>
    !!props.grow &&
    `
    flex-grow: ${growShrinkToVal(props.grow)};
  `}
  ${(props) =>
    props.basis &&
    `
    flex-basis: ${props.basis};
  `}
  ${(props) =>
    props.shrink !== undefined &&
    `
    flex-shrink: ${growShrinkToVal(props.shrink)};
  `}
  ${(props) =>
    props.padding &&
    `
    padding: ${numToPx(props.padding)};
  `}
  ${(props) =>
    props.gap &&
    `
     margin: ${numToPx(props.gap)};
  `}
  ${(props) =>
    props.fixedHeight &&
    `
     height: ${numToPx(props.fixedHeight)};
  `}
  ${(props) =>
    props.basis !== undefined &&
    `
    flex-basis: ${props.basis};
  `}
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;

export const StackStyled = styled.div<StackProps>`
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
  }
  ::-webkit-scrollbar {
    width: ${(props) =>
      typeof props.scrollbarWidth !== undefined ? props.scrollbarWidth : 4}px;
    height: ${(props) =>
      typeof props.scrollbarHeight !== undefined ? props.scrollbarHeight : 4}px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 100px;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--bg-scrollbar-default);
    border-radius: 100px;
    border: ${(props) =>
      props.scrollbarWidth
        ? `${(props.scrollbarWidth - 4) / 2}px solid white`
        : 'none'};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--bg-scrollbar-default);
  }
  margin: 0;
  padding: 0;
  border: 0;
  border-bottom: ${(props) =>
    props.borderBottom ? `1px solid var(--bg-separator-neutral-default)` : 0};
  box-sizing: border-box;
  outline: none;
  list-style: none;
  flex-direction: ${(props) =>
    props.vertical
      ? props.reverse
        ? 'column-reverse'
        : 'column'
      : props.reverse
      ? 'row-reverse'
      : 'row'};
  display: ${(props) => (props.inline ? 'inline-flex' : 'flex')};
  flex-wrap: ${(props) => wrapToFlexWrap(props.wrap)};
  justify-content: ${(props) => alignToJustify(props.justify)};
  align-items: ${(props) => alignToAlignItems(props.align)};
  ${(props) =>
    props.maxWidth !== undefined &&
    `
    max-width: ${numToPx(props.maxWidth)};
  `}
  ${(props) =>
    props.maxHeight !== undefined &&
    `
    max-height: ${numToPx(props.maxHeight)};
  `}
  ${(props) =>
    props.padding !== undefined &&
    `
    padding: ${numToPx(props.padding)};
  `}
  ${(props) =>
    props.grow !== undefined &&
    `
    flex-grow: ${growShrinkToVal(props.grow)};
  `}
  ${(props) =>
    props.basis !== undefined &&
    `
    flex-basis: ${props.basis.toString()};
  `}
  ${(props) =>
    props.shrink !== undefined &&
    `
    flex-shrink: ${growShrinkToVal(props.shrink)};
  `}
  ${(props) =>
    props.fixedHeight !== undefined &&
    `
     height: ${numToPx(props.fixedHeight)};
  `}

  ${(props) =>
    props.overflow &&
    `
     overflow: ${props.overflow};
  `}
  ${(props) =>
    props.gap !== undefined &&
    css`
      gap: ${numToPx(props.gap)};
    `}
  ${(props) =>
    !!props.fullWidth &&
    css`
      width: 100%;
    `}

    ${(props) =>
    typeof props.scrollbarWidth !== undefined && props.scrollbarWidth === 0
      ? css``
      : css`
          ${defaultScrollBar}
        `}
`;

export const StyledSpacer = styled.div<SpacerProps>`
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  outline: none;
  ${({ isFlex }) =>
    isFlex
      ? `
        flex: 1;
        flex-grow: 1;
        flex-shrink: 1;
      `
      : ``}
  ${({ height }) =>
    height &&
    css`
      height: ${typeof height === 'string' ? height : `${height}px`};
      min-height: ${typeof height === 'string' ? height : `${height}px`};
    `};
  ${({ width }) =>
    width &&
    css`
      min-width: ${typeof width === 'string' ? width : `${width}px`};
    `};
`;
