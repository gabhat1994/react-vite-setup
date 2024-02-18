import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { type queries } from '@testing-library/react';
import { render, type RenderResult, cleanup, act } from '@/test-utils';
import { AuthProvider } from '@/features/auth/contexts';
import { client } from '@/apollo/client';
import { GetEventsDocument } from '@/apollo/graphql';
import { EventListModal } from './EventListModal';
import { type EventListModalProps } from './types';

const props: EventListModalProps = {
  onClose: vi.fn(),
  onEditEvent: vi.fn(),
  isOpen: true,
};

const user = {
  _id: '624fbb408eaeb3c5fbe40eb2',
  access: true,
};
const getEventsMock = {
  request: {
    query: GetEventsDocument,
    variables: {
      chamberId: '628e70b4beea5a017a6e362e',
    },
  },
  result: () => ({ data: { getEvents: getEventsMock } }),
};

const mocks = (): MockedResponse[] => [getEventsMock];

describe('<EventListModal />', () => {
  let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;

  beforeEach(async () => {
    await act(async () => {
      mocked = render(
        <MockedProvider addTypename={false} mocks={mocks()}>
          <AuthProvider client={client} initialUser={user}>
            <MemoryRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <div>
                      <EventListModal {...props} />
                    </div>
                  }
                />
              </Routes>
            </MemoryRouter>
          </AuthProvider>
        </MockedProvider>,
      );
    });
  });

  afterEach(() => {
    cleanup();
  });

  test('renders', async () => {
    const { container, getByTestId } = mocked;

    expect(container).toBeTruthy();

    const modalElement = getByTestId('side-modal-testid');
    const modalContent = getByTestId('event-list-modal-testid');

    expect(modalElement).toBeTruthy();
    expect(modalContent).toBeTruthy();
  });
});
