import { MemoryRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { render } from '@/test-utils';
import { useClient } from '@/hooks';
import SearchLayout from '.';

describe('List Page Layout', () => {
  it('renders correctly', () => {
    const { container } = render(
      <>
        {() => {
          const { client } = useClient();
          return (
            <ApolloProvider client={client}>
              <MemoryRouter>
                <SearchLayout>
                  <div>page content</div>
                </SearchLayout>
              </MemoryRouter>
            </ApolloProvider>
          );
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
