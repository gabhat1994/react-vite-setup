import {
  StyledFlexColumn,
  StyledFlexColumnBordered,
  StyledFlexRow,
} from '@/screens/Chamber/components/elements/SkeletonLoader/styled';
import { SizedSkeleton } from '@/screens/Chamber/components/elements/SkeletonLoader/StyledSkeletons';
import { Card } from '@/components/Card';
import SkeletonLoaderElementHeader from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderElementHeader';

export const SkeletonLoaderQuickQuestionElement = () => (
  <Card style={{ padding: 24 }}>
    <StyledFlexColumn gap={24} justify="baseline" align="flex-start">
      <SkeletonLoaderElementHeader />
      <SkeletonLoaderQuickQuestionElementBody />
    </StyledFlexColumn>
  </Card>
);

export const SkeletonLoaderQuickQuestionElementBody = () => (
  <StyledFlexColumnBordered align="flex-start" fullWidth gap={16}>
    <StyledFlexRow gap={12} justify="space-between" align="center">
      <SizedSkeleton w={390} h={24} r={8} />
      <SizedSkeleton w={24} h={24} r={8} />
    </StyledFlexRow>
    <StyledFlexRow gap={12} justify="flex-start" align="center">
      <SizedSkeleton w={24} h={24} r={8} />
      <SizedSkeleton w={36} h={16} r={8} />
      <SizedSkeleton w={107} h={16} r={8} />
      <SizedSkeleton w={60} h={16} r={8} />
    </StyledFlexRow>
  </StyledFlexColumnBordered>
);
