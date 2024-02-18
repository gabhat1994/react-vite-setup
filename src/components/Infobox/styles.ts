import styled from 'styled-components';
import { bodyTypography, footnoteTypography } from '../Typography';
import { type InfoboxSize, type InfoboxType } from './types';

const Container = styled.div<{ $type: InfoboxType; $size: InfoboxSize }>`
  padding: 12px 12px 12px 16px;
  border-left: 4px solid transparent;
  border-radius: 4px;
  background: transparent;
  color: var(--text-infobox-neutral-default);

  ${({ $size }) =>
    $size === 'default'
      ? `
    padding: 12px 12px 12px 16px;
    ${bodyTypography.bodyMedium}
    `
      : `
    padding: 8px 8px 8px 12px;
    ${footnoteTypography.footnote};
  `}
  ${({ $type }) =>
    $type === 'secondary'
      ? `
        border-color: var(--border-infobox-brand-primary-default);
        background-color: var(--bg-infobox-brand-primary-default);
        `
      : ''}
    ${({ $type }) =>
    $type === 'tertiary'
      ? `
        border-color: var(--border-infobox-neutral-default);
        background-color: var(--bg-infobox-neutral-default);
        `
      : ''}
    ${({ $type }) =>
    $type === 'negative'
      ? `
        border-color: var(--border-infobox-danger-primary-default);
        background-color: var(--bg-infobox-danger-primary-default);
        `
      : ''};
  ${({ $type }) =>
    $type === 'warning'
      ? `
          border-color: var(--border-infobox-warning-primary-default);
          background-color: var(--bg-infobox-warning-primary-default);
          `
      : ''};
`;

const RightIcon = styled.div``;

export default {
  Container,
  RightIcon,
};
