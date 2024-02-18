import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { client } from '@/apollo/client';
import { render, act } from '@/test-utils';
import { AuthProvider } from '@/features/auth/contexts';
import { EventRoom } from './EventRoom';
import { singleNotification } from '../MiniPlayerAndNotification/data';

describe('<EventRoom />', () => {
  test(`check EventRoom rendered enough or not`, async () => {
    await act(async () => {
      const user = {
        _id: '61a885f93eb5863ce0000002',
      };
      const { container, getByTestId } = render(
        <BrowserRouter>
          <MockedProvider>
            <AuthProvider client={client} initialUser={user}>
              <EventRoom initialNotifications={singleNotification} />
            </AuthProvider>
          </MockedProvider>
        </BrowserRouter>,
      );
      const EventRoomWrapper = getByTestId('buzzroom_wrapper');
      expect(EventRoomWrapper).toHaveStyle(`
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: row;
    `);

      expect(getByTestId('main_wrapper')).toBeInTheDocument();
      expect(container).toBeTruthy();
    });
  });
});
