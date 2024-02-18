import styled from 'styled-components';
import { sizes } from '@/constants/devices';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg-body-neutral-alt-highlighted);
  height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  height: 72px;
  width: 100%;
  align-items: center;
  padding-left: 16px;
  background-color: var(--bg-top-nav-neutral-alt-default);
  margin-bottom: 72px;
  @media (min-width: ${sizes.TABLET_L}) {
    padding-left: 40px;
  }
  @media (max-width: ${sizes.MOBILE_MAX}) {
    margin-bottom: 0px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1408px;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 402px;
  min-height: 326px;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  background-color: var(--bg-card-neutral-alt-default);
  header {
    width: 100%;
    text-align: center;
    padding: 3px 0px 24px 0px;
  }
  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 90vw;
    height: 100%;
  }
`;
export const ContainerOTP = styled.div`
  padding: 16px 0px 32px 0px;
`;
export const TextHead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
  padding-top: 85px;
`;

export const StyledSpacer = styled.div`
  padding-top: 16px;
`;
