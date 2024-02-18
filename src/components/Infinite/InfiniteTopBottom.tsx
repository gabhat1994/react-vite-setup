import { useCallback, type ReactNode } from 'react';
import { match } from 'ts-pattern';
import { Stack } from '../../layout';

import { ObservedDiv } from './ObservedDiv';
import { Spinner } from '../Spinner';
import { type InfiniteTopBottomProps } from './types';

/**
 * Will render a scrollbar container that uses an intersection observer to watch for when
 * the container has scrolled to the top or bottom.
 */
export function InfiniteTopBottom({
  children,
  onFetchMoreTop,
  onFetchMoreBottom,
  topStatus,
  bottomStatus,
  maxHeight = '100%',
  width,
}: InfiniteTopBottomProps) {
  const handleIntersectTop = useCallback(() => {
    if (onFetchMoreTop && (!topStatus || topStatus !== 'start')) {
      onFetchMoreTop();
    }
  }, [onFetchMoreTop, topStatus]);
  const handleIntersectBottom = useCallback(() => {
    if (onFetchMoreBottom && (!bottomStatus || bottomStatus !== 'end')) {
      onFetchMoreBottom();
    }
  }, [onFetchMoreBottom, bottomStatus]);

  return (
    <Stack
      maxHeight={maxHeight}
      style={{
        position: 'relative',
        overflow: 'scroll',
        height: maxHeight,
        width,
      }}
      align="stretch"
      vertical
    >
      {topStatus && (
        <Stack justify="center" align="center" padding={5}>
          {match(topStatus)
            .with('loading', (): ReactNode => <Spinner />)
            .with('hasPreviousPage', (): ReactNode => <Spinner />)
            .with('start', () => null)
            .exhaustive()}
        </Stack>
      )}
      <ObservedDiv onIntersect={handleIntersectTop} />
      {children}
      <ObservedDiv onIntersect={handleIntersectBottom} />
      {(bottomStatus === 'loading' || bottomStatus === 'hasNextPage') && (
        <Stack justify="center" align="center" padding={5}>
          <Spinner />
        </Stack>
      )}
    </Stack>
  );
}
