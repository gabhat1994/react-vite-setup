import { client } from '@/apollo/client';
import { AuthProvider } from '@/features/auth/contexts';
import { act, cleanup, render, type RenderResult } from '@/test-utils';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { type queries } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getSpaceByIdMock } from '@/apollo/utils/mocks';
import SessionExpired from '.';

const mocks = (): MockedResponse[] => [getSpaceByIdMock];

const user = {
  _id: 'someId',
  userStatus: 'UNREGISTERED',
};

describe('<SessionExpired />', () => {
  const initialEntries = ['/session_expired'];

  let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;

  beforeEach(async () => {
    await act(async () => {
      mocked = render(
        <MockedProvider addTypename={false} mocks={mocks()}>
          <AuthProvider client={client} initialUser={user}>
            <MemoryRouter initialEntries={initialEntries}>
              <SessionExpired />
            </MemoryRouter>
          </AuthProvider>
        </MockedProvider>,
      );
    });
  });

  afterEach(() => {
    cleanup();
  });

  test('Testing for rendering', () => {
    const { container, getByTestId } = mocked;
    const SessionExpiredContainer = getByTestId('session_expired_container');
    const SessionExpiredTitle = getByTestId('session_expired_title');
    const SessionExpiredGuide = getByTestId('session_expired_guide');
    const SessionExpiredActionButton = getByTestId(
      'session_expired_action_btn',
    );

    expect(container).toBeTruthy();
    expect(SessionExpiredContainer).toBeTruthy();
    expect(SessionExpiredTitle).toBeTruthy();
    expect(SessionExpiredGuide).toBeTruthy();
    expect(SessionExpiredActionButton).toBeTruthy();
  });
});
