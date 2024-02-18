import styled from 'styled-components';
import { mediaSizes } from '@/constants/devices';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';

const Container = styled.div<{ fullWidth: boolean }>`
  width: 100%;
  display: grid;
  column-gap: 8px;
  grid-template-columns: ${({ fullWidth }) => (fullWidth ? '100%' : '1fr 1fr')};
  position: relative;

  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    grid-template-columns: minmax(100%, 1fr);
  }
`;

const ListWrapper = styled(Stack)`
  width: 100%;
  min-height: 140px;
`;

const EmptyState = styled(Stack).attrs({
  align: 'center',
  vertical: true,
  fullWidth: true,
})``;

const EmptyStateText = styled(TSpan)`
  color: var(--text-card-neutral-default);
  padding-top: 16px;
`;

const EmptyStateContainer = styled(Stack).attrs({
  vertical: true,
})`
  width: 100%;
  align-self: center;
  gap: 16px;
`;

export default {
  Container,
  EmptyState,
  EmptyStateText,
  EmptyStateContainer,
  ListWrapper,
};
