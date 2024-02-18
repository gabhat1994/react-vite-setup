import styled, { css } from 'styled-components';
import { mediaSizes } from '@/constants/devices';
import { Card } from '@/components/Card';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';

export const ChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SettingsCard = styled(Card)`
  width: 100%;
  border: 1px solid var(--border-card-neutral-highlighted);
  padding: 16px;
  overflow: visible;
  @media (max-width: ${mediaSizes.MOBILE_XL_MAX}) {
    border-radius: 0px;
  }
`;

export const URLWrapper = styled.div<{ color: string }>`
  width: 565px;
  height: 56px;
  border-radius: 8px;
  background-color: var(--bg-input-neutral-default);
  padding-left: 12px;
  display: flex;
  align-items: center;
  input {
    width: 60%;
    outline: none;
    font-family: var(--font-input-medium-regular-font);
    border: 0;
    background-color: transparent;
    ${({ color }) => css`
      color: var(${color});
    `}
    font-size: 16px;
  }
  @media (max-width: ${mediaSizes.MOBILE_XL_MAX}) {
    width: 100%;
    flex-direction: column;
    align-items: start;
    input {
      width: 90%;
    }
  }
`;

export const URLValidator = styled(Stack).attrs({
  align: 'center',
  gap: '8px',
})``;

export const Indicator = styled.span<{
  intent: 'success' | 'disabled' | 'danger';
}>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  ${({ intent }) =>
    intent === 'danger' &&
    css`
      background-color: var(--bg-button-danger-primary-default);
    `}

  ${({ intent }) =>
    intent === 'success' &&
    css`
      background-color: var(--color-base-success-30);
    `}
  ${({ intent }) =>
    intent === 'disabled' &&
    css`
      background-color: var(--icon-tablecell-neutral-disabled);
    `}
`;

export const Label = styled(TSpan).attrs({
  font: 'footnote',
})``;

export const NoumSeoToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
  gap: 12px;
  background: var(--bg-card-neutral-alt-default);
  border: 1px solid var(--border-card-neutral-highlighted);
  border-radius: 12px;
  width: 100%;
  box-sizing: border-box;
  @media (max-width: ${mediaSizes.MOBILE_XL_MAX}) {
    border-radius: 0px;
  }
`;

export const AlisWrapper = styled(Stack).attrs({
  fullWidth: true,
  align: 'center',
  justify: 'center',
})`
  min-height: 46px;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid var(--border-card-neutral-highlighted);
  background-color: var(--bg-card-neutral-alt-default);
  border-radius: 12px;
`;
