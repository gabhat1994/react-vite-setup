import { SizedSkeleton } from '@/screens/Chamber/components/elements/SkeletonLoader/StyledSkeletons';
import {
  StyledFlexColumn,
  StyledFlexRow,
} from '@/screens/Chamber/components/elements/SkeletonLoader/styled';
import { Card } from '@/components/Card';
import SkeletonLoaderHeaderSubElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderHeaderSubElement';

const SkeletonLoaderMessageElement = () => (
  <Card>
    <StyledFlexColumn gap={21} justify="baseline" align="flex-start">
      <SkeletonLoaderHeaderSubElement />
      <StyledFlexRow gap={24} fullWidth>
        <SizedSkeleton w={116} h={16} r={8} />
        <SizedSkeleton w={24} h={24} r={8} />
        <SizedSkeleton w={24} h={24} r={8} />
        <SizedSkeleton w={24} h={24} r={8} />
        <SizedSkeleton w={24} h={24} r={8} />
        <SizedSkeleton w={24} h={24} r={8} />
        <SizedSkeleton w={24} h={24} r={8} />
        <SizedSkeleton w={24} h={24} r={8} />
        <SizedSkeleton w={24} h={24} r={8} />
        <SizedSkeleton w={24} h={24} r={8} />
        <SizedSkeleton w={24} h={24} r={8} />
        <SizedSkeleton w={24} h={24} r={8} />
        <SizedSkeleton w={24} h={24} r={8} />
        <SizedSkeleton w={24} h={24} r={8} />
      </StyledFlexRow>
    </StyledFlexColumn>
  </Card>
);

export default SkeletonLoaderMessageElement;
