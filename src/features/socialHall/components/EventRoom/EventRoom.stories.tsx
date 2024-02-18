import styled from 'styled-components';
import { MockedProvider } from '@apollo/client/testing';
import { AuthProvider } from '@/features/auth/contexts';
import { client } from '@/apollo/client';
import { EventRoom } from './EventRoom';
import { singleNotification } from '../MiniPlayerAndNotification/data';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 90vh;
  box-sizing: border-box;
`;

const user = {
  _id: '61a885f93eb5863ce0000002',
};

export const Primary = () => (
  <Wrapper>
    <MockedProvider>
      <AuthProvider client={client} initialUser={user}>
        <EventRoom initialNotifications={singleNotification} />
      </AuthProvider>
    </MockedProvider>
  </Wrapper>
);

export default {
  title: 'UI/SocialHall/EventRoom',
  component: EventRoom,
};
