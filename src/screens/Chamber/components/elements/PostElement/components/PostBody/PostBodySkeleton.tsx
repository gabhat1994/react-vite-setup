import { Separator } from '@/components/Separator/Separator';
import { Stack } from '@/layout';
import { SizedSkeleton } from '@/screens/Chamber/components/elements/SkeletonLoader/StyledSkeletons';
import React from 'react';

const PostBodySkeleton: React.FC = () => (
  <Stack fullWidth vertical gap={16}>
    <Stack fullWidth gap={16} align="center">
      <SizedSkeleton w={40} h={40} r={8} />
      <Stack vertical gap={8}>
        <SizedSkeleton w={160} h={24} r={8} />
        <SizedSkeleton w={160} h={12} r={8} />
      </Stack>
    </Stack>
    <Stack vertical gap={8}>
      <SizedSkeleton w={320} h={16} r={8} />
      <SizedSkeleton w={320} h={16} r={8} />
      <SizedSkeleton w={250} h={16} r={8} />
    </Stack>

    <Stack gap={8} align="center">
      <SizedSkeleton w={19} h={19} r={8} />
      <SizedSkeleton w={120} h={16} r={8} />
    </Stack>

    <Separator fullWidth noMargin />

    <Stack gap={16} align="center">
      <Stack gap={8} align="center">
        <SizedSkeleton w={24} h={24} r={8} />
        <SizedSkeleton w={40} h={16} r={8} />
      </Stack>

      <Stack gap={8} align="center">
        <SizedSkeleton w={24} h={24} r={8} />
        <SizedSkeleton w={40} h={16} r={8} />
      </Stack>
    </Stack>
  </Stack>
);

export default PostBodySkeleton;
