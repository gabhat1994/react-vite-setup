import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  grid-template-rows: auto;
  grid-template-areas:
    'contact contact'
    'account-label account-value'
    'billing-label billing-value';
  gap: 8px 32px;
`;

const Label = styled(TSpan).attrs(() => ({
  font: 'body-m',
  colorToken: '--text-card-neutral-default',
}))``;
const Value = styled(TSpan).attrs(() => ({
  font: 'body-m',
  colorToken: '--text-card-neutral-highlighted',
}))``;

const Contact = styled.div`
  grid-area: contact;
`;

const AccountLabel = styled(Label)`
  grid-area: account-label;
`;
const AccountValue = styled(Value)`
  grid-area: account-value;
`;
const BillingLabel = styled(Label)`
  grid-area: billing-label;
`;
const BillingValue = styled(Value)`
  grid-area: billing-value;
`;

export default {
  Wrapper,
  Contact,
  AccountLabel,
  AccountValue,
  BillingLabel,
  BillingValue,
};
