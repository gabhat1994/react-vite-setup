import styled, { css } from 'styled-components';

export const SwitchLabel = styled.label<{ disabled?: boolean }>`
  position: absolute;
  top: 2.5px;
  left: 0;
  width: 30px;
  height: 16px;
  border-radius: 15px;
  ${({ disabled }) =>
    disabled
      ? 'background: var(--bg-toggle-neutral-disabled)'
      : css`
          background: var(--bg-toggle-neutral-default);
          cursor: pointer;
          &:hover {
            background: var(--bg-toggle-neutral-hover);
          }
        `};

  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 13.33px;
    height: 13.33px;
    margin: 1px;
    background: var(--bg-toggle-neutral-alt-default);
    /* box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2); */
    transition: 0.2s;
  }
`;

export const SwitchWrapper = styled.div`
  position: relative;
`;

export const SwitchButton = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 30px;
  height: 16px;
  &:checked + ${SwitchLabel} {
    background: var(--bg-toggle-brand-primary-selected);
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 13.33px;
      height: 13.33px;
      margin-left: 15px;
      transition: 0.2s;
    }
    &:hover {
      background: var(--bg-toggle-brand-primary-hover);
    }
  }
`;
