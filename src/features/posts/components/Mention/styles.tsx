import styled, { css } from 'styled-components';
import { defaultScrollBar } from '@/common/globalStyles';
import { bodyTypography } from '@/components/Typography';
import { MentionsInput } from 'react-mentions';

export const StyledList = styled.div`
  background-color: var(--bg-card-neutral-alt-default);
  max-height: 200px;
  width: max-content;
  border-radius: 8px !important;
  border: 1px solid var(--bg-comment-neutral-default);
  overflow-y: auto;
  ${defaultScrollBar}
`;

export const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 24px auto;
  grid-gap: 16px;
  padding: 8px 12px;
  max-width: 200px;
  align-items: center;
`;

export const StyledAvatar = styled.img`
  min-width: 24px;
  width: 24px;
  height: 24px;
  border-radius: 6px;
`;

export const StyledText = styled.div`
  ${bodyTypography.bodyMediumBold}
  font-weight: 600;
  font-size: 14px;
  color: var(--text-input-neutral-filled);
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const Wrapper = styled.div<{
  maxHeight?: number;
  textAreaHeight?: number;
  isFullHeight?: boolean;
}>`
  z-index: 2;
  ${({ isFullHeight }) =>
    isFullHeight &&
    css`
      height: 100%;
      & div:first-child {
        height: 90%;
      }
    `}
  --vertical-offset: 1em;

  @media (max-height: 775px) {
    --vertical-offset: 0em;
  }

  @media (max-height: 740px) {
    --vertical-offset: -1em;
  }

  @media (max-height: 700px) {
    --vertical-offset: -2em;
  }

  & > div > div:nth-of-type(2) {
    transform: translate3D(0, var(--vertical-offset), 0);
    z-index: 2;
  }

  & .Select-menu-outer {
    top: auto;
    bottom: 100%;
  }

  ${({ maxHeight }) =>
    maxHeight &&
    css`
      & > div > div > div {
        max-height: ${maxHeight}px;
      }
    `}
  & textarea:focus,textarea:focus-visible {
    outline: 2px solid var(--border-input-brand-primary-default) !important;
    outline: none;
  }

  & div > div:not([class]):first-child {
    min-height: ${({ textAreaHeight }) => textAreaHeight}px;
    max-height: ${({ maxHeight }) => maxHeight}px;
  }

  & div > div:not([class]):first-child > span {
    max-height: ${({ maxHeight }) => maxHeight}px;
  }
`;

export const MentionsInputStyled = styled(MentionsInput)<{
  disabled?: boolean;
}>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
