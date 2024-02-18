import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { mediaSizes } from '@/constants/devices';
import { Stack } from '@/layout';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    border-bottom: solid 1px var(--border-card-neutral-default);
  }
`;

const TableCell = styled.td<{ fitContents?: boolean }>`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--border-card-neutral-default);
  ${(props) => (props.fitContents ? 'width: 1px' : '')};

  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    padding: 12px 4px;
  }

  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    padding: 8px 0 16px;
  }
`;

const SummaryText = styled(TSpan)`
  color: var(--text-card-neutral-highlighted);
`;

const ItemDetailsRowText = styled(TSpan).attrs({
  font: 'footnote',
  colorToken: '--text-card-neutral-default',
})``;

const ItemDetailsRow = styled(Stack).attrs({
  fullWidth: true,
  justify: 'space-between',
  align: 'center',
  padding: '4px 12px 4px 0',
})``;

const SelectFieldWrapper = styled.div<{ fullSize?: boolean }>`
  width: ${(props) => (props.fullSize ? '100%' : '50%')};
`;
export default {
  Table,
  TableBody,
  TableRow,
  TableCell,
  SummaryText,
  ItemDetailsRow,
  ItemDetailsRowText,
  SelectFieldWrapper,
};
