import styled from 'styled-components';

import { Card } from '@/components/Card';
import { devices } from '@/constants/devices';
import { noScrollBar } from '@/common/globalStyles';

export const ViewModeWrapper = styled(Card)`
  box-sizing: border-box;
  border-radius: 0;
  position: relative;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${devices.LAPTOP} {
    border-radius: 16px;
    padding: 0;
  }
  @media ${devices.TABLET} {
    border-radius: 16px;
  }
`;

export const ViewModeChildrenWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  min-height: 75px;
`;

export const ViewModeHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 16px 0 16px;
`;

export const ViewModeHeaderTitleWrapper = styled.div`
  flex: 1;
  user-select: none;
`;

export const SubHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  overflow-x: auto;
  ${noScrollBar}
`;
