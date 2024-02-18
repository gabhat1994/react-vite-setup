import { TSpan } from '@/components';
import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import styled from 'styled-components';

export const RiseApplicationInformation = styled.div<{ isTablet: boolean }>`
  width: 100%;
  height: 54px;
  display: flex;
  gap: 8px;
  border-radius: 4px;
  background-color: var(--bg-infobox-brand-primary-default);
  border-left: 4px solid var(--border-infobox-brand-primary-default);
  div {
    width: ${({ isTablet }) => (isTablet ? 'auto' : '240px')};
    padding: 8px 8px 8px 12px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
`;

export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border-card-neutral-default);
  box-sizing: border-box;
  @media (min-width: ${sizes.MOBILE_MAX}) and (max-width: ${sizes.TABLET_L}) {
    width: 100%;;
  }
`;

export const StatusBox = styled.div<{ isOwner: boolean; isTablet?: boolean }>`
  display: flex;
  gap: 8px;
  ${({ isTablet }) => isTablet && `flex: 1 0 0;`}
  flex-direction: column;
  ${({ isOwner, isTablet }) =>
    isOwner && !isTablet && `padding: 0px 16px 0px 0px;`}
  ${({ isOwner }) =>
    isOwner && `border-right: 1px solid var(--border-card-neutral-default);`}
`;

export const StatusText = styled(TSpan)`
  white-space: nowrap;
`;

export const RiseStepWrapper = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: -1px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid var(--border-card-neutral-default);
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
`;

export const RiseStep = styled.div<{
  showCheckbox: boolean;
  hasRightBorder: boolean;
  hasBottomBorder: boolean;
}>`
  display: flex;
  padding: 12px 16px;
  align-items: ${({ showCheckbox }) =>
    showCheckbox ? 'flex-start' : 'center'};
  gap: ${({ showCheckbox }) => (showCheckbox ? '4px' : '8px')};
  flex-direction: ${({ showCheckbox }) => (showCheckbox ? 'column' : 'row')};
  flex: 1 0 0;
  ${({ showCheckbox }) => showCheckbox && `justify-content: center;`}
  align-self: stretch;
  border-right: ${({ hasRightBorder }) =>
    hasRightBorder ? '1px solid var(--border-card-neutral-default)' : 'none'};
  border-bottom: ${({ hasBottomBorder }) =>
    hasBottomBorder ? '1px solid var(--border-card-neutral-default)' : 'none'};
  cursor: pointer;
  :hover {
    background: var(--bg-tablecell-neutral-hover);
  }
`;

export const Helpertext = styled.div<{ isDesktop?: boolean }>`
  width: ${({ isDesktop }) => (isDesktop ? '220px' : 'unset')};
  ${({ isDesktop }) => !isDesktop && `flex: 1 0 0;`}
`;

export const RiseStepWrapperTablet = styled(Stack)`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid var(--border-card-neutral-default);
`;

export const TabletWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: -1px;
  align-self: stretch;
  border-bottom: 1px solid var(--border-card-neutral-default);
`;
