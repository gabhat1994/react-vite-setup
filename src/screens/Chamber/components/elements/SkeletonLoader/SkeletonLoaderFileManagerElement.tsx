import { Card } from '@/components/Card';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import SkeletonLoaderElementHeader from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderElementHeader';
import {
  StyledFlexColumn,
  StyledFlexRow,
} from '@/screens/Chamber/components/elements/SkeletonLoader/styled';
import SkeletonLoaderFileManagerBody from './SkeletonLoaderFileManagerBody';

const SkeletonLoaderFileManagerElement = () => {
  const { isMobile } = useBreakpoints();

  return (
    <Card>
      <StyledFlexColumn gap={21} justify="baseline" align="flex-start">
        <SkeletonLoaderElementHeader />
        {isMobile ? (
          <StyledFlexColumn
            fullWidth
            align="flex-start"
            justify="flex-start"
            gap={16}
          >
            <SkeletonLoaderFileManagerBody />
          </StyledFlexColumn>
        ) : (
          <StyledFlexRow
            fullWidth
            align="flex-start"
            justify="flex-start"
            gap={16}
          >
            <SkeletonLoaderFileManagerBody />
          </StyledFlexRow>
        )}
      </StyledFlexColumn>
    </Card>
  );
};

export default SkeletonLoaderFileManagerElement;
