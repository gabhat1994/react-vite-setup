import styled, { css } from 'styled-components';
import { sizes } from '@/constants/devices';

export const noScrollBar = css`
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  scrollbar-width: none;
`;

export const defaultScrollBar = css`
  scrollbar-color: var(--bg-scrollbar-default) transparent;
  scrollbar-width: thin;
  scrollbar-gutter: stable both-edges;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
  }
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 100px;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--bg-scrollbar-default);
    border-radius: 100px;
    border: unset;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--bg-scrollbar-default);
  }
`;

export const flex = css`
  display: flex;
  align-items: center;
`;

export const flexRow = css`
  ${flex};
  flex-direction: row;
`;

export const debuggingBorder = css`
  border: 2px solid orangered;
`;

export const flexColumn = css`
  ${flex};
  flex-direction: column;
`;

export const borderBox = css`
  box-sizing: border-box;
`;
export const fullWidth = css`
  width: 100%;
`;

export const ellipsisText = css`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const singleLineEllipisText = css`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
`;

export const SpinnerContainer = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  justify-self: center;
  align-self: center;
`;

export const HIDE_SIDE_ELEMENTS = sizes.TABLET_L;
export const MAX_SITE_WIDTH = sizes.LAPTOP_L;

export const customScrollBar = css`
  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-scrollbar-custom-track);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--bg-scrollbar-custom-thumb);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--bg-scrollbar-default);
    border-radius: 3px;
  }
`;
