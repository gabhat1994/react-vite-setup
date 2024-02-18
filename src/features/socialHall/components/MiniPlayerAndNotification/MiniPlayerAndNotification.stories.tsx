import styled from 'styled-components';
import {
  demoNotifications,
  singleNotification,
  singleNotificationWithMessage,
} from './data';
import { MiniPlayerAndNotification } from './MiniPlayerAndNotification';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 90vh;
`;

export const Single = () => (
  <Wrapper>
    <MiniPlayerAndNotification
      showMiniPlayerNotification={true}
      attendeeId=""
      groupId=""
      showUserPopup={false}
      showGroupPopup={false}
      onCloseUserPopup={() => {}}
      onCloseGroupPopup={() => {}}
      initialNotifications={singleNotification}
    />
  </Wrapper>
);

export const SingleWithMessage = () => (
  <Wrapper>
    <MiniPlayerAndNotification
      showMiniPlayerNotification={true}
      attendeeId=""
      groupId=""
      showUserPopup={false}
      showGroupPopup={false}
      onCloseUserPopup={() => {}}
      onCloseGroupPopup={() => {}}
      initialNotifications={singleNotificationWithMessage}
    />
  </Wrapper>
);

export const SingleWithMiniPlayer = () => (
  <Wrapper>
    <MiniPlayerAndNotification
      attendeeId=""
      groupId=""
      showMiniPlayerNotification={true}
      showUserPopup={false}
      showGroupPopup={false}
      onCloseUserPopup={() => {}}
      onCloseGroupPopup={() => {}}
      initialNotifications={singleNotification}
    />
  </Wrapper>
);

export const MultipleWithMiniPlayer = () => (
  <Wrapper>
    <MiniPlayerAndNotification
      attendeeId=""
      groupId=""
      showMiniPlayerNotification={true}
      showUserPopup={false}
      showGroupPopup={false}
      onCloseUserPopup={() => {}}
      onCloseGroupPopup={() => {}}
      initialNotifications={demoNotifications}
    />
  </Wrapper>
);

export default {
  title: 'UI/SocialHall/MiniPlayerAndNotification',
  component: Single,
};
