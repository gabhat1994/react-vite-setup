import React from 'react';

import { Separator } from '@/components/Separator/Separator';
import { Stack } from '@/layout';
import { ElementWrapperV2 } from '.';

type ElementBodyListItemWrapperProps = {
  index: number;
  isLastItem: boolean;
  type: string;
};

export const ElementBodyListItemWrapper: React.FC<
  ElementBodyListItemWrapperProps
> = ({ index, isLastItem, children, type }) => (
  <Stack fullWidth vertical aria-label={`${type}_${index}`} gap={16}>
    <ElementWrapperV2.Body>{children}</ElementWrapperV2.Body>
    {!isLastItem && (
      <Separator
        colorToken="--border-card-neutral-default"
        fullWidth
        noMargin
      />
    )}
  </Stack>
);
