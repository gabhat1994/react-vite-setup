import styled from 'styled-components';
import { devices } from '@/constants/devices';
import { customScrollBar } from '@/common/globalStyles';

export const TextPadding = styled.div`
  padding: 16px 0;
`;

export const QuickQuestionsBodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;

  @media ${devices.TABLET} {
    padding: 24px;
  }

  ${customScrollBar}
`;
