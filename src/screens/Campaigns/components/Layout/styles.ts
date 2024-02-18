import styled from 'styled-components';
import { Stack } from '@/layout';
import { mediaSizes } from '@/constants/devices';
import { Card as CustomCard } from '@/components/Card';

const Main = styled(Stack).attrs({
  vertical: true,
  align: 'center',
  justify: 'center',
  gap: '16px',
})`
  width: 1130px;
  align-self: center;
  padding: 24px;
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    width: 100%;
    padding: 0px;
  }
`;
const Card = styled(CustomCard)`
  width: 100%;
  padding: 24px;
  overflow: visible;
`;

export default { Main, Card };
