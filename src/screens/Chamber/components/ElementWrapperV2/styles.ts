import { Card } from '@/components';
import { devices } from '@/constants/devices';
import { Stack } from '@/layout';
import styled from 'styled-components';

const Container = styled(Card)`
  width: 100%;
  padding: 16px 0;
  border-radius: 0;
  gap: 16px;
  @media ${devices.TABLET} {
    border-radius: 16px;
  }
  overflow: visible;
`;

const HeaderContainer = styled(Stack)`
  height: 40px;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 0 16px;
`;

const BodyContainer = styled(Stack)`
  width: 100%;
  padding: 0 16px;
`;

export default {
  Container,
  HeaderContainer,
  BodyContainer,
};
