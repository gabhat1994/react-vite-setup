import styled from 'styled-components';
import { mediaSizes } from '@/constants/devices';
import { Button } from '@/components/Button';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg-body-neutral-alt-highlighted);
`;

export const NewReleaseContainer = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  gap: 16px;
  align-items: center;
  height: fit-content;
  max-width: 685px;
  text-align: center;
  margin-top: 24px;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  padding: 49px;
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    padding: 38px 24px;
    width: 552px;
  }
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    width: 100%;
    max-width: 279px;
    padding: 24px;
  }
`;

export const RefreshButton = styled(Button)`
  margin-top: 8px;
`;
