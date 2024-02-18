import styled from 'styled-components';
import { Card } from '@/components/Card';

const StickyNavbarCard = styled(Card)`
  padding: 0;
  border-radius: 0;
  position: sticky;
  top: 0px;
  z-index: 100;
  overflow: visible;
`;

export default {
  StickyNavbarCard,
};
