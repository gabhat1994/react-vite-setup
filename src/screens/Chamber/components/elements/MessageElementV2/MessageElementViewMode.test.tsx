import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { intersectionObserver } from '@/test-utils/stubs';
import { render } from '@/test-utils';
import { MessageElementViewMode } from './MessageElementViewMode';

const spaceId = '';
const element = {
  __typename: undefined,
  _id: undefined,
};
const queryClient = new QueryClient();

const Component: React.FC = () => (
  <MemoryRouter>
    <MockedProvider>
      <QueryClientProvider client={queryClient}>
        <MessageElementViewMode spaceId={spaceId} element={element} />
      </QueryClientProvider>
    </MockedProvider>
  </MemoryRouter>
);

describe('<MessageElementViewMode />', () => {
  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    intersectionObserver.restore();
  });

  test('rendering test', () => {
    const { container, getByTestId } = render(<Component />);

    expect(getByTestId('mew-wrapper')).toBeInTheDocument();
    expect(getByTestId('mew-main-wrapper')).toBeInTheDocument();
    expect(getByTestId('mew-conversation-wrapper')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
