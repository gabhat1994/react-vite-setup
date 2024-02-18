/* eslint-disable react/no-array-index-key */
import { Stack } from '@/layout';
import { SizedSkeleton } from '@/components/SkeletonLoader';
import S, { ROW_HEIGHT } from './styles';

interface TableLoadingSkeletonProps {
  rowsCount: number;
}

export function CollapsibleListSkeleton({
  rowsCount,
}: TableLoadingSkeletonProps) {
  return (
    <Stack vertical fullWidth gap={16}>
      {Array.from({ length: rowsCount }).map((row, rowIndex) => (
        <S.ListRow key={rowIndex}>
          <SizedSkeleton w="100%" h={`${ROW_HEIGHT / 2}px`} />
        </S.ListRow>
      ))}
    </Stack>
  );
}
