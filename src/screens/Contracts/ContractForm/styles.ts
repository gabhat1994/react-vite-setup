import styled, { css } from 'styled-components';
import { Card as OriginalCard } from '@/components/Card';
import { mediaSizes } from '@/constants/devices';
import { bodyTypography } from '@/components/Typography';

const Card = styled(OriginalCard)`
  padding: 24px;
  overflow: visible;

  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    border-radius: 0;
  }
`;

const PdfPreview = styled.div`
  width: 390px;
  height: 550px;
  border: 1px solid var(--border-card-neutral-default);
`;

const statementOfWorkDescriptionFont = css`
  color: var(--text-card-neutral-default);
  font: ${bodyTypography.bodyMedium};
`;

const StatementOfWorkDescription = styled.div`
  ${statementOfWorkDescriptionFont}
`;

export default {
  Card,
  PdfPreview,
  StatementOfWorkDescription,
};
