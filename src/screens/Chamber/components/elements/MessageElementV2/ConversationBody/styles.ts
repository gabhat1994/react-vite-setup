import styled from 'styled-components';
import { noScrollBar } from '@/common/globalStyles';
import { devices } from '@/constants/devices';

export const Wrapper = styled.div<{ isNoumLayoutSmallViewMode?: boolean }>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 16px 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
  ${({ isNoumLayoutSmallViewMode }) =>
    isNoumLayoutSmallViewMode &&
    `
      padding: 0px;
      overflow: hidden;
    `}
`;

export const MessageListWrapper = styled.div`
  padding-right: 16px;
  flex: 1;
  overflow: auto;
  ${noScrollBar}

  @media ${devices.TABLET} {
    padding-right: 0;
  }
`;

export const StartConversationMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
`;

export const MessageInputWrapper = styled.div`
  padding-top: 8px;
`;
