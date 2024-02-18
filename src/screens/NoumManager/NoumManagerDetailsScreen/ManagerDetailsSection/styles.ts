import { TSpan } from '@/components';
import { mediaSizes } from '@/constants/devices';
import { Stack } from '@/layout';
import styled from 'styled-components';

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  width: 100%;
  grid-gap: 8px;

  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    grid-template-columns: auto auto;
  }

  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    grid-template-columns: auto;
    grid-gap: 24px;
  }
`;

const ColumnSection = styled(Stack).attrs({
  vertical: true,
  fullWidth: true,
  gap: 8,
})``;

const Row = styled(Stack).attrs({
  align: 'center',
  fullWidth: true,
  gap: 8,
})``;

const RowTitle = styled(TSpan).attrs({
  font: 'body-m',
  colorToken: '--text-card-neutral-default',
})``;

export default {
  ColumnSection,
  Row,
  RowTitle,
  ColumnsWrapper,
};
