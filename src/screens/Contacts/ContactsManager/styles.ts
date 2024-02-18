import styled from 'styled-components';
import { Card } from '@/components/Card';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';

const PageCard = styled(Card)`
  width: 100%;
  padding: 24px;
  overflow: visible;
`;

const KeyText = styled(TSpan).attrs({
  colorToken: '--text-card-neutral-default',
  font: 'footnote',
})``;

const ValueText = styled(TSpan).attrs({
  colorToken: '--text-card-neutral-highlighted',
  font: 'footnote',
})``;

const ItemRow = styled(Stack).attrs({
  justify: 'space-between',
  fullWidth: true,
})``;

export default {
  PageCard,
  KeyText,
  ValueText,
  ItemRow,
};
