import { css } from 'styled-components';
import { badgeCountTypography, footnoteBold } from '../Typography/Typography';

export const badgeBaseCss = css`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: var(--bg-badge-brand-primary-default);
  border: 2px solid var(--border-badge-neutral-alt-default);
  border-radius: 1000px;
  min-width: 8px;
  height: 8px;
  text-align: center;
  box-sizing: border-box;
`;

export const badgeLargeTextLengthInitial = css`
  padding: 4px;
`;

export const badgeLargeTextLengthMoreThanOne = css`
  padding: 4px 8px;
`;

export const badgeMediumTextLengthInitial = css`
  padding: 2px;
`;

export const badgeMediumTextLengthMoreThanOne = css`
  padding: 2px 4px;
`;

export const badgeLarge = css`
  min-width: 24px;
  height: 24px;
`;

export const badgeMedium = css`
  min-width: 14px;
  height: 14px;
  border: 2px solid var(--border-badge-neutral-alt-default);
`;

export const badgeTextBaseCss = css`
  display: flex;
  width: max-content;
  align-items: center;
  text-align: center;
  color: var(--text-badge-neutral-alt-default);
  flex: none;
  flex-grow: 0;
  order: 0;
`;

export const badgeTextLarge = css`
  ${footnoteBold};
`;

export const badgeTextMedium = css`
  ${badgeCountTypography.badgeCount};
`;
