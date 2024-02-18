import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { noScrollBar } from '@/common/globalStyles';
import { TSpan } from '@/components/Typography';

export const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 368px;

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
  }

  @media (max-width: ${sizes.LAPTOP_M}) {
  }

  @media (min-width: ${sizes.LAPTOP_L}) {
  }
`;

export const EmptyWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 32px 8px;
`;

export const EmptyMessageSpan = styled(TSpan)`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
`;

export const TabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 24px 24px 0;
  box-sizing: border-box;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  overflow-y: scroll;
  ${noScrollBar}
`;
