import styled from 'styled-components';
import { Card as OriginalCard } from '@/components/Card';
import { mediaSizes } from '@/constants/devices';

const Card = styled(OriginalCard)`
  padding: 24px;

  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    border-radius: 0;
  }
`;

const PdfPreview = styled.div`
  width: 390px;
  height: 550px;
  border: 1px solid var(--border-card-neutral-default);
`;

export default {
  Card,
  PdfPreview,
};
