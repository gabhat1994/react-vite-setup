import { render } from '@/test-utils';
import { SingleOtpInput } from './SingleOtpInput';

describe('<OtpInput />', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <SingleOtpInput data-testid="SingleOtpInput" readOnly />,
    );
    expect(getByTestId('SingleOtpInput')).toBeInTheDocument();
  });
});
