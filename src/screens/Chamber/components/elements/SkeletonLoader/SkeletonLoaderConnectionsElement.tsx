import {
  SizedSkeleton,
  SkeletonLoaderPost,
} from '@/screens/Chamber/components/elements/SkeletonLoader/StyledSkeletons';
import {
  StyledFlexColumn,
  StyledFlexRow,
} from '@/screens/Chamber/components/elements/SkeletonLoader/styled';
import { Card } from '@/components/Card';
import SkeletonLoaderElementHeader from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderElementHeader';

const SkeletonLoaderConnectionsElement = () => (
  <Card>
    <StyledFlexColumn gap={21} justify="baseline" align="flex-start">
      <SkeletonLoaderElementHeader />
      <StyledFlexRow gap={12}>
        <SkeletonLoaderPost />
        <SizedSkeleton w={141} h={16} r={8} />
      </StyledFlexRow>
    </StyledFlexColumn>
  </Card>
);

export default SkeletonLoaderConnectionsElement;
