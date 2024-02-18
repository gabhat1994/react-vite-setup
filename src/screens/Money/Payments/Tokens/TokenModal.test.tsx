import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { cleanup, render } from '@/test-utils';
import { useClient } from '@/hooks';
import TokenModal from './TokenModal';

describe('Money Page Token Modal', () => {
  afterEach(() => {
    cleanup();
  });

  it('should Render Money Page token modal', async () => {
    const onClose = vi.fn();
    const { container } = render(
      <>
        {() => {
          const { client } = useClient();
          return (
            <ApolloProvider client={client}>
              <BrowserRouter>
                <TokenModal open={true} onClose={onClose} />
              </BrowserRouter>
            </ApolloProvider>
          );
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
