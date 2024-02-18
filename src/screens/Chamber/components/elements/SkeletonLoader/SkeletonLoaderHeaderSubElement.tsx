import { SkeletonLoaderPost } from '@/screens/Chamber/components/elements/SkeletonLoader/StyledSkeletons';
import { StyledFlexRow } from '@/screens/Chamber/components/elements/SkeletonLoader/styled';
import SkeletonLoaderElementHeader from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderElementHeader';

const SkeletonLoaderHeaderSubElement = () => (
  <StyledFlexRow gap={12} justify="space-between" fullWidth>
    <SkeletonLoaderElementHeader />
    <SkeletonLoaderPost />
  </StyledFlexRow>
);

export default SkeletonLoaderHeaderSubElement;
