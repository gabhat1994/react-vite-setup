import { Portal } from '@/components/Portal';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions, useWindowVisualView } from '@/hooks';
import useModalFullScreenMode from '@/hooks/modal/useModalFullScreenMode';
import useModalWidth from '@/hooks/modal/useModalWidth';
import { Spacer } from '@/layout';
import { AnimatePresence } from 'framer-motion';
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { ModalCloseButton } from './ModalCloseButton';
import ModalContext from './ModalContext';
import { Content, Inner, StyledModal } from './styles';
import { type IModal } from './types';

const animationDuration = 200;

const animationSettings = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export const Modal = forwardRef<HTMLDivElement, IModal>(
  (
    {
      testId,
      size,
      customCloseButton,
      hasBackButton,
      children,
      spacingMode = 'padding-elements',
      isScrollableContent = false,
      disableBackdropClick = false,
      disableEscapeKeyDown = false,
      enableAnimation = true,
      enableCloseButton = false,
      forceHideCloseButton = false,
      onClose,
      open,
      style,
      isFullScreen,
      overlayVariant = 'light',
      closeButtonStyles,
      targetRef,
      modalHeaderAddonButtons,
      modalFooterAddonButtons,
      noPaddingNoBorder,
    },
    ref,
  ) => {
    const [requestedClose, setRequestedClose] = useState(false);
    const windowDimensions = useWindowDimensions();
    const isMobile = windowDimensions.width < breakpoints.TABLET;
    const width = useModalWidth(size);
    const defaultIsFullScreen = useModalFullScreenMode(size);
    const { visualViewport } = useWindowVisualView();
    const offsetY = (visualViewport?.offsetTop || 0) / 2;

    const close = useCallback(() => {
      if (!enableAnimation) {
        onClose?.();
        return;
      }
      // animation proceed
      setRequestedClose(true);
      setTimeout(() => {
        onClose?.();
        setRequestedClose(false);
      }, animationDuration);
    }, [onClose, enableAnimation]);

    const handleKeyPress = useCallback(
      (ev: KeyboardEvent) => {
        if (ev.code === 'Escape' && open) close();
      },
      [close, open],
    );

    useEffect(() => {
      if (!disableEscapeKeyDown) {
        window.addEventListener('keydown', handleKeyPress);
      }
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, [handleKeyPress, disableEscapeKeyDown]);

    const animation = enableAnimation ? animationSettings : {};

    const showCloseButton =
      (enableCloseButton || hasBackButton || (isFullScreen && isMobile)) &&
      !forceHideCloseButton;

    const renderCloseButton = () => {
      if (customCloseButton) {
        return (
          <>
            {customCloseButton}
            {isMobile && (isFullScreen ?? defaultIsFullScreen) && (
              <Spacer height={40} />
            )}
          </>
        );
      }

      if (showCloseButton) {
        return (
          <>
            <ModalCloseButton
              hasBackButton={hasBackButton}
              isFullScreen={isFullScreen ?? defaultIsFullScreen}
              {...(closeButtonStyles || {})}
              onClose={close}
            />
            {isMobile && (isFullScreen ?? defaultIsFullScreen) && (
              <Spacer height={40} />
            )}
          </>
        );
      }

      return null;
    };

    const stopClickEvent = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const memoizedModalContextValue = useMemo(
      () => ({
        size,
        existCloseButton: !!customCloseButton || showCloseButton,
        spacingMode,
      }),
      [customCloseButton, showCloseButton, size, spacingMode],
    );

    if (!open) {
      return null;
    }

    return (
      <Portal>
        <ModalContext.Provider value={memoizedModalContextValue}>
          <StyledModal ref={ref} data-testid={testId}>
            <AnimatePresence>
              {!requestedClose && (
                <Inner
                  key="modal"
                  isScrollableContent={isScrollableContent}
                  onClick={(e) =>
                    disableBackdropClick ? stopClickEvent(e) : close()
                  }
                  {...animation}
                  role="dialog"
                  overlayVariant={overlayVariant}
                >
                  <>
                    {modalHeaderAddonButtons}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={() => {}}
                      onMouseDown={() => {}}
                      role="button"
                      tabIndex={0}
                      aria-label="modal-content"
                      style={{ height: isFullScreen ? '100%' : 'unset' }}
                    >
                      <Content
                        id="modal-content"
                        data-testid="modal-content"
                        innerHeight={window.innerHeight}
                        spacingMode={spacingMode}
                        translateY={offsetY}
                        isFullScreen={isFullScreen ?? defaultIsFullScreen}
                        ref={targetRef}
                        style={style}
                        width={width}
                        noPaddingNoBorder={noPaddingNoBorder}
                      >
                        {renderCloseButton()}
                        {typeof children === 'function'
                          ? children({ onClose: close })
                          : children}
                      </Content>
                    </div>
                    {modalFooterAddonButtons}
                  </>
                </Inner>
              )}
            </AnimatePresence>
          </StyledModal>
        </ModalContext.Provider>
      </Portal>
    );
  },
);

export default Modal;
