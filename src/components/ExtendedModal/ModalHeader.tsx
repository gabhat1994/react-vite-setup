import {
  ModalSize,
  type ModalHeaderStyledProps,
  type SpacingMode,
} from '@/components/ExtendedModal/types';
import { breakpoints, sizes } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks';
import useModalFullScreenMode from '@/hooks/modal/useModalFullScreenMode';
import useModalWidth from '@/hooks/modal/useModalWidth';
import { Spacer } from '@/layout';
import React, { useContext, useMemo, type ReactNode } from 'react';
import styled, { css, type CSSProperties } from 'styled-components';
import { TSpan, type TProps } from '../Typography/Typography';
import { ModalContext } from './ModalContext';

const ModalHeaderStyled = styled.div<ModalHeaderStyledProps>`
  word-break: break-word;
  min-height: ${({ size, existGapOverTitle }) =>
    size === ModalSize.S
      ? existGapOverTitle
        ? '76px'
        : '36px'
      : existGapOverTitle
      ? '80px'
      : '40px'};
  display: flex;
  padding-bottom: ${({ bottomPadding, spacingMode }) =>
    bottomPadding ?? spacingMode === 'padding-elements' ? 24 : 0}px;

  padding-top: ${({ topPadding, spacingMode }) =>
    topPadding ?? spacingMode === 'padding-elements' ? 24 : 0}px;
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  align-items: center;
  position: relative;
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};

  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding-bottom: ${({ spacingMode }) =>
      spacingMode === 'padding-elements' ? 16 : 0}px;
  }
`;

const CenterPosition = css`
  margin-left: auto;
  margin-right: auto;
  left: 0;
  top: 0;
  right: 0;
  text-align: center;
  word-wrap: break-word;
`;

const AbsoluteLeftPosition = css`
  position: absolute;
  left: 24px;
  top: 0px;
  text-align: left;
`;

const AbsoluteRightPosition = css`
  position: absolute;
  right: 0px;
  top: 0px;
`;

export const ModalTitleWrapper = styled.div<{ maxTitleWidth?: number }>`
  ${CenterPosition};

  max-width: ${({ maxTitleWidth }) =>
    maxTitleWidth ? `${maxTitleWidth}px` : 'inherit'};

  @media (max-width: ${sizes.MOBILE_MAX}) {
    ${AbsoluteLeftPosition}
  }
`;

const ActionWrapper = styled.div`
  ${AbsoluteLeftPosition};
  z-index: 1;

  @media (max-width: ${sizes.MOBILE_MAX}) {
    ${CenterPosition};
    top: 16px;
  }
`;

const RightMobileContainer = styled.div`
  ${AbsoluteRightPosition};

  @media (max-width: ${sizes.MOBILE_MAX}) {
    top: 16px;
    right: 16px;
  }
`;

const RightTabletContainer = styled.div`
  ${AbsoluteRightPosition};

  @media (max-width: ${sizes.TABLET_L}) {
    right: 16px;
  }
`;

const MobileTitleWrapper = styled.div<{
  isFullScreen?: boolean;
  spacingMode?: SpacingMode;
}>`
  padding-bottom: ${({ spacingMode }) =>
    spacingMode === 'padding-elements' ? 24 : 0}px;
  text-align: center;
  word-wrap: break-word;

  ${({ isFullScreen, spacingMode }) =>
    isFullScreen &&
    `
        padding-bottom: ${spacingMode === 'padding-elements' ? 16 : 0}px;
        text-align: left;
      `}
`;

type ModalHeaderProps = ModalHeaderStyledProps & {
  action?: ReactNode;
  rightMobileContainer?: ReactNode;
  isFullScreen?: boolean;
  tSpanProps?: TProps;
  maxTitleWidth?: number;
  topPadding?: number;
  titleCss?: CSSProperties;
  justify?: 'center' | 'flex-start' | 'flex-end';
};

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  justify = 'center',
  titleCss,
  ...props
}) => {
  const { size, existCloseButton, spacingMode } = useContext(ModalContext);
  const windowDimensions = useWindowDimensions();
  const isMobile = windowDimensions.width <= breakpoints.MOBILE_MAX;
  const defaultIsFullScreen = useModalFullScreenMode(size);
  const modalWidth = useModalWidth(size);

  const isFullScreen = props.isFullScreen ?? defaultIsFullScreen;

  const { action, rightMobileContainer, children } = props;

  const Title = (centered: boolean = false) => (
    <>
      {typeof children === 'string' ? (
        <TSpan
          font={size === ModalSize.S ? 'heading-s-bold' : 'heading-xs-bold'}
          textAlign={centered ? 'center' : 'left'}
          colorToken="--text-modal-header-neutral-default"
          {...props.tSpanProps}
        >
          {children}
        </TSpan>
      ) : (
        <>{children}</>
      )}
    </>
  );

  const maxTitleWidth = useMemo(() => {
    if (props.maxTitleWidth) {
      return props.maxTitleWidth;
    }

    if (existCloseButton && modalWidth) {
      return modalWidth - 200;
    }

    return modalWidth;
  }, [existCloseButton, modalWidth, props.maxTitleWidth]);

  const isTextOverflowed =
    typeof children === 'string' &&
    maxTitleWidth &&
    children.length * 9 > maxTitleWidth;

  return (
    <>
      {isMobile && rightMobileContainer && (
        <RightMobileContainer>
          {isFullScreen && action}
          {rightMobileContainer}
        </RightMobileContainer>
      )}
      {!isMobile ? (
        <>
          <ModalHeaderStyled
            {...props}
            spacingMode={spacingMode}
            flexDirection="row"
            justifyContent={justify}
            size={size}
          >
            {action && !isFullScreen && <ActionWrapper>{action}</ActionWrapper>}
            <ModalTitleWrapper maxTitleWidth={maxTitleWidth} style={titleCss}>
              {isTextOverflowed && existCloseButton && <Spacer height={46} />}
              {Title(true)}
            </ModalTitleWrapper>
            {isFullScreen && (
              <RightTabletContainer>
                {action}
                {rightMobileContainer}
              </RightTabletContainer>
            )}
          </ModalHeaderStyled>
        </>
      ) : (
        <MobileTitleWrapper
          isFullScreen={isFullScreen}
          spacingMode={spacingMode}
        >
          {Title()}
        </MobileTitleWrapper>
      )}
    </>
  );
};

export default ModalHeader;
