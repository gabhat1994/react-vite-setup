import { type HTMLAttributes } from 'react';
import type React from 'react';

type HTMLDivProps = HTMLAttributes<HTMLSpanElement>;

interface IPaginationProps {
  /** (Optional) Define label for ellipsis. Default: `...` */
  breakLabel?: string;

  /** (Optional) Define current page. Default `1` */
  currentPage?: number;

  /** (Optional) Define whether pagination is disabled or not. Default `false` */
  disabled?: boolean;

  /** (Optional) Define Next Page Button. Default: `chevron_small_right_m` Icon button */
  nextPageButton?: React.ReactNode;

  /** (Optional) Define maximum pages to show. Default: `10` */
  pageSize?: number;

  /** (Optional) Define Previous Page Button. Default: `chevron_small_left_m` Icon button */
  prevPageButton?: React.ReactNode;

  /** (Optional) Define whether render Pagination when it is only 1 page. */
  renderOnOnePageCount?: boolean;

  /** (Optional) Define min number of page buttons to be shown on each side of the current page button. Default: `1` */
  siblingCount?: number;

  /** Define custom test id. Default: `undefined` */
  testId?: string;

  /** Define total number of data available from the source. */
  totalCount: number;

  /** (Optional) Callback function invoked with the updated page value when the page is changed. */
  onPageChange?: (page: number) => void;
}

export type PaginationProps = IPaginationProps & HTMLDivProps;
