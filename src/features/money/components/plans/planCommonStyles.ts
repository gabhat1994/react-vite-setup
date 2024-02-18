import styled from 'styled-components';
import { Icon, TSpan } from '@/components';
import { Stack } from '@/layout';

export const PlanName = styled(TSpan)``;

export const PlanDescription = styled(TSpan).attrs({
  font: 'body-m',
  colorToken: '--text-card-neutral-highlighted',
})``;

export const PlanDescriptionBold = styled(TSpan).attrs({
  font: 'body-m-bold',
  colorToken: '--text-card-neutral-highlighted',
})``;

export const Price = styled(TSpan).attrs({
  colorToken: '--text-card-neutral-highlighted',
  font: 'heading-l-bold',
})``;

export const Currency = styled(TSpan).attrs({
  colorToken: '--text-card-neutral-highlighted',
})``;

export const BenefitStack = styled(Stack).attrs({
  align: 'center',
  gap: 8,
})`
  height: 16px;
`;

export const ConfirmedIcon = styled(Icon).attrs({
  name: 'confirmed_m',
  size: 16,
})``;

export const CloseIcon = styled(Icon).attrs({
  name: 'close_m',
  size: 16,
  color: '--icon-card-neutral-disabled',
})``;

export const CurrencySymbol = styled(TSpan).attrs({
  font: 'body-l-bold',
  colorToken: '--text-card-neutral-highlighted',
})`
  margin-top: 2.5px;
`;
