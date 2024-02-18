import { MemoryRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { render } from '@/test-utils';
import { useClient } from '@/hooks';
import MyAccount from '.';

describe('List Page Layout', () => {
  it('renders correctly', () => {
    const { container } = render(
      <>
        {() => {
          const { client } = useClient();
          return (
            <ApolloProvider client={client}>
              <MemoryRouter>
                <MyAccount mobileHeader="sample heading">
                  <div>page content</div>
                </MyAccount>
              </MemoryRouter>
            </ApolloProvider>
          );
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
