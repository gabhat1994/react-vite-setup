import styled from 'styled-components';
import { noScrollBar } from '@/common/globalStyles';

export const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  height: calc(100% - 72px);
  box-sizing: border-box;
  padding: 0 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const MessageListWrapper = styled.div`
  padding-right: 16px;
  flex: 1;
  overflow: auto;
  ${noScrollBar}
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
