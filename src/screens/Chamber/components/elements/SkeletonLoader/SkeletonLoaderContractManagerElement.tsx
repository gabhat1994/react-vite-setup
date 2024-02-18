import Skeleton from 'react-loading-skeleton';
import { Card } from '@/components/Card';
import SkeletonLoaderElementHeader from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderElementHeader';
import { StyledFlexColumn } from '@/screens/Chamber/components/elements/SkeletonLoader/styled';

const SkeletonLoaderContractManagerElement = () => (
  <Card>
    <StyledFlexColumn gap={16} align="stretch">
      <SkeletonLoaderElementHeader />
      <Skeleton height={20} borderRadius={8} />
      <Skeleton height={20} borderRadius={8} />
      <Skeleton height={20} borderRadius={8} />
      <Skeleton height={20} borderRadius={8} />
      <Skeleton height={20} borderRadius={8} />
    </StyledFlexColumn>
  </Card>
);

export default SkeletonLoaderContractManagerElement;
