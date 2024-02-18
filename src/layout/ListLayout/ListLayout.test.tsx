import { MemoryRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { render } from '@/test-utils';
import { useClient } from '@/hooks';
import ListLayout from '.';

describe('List Page Layout', () => {
  it('renders correctly', () => {
    const { container } = render(
      <>
        {() => {
          const { client } = useClient();
          return (
            <ApolloProvider client={client}>
              <MemoryRouter>
                <ListLayout>
                  <div>page content</div>
                </ListLayout>
              </MemoryRouter>
            </ApolloProvider>
          );
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
