import styled from 'styled-components';
import { Card as OriginalCard } from '@/components/Card';
import { Separator as OriginalSeparator } from '@/components/Separator/Separator';
import { mediaSizes } from '@/constants/devices';

const Card = styled(OriginalCard)`
  padding: 24px;
  // Don't clip dropdown popover layer
  overflow: visible;

  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    border-radius: 0;
  }
`;

const Separator = styled(OriginalSeparator)`
  width: 100%;
`;

export default {
  Card,
  Separator,
};
