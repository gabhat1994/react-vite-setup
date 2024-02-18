import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';

import { render } from '@/test-utils';
import { type ChamberBoxNameEnum } from '@/components/ChamberBox/types';
import { client } from '@/apollo/client';
import { AuthProvider } from '@/features/auth/contexts';
import MemberRequest from './MemberRequest';
import type IMemberRequest from './types';

describe('<MemberRequest />', () => {
  const user = {
    _id: 'someId',
    access: true,
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  const setup = (props: IMemberRequest) =>
    render(
      <MockedProvider mocks={[]}>
        <BrowserRouter>
          <AuthProvider initialUser={user} client={client}>
            <MemberRequest {...props} />
          </AuthProvider>
        </BrowserRouter>
      </MockedProvider>,
    );

  test('renders with category', () => {
    const props = {
      category: 'project' as ChamberBoxNameEnum,
      refetchReceivedRequests: () => ({}),
      name: 'Anna Smith',
      title: 'Test title',
      type: 'HOME',
      profileImage:
        'https://images.pexels.com/photos/7481669/pexels-photo-7481669.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    };

    const { container } = setup(props);
    expect(container).toBeTruthy();
  });

  test('renders without category', () => {
    const props = {
      refetchReceivedRequests: () => ({}),
      name: 'Anna Smith',
      title: 'Test title',
      profileImage:
        'https://images.pexels.com/photos/7481669/pexels-photo-7481669.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    };

    const { container } = setup(props);
    expect(container).toBeTruthy();
  });

  test('should render accept and decline buttons correctly', async () => {
    const props = {
      refetchReceivedRequests: () => ({}),
      name: 'Anna Smith',
      title: 'Test title',
      profileImage:
        'https://images.pexels.com/photos/7481669/pexels-photo-7481669.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    };

    const { queryByTestId } = setup(props);

    const acceptButton = queryByTestId('accept-button');
    const declineButton = queryByTestId('decline-button');

    expect(acceptButton).toBeInTheDocument();
    expect(declineButton).toBeInTheDocument();
  });
});
