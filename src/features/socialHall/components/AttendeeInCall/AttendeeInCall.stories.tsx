import styled from 'styled-components';
import { AttendeeInCall } from './AttendeeInCall';
import { demoUsers } from './data';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 90vh;
`;

export const AttendeeAvatar = () => (
  <Wrapper>
    <AttendeeInCall isMuted={false} {...demoUsers[0]} />
    <AttendeeInCall isMuted={false} {...demoUsers[1]} />
    <AttendeeInCall isMuted={true} {...demoUsers[2]} />
  </Wrapper>
);

export default {
  title: 'UI/SocialHall/AttendeeInCall',
  component: AttendeeInCall,
};
