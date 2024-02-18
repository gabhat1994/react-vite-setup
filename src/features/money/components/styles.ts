import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import styled, { css } from 'styled-components';

import { Icon, TSpan } from '@/components';
import { type TransactionContext } from './TransactionCard/type';

export const WrapperStack = styled(Stack).attrs({
  align: 'center',
  justify: 'space-between',
})`
  padding: 20px 16px;
  background: var(--bg-tablecell-neutral-alt-default);
  border-radius: 8px;
  width: 100%;
  @media (max-width: ${sizes.MOBILE_L}) {
    border-radius: 0px;
  }
`;

export const AvatarStack = styled(Stack).attrs({
  align: 'center',
  justify: 'center',
})`
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  border-radius: 12px;
  position: relative;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

export const ArrowStack = styled(Stack).attrs({
  align: 'center',
  justify: 'center',
})<{ context: TransactionContext }>`
  position: absolute;
  border: 2px solid var(--border-avatar-neutral-alt-default);
  border-radius: 4px;
  padding: 2px;
  width: 16px;
  height: 16px;
  bottom: 0;
  right: 0;
  ${({ context }) =>
    context === 'internal-transfer' &&
    css`
      background: var(--bg-button-brand-secondary-default);
    `}
  ${({ context }) =>
    context === 'sender' &&
    css`
      background: var(--bg-button-neutral-default);
    `}
  ${({ context }) =>
    context === 'receiver' &&
    css`
      background: var(--bg-button-success-secondary-default);
    `}
`;

export const BasicDetailsStack = styled(Stack).attrs({
  align: 'center',
  gap: 16,
})`
  width: 70%;
  @media (max-width: ${sizes.MOBILE_L}) {
    width: 60%;
  }
`;

export const TSpanBold = styled(TSpan).attrs({ font: 'body-m-bold' })`
  display: contents;
`;

export const TSpanFootnote = styled(TSpan).attrs({ font: 'footnote' })``;

export const BulletWrapper = styled(TSpan).attrs({
  colorToken: '--text-tablecell-body-neutral-default',
})`
  font-size: 6px;
  margin: 0 2.5px;
  vertical-align: middle;
`;

export const TransactionInformation = styled(TSpan)`
  display: inline-block;
`;

export const AmountAndIconStack = styled(Stack).attrs({
  align: 'center',
  gap: 4,
})``;

export const InfoIcon = styled(Icon).attrs({
  name: 'info_xs',
  size: 16,
})``;

export const CopyTextTSpan = styled(TSpan).attrs({
  font: 'link-s',
  colorToken: '--link-card-brand-primary-default',
})`
  cursor: pointer;
  text-underline-offset: 2px;
`;
