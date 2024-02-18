import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { cleanup, render } from '@/test-utils';
import { useClient } from '@/hooks';
import NoumsForYouSection from './NoumsForYouSection';

describe('NoumsForYouSection', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render NoumsForYouSection', async () => {
    const { container } = render(
      <>
        {() => {
          const { client } = useClient();
          return (
            <ApolloProvider client={client}>
              <BrowserRouter>
                <NoumsForYouSection recommendedNoumIds={['', '']} />
              </BrowserRouter>
            </ApolloProvider>
          );
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
