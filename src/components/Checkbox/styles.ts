import styled from 'styled-components';

export const CheckboxInner = styled.span<{
  active: boolean;
  disabled?: boolean;
  size: number;
  hasError?: boolean;
}>`
  cursor: ${({ disabled }) =>
    disabled ? 'not-allowed !important' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ size }) => `
    height: ${size}px;
    width: ${size}px;
  `}
  border-radius: 4px;
  background: ${({ active, disabled }) =>
    disabled
      ? 'var(--bg-checkbox-neutral-disabled)'
      : active
      ? 'var(--bg-checkbox-brand-primary-default)'
      : 'transparent'};
  border: ${({ active, disabled, hasError }) =>
    disabled
      ? 'var(--border-checkbox-neutral-disabled)'
      : active
      ? '1px solid var(--border-checkbox-brand-primary-pressed)'
      : hasError
      ? '1px solid var(--border-checkbox-danger-primary-default)'
      : '1px solid var(--border-checkbox-neutral-default)'};
  box-sizing: border-box;
`;
