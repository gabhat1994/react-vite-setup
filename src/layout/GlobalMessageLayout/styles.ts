import { cssVar, rgba } from 'polished';
import styled from 'styled-components';

export const Layout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  #main-header {
    width: 100%;
  }
`;

export const LoadingWrapper = styled.div`
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${rgba(cssVar('--bg-overlay-neutral-light'), 0.1)};
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
  height: 100%;
`;

export const Children = styled.div`
  flex: 1;
  overflow: hidden;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const Divider = styled.div`
  height: 100%;
  border-left: 1px solid var(--bg-separator-neutral-default);
`;
