import { useMemo } from 'react';

import { Icon } from '@/components/Icon';

import { ImageWrapper } from './styles';
import type { EventRecurringProps } from './types';
import { useRecurringLabel } from '../../hooks/useRecurringLabel';

export const EventRecurringTooltip = ({
  variant,
  position,
  ...props
}: EventRecurringProps) => {
  const tooltipTitle = useRecurringLabel({ ...props, isShortHand: true });

  const color = useMemo(
    () =>
      variant === 'regular'
        ? '--icon-badge-neutral-default'
        : '--text-badge-neutral-alt-default',
    [variant],
  );

  return (
    <ImageWrapper position={position} data-title={tooltipTitle}>
      <Icon name="repeat_xs" size={20} color={color} />
    </ImageWrapper>
  );
};
