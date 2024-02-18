import {
  StyledFlexColumn,
  StyledFlexRowBordered,
} from '@/screens/Chamber/components/elements/SkeletonLoader/styled';
import {
  SizedSkeleton,
  SkeletonLoaderPostII,
} from '@/screens/Chamber/components/elements/SkeletonLoader/StyledSkeletons';
import { Card } from '@/components/Card';
import SkeletonLoaderElementHeader from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderElementHeader';

const SkeletonLoaderPostElement = () => (
  <Card style={{ padding: 24 }}>
    <StyledFlexColumn gap={24} justify="baseline" align="flex-start">
      <SkeletonLoaderElementHeader />
      <StyledFlexRowBordered gap={12} justify="flex-start" align="center">
        <SkeletonLoaderPostII />
        <SizedSkeleton w="100%" h={56} r={8} />
      </StyledFlexRowBordered>
      <SizedSkeleton w={111} h={16} r={8} />
    </StyledFlexColumn>
  </Card>
);

export default SkeletonLoaderPostElement;
