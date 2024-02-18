import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { Stack } from '../Stack';

export const Main = styled(Stack).attrs({
  vertical: true,
  align: 'center',
  gap: 32,
})`
  padding: 24px;
  position: relative;
  width: 450px;
  height: 100%;
  @media (max-width: ${sizes.MOBILE_L}) {
    width: 100%;
    padding: 0px;
  }
`;

export const Body = styled(Stack).attrs({
  vertical: true,
  align: 'center',
  gap: 16,
  fullWidth: true,
})``;

export const Footer = styled.div`
  width: 100%;
  @media (max-width: ${sizes.MOBILE_L}) {
    position: absolute;
    bottom: 0px;
  }
`;
