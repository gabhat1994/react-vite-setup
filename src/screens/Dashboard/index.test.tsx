import { client } from '@/apollo/client';
import { AuthProvider } from '@/features/auth/contexts';
import {
  act,
  cleanup,
  fireEvent,
  render,
  type RenderResult,
} from '@/test-utils';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { type queries } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getSpaceByIdMock } from '@/apollo/utils/mocks';
import Dashboard from '.';

const mocks = (): MockedResponse[] => [getSpaceByIdMock];

const user = {
  _id: '234lk234',
};

describe('<Dashboard />', () => {
  const initialEntries = ['/dashboard'];

  let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;

  beforeEach(async () => {
    await act(async () => {
      mocked = render(
        <MockedProvider addTypename={false} mocks={mocks()}>
          <AuthProvider client={client} initialUser={user}>
            <MemoryRouter initialEntries={initialEntries}>
              <Dashboard />
            </MemoryRouter>
          </AuthProvider>
        </MockedProvider>,
      );
    });
  });

  afterEach(() => {
    cleanup();
  });

  test('Testing for presence of Button Create chamber', () => {
    const { container, queryByTestId } = mocked;
    expect(container).toBeTruthy();
    expect(queryByTestId('create-chamber')).toBeInTheDocument();
  });
  test('Testing the clickable action of  Button Create chamber', async () => {
    const { getByTestId } = mocked;
    const button = getByTestId('create-chamber');
    fireEvent.click(button);
  });
});
