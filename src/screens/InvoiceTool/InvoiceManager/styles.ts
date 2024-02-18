import styled from 'styled-components';
import { Card } from '@/components/Card';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { InvoiceStatusEnum } from '@/apollo/generated/types';

const PageCard = styled(Card)`
  width: 100%;
  padding: 24px;
  overflow: visible;
  min-height: 200px;
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

const CellText = styled(TSpan).attrs<{ status?: InvoiceStatusEnum | null }>(
  ({ status }) => ({
    colorToken:
      status === InvoiceStatusEnum.Draft
        ? '--text-card-neutral-default'
        : '--text-card-neutral-highlighted',
  }),
)<{ status?: InvoiceStatusEnum | null }>``;

const InvoiceManagerContainer = styled(Stack).attrs({ gap: 24 })`
  padding: 0 0 32px 0;
`;

export default {
  PageCard,
  KeyText,
  ItemRow,
  ValueText,
  CellText,
  InvoiceManagerContainer,
};
