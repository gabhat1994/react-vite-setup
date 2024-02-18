import { AnimatePresence, type MotionProps } from 'framer-motion';
import { forwardRef, useCallback, useEffect } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { Portal } from '@/components/Portal';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { Icon } from '../Icon';
import {
  Children,
  Content,
  ContentTitleWrapper,
  ContentWrapper,
  Inner,
  StyledModal,
} from './styles';
import { type SideModalPlacement, type SideModalProps } from './types';

const BACKDROP_ANIMATION_SETTINGS: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
const DRAWER_ANIMATION_SETTINGS: Record<SideModalPlacement, MotionProps> = {
  left: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
    transition: { duration: 0.3 },
  },
  right: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    transition: { duration: 0.3 },
  },
};

export const SideModal = forwardRef<HTMLDivElement | null, SideModalProps>(
  (
    {
      children,
      disableBackdropClick = false,
      disableEscapeKeyDown = false,
      enableAnimation,
      onClose,
      open,
      showCloseButton = false,
      padding = 24,
      placement = 'right',
      overflowX = 'hidden',
      overflowY,
      title,
      titleFont,
      showScroll,
      titleFixed,
      topOffset: topOffsetFromProps,
      actionButton,
      height,
      isBackgroundOpacity = true,
      nonBlockingModal,
      rightSecondaryIcon,
      width,
      mobileWidth,
      className,
      borderColor,
    },
    ref,
  ) => {
    const { flags } = useLaunchDarkly();

    // TODO: Maybe we can get this value from some context?
    const appBarHeight = flags.newAppNavigation ? 64 : 72;
    const topOffset = topOffsetFromProps ?? appBarHeight + 1;

    const handleKeyPress = useCallback(
      (ev: KeyboardEvent) => {
        if (ev.code === 'Escape' && open) {
          onClose?.();
        }
      },
      [onClose, open],
    );

    useEffect(() => {
      if (!disableEscapeKeyDown) {
        window.addEventListener('keydown', handleKeyPress);
      }

      return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress, disableEscapeKeyDown]);

    const backdropAnimation = enableAnimation
      ? BACKDROP_ANIMATION_SETTINGS
      : {};

    const drawerAnimation = enableAnimation
      ? DRAWER_ANIMATION_SETTINGS[placement]
      : {};

    const closeButton = showCloseButton ? (
      <Icon
        name="close_m"
        color="--icon-button-neutral-default"
        size={24}
        onClick={onClose}
      />
    ) : null;

    const Container = nonBlockingModal ? 'div' : Portal;
    return (
      <AnimatePresence>
        {open && (
          <Container className={className}>
            <StyledModal
              ref={ref}
              data-testid="side-modal-testid"
              nonBlockingModal={nonBlockingModal}
              width={width}
              topOffset={topOffset}
              onClick={() => (disableBackdropClick ? null : onClose?.())}
            >
              <>
                <Inner
                  {...backdropAnimation}
                  topOffset={topOffset}
                  isBackgroundOpacity={isBackgroundOpacity}
                />
                <ContentWrapper
                  {...drawerAnimation}
                  placement={placement}
                  width={width}
                  mobileWidth={mobileWidth}
                  onClick={(e) => e.stopPropagation()}
                  topOffset={nonBlockingModal ? 0 : topOffset}
                >
                  <Content
                    overflowX={overflowX}
                    overflowY={overflowY}
                    showScroll={showScroll}
                    role="dialog"
                    height={height}
                    placement={placement}
                    borderColor={borderColor}
                  >
                    {title && (
                      <ContentTitleWrapper fixed={titleFixed}>
                        <Breadcrumbs
                          title={title}
                          titleFont={titleFont}
                          titleAlign="left"
                          leftIcon={
                            placement === 'right' ? closeButton : actionButton
                          }
                          rightIcon={
                            placement === 'left' ? closeButton : actionButton
                          }
                          rightSecondaryIcon={rightSecondaryIcon}
                        />
                      </ContentTitleWrapper>
                    )}
                    <Children
                      padding={padding}
                      overflowX={overflowX}
                      overflowY={overflowY}
                    >
                      {typeof children === 'function'
                        ? children({ onClose: onClose ?? (() => {}) })
                        : children}
                    </Children>
                  </Content>
                </ContentWrapper>
              </>
            </StyledModal>
          </Container>
        )}
      </AnimatePresence>
    );
  },
);

export default SideModal;
