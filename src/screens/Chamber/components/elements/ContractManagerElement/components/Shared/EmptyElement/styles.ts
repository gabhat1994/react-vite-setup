import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const EmptyStateText = styled(TSpan)`
  color: var(--text-card-neutral-default);
  padding-top: 16px;
`;

const EmptyStateButtons = styled(Stack).attrs(() => ({
  gap: 12,
  align: 'center',
}))`
  padding-top: 16px;
`;

export default {
  EmptyState,
  EmptyStateText,
  EmptyStateButtons,
};
