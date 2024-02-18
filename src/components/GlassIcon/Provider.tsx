import {
  createContext,
  type DOMAttributes,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { type AnimatedGlassIconState } from './types';

interface AnimatedGlassIconContextValues {
  state: AnimatedGlassIconState;
}

const AnimatedGlassIconContext = createContext<AnimatedGlassIconContextValues>(
  undefined as unknown as AnimatedGlassIconContextValues,
);

interface ProviderProps {
  children: (
    props: Required<
      Pick<DOMAttributes<Element>, 'onMouseEnter' | 'onMouseLeave'>
    >,
  ) => ReactNode;
  isActive: boolean;
}

export function Provider({ children, isActive }: ProviderProps) {
  const [isHovered, setIsHovered] = useState(false);

  const value = useMemo<AnimatedGlassIconContextValues>(
    () => ({
      state: isActive ? 'active' : isHovered ? 'hover' : 'default',
    }),
    [isActive, isHovered],
  );

  return (
    <AnimatedGlassIconContext.Provider value={value}>
      {children({
        onMouseEnter: () => {
          setIsHovered(true);
        },
        onMouseLeave: () => {
          setIsHovered(false);
        },
      })}
    </AnimatedGlassIconContext.Provider>
  );
}

export function useAnimatedGlassIconContext() {
  const context = useContext(AnimatedGlassIconContext);

  if (!context) {
    throw new Error(
      'AnimatedGlassIcon.AnimatedIcon must be rendered within AnimatedGlassIcon.Provider.',
    );
  }

  return context;
}
