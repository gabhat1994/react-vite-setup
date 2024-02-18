import { Button, Icon, TSpan } from '@/components';
import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import styled, { css } from 'styled-components';

export const PasswordHelperWrapper = styled(Stack).attrs({
  vertical: true,
  gap: 8,
})`
  width: 240px;
  background: var(--bg-tooltip-neutral-alt-default);
  @media (max-width: ${sizes.TABLET_L}) {
    width: 100%;
  }
`;

export const PasswordCheck = styled(TSpan).attrs({
  font: 'footnote',
})<{ successful: boolean }>`
  ${({ successful }) =>
    successful &&
    css`
      color: var(--text-button-success-secondary-default);
    `}
  ${({ successful }) =>
    !successful &&
    css`
      color: var(--text-body-neutral-default);
    `};

  display: inline-flex;
  align-items: center;
`;

export const CheckIconStyled = styled(Icon)`
  margin-right: 4px;
`;

export const Label = styled(TSpan).attrs({
  font: 'footnote',
  colorToken: '--text-body-neutral-default',
})`
  padding: 4px 0px;
`;

export const StyledButton = styled(Button)`
  background: var(--bg-button-neutral-default);
`;
