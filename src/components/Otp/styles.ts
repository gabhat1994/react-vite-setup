import styled, { css } from 'styled-components';

const OtpBaseCss = css`
  border: none;
  display: inline-flex;
  justify-content: space-between;
  width: 100%;

  :hover > input:not(:disabled):not(:focus) {
    background-color: var(--bg-input-brand-primary-hover);
    border: 2px solid var(--border-input-neutral-default);
  }

  :focus-within > input {
    transition: color 0.2s ease-in-out;
    background-color: var(--bg-input-brand-primary-hover);
  }

  :focus-within > input:not(:focus) {
    transition: color 0.2s ease-in-out;
    border: 2px solid var(--border-input-neutral-default);
  }
`;

export const OtpStyled = styled.div`
  ${OtpBaseCss}
`;
