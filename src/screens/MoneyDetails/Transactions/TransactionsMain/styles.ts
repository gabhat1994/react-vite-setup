import styled from 'styled-components';
import { mediaSizes } from '@/constants/devices';
import { Card } from '@/components/Card';

const TransactionsMainWrapper = styled(Card)<{ isTablet: boolean }>`
  border-radius: ${(props) => (props.isTablet ? '16px' : '0px')};
  width: 100%;
  padding: 0px;
  margin-bottom: 60px;
  @media (min-width: ${mediaSizes.TABLET_MAX}) {
    display: none;
  }
`;
export default TransactionsMainWrapper;
