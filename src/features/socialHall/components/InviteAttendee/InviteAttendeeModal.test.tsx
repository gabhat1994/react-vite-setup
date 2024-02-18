import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { cleanup, render, waitFor, act } from '@/test-utils';
import { AllUsersDocument } from '@/apollo/graphql';
import { AuthProvider } from '@/features/auth/contexts';
import { client } from '@/apollo/client';
import { users } from './mock';
import { InviteAttendeeModal } from './InviteAttendeeModal';

let allUsersQueryCalled = true;

const usersMock = {
  request: {
    query: AllUsersDocument,
    variables: {
      eventId: '62c7ec6aa2a7f5000c6e5252',
      search: '',
      limit: 20,
      offset: 0,
    },
  },
  result: () => {
    allUsersQueryCalled = true;
    return {
      data: {
        allUsers: {
          count: 20,
          data: users,
        },
      },
    };
  },
};

const mocks = (): MockedResponse[] => [usersMock];

const user = {
  _id: 'someId',
  access: true,
};

describe('<InviteAttendeeModal />', () => {
  beforeEach(() => {
    cleanup();
  });

  test(`render invite attendee modal with true`, async () => {
    const handleClose = vi.fn();
    await act(async () => {
      const { getByTestId, container } = render(
        <MockedProvider addTypename={false} mocks={mocks()}>
          <AuthProvider client={client} initialUser={user}>
            <InviteAttendeeModal isOpen={true} handleClose={handleClose} />
          </AuthProvider>
        </MockedProvider>,
      );

      await waitFor(() => {
        expect(allUsersQueryCalled).toBeTruthy();
      });

      expect(container).toBeTruthy();
      expect(getByTestId('invite-attendees-modal')).toBeInTheDocument();
    });
  });
});
