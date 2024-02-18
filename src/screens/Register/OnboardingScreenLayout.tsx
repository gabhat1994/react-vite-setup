import { useMemo } from 'react';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks';
import AuthScreenLayout from '@/layout/AuthScreenLayout';
import { type OnboardingScreenLayoutProps } from './types';

export const OnboardingScreenLayout = ({
  children,
}: OnboardingScreenLayoutProps) => {
  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => width <= breakpoints.MOBILE_MAX, [width]);

  return (
    <AuthScreenLayout
      type="onboarding"
      dynamicWidth
      overflow="auto"
      dynamicHeight={isMobile}
    >
      {children}
    </AuthScreenLayout>
  );
};
