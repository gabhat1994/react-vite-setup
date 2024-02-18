import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@/test-utils';
import { GlobalMessageLayout } from '.';

describe('GlobalMessageLayout', () => {
  it('renders correctly with pure element', () => {
    const { container } = render(
      <MockedProvider>
        <MemoryRouter>
          <QueryClientProvider client={new QueryClient()}>
            <GlobalMessageLayout>
              <div>Content</div>
            </GlobalMessageLayout>
          </QueryClientProvider>
        </MemoryRouter>
      </MockedProvider>,
    );
    expect(container).toBeTruthy();
  });
});
