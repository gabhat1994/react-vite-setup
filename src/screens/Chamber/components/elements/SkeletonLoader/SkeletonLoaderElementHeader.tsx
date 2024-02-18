import { SkeletonLoaderPost } from '@/screens/Chamber/components/elements/SkeletonLoader/StyledSkeletons';
import { StyledSkeleton } from '@/components/ChamberBox/SkeletonChamberBox';
import { StyledFlexRow } from '@/screens/Chamber/components/elements/SkeletonLoader/styled';

const SkeletonLoaderElementHeader = () => (
  <StyledFlexRow gap={8} justify="flex-start" align="center">
    <SkeletonLoaderPost />
    <StyledSkeleton w={140} h={30} r={8} />
  </StyledFlexRow>
);

export default SkeletonLoaderElementHeader;
