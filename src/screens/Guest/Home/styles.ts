import styled from 'styled-components';
import { mediaSizes, sizes } from '@/constants/devices';

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SpinnerContainer = styled.div`
  @media (min-width: ${sizes.LAPTOP_L}) {
    width: 912px;
  }
`;

export const EmptyContainer = styled.div`
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  width: 783px;
  height: 196px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  gap: 24px;
  box-sizing: border-box;
  text-align: center;
  @media (min-width: ${mediaSizes.TABLET_MIN}) and (max-width: ${mediaSizes.TABLET_MAX}) {
    min-width: 600px;
    width: 100%;
  }
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    min-width: 327px;
    width: 100%;
    min-height: 196px;
    height: auto;
  }
`;

export const Container = styled.div``;
