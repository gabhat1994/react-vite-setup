import styled from 'styled-components';
import { ellipsisText } from '@/common/globalStyles';
import { Stack, StackItem } from '@/layout';
import { footnoteTypography, TSpan } from '@/components/Typography';

const StatementOfWorkItemTitleContainer = styled(Stack).attrs(() => ({
  vertical: true,
  align: 'stretch',
}))`
  ${ellipsisText}
`;

const StatementOfWorkItemTitle = styled(TSpan).attrs(() => ({
  font: 'body-m-bold',
  color: '--text-card-neutral-highlighted',
}))`
  ${ellipsisText}
`;

const StatementOfWorkItemContractContainer = styled(Stack).attrs(() => ({
  gap: 2,
  justify: 'stretch',
}))`
  cursor: pointer;
  color: var(--text-card-neutral-highlighted);
  ${footnoteTypography.footnote};
`;

const StatementOfWorkItemContractTitle = styled(StackItem).attrs(() => ({
  shrink: 1,
}))`
  ${ellipsisText}
`;
const StatementOfWorkItemContractNumber = styled(StackItem).attrs(() => ({
  shrink: 0,
}))``;

export default {
  StatementOfWorkItemTitleContainer,
  StatementOfWorkItemTitle,
  StatementOfWorkItemContractContainer,
  StatementOfWorkItemContractTitle,
  StatementOfWorkItemContractNumber,
};
