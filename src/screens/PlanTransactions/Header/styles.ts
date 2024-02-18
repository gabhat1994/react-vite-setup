import styled from 'styled-components';
import { noScrollBar } from '@/common/globalStyles';
import { devices } from '@/constants/devices';
import { Button } from '@/components';

export const Wrapper = styled.div<{ isMobile: boolean }>`
  width: ${(props) => (props.isMobile ? '100%' : '668px')};
  background-color: var(--bg-card-neutral-alt-default);
  display: flex;
  flex-direction: column;
  margin: auto;
`;

export const HeaderWrapper = styled.div`
  padding: 7px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CarosoulWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  padding: 8px 0px;
  overflow-x: auto;
`;

export const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0px 8px;
`;

export const MonthListWrapper = styled.div`
  overflow-x: scroll;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 9px 12px;
  gap: 20px;
  ${noScrollBar}
`;

export const MonthButton = styled(Button).attrs(() => ({
  size: 'small',
}))`
  padding-left: 10px;
  padding-right: 10px;
  width: auto;
`;

export const SubHeaderContainer = styled.div`
  display: flex;
  align-items: left;
  flex: 1;
  margin: auto;
  width: 100%;
  @media ${devices.TABLET} {
    max-width: 912px;
  }

  @media ${devices.MOBILE_L} {
    max-width: 100%;
  }
`;
