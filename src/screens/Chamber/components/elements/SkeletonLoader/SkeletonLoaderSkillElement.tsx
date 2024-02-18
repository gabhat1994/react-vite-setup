import { SizedSkeleton } from '@/screens/Chamber/components/elements/SkeletonLoader/StyledSkeletons';
import {
  StyledFlexColumn,
  StyledFlexRow,
} from '@/screens/Chamber/components/elements/SkeletonLoader/styled';
import { Card } from '@/components/Card';
import SkeletonLoaderElementHeader from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderElementHeader';

const SkeletonLoaderSkillElement = () => (
  <Card>
    <StyledFlexColumn gap={21} justify="baseline" align="flex-start">
      <SkeletonLoaderElementHeader />
      <StyledFlexRow gap={12}>
        <SizedSkeleton w={140} h={40} r={8} />
        <SizedSkeleton w={140} h={40} r={8} />
        <SizedSkeleton w={94} h={40} r={8} />
        <SizedSkeleton w={168} h={40} r={8} />
        <SizedSkeleton w={145} h={40} r={8} />
      </StyledFlexRow>
    </StyledFlexColumn>
  </Card>
);

export default SkeletonLoaderSkillElement;
