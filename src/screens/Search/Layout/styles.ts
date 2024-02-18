import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { noScrollBar } from '@/common/globalStyles';

export const Container = styled.div`
  font-family: var(--font-family);
  display: flex;
  flex-direction: column;
`;
export const Main = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 783px 322px;
  gap: 24px;
  padding: 0px 24px;
  justify-content: center;
  ${noScrollBar}

  @media (min-width: ${sizes.LAPTOP_L}) {
    margin-left: 256px;
  }

  @media (max-width: ${sizes.LAPTOP}) {
    grid-template-columns: 670px 290px;
    padding: 16px;
    justify-content: start;
  }

  @media (max-width: ${sizes.TABLET_L}) {
    grid-template-columns: 488px 235px;
    padding: 16px;
    justify-content: center;
  }

  @media (max-width: ${sizes.MOBILE_L}) {
    grid-template-columns: 375px;
    padding: 16px;
  }
  @media (max-width: ${sizes.MOBILE_M}) {
    grid-template-columns: 351px;
  }
  @media (max-width: ${sizes.MOBILE_S}) {
    grid-template-columns: 288px;
  }
`;

export const Content = styled.div`
  width: 100%;
  overflow-x: hidden;
  ${noScrollBar}
  label {
    width: auto;
  }
`;

export const Head = styled.div`
  padding: 8px 0px;
  display: flex;
  gap: 12px;
  align-items: center;
  @media (min-width: ${sizes.MOBILE_L}) {
    gap: 40px;
  }
`;
export const HeadName = styled.div`
  width: 239px;
  text-align: center;
`;

export const HeadIcon = styled.div`
  padding: 8px;
`;

export const RightContent = styled.div`
  width: 100%;
  max-width: 330px;
  @media (max-width: ${sizes.MOBILE_L}) {
    display: none;
  }
`;
