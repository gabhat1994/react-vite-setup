import { SkeletonLoaderImageInline } from '@/screens/Chamber/components/elements/SkeletonLoader/StyledSkeletons';
import { StyledFlexRow } from '@/screens/Chamber/components/elements/SkeletonLoader/styled';
import { Card } from '@/components/Card';
import SkeletonLoaderElementHeader from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderElementHeader';

const SkeletonLoaderImageElement = () => (
  <Card>
    <StyledFlexRow justify="space-between">
      <SkeletonLoaderElementHeader />
      <SkeletonLoaderImageInline />
    </StyledFlexRow>
  </Card>
);

export default SkeletonLoaderImageElement;
