import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { Stack } from '../Stack';

export const Container = styled.div`
  font-family: var(--font-family);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-body-neutral-alt-default);
`;
export const Main = styled.div<{ $isAppUiV2?: boolean }>`
  position: relative;
  display: flex;
  ${(props) =>
    !props.$isAppUiV2 &&
    `
  @media (min-width: ${sizes.LAPTOP_M}) {
    width: 1440px;
    margin: 0 auto;
  }
  `}
`;
export const LeftContent = styled.div`
  display: block;
  box-shadow: 1px 0px 0px var(--shadow-neutral-alt-default);
`;

export const Content = styled.div`
  display: flex;
  @media (min-width: ${sizes.LAPTOP}) {
    margin-left: 36px;
  }
`;
export const ContentV2 = styled(Stack).attrs({
  align: 'center',
})`
  @media (min-width: ${sizes.LAPTOP}) {
    margin-left: 36px;
  }
  @media (max-width: ${sizes.TABLET_L}) {
    justify-content: center;
  }
`;
export const LayoutMainContent = styled.div`
  width: 100%;
  height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;
