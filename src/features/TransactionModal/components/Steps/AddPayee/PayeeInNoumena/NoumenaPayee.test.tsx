import { render } from '@/test-utils';
import NoumenaPayee from './NoumenaPayee';
import { type TSearchedPayee } from './types';

describe('Noumena Payee card', () => {
  it('Should render the noumena payee card', () => {
    const handleSelect = vi.fn();
    const payee: TSearchedPayee = {
      id: '1',
      accountName: 'Anne Smith',
      walletName: 'Master Wallet',
      customerName: 'Name',
    };

    const { container, getByText } = render(
      <NoumenaPayee
        payee={payee}
        handleSelect={handleSelect}
        isSelected={false}
      />,
    );

    expect(container).toBeTruthy();
    const name = getByText(payee.customerName!);
    expect(name).toBeInTheDocument();
  });
});
