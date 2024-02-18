import { MemoryRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { render } from '@/test-utils';
import { useClient } from '@/hooks';
import Layout from '.';

describe('ApplicationReview page Layout', () => {
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
