import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { cleanup, render } from '@/test-utils';
import { useClient } from '@/hooks';
import PaymentSideBar from './index';

describe('Money Page Payment side bar', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render Money Page payment side bar', async () => {
    const { container } = render(
      <>
        {() => {
          const { client } = useClient();
          return (
            <ApolloProvider client={client}>
              <BrowserRouter>
                <PaymentSideBar />
              </BrowserRouter>
            </ApolloProvider>
          );
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
