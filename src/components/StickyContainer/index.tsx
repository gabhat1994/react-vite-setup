import { useState, useRef, type HTMLAttributes } from 'react';
import { useLaunchDarkly, useWindowDimensions } from '@/hooks';
import useResizeObserver from '@/hooks/useResizeObserver';
import { StickyWrapper } from './styles';

interface SticyWrapperProps extends HTMLAttributes<HTMLDivElement> {
  leftNav?: boolean;
}

const StickyContainer = ({ children, leftNav = false }: SticyWrapperProps) => {
  const { height } = useWindowDimensions();
  const [sideBarHeight, setSideBarHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const { flags } = useLaunchDarkly();

  useResizeObserver(ref, () => {
    setSideBarHeight(ref?.current?.clientHeight || 0);
  });

  return (
    <StickyWrapper
      data-testid="sticky-container"
      isSticky={sideBarHeight < height}
      leftNav={leftNav}
      height={sideBarHeight}
      $isAppUiV2={flags.newAppNavigation}
    >
      <div ref={ref}>{children}</div>
    </StickyWrapper>
  );
};

export { StickyContainer };
