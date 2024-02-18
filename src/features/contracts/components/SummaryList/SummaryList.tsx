import { type ReactNode } from 'react';
import { Stack } from '@/layout';

interface SummaryListProps {
  children: ReactNode;
}

export function SummaryList({ children }: SummaryListProps) {
  return (
    <Stack vertical gap={16} align="stretch" fullWidth>
      {children}
    </Stack>
  );
}
