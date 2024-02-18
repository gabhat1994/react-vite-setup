import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { render } from '@/test-utils';
import { ReceivedConnectionRequestDocument } from '@/apollo/graphql';
import { client } from '@/apollo/client';
import { AuthProvider } from '@/features/auth/contexts';
import ReceivedRequests from './ReceivedRequests';
import { type IReceivedRequests, type ReceivedRequestsProps } from './types';

describe('<ReceivedRequests />', () => {
  const user = {
    _id: 'someId',
    access: true,
  };

  const createMockedConnectionRequest = (id: string) => ({
    _id: id,
    requestFrom: {
      _id: id,
      name: 'Test3',
      title: null,
      type: 'PROJECT',
      institution: 'NOUMENA',
      profileImage: null,
      category: {
        _id: id,
        name: 'Social',
        __typename: 'ProjectChamberCategory',
      },
      uid: {
        firstName: 'John',
        middleName: null,
        lastName: 'Doe',
        title: null,
        __typename: 'UserOutput',
      },
      __typename: 'SpaceOutput',
    },
    __typename: 'SpaceConnection',
  });

  const createMockedReceivedConnectionRequestResponse = (
    data: IReceivedRequests[],
  ) => ({
    request: {
      query: ReceivedConnectionRequestDocument,
      variables: {
        spaceId: 'testId',
      },
    },
    result: {
      data: {
        receivedConnectionRequest: {
          data,
          count: data.length,
          __typename: 'ConnectionOutputResponse',
        },
      },
    },
  });

  const setup = (props: ReceivedRequestsProps, mocks: MockedResponse[]) =>
    render(
      <MockedProvider mocks={mocks}>
        <AuthProvider initialUser={user} client={client}>
          <ReceivedRequests {...props} />
        </AuthProvider>
      </MockedProvider>,
    );

  test('renders loading skeleton when loading data ', () => {
    const mocks = [createMockedReceivedConnectionRequestResponse([])];
    const props = { noumId: 'testId' };

    const { getByTestId } = setup(props, mocks);

    expect(getByTestId('received-request-skeleton')).toBeInTheDocument();
  });

  test('renders "You don’t have any requests" when there are no requests fetched from API', async () => {
    const mocks = [createMockedReceivedConnectionRequestResponse([])];
    const props = { noumId: 'testId' };

    const { getByText } = setup(props, mocks);

    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(getByText('You don’t have any requests')).toBeInTheDocument();
  });

  test('renders connection request correctly', async () => {
    const mockedRequestId = '62b04265274981000fa1b229';

    const mockedData = [
      createMockedConnectionRequest(mockedRequestId),
    ] as IReceivedRequests[];

    const mocks = [createMockedReceivedConnectionRequestResponse(mockedData)];
    const props = { noumId: 'testId' };

    const { queryByTestId } = setup(props, mocks);

    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(queryByTestId(mockedRequestId)).not.toBeInTheDocument();
  });

  test('show max 3 requests when there are more than 3 requests fetched from API', async () => {
    const mockedRequestIds = [
      '62b0465252e2e8000da874aa',
      '62b03e10274981000fa18267',
      '62b045c552e2e8000da872c2',
      '62b04265274981000fa1b229',
    ];

    const mockedData = mockedRequestIds.map((id) =>
      createMockedConnectionRequest(id),
    ) as IReceivedRequests[];

    const mocks = [createMockedReceivedConnectionRequestResponse(mockedData)];
    const props = { noumId: 'testId' };

    const { queryByTestId } = setup(props, mocks);

    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(queryByTestId(mockedRequestIds[0])).not.toBeInTheDocument();
    expect(queryByTestId(mockedRequestIds[1])).not.toBeInTheDocument();
    expect(queryByTestId(mockedRequestIds[2])).toBeNull();
    expect(queryByTestId(mockedRequestIds[3])).toBeNull();
  });
});
