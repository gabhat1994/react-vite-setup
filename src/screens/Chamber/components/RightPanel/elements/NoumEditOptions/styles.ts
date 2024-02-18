import styled, { css } from 'styled-components';

const disabledOptionWrapper = css`
  cursor: not-allowed;
  color: var(--text-button-neutral-disabled);
  &:hover {
    cursor: not-allowed;
    color: var(--text-button-neutral-disabled);
  }
`;

export const EditOptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 32px;
`;

export const EditOptions = styled.div<{ disabled: boolean }>`
  &:hover {
    cursor: pointer;
  }
  ${({ disabled }) => disabled && disabledOptionWrapper}
`;

export const ThreeDotsIconWrapper = styled.div`
  cursor: pointer;
`;
