import { BrowserRouter } from 'react-router-dom';
// import { ApolloProvider } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render } from '@/test-utils';
import PaymentMain from './index';
// import { useClient } from '@/hooks';

describe('Money Page Payment Main', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render Money Page payment main', async () => {
    const { container } = render(
      <>
        {() => {
          <MockedProvider>
            <BrowserRouter>
              <PaymentMain />
            </BrowserRouter>
          </MockedProvider>;
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
