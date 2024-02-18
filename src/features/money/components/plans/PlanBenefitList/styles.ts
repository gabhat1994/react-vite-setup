import styled from 'styled-components';
import { TSpan } from '@/components';
import { Stack } from '@/layout';

export const AvailableBenefit = styled(TSpan).attrs({
  colorToken: '--text-card-neutral-highlighted',
  font: 'body-m',
})`
  display: contents;
`;

export const UnAvailableBenefit = styled(TSpan).attrs({
  colorToken: '--text-card-neutral-disabled',
  font: 'body-m',
})`
  display: contents;
`;

export const BenefitsWrapperStack = styled(Stack).attrs({
  vertical: true,
  align: 'start',
  gap: 12,
})``;
