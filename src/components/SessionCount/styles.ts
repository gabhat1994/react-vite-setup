import styled from 'styled-components';
import { mediaSizes } from '@/constants/devices';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg-body-neutral-alt-highlighted);
  justify-content: center;
`;

export const SessionExpiredContainer = styled.div<{ backgroundColor?: string }>`
  width: 100%;
  height: fit-content;
  max-width: 279px;
  text-align: center;
  background-color: var(
    ${({ backgroundColor }) =>
      backgroundColor || '--bg-card-neutral-alt-default'}
  );
  border-radius: 16px;
  padding: 24px;
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    width: 279px;
  }
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    width: 100%;
    max-width: 279px;
  }
`;
