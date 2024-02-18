import { useCallback } from 'react';
import { Pagination as StandalonePagination } from '../Pagination';

export interface PaginationState {
  page: number;
  itemsPerPage: number;
  offset: number;
  totalCount: number;
}

function calculateOffset(page: number, itemsPerPage: number) {
  return (page - 1) * itemsPerPage;
}

export type PaginationProps = {
  totalCount: number;
  itemsPerPage?: number;
  onChange: (state: PaginationState) => void;
  currentPage?: number;
  currentOffset?: number;
};

export function Pagination({
  totalCount,
  itemsPerPage = 5,
  currentPage,
  currentOffset,
  onChange,
}: PaginationProps) {
  const handleChange = useCallback(
    (newPage: number) => {
      onChange({
        page: newPage,
        itemsPerPage,
        totalCount,
        offset: calculateOffset(newPage, itemsPerPage),
      });
    },
    [itemsPerPage, onChange, totalCount],
  );
  const page =
    currentPage ?? (currentOffset ? currentOffset / itemsPerPage + 1 : 1);

  return (
    <StandalonePagination
      renderOnOnePageCount={true}
      totalCount={totalCount}
      currentPage={page}
      pageSize={itemsPerPage}
      onPageChange={handleChange}
    />
  );
}
