import styled, { css } from 'styled-components';
import { TSpan } from '@/components/Typography';
import { bodyTypography } from '@/components/Typography/Typography';
import { type LayoutProps } from './types';

export const Layout = styled.div<LayoutProps>`
  background: ${({ isViewed }) =>
    isViewed
      ? 'var(--bg-modal-neutral-alt-default)'
      : 'var(--bg-notification-tile-brand-secondary-default)'};
  border-radius: 8px;
  display: grid;
  grid-template-columns: 40px auto;
  grid-gap: 12px;
  padding: 12px;
`;

export const Content = styled.div`
  display: grid;
  gap: 4px;
`;

export const Body = styled(TSpan)``;

export const BodyHighlighted = styled(Body)`
  /*
    Long words will be broken and rendered in the next line,
    but valid Noum names with spaces will be rendered correctly
  */
  word-break: break-word;
`;

export const Title = BodyHighlighted;

export const TimeAgo = styled.div`
  font-family: var(--font-family);
  font-weight: var(--font-body-small-regular-weight);
  font-size: var(--font-body-small-size);
  color: var(--text-timestamp-neutral-default);
`;

export const Buttons = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  column-gap: 12px;
  margin-top: 8px;
  align-items: center;
`;
const collapedMessage = css`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
`;

export const MessageSpan = styled(TSpan)<{ collaped?: boolean }>`
  ${bodyTypography.bodyMedium}
  color: var(--link-notification-tile-neutral-default);
  ${({ collaped }) => collaped && collapedMessage}
`;

export const Clickable = styled.a.attrs(() => ({
  role: 'button',
}))`
  text-decoration: none;
  cursor: pointer;
`;
