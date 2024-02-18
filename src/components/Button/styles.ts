import styled, { css } from 'styled-components';
import { buttonTypography } from '@/components/Typography';

export const ButtonText = styled.span<{ align?: 'left' | 'center' | 'right' }>`
  user-select: none;
  flex: 0 1 auto;
  color: var(--text-button-neutral-alt-default);
  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `}
  ${buttonTypography.buttonMedium};
`;

export const buttonSoftDisabled = css`
  background: var(--bg-button-neutral-disabled);

  :hover {
    background: var(--bg-button-neutral-hover);
  }
  :active {
    background: var(--bg-button-neutral-default);
  }

  ${ButtonText} {
    color: var(--text-button-neutral-disabled);
  }

  path {
    fill: var(--icon-button-neutral-disabled);
  }
`;

export const buttonDisabled = css`
  :disabled {
    ${buttonSoftDisabled}
  }
`;

export const buttonLarge = css`
  min-height: 56px;
  min-width: 56px;
  padding: 16px;
  ${ButtonText} {
    ${buttonTypography.buttonMedium};
  }
`;

export const buttonSmall = css`
  height: 40px;
  min-height: 40px;
  padding: 8px 12px;
  justify-content: center;
  min-width: unset;
  ${ButtonText} {
    ${buttonTypography.buttonSmall};
  }
`;

export const buttonSmallIcon = css`
  height: 40px;
  width: 40px;
  min-height: 40px;
  padding: 8px 12px;
  justify-content: center;
  min-width: unset;
  background: var(--bg-button-neutral-disabled);
  ${ButtonText} {
    ${buttonTypography.buttonSmall};
  }
`;

export const buttonFull = css`
  justify-content: center;
  width: 100%;
  ${ButtonText} {
    ${buttonTypography.buttonMedium};
  }
`;

export const buttonFullSmall = css`
  height: 40px;
  min-height: 40px;
  padding: 8px 12px;
  justify-content: center;
  width: 100%;
  ${ButtonText} {
    ${buttonTypography.buttonSmall};
  }
`;

export const buttonPrimary = css`
  background: var(--bg-button-brand-primary-default);

  :hover {
    background: var(--bg-button-brand-primary-hover);
  }

  :active {
    background: var(--bg-button-brand-primary-default);
  }

  ${ButtonText} {
    color: var(--text-button-neutral-alt-default);
  }

  :disabled {
    background: var(--bg-button-neutral-disabled);

    :hover {
      background: var(--bg-button-neutral-disabled);
    }

    :active {
      background: var(--bg-button-neutral-disabled);
    }

    ${ButtonText} {
      color: var(--text-button-neutral-disabled);
    }

    path {
      fill: var(--icon-button-neutral-disabled);
    }
  }

  path {
    fill: var(--icon-button-neutral-alt-default);
  }
`;

export const buttonSecondary = css`
  background: var(--bg-button-brand-secondary-default);

  :hover {
    background: var(--bg-button-brand-secondary-hover);
  }

  :active {
    background: var(--bg-button-brand-secondary-default);
  }

  ${ButtonText} {
    color: var(--text-button-brand-secondary-default);
  }

  path {
    fill: var(--icon-button-brand-secondary-default);
  }
`;

export const buttonTertiary = css`
  background: var(--bg-button-neutral-default);

  :hover {
    background: var(--bg-button-neutral-hover);
  }

  :active {
    background: var(--bg-button-neutral-default);
  }
  :disabled {
    background: var(--bg-button-neutral-disabled);
    color: var(--text-button-neutral-default);
  }

  ${ButtonText} {
    color: var(--text-button-neutral-default);
  }

  path {
    fill: var(--icon-button-neutral-default);
  }
`;

export const buttonPositive = css`
  background: var(--bg-button-success-primary-default);

  :hover {
    background: var(--bg-button-success-primary-hover);
  }

  :active {
    background: var(--bg-button-success-primary-default);
  }

  ${ButtonText} {
    color: var(--bg-button-neutral-alt-default);
  }

  path {
    fill: var(--icon-button-neutral-alt-default);
  }
`;

export const buttonPositiveSecondary = css`
  background: var(--bg-button-success-secondary-default);

  :hover {
    background: var(--bg-button-success-secondary-hover);
  }

  :active {
    background: var(--bg-button-success-secondary-default);
  }

  ${ButtonText} {
    color: var(--text-button-success-secondary-default);
  }

  path {
    fill: var(--icon-button-success-secondary-default);
  }
`;

export const buttonNegative = css`
  background: var(--bg-button-danger-primary-default);

  :hover {
    background: var(--bg-button-danger-primary-hover);
  }

  :active {
    background: var(--bg-button-danger-primary-default);
  }

  ${ButtonText} {
    color: var(--text-button-neutral-alt-default);
  }

  path {
    fill: var(--icon-button-neutral-alt-default);
  }
`;

export const buttonNegativeSecondary = css`
  background: var(--bg-button-danger-secondary-default);

  :hover {
    background: var(--bg-button-danger-secondary-hover);
  }

  :active {
    background: var(--bg-button-danger-secondary-default);
  }

  ${ButtonText} {
    color: var(--text-button-danger-secondary-default);
  }

  path {
    fill: var(--icon-button-danger-secondary-default);
  }
`;

export const buttonTextOnly = css`
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  height: 16px;
  max-height: 16px;
  min-height: 16px;

  path {
    fill: var(--text-button-brand-primary-default);
  }

  :hover {
    background: transparent;

    path {
      fill: var(--text-button-brand-primary-hover);
    }
  }

  :active {
    background: transparent;
  }

  :disabled {
    background: transparent;

    :hover {
      background: transparent;
    }
  }

  ${ButtonText} {
    color: var(--text-button-brand-primary-default);

    :hover {
      color: var(--text-button-brand-primary-hover);
    }
  }
`;

export const buttonLoading = css`
  justify-content: center;
  cursor: not-allowed !important;
`;

export const buttonLoadingSmall = css`
  justify-content: center;
  cursor: not-allowed !important;
  min-width: 40px;
`;

export const buttonBaseCss = css`
  position: relative;
  transition: all 0.1s ease-in-out;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 20px 16px;
  vertical-align: middle;
  height: 56px;
  max-height: 56px;
  min-height: 56px;
  min-width: 24px;
  align-items: center;
  justify-content: center;
  font-family: var(--font-button-medium-font);
  ${buttonLarge}

  & > :not(:last-child) {
    margin-right: 8px;
  }

  :disabled {
    cursor: not-allowed;
  }

  ${ButtonText} {
    flex: 0 1 auto;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text-button-neutral-default);
  }
`;

export const buttonNeutral = css`
  background: var(--bg-button-neutral-alt-default);

  :hover {
    background: var(--bg-button-neutral-alt-hover);
  }

  :active {
    background: var(--bg-button-neutral-alt-default);
  }

  ${ButtonText} {
    color: var(--text-button-neutral-default);
  }

  path {
    fill: var(--icon-button-neutral-default);
  }
`;

export const inlineBtn = css`
  display: inline-flex;
`;
