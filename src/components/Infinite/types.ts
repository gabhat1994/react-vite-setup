import { type ItemContent } from 'react-virtuoso';
import { type Property } from 'csstype';
import type * as React from 'react';

type TopStatus = 'loading' | 'hasPreviousPage' | 'start';
export type BottomStatus = 'loading' | 'hasNextPage' | 'end' | 'end-with-force';

export interface InfiniteProps {
  children?: React.ReactNode;
  /** default false */
  reverse?: boolean;
  onFetchMore?: () => void;
  status?: BottomStatus;

  testId?: string;

  unsetOverflow?: boolean;

  maxHeight?: Property.MaxHeight;
  width?: string;
  scrollbarWidth?: number;
  paddingTop?: string;
  paddingBottom?: string;
  paddingRight?: string;
  /** default false */
  grow?: boolean;
  disableFetchMoreWhileLoading?: boolean;
  observerMinHeight?: string;
  isSpinnerRelative?: boolean;

  style?: React.CSSProperties;
}

export interface InfiniteVirtualizedProps {
  onFetchMoreTop?: () => void;
  onFetchMoreBottom?: () => void;
  topStatus?: TopStatus;
  bottomStatus?: BottomStatus;
  firstItemIndex: number;
  initialTopMostItemIndex: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  itemContent: ItemContent<React.ReactNode>;
  width?: string;
}

export interface InfiniteTopBottomProps {
  children?: React.ReactNode;
  onFetchMoreTop?: () => void;
  onFetchMoreBottom?: () => void;
  topStatus?: TopStatus;
  bottomStatus?: BottomStatus;

  maxHeight?: Property.MaxHeight;
  width?: string;
}
