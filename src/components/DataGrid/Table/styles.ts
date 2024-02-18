import styled, { css } from 'styled-components';
import { bodyTypography, footnoteTypography } from '@/components/Typography';
import { ellipsisText } from '@/common/globalStyles';
import { Stack } from '@/layout';

export const ROW_HEIGHT = 60;

const noWordWrapStyle = css`
  max-width: 0;
  ${ellipsisText}
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead``;

const TableBody = styled.tbody``;

const TableHeader = styled.th<{
  $wordWrap?: boolean;
  $width?: 'fit-contents' | string;
}>`
  ${footnoteTypography.footnoteBold}
  background-color: var(--bg-card-neutral-default);
  color: var(--text-card-header-neutral-highlighted);
  padding: 12px;
  text-align: left;
  ${({ $wordWrap }) => ($wordWrap ? '' : noWordWrapStyle)}

  width: ${({ $width }) =>
    $width ? ($width === 'fit-contents' ? '1px' : $width) : 'auto'};

  :first-of-type {
    border-radius: 8px 0 0 8px;
  }

  :last-of-type {
    border-radius: 0 8px 8px 0;
  }
`;

const TableRow = styled.tr<{ $clickable?: boolean }>`
  ${(props) => (props.$clickable ? 'cursor: pointer;' : '')}
`;

const TableCell = styled.td<{
  $width?: 'fit-contents' | string;
  $wordWrap?: boolean;
}>`
  ${footnoteTypography.footnote}
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--border-card-neutral-default);
  color: var(--text-card-neutral-default);
  ${({ $wordWrap }) => ($wordWrap ? '' : noWordWrapStyle)}
  width: ${({ $width }) =>
    $width ? ($width === 'fit-contents' ? '1px' : $width) : 'auto'}
`;

const NoResults = styled(Stack).attrs(() => ({
  align: 'center',
  justify: 'center',
}))<{ $rowsCount: number }>`
  height: ${(props) => props.$rowsCount * ROW_HEIGHT}px;
  color: var(--text-placeholder-neutral-default);
  ${bodyTypography.bodyMedium}
`;

export default {
  Table,
  TableHead,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  NoResults,
};
