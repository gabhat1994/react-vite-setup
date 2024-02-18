import styled from 'styled-components';
import { mediaSizes } from '@/constants/devices';

export const Container = styled.div`
  display: flex;
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    flex-direction: column;
  }
`;
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--bg-card-neutral-default);
  flex: 1;
  border-radius: 16px;
  padding: 24px;
`;
export const ContentHeaderContainer = styled.div`
  min-height: 60px;
`;

export const ItemContainer = styled.div`
  margin-bottom: 10px;
`;
export const MiddleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;
export const OwnerHeaderContainer = styled.div`
  display: flex;
  flex: 1;
`;
export const FormHeaderContainer = styled.div``;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px 24px 24px 0;
`;
