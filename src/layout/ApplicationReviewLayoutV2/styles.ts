import styled from 'styled-components';

export const Container = styled.div`
  font-family: var(--font-family);
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  background: white;
`;

export const Main = styled.div<{ isMobile: boolean }>`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  gap: 0;
  background: white;
  padding-left: ${(props) => (props.isMobile ? '16px' : '40px')};
  padding-right: ${(props) => (props.isMobile ? '16px' : '40px')};
  padding-bottom: ${(props) => (props.isMobile ? '16px' : '0px')};
  overflow: hidden;
`;

export const Content = styled.div<{ isMobile: boolean }>`
  width: ${(props) => (props.isMobile ? '343px' : '438px')};
`;
