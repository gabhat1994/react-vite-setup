import styled from 'styled-components';
import { cssVar, rgba } from 'polished';
import { devices, sizes } from '@/constants/devices';

export const Layout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  #main-header {
    width: 100%;
  }
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  z-index: 1;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow-y: auto;
  position: relative;
`;

export const SideBarWrapper = styled.div<{ visible: boolean }>`
  z-index: 999;
  flex-direction: row;
  height: 100%;
  overflow-y: auto;
  background-color: white;
  width: 100%;
  position: absolute;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  @media (max-width: ${sizes.MOBILE_MAX}) {
    display: none;
  }
  @media ${devices.LAPTOP} {
    display: flex;
    width: unset;
    position: relative;
  }
`;

export const Background = styled.div`
  flex: 1;
  background-color: ${rgba(cssVar('--shadow-neutral-dark'), 0.2)}
  display: none;
  @media (min-width: ${sizes.TABLET}) and (max-width: ${sizes.TABLET_L}) {
    display: block;
  }
`;

export const Children = styled.div<{ visible: boolean }>`
  flex: 1;
  overflow: hidden;
  padding: 0;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  @media ${devices.TABLET} {
    visibility: visible;
  }
  @media ${devices.LAPTOP} {
    visibility: visible;
  }
`;

export const BottomBarWrapper = styled.div<{ visible: boolean }>`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: var(--bg-body-neutral-alt-default);
  box-shadow: 0px 4px 32px ${rgba(cssVar('--shadow-neutral-default'), 0.08)};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  display: flex;
  border-radius: 16px 16px 0px 0px;
  @media ${devices.TABLET} {
    border-radius: 0;
  }
  @media ${devices.LAPTOP} {
    display: none;
  }
`;
