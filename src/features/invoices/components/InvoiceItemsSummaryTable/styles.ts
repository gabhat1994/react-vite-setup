import styled from 'styled-components';
import { footnoteTypography, TSpan } from '@/components/Typography';
import { Stack } from '@/layout';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr``;

const TableHead = styled.thead``;

const TableCell = styled.td<{
  $width?: 'fit-contents' | string;
  align?: 'left' | 'right';
}>`
  ${footnoteTypography.footnote}
  padding: 12px;
  text-align: right;
  border-bottom: 1px solid var(--border-card-neutral-default);
  color: var(--text-card-neutral-default);
  width: ${({ $width }) => $width || 'auto'};
  text-align: ${({ align }) => align || 'right'};
`;

const TableHeader = styled.th<{
  align?: 'left' | 'right';
}>`
  ${footnoteTypography.footnoteBold}
  background-color: var(--bg-card-neutral-default);
  color: var(--text-card-header-neutral-default);
  padding: 12px;
  text-align: ${({ align }) => align || 'right'};

  :first-of-type {
    border-radius: 8px 0 0 8px;
  }

  :last-of-type {
    border-radius: 0 8px 8px 0;
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
  padding: '0 12px 0 0',
})``;

export default {
  Table,
  TableBody,
  TableRow,
  TableCell,
  SummaryText,
  TableHead,
  TableHeader,
  ItemDetailsRowText,
  ItemDetailsRow,
};
