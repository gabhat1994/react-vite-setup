import React, { useMemo } from 'react';
import generate from 'uniqid';

import { usePagination } from '@/hooks/usePagination';
import { Icon } from '@/components/Icon';
import { type PaginationProps } from './types';
import { PaginationContainer, PageButton, JumpButton } from './styles';

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      totalCount,
      currentPage = 1,
      pageSize = 10,
      breakLabel = '...',
      disabled = false,
      siblingCount = 1,
      nextPageButton,
      prevPageButton,
      renderOnOnePageCount = false,
      testId,
      onPageChange,
    },
    ref,
  ) => {
    const paginationRange = usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize,
      breakLabel,
    });

    const totalPages = useMemo(
      () => Math.ceil(totalCount / (pageSize || 1)),
      [pageSize, totalCount],
    );

    const lastPage = useMemo(
      () =>
        paginationRange.length > 1
          ? paginationRange[paginationRange.length - 1]
          : totalPages,
      [paginationRange, totalPages],
    );

    const onNext = () => {
      if (onPageChange) onPageChange(Math.min(currentPage + 1, totalPages));
    };

    const onPrevious = () => {
      if (onPageChange) onPageChange(Math.max(currentPage - 1, 1));
    };

    if (!paginationRange.length) return null;
    if (paginationRange.length < 2 && !renderOnOnePageCount) return null;

    return (
      <PaginationContainer data-testid={testId || 'pagination'} ref={ref}>
        {prevPageButton || (
          <JumpButton
            testId="page-prev-button"
            textOnly
            disabled={disabled || currentPage === 1}
            onClick={onPrevious}
          >
            <Icon
              name="chevron_small_left_m"
              size={24}
              color={
                disabled || currentPage === 1
                  ? '--icon-button-neutral-disabled'
                  : '--icon-button-brand-primary-default'
              }
            />
          </JumpButton>
        )}
        {paginationRange.map((page: string | number) => {
          if (page === breakLabel) {
            return (
              <PageButton
                key={`page-btn-break-${generate()}`}
                testId="page-button"
                size="small"
                active={false}
                disabled={disabled}
              >
                {page}
              </PageButton>
            );
          }

          return (
            <PageButton
              key={`page-btn-${page}`}
              testId="page-button"
              size="small"
              secondary={currentPage === +page}
              active={currentPage === +page}
              disabled={disabled}
              onClick={() => onPageChange && onPageChange(+page)}
            >
              {page}
            </PageButton>
          );
        })}
        {nextPageButton || (
          <JumpButton
            testId="page-next-button"
            textOnly
            disabled={disabled || currentPage === lastPage}
            onClick={onNext}
          >
            <Icon
              name="chevron_small_right_m"
              size={24}
              color={
                disabled || currentPage === lastPage
                  ? '--icon-button-neutral-disabled'
                  : '--icon-button-brand-primary-default'
              }
            />
          </JumpButton>
        )}
      </PaginationContainer>
    );
  },
);
