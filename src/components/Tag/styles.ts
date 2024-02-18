import styled, { css } from 'styled-components';
import {
  bodyTypography,
  footnoteBold,
  TSpan,
} from '@/components/Typography/Typography';
import { ellipsisText } from '@/common/globalStyles';
import { sizes } from '@/constants/devices';
import { type TagProps } from './types';

const tagText = css`
  user-select: none;
  flex: 0 1 auto;
  color: var(--text-tag-neutral-alt-default);
`;

const tagMedium = css`
  user-select: none;
  color: var(--text-tag-neutral-alt-default);
  ${bodyTypography.bodyMediumBold};
`;

const tagSmall = css`
  user-select: none;
  color: var(--text-tag-neutral-alt-default);
  ${footnoteBold};
  padding: 1px 6px 2px;
`;

const tagPrimary = css`
  background-color: var(--bg-tag-brand-primary-default);

  ${tagText} {
    color: var(--text-tag-neutral-alt-default);
  }

  path {
    fill: var(--text-tag-neutral-alt-default);
  }
`;

const tagSecondary = css`
  background-color: var(--bg-tag-brand-secondary-default);

  ${tagText} {
    color: var(--text-tag-brand-primary-default);
  }

  path {
    fill: var(--text-tag-brand-primary-default);
  }
`;

const tagSuccess = css`
  background-color: var(--bg-tag-success-secondary-default);

  ${tagText} {
    color: var(--text-tag-success-primary-default);
  }

  path {
    fill: var(--text-tag-success-primary-default);
  }
`;

const tagWarning = css`
  background-color: var(--bg-tag-warning-secondary-default);

  ${tagText} {
    color: var(--text-tag-warning-primary-default);
  }

  path {
    fill: var(--text-tag-warning-primary-default);
  }
`;

const tagTertiary = css`
  background-color: var(--bg-tag-neutral-default);

  ${tagText} {
    color: var(--text-tag-neutral-default);
  }

  path {
    fill: var(--text-tag-neutral-default);
  }
`;

const tagDanger = css`
  background-color: var(--bg-tag-danger-secondary-default);

  ${tagText} {
    color: var(--text-tag-danger-secondary-default);
  }

  path {
    fill: var(--text-tag-danger-secondary-default);
  }
`;

const tagBaseCss = css`
  position: relative;
  transition: all 0.1s ease-in-out;
  display: inline-flex;
  border: none;
  border-radius: 8px;
  padding: 4px 8px;
  vertical-align: middle;
  height: 30px;
  box-sizing: border-box;
  max-height: 30px;
  min-height: 30px;
  align-items: center;
  width: max-content;
  ${tagMedium}
  ${tagPrimary}
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  & > :not(:last-child) {
    margin-right: 4px;
  }
  &.firefox {
    font-weight: var(--font-body-medium-regular-weight);
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    max-width: 100%;
  }
`;

export const TagContent = styled(TSpan)<{ $maxWidth: string }>`
  cursor: inherit;
  display: inline-block;
  align-items: center;
  user-select: none;
  max-width: ${(props) => props.$maxWidth};
  color: inherit;

  ${ellipsisText}
`;

export const TagStyled = styled.span<TagProps>`
  ${tagBaseCss}
  cursor: ${(props) => (props.isCursorPointer ? 'pointer;' : 'auto;')}
  ${(props) => props.size === 'small' && tagSmall}
  ${(props) => props.size === 'medium' && tagMedium}
  ${(props) => props.primary && tagPrimary}
  ${(props) => props.secondary && tagSecondary}
  ${(props) => props.tertiary && tagTertiary}
  ${(props) => props.danger && tagDanger}
  ${(props) => props.success && tagSuccess}
  ${(props) => props.warning && tagWarning}
  ${(props) => props.bgColor && `background-color: ${props.bgColor};`}
  ${(props) => props.color && `color: ${props.color} !important;`}
  ${(props) =>
    props.border && `border: 2px solid var(--border-badge-neutral-alt-default)`}
`;
