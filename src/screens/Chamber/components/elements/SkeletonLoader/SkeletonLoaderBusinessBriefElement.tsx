import { useMemo } from 'react';
import { SizedSkeleton } from '@/screens/Chamber/components/elements/SkeletonLoader/StyledSkeletons';
import { StyledFlexColumn } from '@/screens/Chamber/components/elements/SkeletonLoader/styled';
import { Card } from '@/components/Card';
import { useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import SkeletonLoaderParagraph from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderParagraph';
import SkeletonLoaderElementHeader from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderElementHeader';

const SkeletonLoaderBusinessBriefElement = () => {
  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => width <= breakpoints.MOBILE_MAX, [width]);
  const maxWidth = useMemo(() => (isMobile ? '87%' : undefined), [isMobile]);

  return (
    <Card>
      <StyledFlexColumn gap={16} justify="baseline" align="flex-start">
        <SkeletonLoaderElementHeader />
        <SizedSkeleton w={313} h={40} r={8} maxWidth={maxWidth} />
        <SkeletonLoaderParagraph />
      </StyledFlexColumn>
    </Card>
  );
};

export default SkeletonLoaderBusinessBriefElement;
