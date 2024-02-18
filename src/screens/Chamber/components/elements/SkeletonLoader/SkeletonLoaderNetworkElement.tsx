import { SkeletonLoaderPost } from '@/screens/Chamber/components/elements/SkeletonLoader/StyledSkeletons';
import {
  StyledFlexColumn,
  StyledFlexRow,
} from '@/screens/Chamber/components/elements/SkeletonLoader/styled';
import { Card } from '@/components/Card';
import SkeletonLoaderElementHeader from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderElementHeader';

const SkeletonLoaderNetworkElement = () => (
  <Card>
    <StyledFlexColumn gap={21} justify="baseline" align="flex-start">
      <SkeletonLoaderElementHeader />
      <StyledFlexRow gap={12}>
        <SkeletonLoaderPost />
        <SkeletonLoaderPost />
        <SkeletonLoaderPost />
        <SkeletonLoaderPost />
        <SkeletonLoaderPost />
        <SkeletonLoaderPost />
        <SkeletonLoaderPost />
        <SkeletonLoaderPost />
        <SkeletonLoaderPost />
        <SkeletonLoaderPost />
        <SkeletonLoaderPost />
      </StyledFlexRow>
    </StyledFlexColumn>
  </Card>
);

export default SkeletonLoaderNetworkElement;
