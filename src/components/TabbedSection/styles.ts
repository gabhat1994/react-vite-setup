import styled, { css } from 'styled-components';
import { Stack } from '../../layout/Stack';
import { bodyTypography, headingTypography } from '../Typography';
import { type TabbedSectionFont } from './types';

export const TabbedSectionContainer = styled(Stack)`
  flex-direction: column;
  padding: 6px 8px;
`;

export const TabWrapper = styled(Stack)<{
  active: boolean;
  disabled?: boolean;
  isTicketHistory?: boolean;
  tabStyle: 'button' | 'tab';
  font: TabbedSectionFont;
}>`
  font-family: var(--font-family);
  font-style: normal;
  font-weight: ${({ active: actived }) => (actived ? `500` : `400`)};
  font-size: 11px;
  line-height: 110%;
  cursor: default;
  align-items: center;
  justify-content: center;
  pointer-events: ${({ disabled }) => (disabled ? `none` : `initial`)};
  color: ${(props) =>
    props.active
      ? `var(--text-tab-basic-brand-primary-selected)`
      : props.disabled
      ? `var(--text-tab-basic-neutral-disabled)`
      : `var(--text-tab-basic-neutral-default)`};
  border-bottom: ${(props) =>
    props.active
      ? `solid 2px var(--bg-tab-basic-brand-primary-selected)`
      : 'none'};
  padding: 0 3px 6px 3px;

  :hover {
    cursor: pointer;
  }

  ${({ active, tabStyle }) =>
    tabStyle === 'button' &&
    css`
      flex-grow: 1;
      border-bottom: solid 2px
        ${active
          ? `var(--text-tab-basic-brand-primary-selected)`
          : `transparent`};
      border-right-width: 0;

      :first-of-type {
        border-left-width: 0;
      }

      padding: 7px;

      ${active &&
      css`
        background-color: var(--bg-tablecell-neutral-alt-default);
      `};
    `};

  ${({ font }) => font === 'heading-m' && headingTypography.headingMedium}
  ${({ font }) => font === 'body-xl' && bodyTypography.bodyXLarge}
`;

export const StyledTabBar = styled(Stack)<{ tabStyle: 'button' | 'tab' }>`
  width: 100%;
  padding: ${({ tabStyle }) => (tabStyle === 'button' ? 0 : `6px 12px 0 12px`)};
`;
