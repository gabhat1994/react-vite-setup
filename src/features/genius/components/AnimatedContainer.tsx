import useResizeObserver from '@/hooks/useResizeObserver';
import { AnimatePresence } from 'framer-motion';
import React, { useRef, useState } from 'react';
import S from './styles';

export const AnimatedContainer: React.FC = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>('auto');

  useResizeObserver(ref, (rect) => {
    setHeight(rect.height);
  });

  return (
    <AnimatePresence>
      <S.StyledMotion
        style={{ height }}
        animate={{ height }}
        transition={{ duration: 0.2 }}
      >
        <div ref={ref}>{children}</div>
      </S.StyledMotion>
    </AnimatePresence>
  );
};
