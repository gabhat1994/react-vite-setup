import styled, { css } from 'styled-components';
import { Stack } from '@/layout';
import { Card } from '@/components/Card';
import { devices } from '@/constants/devices';
import { TSpan } from '@/components/Typography';
import { customScrollBar } from '@/common/globalStyles';
import { type Property } from 'csstype';
import { WalletViewMode } from './providers/WalletElementProvider';

const paddingForNoumEditor = css`
  padding: 12px 16px !important;
`;

const fullScreenStyle = css`
  z-index: 999;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-body-neutral-alt-default);
`;

export const ViewModeWrapper = styled(Stack)`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 16px;
  @media ${devices.LAPTOP} {
    padding: 16px;
  }
  ${paddingForNoumEditor}
`;

export const Wrapper = styled(Card)`
  padding: 0;
  display: flex;
  flex-direction: row;
  border-radius: 0;

  @media ${devices.TABLET} {
    border-radius: 16px;
  }
`;

export const MainWrapper = styled.div<{
  isCollapse?: boolean;
  viewMode?: WalletViewMode;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${({ viewMode }) =>
    viewMode === WalletViewMode.FULLDATA ? fullScreenStyle : undefined}

  @media ${devices.TABLET} {
    width: 100%;
  }
`;

export const HeaderWrapper = styled.div<{
  isElement?: boolean;
}>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 16px;

  @media ${devices.TABLET} {
    ${({ isElement }) =>
      isElement
        ? css`
            padding: 22px 24px 16px;
          `
        : css`
            min-height: 80px;
            padding-right: 24px;
          `};
  }

  ${paddingForNoumEditor}
`;

export const BodyWrapper = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 20px;
  ${customScrollBar}
  padding:0px;
  border-radius: unset !important;
`;

export const WrapperChildContainer = styled.span<{
  isRegistered?: boolean;
}>`
  ${({ isRegistered }) =>
    isRegistered
      ? css`
          border-top: 1px solid var(--border-card-neutral-highlighted);
          border-bottom: 1px solid var(--border-card-neutral-highlighted);
        `
      : css`
          border-radius: 16px 16px 0px 0px;
        `}
`;

export const WrapperRecentTransactions = styled.span`
  padding: 16px 0px;
  border-radius: 0px 0px 16px 16px;
  height: fit-content;
`;

export const TransactionHeading = styled(TSpan)``;

export const TransactionListsContainer = styled(Stack)``;

export const SeeAllButton = styled.div<{ textAlign?: Property.TextAlign }>`
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  color: var(--text-button-brand-primary-default);
  font-family: var(--font-family);
  line-height: 22.4px;
  text-align: ${({ textAlign }) => textAlign || 'center'};
`;

export const LinkButton = styled.div<{
  disabled?: boolean;
}>`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-button-brand-primary-default);
  line-height: 16px;
  font-family: var(--font-button-medium-font);
  text-align: center;
  ${({ disabled }) => (disabled ? 'pointer-events: none;' : '')}
  &:hover {
    cursor: pointer;
    color: var(--text-button-brand-primary-hover);
  }
`;
