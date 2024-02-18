import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr``;

const TableCell = styled.td<{ fitContents?: boolean }>`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--border-card-neutral-default);
  ${(props) => (props.fitContents ? 'width: 1px' : '')}
`;

const SummaryText = styled(TSpan)`
  color: var(--text-card-neutral-highlighted);
`;

export default {
  Table,
  TableBody,
  TableRow,
  TableCell,
  SummaryText,
};
