import { render } from '@/test-utils';
import PayeeForm from '.';

describe('Payee Details form', () => {
  it('Should render the payee details form', () => {
    const handleNext = vi.fn();
    const handlePayeeChange = vi.fn();
    const { container } = render(
      <PayeeForm
        handleNext={handleNext}
        handlePayeeChange={handlePayeeChange}
      />,
    );
    expect(container).toBeTruthy();
  });
});
