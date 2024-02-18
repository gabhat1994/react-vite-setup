import styled from 'styled-components';
import { Stack } from '../Stack';

export const Container = styled.div`
  font-family: var(--font-family);
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  background: white;
`;

export const Main = styled(Stack)<{ isMobile: boolean }>`
  background: white;
  padding-bottom: ${(props) => (props.isMobile ? '16px' : '0px')};
  padding-top: 24px;
  overflow: hidden;
`;

export const Content = styled.div<{ isMobile: boolean }>`
  width: ${(props) => (props.isMobile ? '375px' : '898px')};
  display: flex;
  padding: 24px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;
