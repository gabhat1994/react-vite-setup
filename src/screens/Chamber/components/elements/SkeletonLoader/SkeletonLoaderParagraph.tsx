import { SizedSkeleton } from '@/screens/Chamber/components/elements/SkeletonLoader/StyledSkeletons';
import { StyledFlexColumn } from '@/screens/Chamber/components/elements/SkeletonLoader/styled';

const SkeletonLoaderParagraph = () => (
  <StyledFlexColumn gap={8} style={{ width: '100%' }} align="baseline">
    <SizedSkeleton w="100%" h={16} r={8} />
    <SizedSkeleton w="100%" h={16} r={8} />
    <SizedSkeleton w="100%" h={16} r={8} />
    <SizedSkeleton w="50%" h={16} r={8} />
  </StyledFlexColumn>
);

export default SkeletonLoaderParagraph;
