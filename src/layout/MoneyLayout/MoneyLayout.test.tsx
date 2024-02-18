import { MemoryRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { render } from '@/test-utils';
import { useClient } from '@/hooks';
import Layout from '.';

class ResizeObserver {
  // eslint-disable-next-line class-methods-use-this
  observe() {}

  // eslint-disable-next-line class-methods-use-this
  unobserve() {}

  // eslint-disable-next-line class-methods-use-this
  disconnect() {}
}

describe('List Page Layout', () => {
  beforeEach(() => {
    window.ResizeObserver = ResizeObserver;
  });

  it('renders correctly', () => {
    const { container } = render(
      <>
        {() => {
          const { client } = useClient();
          return (
            <ApolloProvider client={client}>
              <MemoryRouter>
                <Layout>
                  <div>page content</div>
                </Layout>
              </MemoryRouter>
            </ApolloProvider>
          );
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
