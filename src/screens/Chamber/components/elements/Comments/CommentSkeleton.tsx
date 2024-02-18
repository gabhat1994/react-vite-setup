import { Stack } from '@/layout';
import { SizedSkeleton } from '@/screens/Chamber/components/elements/SkeletonLoader/StyledSkeletons';
import React from 'react';

const LoadMoreSkeleton = () => (
  <Stack fullWidth gap={16}>
    <SizedSkeleton w={20} h={20} r={8} />
    <SizedSkeleton w={180} h={20} r={8} />
  </Stack>
);

const CommentSkeleton: React.FC = () => (
  <Stack fullWidth vertical gap={16}>
    <Stack fullWidth gap={16} align="start">
      <SizedSkeleton w={40} h={40} r={8} />
      <SizedSkeleton w="100%" h={80} r={8} />
    </Stack>
  </Stack>
);

export const CommentsListSkeleton: React.FC = () => (
  <>
    {Array.from({ length: 3 }).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <CommentSkeleton key={index} />
    ))}
  </>
);

export const RepliesListSkeleton: React.FC = () => (
  <Stack fullWidth vertical gap={16}>
    <LoadMoreSkeleton />
    <CommentSkeleton />
  </Stack>
);
