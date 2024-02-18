import styled, { css } from 'styled-components';
import { otpTypography } from '@/components/Typography/index';

import { type SingleOtpProps } from './types';

export const SingleOtpInputBaseCss = css`
  display: 'inline-flex';
  height: 66px;

  border: none;
  outline: none;
  border-radius: 8px;
  background-color: var(--bg-code-form-neutral-default);
  text-align: center;
  vertical-align: middle;
  text-align: center;
  color: var(--text-code-form-neutral-default);
  border: 2px solid var(--border-input-neutral-default);
  padding: 0px;

  :disabled {
    background-color: var(--bg-code-form-neutral-default);
    border: 2px solid var(--border-input-neutral-disabled);
    cursor: not-allowed;
    color: var(--text-code-form-neutral-disabled);
  }
  :focus {
    border: 2px solid var(--border-input-brand-primary-default);
  }

  ${otpTypography.otpXLarge};
`;

export const SinleOtpInputStyled = styled.input<SingleOtpProps>`
  ${SingleOtpInputBaseCss}
  width: ${(props) => (props.width ? props.width : '70px')};
  color: ${(props) =>
    props.color ? props.color : 'var(--text-code-form-neutral-default)'};
  -webkit-text-security: ${(props) =>
    props.launchFrom === 'PaymentModal' ? `disc` : `none`};
`;
