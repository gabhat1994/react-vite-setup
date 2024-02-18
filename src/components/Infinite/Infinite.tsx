import { forwardRef, type Ref, useCallback } from 'react';
import { t } from 'i18next';
import { match } from 'ts-pattern';
import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { Stack } from '@/layout';
import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/Button';
import { ObservedDiv } from './ObservedDiv';
import { type BottomStatus, type InfiniteProps } from './types';
import { SpinnerPosition } from './styles';

export function InfiniteSpinner({
  status,
  reverse,
  onFetchMore,
  isSpinnerRelative,
}: InfiniteProps) {
  const { isLoading } = useSkeletonIsLoadingContext();

  if (status === 'end' || isLoading) return null;

  return (
    <SpinnerPosition isBottom={!reverse} isSpinnerRelative={isSpinnerRelative}>
      <Stack justify="center" align="center" padding={5}>
        {match(status)
          .with('loading', () => <Spinner />)
          .with('hasNextPage', () => <Spinner />)
          .with('end-with-force', () => (
            <Button tertiary onClick={onFetchMore} hidden>
              {t('noumena.infinite.force_fetch_more')}
            </Button>
          ))
          .run()}
      </Stack>
    </SpinnerPosition>
  );
}

/**
 * Will render a scrollbar container that uses an intersection observer to watch for when
 * the container has scrolled to the top or bottom.
 */
export const Infinite = forwardRef(
  (
    {
      children,
      reverse = false,
      onFetchMore,
      status,
      maxHeight = '100%',
      paddingTop = '0px',
      paddingBottom = '0px',
      paddingRight = '0px',
      width,
      scrollbarWidth,
      observerMinHeight,
      grow = false,
      disableFetchMoreWhileLoading = false,
      isSpinnerRelative,
      style,
      testId,
      unsetOverflow,
    }: InfiniteProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const { isLoading } = useSkeletonIsLoadingContext();
    const handleIntersect = useCallback(() => {
      const blacklistedStatuses: BottomStatus[] = ['end'];
      if (disableFetchMoreWhileLoading) {
        blacklistedStatuses.push('loading');
      }

      if (onFetchMore && (!status || !blacklistedStatuses.includes(status))) {
        onFetchMore?.();
      }
    }, [disableFetchMoreWhileLoading, onFetchMore, status]);

    return (
      <Stack
        data-testid={testId}
        ref={ref}
        maxHeight={maxHeight}
        style={{
          position: 'relative',
          overflow: `${unsetOverflow ? 'unset' : 'auto'}`,
          paddingTop,
          paddingBottom,
          paddingRight,
          maxHeight,
          width,
          ...style,
        }}
        scrollbarWidth={scrollbarWidth}
        align="stretch"
        grow={grow}
        vertical
        overflow={unsetOverflow ? 'unset' : undefined}
      >
        {reverse && status && (
          <InfiniteSpinner
            status={status}
            onFetchMore={onFetchMore}
            isSpinnerRelative={isSpinnerRelative}
            reverse
          />
        )}
        {!isLoading && reverse && (
          <ObservedDiv
            minHeight={observerMinHeight}
            onIntersect={handleIntersect}
          />
        )}
        {children}
        {!isLoading && !reverse && (
          <ObservedDiv
            minHeight={observerMinHeight}
            onIntersect={handleIntersect}
          />
        )}
        {!reverse && status && (
          <InfiniteSpinner
            status={status}
            onFetchMore={onFetchMore}
            isSpinnerRelative={isSpinnerRelative}
          />
        )}
      </Stack>
    );
  },
);
