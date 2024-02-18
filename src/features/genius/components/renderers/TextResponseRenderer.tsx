import { TSpan } from '@/components';
import { motion } from 'framer-motion';
import { useLayoutEffect, useRef } from 'react';
import { Stack } from '@/layout';
import { useGeniusTextResponse } from '../../hooks/useGeniusTextResponse';

export function TextResponseRenderer() {
  const ref = useRef<HTMLDivElement>(null);
  const { chunks } = useGeniusTextResponse();

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [chunks]);

  return (
    <Stack vertical padding="8px 0 0" ref={ref}>
      <div style={{ whiteSpace: 'pre-line' }}>
        {chunks.map((chunk, index) => (
          <motion.span
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <TSpan font="body-m">{chunk}</TSpan>
          </motion.span>
        ))}
      </div>
    </Stack>
  );
}
