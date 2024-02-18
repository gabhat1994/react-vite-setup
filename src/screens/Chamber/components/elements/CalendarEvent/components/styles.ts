import styled from 'styled-components';

import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';

export const CalendarNoEventsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px 16px;
`;

export const NoEventsIconWrapper = styled.div`
  margin: 0 auto;
`;

export const StyledText = styled(TSpan)`
  user-select: none;
  text-align: center;
`;

export const AddNewEventButton = styled(Button)`
  padding: 12px;
  margin-top: 16px;
  min-height: unset;
  height: unset;
`;

export const EventsListExpandedWrapper = styled.div<{
  isEventBottomBorder: boolean;
}>`
  display: flex;
  flex-direction: column;
  & * {
    user-select: none;
  }
  & :nth-last-child(1) {
    ${({ isEventBottomBorder }) =>
      isEventBottomBorder && 'border-radius: 16px'};
  }
`;

export const GuestEventsHeaderTitle = styled(TSpan)`
  padding: 0 16px;
`;

export const LoadingContainer = styled.div`
  inset: 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  height: 50px;
  span {
    position: absolute;
  }
`;
