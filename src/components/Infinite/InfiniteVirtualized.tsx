import { forwardRef, useRef, type ReactNode, type Ref } from 'react';
import { match } from 'ts-pattern';
import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso';
import { Stack } from '@/layout';

import { Spinner } from '@/components/Spinner';
import { mergeRefs } from '@/utils/mergeRefs';
import { type InfiniteVirtualizedProps } from './types';

/**
 * Will render a scrollbar container that uses an intersection observer to watch for when
 * the container has scrolled to the top or bottom.
 */
export const InfiniteVirtualized = forwardRef(
  (
    {
      onFetchMoreTop,
      onFetchMoreBottom,
      topStatus,
      bottomStatus,
      initialTopMostItemIndex,
      firstItemIndex,
      data,
      itemContent,
      width,
    }: InfiniteVirtualizedProps,
    ref: Ref<VirtuosoHandle>,
  ) => {
    const virtuosoRef = useRef<VirtuosoHandle>(null);

    return (
      <Stack
        maxHeight="100%"
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          width,
        }}
        align="stretch"
        vertical
      >
        <Virtuoso
          ref={mergeRefs(virtuosoRef, ref)}
          firstItemIndex={firstItemIndex}
          initialTopMostItemIndex={initialTopMostItemIndex}
          startReached={onFetchMoreTop}
          endReached={onFetchMoreBottom}
          data={data}
          itemContent={itemContent}
          useWindowScroll={false}
          components={{
            Header: () => (
              <Stack justify="center" align="center" padding={5}>
                {match(topStatus)
                  .with('loading', (): ReactNode => <Spinner />)
                  .with('hasPreviousPage', (): ReactNode => <Spinner />)
                  .with('start', () => null)
                  .otherwise(() => null)}
              </Stack>
            ),
            Footer: () =>
              bottomStatus === 'loading' || bottomStatus === 'hasNextPage' ? (
                <Stack justify="center" align="center" padding={5}>
                  <Spinner />
                </Stack>
              ) : null,
          }}
        />
      </Stack>
    );
  },
);
