import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import { defaultScrollBar, noScrollBar } from '@/common/globalStyles';

export const SideMenuContainer = styled.div`
  box-sizing: border-box;
  background-color: var(--bg-left-menu-neutral-alt-default);
  flex-grow: 1;
  width: 368px;
  height: calc(100vh - 72px);
  overflow-x: hidden;
  ${defaultScrollBar}
  padding: 40px 16px 24px 0;
  @media (max-width: ${sizes.TABLET_L}) {
    position: absolute;
    left: 0;
    top: 0;
    background: var(--bg-left-menu-neutral-alt-default);
    height: 100vh;
    padding: 24px 0;
    width: 100%;
  }
`;

export const StyledStack = styled(Stack)`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: column;
`;

export const SideMenuFooterLinksContainer = styled.div`
  display: flex;
  width: 368px;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  @media (max-width: ${sizes.TABLET_L}) {
    @media (min-height: 600px) {
      position: fixed;
    }
  }
`;

export const VersionContainer = styled.div`
  font-family: var(--font-footnote-regular-font);
  font-size: var(--font-body-medium-size);
  color: var(--text-card-neutral-default);
  padding: 32px 16px 28px 16px;
  @media (min-width: ${sizes.LAPTOP}) {
    padding-left: 40px;
  }
`;

export const MenuFooterItem = styled.div`
  cursor: pointer;
  width: 100%;
  padding-left: 40px;
  @media (max-width: ${sizes.TABLET_L}) {
    padding-left: 16px;
  }
`;

export const MyAccountHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 40px;

  @media (max-width: ${sizes.TABLET_L}) {
    padding-left: 16px;
    align-items: center;
  }
`;

export const MyAccount = styled.div`
  @media (max-width: ${sizes.LAPTOP}) {
    width: calc(100% - 40px);
  }
`;

export const HamburgerWrapper = styled.div`
  @media (max-width: ${sizes.LAPTOP}) {
    position: absolute;
    left: 16px;
  }
`;

export const MobileHeader = styled.div`
  position: relative;
  height: 24px;
  border-bottom: 1px solid var(--border-card-neutral-highlighted);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 32px;
`;

export const InviteWrapper = styled(Link)<{
  width?: string;
  marginleft?: string;
  paddingleft?: string;
  disabled?: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  width: ${(p) => (p.width ? p.width : '304px')};
  margin-left: ${(p) => (p.marginleft ? p.marginleft : '3px')};
  background: var(--bg-tablecell-brand-primary-default);
  padding: 20px 0 20px 16px;
  height: 24px;
  text-decoration: none;
  border-radius: 16px;

  ${({ disabled }) =>
    disabled &&
    `background: var(--bg-tablecell-neutral-disabled);  
    color:val(--text-tablecell-header-neutral-disabled); cursor:not-allowed;`}

  @media (max-width: ${sizes.TABLET_L}) {
    box-sizing: border-box;
    height: 64px;
    border-radius: 0;
    width: 100%;
    padding-left: ${(p) => (p.paddingleft ? p.paddingleft : '16px')};
    margin-left: 0;
  }
`;

export const StyledStaticLabel = styled.div`
  flex-grow: 6;
`;

export const InviteBackground = styled.div`
  position: absolute;
  bottom: -4px;
  right: 0;
`;

export const SideBorderMain = styled.div`
  position: absolute;
  left: 0;
`;

export const SideBorder = styled.div<{ pathName: string }>`
  height: 64px;
  width: 3px;
  background-color: var(--bg-button-brand-primary-default);
  z-index: 1;
`;

export const ScrollSection = styled.div`
  @media (max-height: 450px) {
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - 128px);
    @media (max-width: ${sizes.TABLET_L}) {
      height: calc(100vh - 104px);
    }
    ${noScrollBar}
  }
`;

export const StoriesWrapper = styled.div`
  display: grid;
  height: 700px;
`;
