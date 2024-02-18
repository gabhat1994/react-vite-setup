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

const SkeletonDocumentInternal = () => (
  <StyledFlexRow
    style={{
      border: 'solid 1px var(--border-card-neutral-default)',
      padding: '8px',
    }}
    fullWidth
  >
    <StyledFlexRow justify="space-between" gap={16} fullWidth>
      <SkeletonLoaderPost />
      <StyledFlexColumn gap={7} fullWidth align="flex-start">
        <SizedSkeleton w={139} h={20} r={8} />
        <SizedSkeleton w={139} h={20} r={8} />
      </StyledFlexColumn>
    </StyledFlexRow>
    <SizedSkeleton w={24} h={24} r={8} />
  </StyledFlexRow>
);

const SkeletonLoaderDocumentElement = () => (
  <Card>
    <StyledFlexColumn gap={21} justify="baseline" align="flex-start">
      <SkeletonLoaderElementHeader />
      <StyledFlexRow gap={16} fullWidth>
        <SkeletonDocumentInternal />
        <SkeletonDocumentInternal />
      </StyledFlexRow>
    </StyledFlexColumn>
  </Card>
);

export default SkeletonLoaderDocumentElement;
