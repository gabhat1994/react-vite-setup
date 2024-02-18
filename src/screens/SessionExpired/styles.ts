import styled from 'styled-components';
import { mediaSizes } from '@/constants/devices';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg-card-neutral-alt-default);
`;

export const SessionExpiredContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SessionExpiredModal = styled.div`
  margin-top: -72px;
  max-width: 402px;
  text-align: center;
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    width: 279px;
  }
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    width: 100%;
    max-width: 343px;
  }
`;
