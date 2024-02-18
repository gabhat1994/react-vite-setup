import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { TextField } from '@/components/TextField';

const InvoiceNumberLabel = styled(TSpan)`
  white-space: nowrap;
`;

const TextFieldInput = styled(TextField).attrs({
  style: {
    backgroundColor: 'var(--bg-card-neutral-alt-default)',
    border: '1px solid var(--border-card-neutral-highlighted)',
  },
})``;

const SpinnerContainer = styled.div`
  padding-right: 8px;
`;

export default {
  InvoiceNumberLabel,
  TextFieldInput,
  SpinnerContainer,
};
