import { render } from '@/test-utils';
import { Stack } from '../index';

describe('Stack', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Stack />);
    expect(getByTestId('stack')).toBeInTheDocument();
  });
});
