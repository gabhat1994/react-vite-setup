import styled from 'styled-components';
import { Card } from '@/components/Card';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { breakpoints, mediaSizes } from '@/constants/devices';

const PageCard = styled(Card)`
  width: 100%;
  padding: 24px;
  overflow: visible;
`;

const InvoiceNumberLabel = styled(TSpan)`
  min-width: 110px;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--bg-separator-neutral-default);
`;

const DetailsRow = styled.div`
  display: grid;
  grid-template-columns: 160px auto;
  align-items: flex-start;

  @media (max-width: ${breakpoints.MOBILE_MAX}px) {
    grid-template-columns: auto;
    gap: 8px;
    padding-bottom: 12px;
    width: 100%;
    border-bottom: 1px solid var(--bg-separator-neutral-default);
  }
`;

const AccountDetailsColumn = styled(Stack)`
  display: grid;
  grid-template-columns: 160px auto;
  gap: 24px;

  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    grid-template-columns: auto;
    gap: 8px;
  }
`;

const AccountDetailsValueText = styled(TSpan).attrs({
  colorToken: '--text-card-neutral-highlighted',
  font: 'body-m',
})``;

export default {
  PageCard,
  InvoiceNumberLabel,
  Separator,
  DetailsRow,
  AccountDetailsColumn,
  AccountDetailsValueText,
};
