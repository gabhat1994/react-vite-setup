import { BrowserRouter } from 'react-router-dom';
import { cleanup, render } from '@/test-utils';
import StatementCard from './index';

describe('Statement Card', () => {
  afterEach(() => {
    cleanup();
  });

  it('should correctly Render statement card', async () => {
    const { container } = render(
      <BrowserRouter>
        <StatementCard
          sourceDetail={undefined}
          destinationDetail={undefined}
          paymentDate={undefined}
          amount={undefined}
          transactionReason={undefined}
          currency={undefined}
          id={undefined}
          charges={undefined}
          isTransactionWithOwnAccounts={true}
        />
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
  });
  it('should correctly Render statement card', async () => {
    const { container } = render(
      <BrowserRouter>
        <StatementCard
          sourceDetail={undefined}
          destinationDetail={undefined}
          paymentDate={undefined}
          amount={undefined}
          transactionReason={undefined}
          currency={undefined}
          id={undefined}
          charges={undefined}
          isTransactionWithOwnAccounts={false}
        />
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
  });
});
