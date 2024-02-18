import { Card } from '@/components/Card';
import SkeletonLoaderHeaderSubElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderHeaderSubElement';
import { SizedSkeleton } from '@/screens/Chamber/components/elements/SkeletonLoader/StyledSkeletons';
import { StyledFlexColumn } from '@/screens/Chamber/components/elements/SkeletonLoader/styled';

const SkeletonLoaderCalendarElement = () => (
  <Card>
    <StyledFlexColumn gap={21} justify="baseline" align="flex-start">
      <SkeletonLoaderHeaderSubElement />
      <StyledFlexColumn gap={12} fullWidth>
        <SizedSkeleton w="100%" h={80} r={8} />
        <SizedSkeleton w="100%" h={80} r={8} />
        <SizedSkeleton w="100%" h={80} r={8} />
      </StyledFlexColumn>
    </StyledFlexColumn>
  </Card>
);

export default SkeletonLoaderCalendarElement;
