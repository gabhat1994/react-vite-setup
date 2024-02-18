import styled from 'styled-components';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';

const DetailsContainer = styled(Stack).attrs(() => ({
  gap: 8,
  vertical: true,
  fullWidth: true,
  align: 'stretch',
}))``;

const DetailsItem = styled(Stack).attrs(() => ({
  gap: 24,
  justify: 'space-between',
}))``;

const DetailsItemLabel = styled(TSpan).attrs(() => ({
  font: 'footnote',
  colorToken: '--text-card-neutral-default',
}))``;

const DetailsItemValue = styled(TSpan).attrs(() => ({
  font: 'footnote',
  colorToken: '--text-card-neutral-highlighted',
}))``;

export default {
  DetailsContainer,
  DetailsItem,
  DetailsItemLabel,
  DetailsItemValue,
};
