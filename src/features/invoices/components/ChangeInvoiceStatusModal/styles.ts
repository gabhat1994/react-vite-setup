import styled from 'styled-components';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';

const StatusItem = styled(Stack).attrs({
  justify: 'space-between',
  align: 'center',
  fullWidth: true,
  padding: '20px',
})``;

const StatusTitle = styled(TSpan).attrs({
  colorToken: '--text-tablecell-header-neutral-highlighted',
  font: 'body-l-bold',
})``;

const StatusDescription = styled(TSpan).attrs({
  colorToken: '--text-tablecell-body-neutral-default',
  font: 'body-m',
})``;

const TextInputWrapper = styled(Stack)`
  width: 100%;
`;

const PartialAmountWrapper = styled(Stack).attrs({
  fullWidth: true,
  vertical: true,
})`
  width: 100%;
  padding: 0px 16px 16px 16px;
`;

const OutstandingAmount = styled(TSpan).attrs({
  colorToken: '--text-modal-neutral-highlighted',
  font: 'body-m',
})`
  padding: 0px 0 16px;
`;

const OutstandingAmountBolded = styled(TSpan).attrs({
  colorToken: '--text-modal-neutral-highlighted',
  font: 'body-m-bold',
})``;

const InfoboxWrapper = styled(Stack)`
  padding-top: 16px;
`;

export default {
  StatusItem,
  StatusTitle,
  StatusDescription,
  TextInputWrapper,
  PartialAmountWrapper,
  OutstandingAmount,
  OutstandingAmountBolded,
  InfoboxWrapper,
};
