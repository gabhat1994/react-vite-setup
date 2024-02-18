import { type Placement } from '@popperjs/core';
import { type FC, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { useClickOutside } from '@/hooks';
import { Stack } from '@/layout';
import {
  Arrow,
  PopoverContainer,
  ReferenceContainer,
  StyledPopoverWrapper,
} from './styles';
import { CloseButton } from './CloseButton';

interface IPopoverWrapper {
  isOpen: boolean;
  width?: number;
  placement?: Placement;
  onClose: () => void;
  renderTargetContent: () => JSX.Element;
  renderPopoverContent: () => JSX.Element;
  offsetY?: number;
  offsetX?: number;
}

export const PopoverWrapper: FC<IPopoverWrapper> = ({
  isOpen,
  width = 384,
  renderTargetContent,
  renderPopoverContent,
  placement = 'top',
  onClose,
  offsetX = 0,
  offsetY = 150,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, true, onClose, {
    excludes: ['#create_wallet_button', '#confirm_create_wallet_button'],
  });
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    strategy: 'fixed',
    placement,
    modifiers: [
      {
        name: 'offset',
        options: { offset: [offsetX, offsetY] },
      },
      { name: 'arrow', options: { element: arrowElement, padding: 120 } },
    ],
  });

  return (
    <StyledPopoverWrapper
      ref={containerRef}
      onClick={(e) => e.stopPropagation()}
    >
      <ReferenceContainer
        ref={setReferenceElement}
        data-testid="popover-reference-container"
      >
        {renderTargetContent()}
      </ReferenceContainer>
      {isOpen && (
        <PopoverContainer
          width={width}
          placement={placement}
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <Stack padding={16}>
            <CloseButton onClose={onClose} />
            {renderPopoverContent()}
          </Stack>
          <Arrow ref={setArrowElement} style={styles.arrow} />
        </PopoverContainer>
      )}
    </StyledPopoverWrapper>
  );
};
