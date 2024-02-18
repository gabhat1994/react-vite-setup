import styled, { css } from 'styled-components';
import { cssVar, rgba } from 'polished';
import { Card } from '@/components/Card';
import { devices } from '@/constants/devices';
import { NoumLayoutViewMode, ViewMode } from '@/features/conversation/types';

const fullScreenStyle = css`
  z-index: 99;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100%;
  background: var(--bg-modal-neutral-alt-default);
`;

const noumLayoutSmallStyle = css`
  width: 100% !important;
`;

const noumLayoutCompactStyle = css`
  width: 56px !important;
`;

const noumLayoutBigStyle = css`
  width: 300px !important;
`;

export const Wrapper = styled(Card)`
  position: relative;
  padding: 0;
  display: flex;
  flex-direction: row;
  border-radius: 0;
  overflow: visible;

  @media ${devices.TABLET} {
    border-radius: 16px;
  }
`;

export const MainWrapper = styled.div<{
  viewMode?: ViewMode;
  noumLayoutViewMode?: NoumLayoutViewMode;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${({ viewMode }) =>
    viewMode === ViewMode.FULLCHAT ? fullScreenStyle : undefined}

  @media ${devices.TABLET} {
    width: 313px;
  }

  ${({ noumLayoutViewMode }) =>
    noumLayoutViewMode === NoumLayoutViewMode.NOUMLAYOUTSMALL
      ? noumLayoutSmallStyle
      : noumLayoutViewMode === NoumLayoutViewMode.NOUMLAYOUTCOMPACT
      ? noumLayoutCompactStyle
      : noumLayoutViewMode === NoumLayoutViewMode.NOUMLAYOUTBIG
      ? noumLayoutBigStyle
      : undefined}
`;

export const ConversationWrapper = styled.div<{
  viewMode?: ViewMode;
  noumLayoutViewMode?: NoumLayoutViewMode;
}>`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-left: 1px solid var(--bg-separator-neutral-default);
  overflow: hidden;

  ${({ viewMode }) =>
    viewMode === ViewMode.FULLCONVERSATION
      ? fullScreenStyle
      : css`
          display: none;
        `}

  @media ${devices.TABLET} {
    display: flex;
    flex-direction: column;
  }

  ${({ noumLayoutViewMode }) =>
    noumLayoutViewMode === NoumLayoutViewMode.NOUMLAYOUTSMALL
      ? `
        padding: 0px !important;
        border: none !important;
        width: 100%;
      `
      : undefined}
`;

export const ConversationLoadingWrapper = styled.div`
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${rgba(cssVar('--bg-overlay-neutral-light'), 0.1)};
  border-radius: 0;

  @media ${devices.TABLET} {
    border-radius: 16px;
  }
`;

export const HeaderWrapper = styled.div<{
  isElement?: boolean;
  noumLayoutViewMode?: NoumLayoutViewMode;
}>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  padding: 16px;

  @media ${devices.TABLET} {
    ${({ isElement }) =>
      isElement
        ? css`
            height: 80px;
            padding: 22px 24px 16px;
          `
        : css`
            min-height: 80px;
            padding-right: 24px;
          `};
  }

  ${({ noumLayoutViewMode }) =>
    noumLayoutViewMode === NoumLayoutViewMode.NOUMLAYOUTCOMPACT
      ? `padding : 0px !important; 
          height : 72px;
          width: 100%;
          justify-content: center;
        `
      : noumLayoutViewMode === NoumLayoutViewMode.NOUMLAYOUTSMALL
      ? `
          border: none;
          min-height: 46px !important;
        `
      : undefined}
`;

export const BodyWrapper = styled.div<{
  headerHeight: number;
  footerHeight?: number;
  noumLayoutViewMode?: NoumLayoutViewMode;
}>`
  height: calc(100% - ${(props) => props.headerHeight || 72}px);
  display: flex;
  flex-direction: column;

  @media ${devices.TABLET} {
    max-height: 340px;

    ${({ noumLayoutViewMode, footerHeight }) =>
      noumLayoutViewMode === NoumLayoutViewMode.NOUMLAYOUTCOMPACT
        ? `
          height: calc(340px + ${footerHeight || 0}px);
          max-height: calc(340px + ${footerHeight || 0}px)
      `
        : noumLayoutViewMode === NoumLayoutViewMode.NOUMLAYOUTSMALL
        ? `
          max-height: none; 
        `
        : ''}
  }

  ${({ noumLayoutViewMode }) =>
    noumLayoutViewMode === NoumLayoutViewMode.NOUMLAYOUTSMALL
      ? `padding : 0px !important; width: 100%; `
      : undefined}
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
`;
