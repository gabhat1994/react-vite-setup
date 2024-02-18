import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { client } from '@/apollo/client';
import { render, act } from '@/test-utils';
import { AuthProvider } from '@/features/auth/contexts';
import { ControllerGroup } from './ControllerGroup';

describe('<ControllerGroup />', () => {
  test(`Render ControllerGroup`, async () => {
    await act(async () => {
      const user = {
        _id: '61a885f93eb5863ce0000002',
      };
      const { container, getByTestId } = render(
        <BrowserRouter>
          <MockedProvider>
            <AuthProvider client={client} initialUser={user}>
              <ControllerGroup onShowChat={() => {}} />
            </AuthProvider>
          </MockedProvider>
        </BrowserRouter>,
      );
      expect(getByTestId('control_wrapper')).toBeInTheDocument();
      expect(container).toBeTruthy();
    });
  });
});
