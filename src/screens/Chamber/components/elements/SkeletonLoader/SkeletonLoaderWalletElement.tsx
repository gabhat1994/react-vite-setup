import { SizedSkeleton } from '@/screens/Chamber/components/elements/SkeletonLoader/StyledSkeletons';
import {
  StyledFlexColumn,
  StyledFlexRow,
} from '@/screens/Chamber/components/elements/SkeletonLoader/styled';
import { Card } from '@/components/Card';
import SkeletonLoaderElementHeader from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderElementHeader';

const SkeletonLoaderWalletElement = () => (
  <Card>
    <StyledFlexColumn gap={21} justify="baseline" align="flex-start">
      <StyledFlexRow gap={12} justify="space-between" fullWidth>
        <SkeletonLoaderElementHeader />
        <StyledFlexRow gap={12}>
          <SizedSkeleton w={118} h={40} r={8} />
          <SizedSkeleton w={118} h={40} r={8} />
        </StyledFlexRow>
      </StyledFlexRow>
      <StyledFlexColumn
        gap={12}
        fullWidth
        style={{
          border: 'solid 1px var(--border-card-neutral-default)',
          padding: '8px',
          borderRadius: '16px',
        }}
        align="flex-start"
      >
        <SizedSkeleton w={118} h={16} r={8} />
        <SizedSkeleton w={186} h={31} r={8} />
      </StyledFlexColumn>
    </StyledFlexColumn>
  </Card>
);

export default SkeletonLoaderWalletElement;
