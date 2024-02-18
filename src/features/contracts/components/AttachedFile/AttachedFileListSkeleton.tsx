import Skeleton from 'react-loading-skeleton';
import { Stack } from '@/layout';

export function AttachedFileListSkeleton({ rows }: { rows: number }) {
  return (
    <Stack gap={12} vertical align="stretch">
      {Array.from({ length: rows }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Skeleton key={index} width="100%" height={24} />
      ))}
    </Stack>
  );
}
