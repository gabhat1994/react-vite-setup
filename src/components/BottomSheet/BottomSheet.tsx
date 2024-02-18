import { AnimatePresence, type HTMLMotionProps } from 'framer-motion';
import { useCallback, useEffect } from 'react';
import { Portal } from '@/components/Portal';
import S from './styles';
import { type IBottomSheet } from './types';
import BottomSheetCloseButton from './BottomSheetCloseButton';

const sheetAnimation: HTMLMotionProps<'div'> = {
  initial: { opacity: 0, y: '100%' },
  animate: { opacity: 1, y: '0%' },
  exit: { opacity: 0, y: '100%' },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

const overlayAnimation: HTMLMotionProps<'div'> = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

export const BottomSheet = ({
  testId,
  children,
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
  enableAnimation,
  fullHeight = false,
  enableCloseButton = false,
  onClose,
  open,
  style,
  targetRef,
  usePortal = true,
  position,
  id,
  role,
  'aria-label': ariaLabel,
}: IBottomSheet) => {
  const handleKeyPress = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.code === 'Escape' && open) onClose?.();
    },
    [onClose, open],
  );

  useEffect(() => {
    if (!disableEscapeKeyDown)
      window.addEventListener('keydown', handleKeyPress);

    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress, disableEscapeKeyDown]);

  const BottomSheetContent = (
    <>
      <S.Wrapper
        id={id}
        data-testid={testId}
        role={role}
        aria-label={ariaLabel}
        style={{
          zIndex: style?.zIndex,
        }}
      >
        <S.Inner
          onClick={() => (disableBackdropClick ? null : onClose?.())}
          {...(enableAnimation ? overlayAnimation : {})}
        />
        <S.Sheet
          key="1"
          role="dialog"
          $fullHeight={fullHeight}
          onClick={(e) => e.stopPropagation()}
          {...(enableAnimation ? sheetAnimation : {})}
        >
          <S.Content
            data-testid="BottomSheet-content"
            ref={targetRef}
            style={style}
            fullHeight={fullHeight}
          >
            {enableCloseButton && (
              <BottomSheetCloseButton
                onClose={onClose}
                padding={style?.padding}
                textOnly={fullHeight}
              />
            )}
            {typeof children === 'function'
              ? children({ onClose: onClose ?? (() => {}) })
              : children}
          </S.Content>
        </S.Sheet>
      </S.Wrapper>
    </>
  );

  return (
    <AnimatePresence initial={false}>
      {open &&
        (usePortal ? (
          <Portal fullHeight position={position}>
            {BottomSheetContent}
          </Portal>
        ) : (
          BottomSheetContent
        ))}
    </AnimatePresence>
  );
};

export default BottomSheet;
