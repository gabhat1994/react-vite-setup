import { render } from '@/test-utils';
import PaymentOutSideNoumena from './index';

describe('Payment Outside of Noumena screen', () => {
  it('Should render the payment outside of Noumena screen', () => {
    const { container } = render(<PaymentOutSideNoumena />);
    expect(container).toBeTruthy();
  });
});
