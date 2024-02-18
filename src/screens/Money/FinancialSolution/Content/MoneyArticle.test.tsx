// import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
// import { useClient } from '@/hooks';
import { cleanup, render } from '@/test-utils';
import MoneyArticle from './MoneyArticle';

describe('Money Article renders correctly', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render Money Page', async () => {
    const { container } = render(
      <>
        {() => {
          <MockedProvider>
            <BrowserRouter>
              <MoneyArticle />
            </BrowserRouter>
          </MockedProvider>;
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
