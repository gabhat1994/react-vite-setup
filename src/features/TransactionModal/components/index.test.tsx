import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { cleanup, render } from '@/test-utils';
import { useClient } from '@/hooks';
import { TransactionModal } from './index';
import { TransactionModalType } from '../types';

describe('Money Page Payment Transaction component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should Render Money Page  Transaction component', async () => {
    const handleClose = vi.fn();
    const onTransactionComplete = vi.fn();
    const { container } = render(
      <>
        {() => {
          const { client } = useClient();
          return (
            <ApolloProvider client={client}>
              <BrowserRouter>
                <TransactionModal
                  type={TransactionModalType.PAY}
                  open={true}
                  handleClose={handleClose}
                  onSuccessfulTransaction={onTransactionComplete}
                />
              </BrowserRouter>
            </ApolloProvider>
          );
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
