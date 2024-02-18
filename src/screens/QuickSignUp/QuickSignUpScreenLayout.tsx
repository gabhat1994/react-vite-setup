import { useMemo } from 'react';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks';
import NextAppSignUpLayout from '@/layout/NextAppSignUpLayout';
import { type QuickSignUpScreenLayoutProps } from './types';

export const QuickSignUpScreenLayout = ({
  children,
  onBackClick,
  showBackButton = true,
}: QuickSignUpScreenLayoutProps) => {
  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => width <= breakpoints.MOBILE_MAX, [width]);

  return (
    <NextAppSignUpLayout
      dynamicWidth
      overflow="auto"
      dynamicHeight={isMobile}
      onBackClick={onBackClick}
      showBackButton={showBackButton}
    >
      {children}
    </NextAppSignUpLayout>
  );
};
