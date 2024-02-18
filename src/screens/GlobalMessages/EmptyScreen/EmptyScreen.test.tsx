import { client } from '@/apollo/client';
import { GlobalMessageLayout } from '@/layout/GlobalMessageLayout';
import { AuthProvider } from '@/features/auth/contexts';
import { act, render, type RenderResult } from '@/test-utils';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { type queries } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { getSpaceByIdMock } from '@/apollo/utils/mocks';
import EmptyScreen from './EmptyScreen';

const queryClient = new QueryClient();

const mocks = (): MockedResponse[] => [getSpaceByIdMock];

const user = {
  _id: 'someId',
};

describe('<EmptyScreen />', () => {
  const initialEntries = ['/messages'];

  let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;

  beforeEach(async () => {
    await act(async () => {
      mocked = render(
        <MockedProvider addTypename={false} mocks={mocks()}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider client={client} initialUser={user}>
              <MemoryRouter initialEntries={initialEntries}>
                <GlobalMessageLayout>
                  <EmptyScreen onCreateNew={() => {}} />
                </GlobalMessageLayout>
              </MemoryRouter>
            </AuthProvider>
          </QueryClientProvider>
        </MockedProvider>,
      );
    });
  });

  test('Testing for rendering', () => {
    const { container, getByTestId } = mocked;
    expect(container).toBeTruthy();
    expect(getByTestId('empty_screen_wrapper')).toBeInTheDocument();
  });
});
