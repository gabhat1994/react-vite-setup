import React from 'react';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';

interface SummaryTotalProps {
  label: React.ReactNode;
  value: React.ReactNode;
}

export function SummaryTotal({ label, value }: SummaryTotalProps) {
  return (
    <Stack gap={8} justify="end">
      <TSpan font="body-l" colorToken="--text-card-neutral-highlighted">
        {label}
      </TSpan>
      <TSpan font="body-l-bold" colorToken="--text-card-neutral-highlighted">
        {value}
      </TSpan>
    </Stack>
  );
}
