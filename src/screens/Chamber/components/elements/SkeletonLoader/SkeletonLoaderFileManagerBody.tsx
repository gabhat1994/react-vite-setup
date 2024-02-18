import { Stack } from '@/layout';
import { SizedSkeleton } from '@/screens/Chamber/components/elements/SkeletonLoader/StyledSkeletons';
import {
  StyledFlexColumn,
  StyledFlexRow,
  StyledFlexRowBordered,
} from '@/screens/Chamber/components/elements/SkeletonLoader/styled';

const SkeletonLoaderFileManagerBody = () => (
  <Stack vertical fullWidth gap={8}>
    <StyledFlexRowBordered gap={12} fullWidth justify="space-between">
      <StyledFlexRow gap={16}>
        <SizedSkeleton w={48} h={48} r={8} />
        <StyledFlexColumn gap={8}>
          <SizedSkeleton w={140} h={20} r={8} />
          <SizedSkeleton w={140} h={16} r={8} />
        </StyledFlexColumn>
      </StyledFlexRow>
      <SizedSkeleton w={24} h={24} r={8} />
    </StyledFlexRowBordered>

    <StyledFlexRowBordered gap={12} fullWidth justify="space-between">
      <StyledFlexRow gap={16}>
        <SizedSkeleton w={48} h={48} r={8} />
        <StyledFlexColumn gap={8}>
          <SizedSkeleton w={140} h={20} r={8} />
          <SizedSkeleton w={140} h={16} r={8} />
        </StyledFlexColumn>
      </StyledFlexRow>
      <SizedSkeleton w={24} h={24} r={8} />
    </StyledFlexRowBordered>
  </Stack>
);

export default SkeletonLoaderFileManagerBody;
