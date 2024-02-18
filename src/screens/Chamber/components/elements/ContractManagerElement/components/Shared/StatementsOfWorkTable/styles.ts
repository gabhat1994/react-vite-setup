import { TSpan } from '@/components';
import { ButtonLink } from '@/components/Link';
import { Stack } from '@/layout';
import styled from 'styled-components';

export const KeyText = styled(TSpan).attrs({
  colorToken: '--text-card-neutral-default',
  font: 'footnote',
})``;

export const ValueText = styled(ButtonLink).attrs({
  colorToken: '--text-card-neutral-highlighted',
  font: 'footnote',
})``;

export const ItemRow = styled(Stack).attrs({
  justify: 'space-between',
  fullWidth: true,
})``;
