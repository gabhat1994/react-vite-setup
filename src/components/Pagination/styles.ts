import styled from 'styled-components';

import { Button } from '@/components/Button';

export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const PaginationButton = styled(Button)<{
  active?: boolean;
  disabled?: boolean;
}>`
  width: 32px;
  height: 32px;
  max-width: 32px;
  min-width: 32px;
  min-height: 32px;
  max-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ active }) =>
      active
        ? `var(--bg-pagination-brand-secondary-default)`
        : `var(--bg-pagination-neutral-hover)`};
  }

  span {
    color: ${({ disabled }) =>
      disabled
        ? `var(--icon-button-neutral-disabled) !important`
        : `var(--text-pagination-brand-primary-default) !important`};
    font-size: var(--font-footnote-regular-size) !important;
    line-height: var(--font-footnote-regular-lineheight) !important;
    font-family: var(--font-footnote-bold-font) !important;
    font-weight: var(--font-footnote-bold-weight) !important;
  }
`;

export const PageButton = styled(PaginationButton)<{
  active?: boolean;
  disabled?: boolean;
}>`
  border-width: 1px;
  border-style: solid;
  border-color: ${({ active }) =>
    active ? 'transparent' : 'var(--border-pagination-neutral-default)'};
  background-color: ${({ active }) =>
    active
      ? 'var(--bg-pagination-brand-secondary-default)'
      : 'var(--bg-pagination-neutral-alt-default)'};
`;

export const JumpButton = styled(PaginationButton)<{ disabled?: boolean }>`
  &:active {
    background-color: transparent !important;
  }
  &:disabled {
    background-color: transparent !important;
  }
  &:hover {
    background-color: transparent !important;
  }

  svg path {
    fill: ${({ disabled }) =>
      disabled
        ? `var(--icon-pagination-neutral-disabled) !important`
        : `var(--icon-pagination-brand-primary-default) !important`};
  }
`;
