import { ellipsisText } from '@/common/globalStyles';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { TSpan } from '@/components/Typography';
import { devices, sizes } from '@/constants/devices';
import styled, { css } from 'styled-components';

export const Wrapper = styled(Card)<{
  isVisible?: boolean;
  isHighlight?: boolean;
}>`
  border-radius: 0 !important;
  position: relative;
  padding: 0px !important;
  background: transparent;
  @media ${devices.LAPTOP} {
    border-radius: 16px;
    padding: 0px !important;
    padding: 24px;
  }
  @media ${devices.TABLET} {
    border-radius: 16px;
  }
  background: none !important;
  ${({ isVisible }) =>
    !isVisible && `background-color: var(--bg-card-neutral-alt-hidden);`}
  ${({ isHighlight }) =>
    isHighlight &&
    `animation-name: highlightElement; animation-duration: 10s; animation-delay:5s;`}

  @keyframes highlightElement {
    from {
      border: 1px solid #663fba;
      box-shadow: 0px 0px 0px 4px #e9e2fe;
      -moz-box-shadow: 0px 0px 0px 4px #e9e2fe;
      -webkit-box-shadow: 0px 0px 0px 4px #e9e2fe;
    }
    to {
      border: none;
      box-shadow: unset;
      -moz-box-shadow: unset;
      -webkit-box-shadow: unset;
    }
  }
`;

export const WrapperLoading = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WrapperSpinner = styled.div`
  position: relative;
  width: 100%;
`;

export const WrapperHead = styled.div<{
  isEditing: boolean;
  fullWidth?: boolean;
}>`
  display: inline-flex;
  gap: 12px;
  justify-content: ${(props) =>
    props.isEditing ? 'space-between' : 'flex-start'};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  align-items: center;
  @media (max-width: ${sizes.TABLET}) {
    height: unset;
    padding: 3px;
  }
`;

export const WrapperHeadActionButtons = styled.div`
  display: inline-flex;
  gap: 7px;
  @media (max-width: ${sizes.TABLET}) {
    align-self: flex-start;
  }
`;

export const CloseWalletWrapperModalChildren = styled.div<{
  height?: number;
  width?: number;
}>`
  text-align: center;
  height: ${({ height }) => (height ? `257px` : 'max-content')};
  width: ${({ width }) => (width ? `${width}px` : '303px')};
`;

export const HeadContent = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const WrapperChildContainer = styled.span<{
  isEditor: boolean;
  childHeight?: number;
  isBorder?: boolean;
  preview?: boolean;
  isEditing: boolean;
}>`
  margin-top: 0px;
  border-radius: 8px;
  border: ${({ isBorder }) =>
    isBorder ? '1px solid var(--bg-separator-neutral-default)' : 'none'};
  justify-self: end;
  align-self: flex-end;
  ${({ isEditor }) =>
    isEditor
      ? css`
          max-height: 100%;
        `
      : ''};
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  width: 100%;
`;

export const WrapperTitleNoEdit = styled.div`
  padding: 16px;
`;

export const WrapperTitleView = styled.div<{
  rightPadding: string;
  showFullTitle: boolean;
}>`
  max-width: 300px;
  @media (min-width: ${sizes.MOBILE_L}) {
    max-width: 300px;
  }
  @media (min-width: ${sizes.TABLET_L}) {
    max-width: initial;
  }
  ${ellipsisText}
  ${(props) => props.showFullTitle && `white-space: normal`};
`;

export const WrapperTitleLabel = styled(TSpan)``;

export const ChamberAddButton = styled(Button)`
  padding: 8px;
  margin-right: 16px;
`;

export const TitleContainer = styled.div`
  padding: 16px 16px 0 16px;
`;

export const NonInteractiveOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: transparent;
  z-index: 9;
`;
