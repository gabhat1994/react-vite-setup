import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { cleanup, render } from '@/test-utils';
import { useClient } from '@/hooks';
import ApplicationReview from './index';

describe('ApplicationReview', () => {
  afterEach(() => {
    cleanup();
  });

  it('ApplicationReview', async () => {
    const { container } = render(
      <>
        {() => {
          const { client } = useClient();
          return (
            <ApolloProvider client={client}>
              <BrowserRouter>
                <ApplicationReview />
              </BrowserRouter>
            </ApolloProvider>
          );
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
