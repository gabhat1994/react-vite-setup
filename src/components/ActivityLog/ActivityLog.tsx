import React, { Children } from 'react';
import { Stack } from '@/layout';
import { Separator } from '../Separator/Separator';

interface ActivityLogListProps {
  children: React.ReactNode;
}

export function ActivityLogList({ children }: ActivityLogListProps) {
  return (
    <Stack gap={8} vertical fullWidth align="stretch">
      {Children.map(children, (child, index) => (
        <>
          {index > 0 ? <Separator fullWidth noMargin /> : null}
          {child}
        </>
      ))}
    </Stack>
  );
}
