import {
  StyledFlexColumn,
  StyledFlexRowBordered,
} from '@/screens/Chamber/components/elements/SkeletonLoader/styled';
import { SizedSkeleton } from '@/screens/Chamber/components/elements/SkeletonLoader/StyledSkeletons';
import { Card } from '@/components/Card';
import SkeletonLoaderElementHeader from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderElementHeader';

const StyledBody = () => (
  <StyledFlexRowBordered gap={12} justify="space-between" align="center">
    <SizedSkeleton w={143} h={22} r={8} />
    <SizedSkeleton w={24} h={24} r={8} />
  </StyledFlexRowBordered>
);

const SkeletonLoaderProjectsWorkExperienceElement = () => (
  <Card style={{ padding: 24 }}>
    <StyledFlexColumn gap={24} justify="baseline" align="flex-start">
      <SkeletonLoaderElementHeader />
      <StyledBody />
      <StyledBody />
      <StyledBody />
    </StyledFlexColumn>
  </Card>
);

export default SkeletonLoaderProjectsWorkExperienceElement;
