import { useMemo } from 'react';
import {
  SizedSkeleton,
  SkeletonLoaderAvatar,
} from '@/screens/Chamber/components/elements/SkeletonLoader/StyledSkeletons';
import {
  StyledFlexColumn,
  StyledFlexRow,
} from '@/screens/Chamber/components/elements/SkeletonLoader/styled';
import { StyledSkeleton } from '@/components/ChamberBox/SkeletonChamberBox';
import { Card } from '@/components/Card';
import { useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import SkeletonLoaderParagraph from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderParagraph';

const SkeletonLoaderHoumHeader = () => {
  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => width <= breakpoints.MOBILE_MAX, [width]);
  const maxWidth = useMemo(() => (isMobile ? '87%' : undefined), [isMobile]);

  return (
    <Card>
      <StyledFlexColumn gap={24} justify="baseline" align="flex-start">
        <StyledFlexRow gap={8} justify="flex-start" align="flex-start">
          <SkeletonLoaderAvatar />
          <StyledFlexColumn align="flex-start" gap={8}>
            <StyledFlexRow gap={8}>
              <StyledSkeleton w={64} h={30} r={8} />
              <StyledSkeleton w={110} h={30} r={8} />
            </StyledFlexRow>
            <SizedSkeleton w={240} h={33} r={8} maxWidth={maxWidth} />
            <SizedSkeleton w={110} h={20} r={8} />
          </StyledFlexColumn>
        </StyledFlexRow>
        <SkeletonLoaderParagraph />
      </StyledFlexColumn>
    </Card>
  );
};

export default SkeletonLoaderHoumHeader;
