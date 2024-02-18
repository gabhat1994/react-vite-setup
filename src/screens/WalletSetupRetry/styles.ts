import styled from 'styled-components';
import { mediaSizes } from '@/constants/devices';

export const Header = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  margin-top: 40px;

  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    display: none;
  }
`;

export const Logo = styled.img`
  margin-left: 40px;
  cursor: pointer;
`;

export const StepperContainer = styled.div`
  width: 343px;
  margin-bottom: 16px;
  pointer-events: none;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    margin-top: 30px;
    padding-left: 16px;
    padding-bottom: 16px;
    padding-right: 16px;
    height: 93%;
  }
`;

export const Container = styled.div`
  background-color: var(--bg-body-neutral-alt-default);
  overflow-x: hidden;
  height: 100vh;
`;
