import styled from 'styled-components';
import { mediaSizes } from '@/constants/devices';
import { Card } from '@/components/Card';

export const ProfileCompletionWrapper = styled(Card)`
  position: absolute;
  width: 100%;
  z-index: 49;
  max-height: max-content;
  border-radius: 0%;
  @media (max-width: ${mediaSizes.TABLET_L}) {
    padding: 16px;
  }
`;

export const ProfileCompletionConatiner = styled.div`
  width: 100%;
`;

export const ProfileCompletionContent = styled.div`
  margin: 0 auto;
`;
