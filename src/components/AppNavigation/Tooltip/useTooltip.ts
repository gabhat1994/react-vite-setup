import { type Placement } from '@popperjs/core';
import { useCallback, useRef, useState } from 'react';
import { usePopper } from 'react-popper';

interface UseTooltipOptions {
  skidding?: number;
  distance?: number;
  placement?: Placement;
}

export function useTooltip<TriggerElement extends HTMLElement>({
  skidding = 0,
  distance = 0,
  placement = 'right',
}: UseTooltipOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const ref = useRef<TriggerElement>(null);

  const { styles, attributes } = usePopper(ref.current, popperElement, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [skidding, distance],
        },
      },
    ],
  });

  const isTouchDevice = navigator.maxTouchPoints > 0;

  const onMouseEnter = useCallback(() => {
    if (isTouchDevice) return;
    setIsOpen(true);
  }, [isTouchDevice]);
  const onMouseLeave = useCallback(() => {
    if (isTouchDevice) return;
    setIsOpen(false);
  }, [isTouchDevice]);

  return {
    triggerProps: {
      ref,
      onMouseEnter,
      onMouseLeave,
    },
    tooltipProps: {
      ref: setPopperElement,
      isOpen,
      style: styles.popper,
      ...attributes,
    },
  };
}
