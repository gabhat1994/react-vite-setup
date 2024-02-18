import { client } from '@/apollo/client';
import { AuthProvider } from '@/features/auth/contexts';
import { act, cleanup, render, type RenderResult } from '@/test-utils';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { type queries } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getSpaceByIdMock } from '@/apollo/utils/mocks';
import NotFound from '.';

const mocks = (): MockedResponse[] => [getSpaceByIdMock];

const user = {
  _id: 'someId',
  userStatus: 'UNREGISTERED',
};

describe('<NotFound />', () => {
  const initialEntries = ['/404'];

  let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;

  beforeEach(async () => {
    await act(async () => {
      mocked = render(
        <MockedProvider addTypename={false} mocks={mocks()}>
          <AuthProvider client={client} initialUser={user}>
            <MemoryRouter initialEntries={initialEntries}>
              <NotFound />
            </MemoryRouter>
          </AuthProvider>
        </MockedProvider>,
      );
    });
  });

  afterEach(() => {
    cleanup();
  });

  test.skip('Testing for rendering', () => {
    const { container, getByTestId } = mocked;
    const NotFoundContainer = getByTestId('404_Container');
    const NotFoundTitle = getByTestId('404_title');
    const NotFoundSubTitle = getByTestId('404_NM_subtitle');
    const NotFoundDescription = getByTestId('404_NM_description');
    expect(container).toBeTruthy();
    expect(NotFoundContainer).toBeTruthy();
    expect(NotFoundTitle).toBeTruthy();
    expect(NotFoundSubTitle).toBeTruthy();
    expect(NotFoundDescription).toBeTruthy();
  });
});
