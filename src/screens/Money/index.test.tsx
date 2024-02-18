import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { cleanup, render } from '@/test-utils';
import { useClient } from '@/hooks';
import Money from './index';

describe('Money Page', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render Money Page', async () => {
    const { container } = render(
      <>
        {() => {
          const { client } = useClient();
          return (
            <ApolloProvider client={client}>
              <BrowserRouter>
                <Money />
              </BrowserRouter>
            </ApolloProvider>
          );
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
