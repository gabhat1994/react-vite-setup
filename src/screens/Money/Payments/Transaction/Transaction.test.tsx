import { BrowserRouter } from 'react-router-dom';
import { cleanup, render } from '@/test-utils';
import Transaction from './index';

describe('Transaction', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render Transaction', async () => {
    const { container } = render(
      <BrowserRouter>
        <Transaction
          sourceDetail={undefined}
          destinationDetail={undefined}
          paymentDate={undefined}
          amount={undefined}
          transactionReason={undefined}
          currency={undefined}
          charges={undefined}
        />
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
  });
});
