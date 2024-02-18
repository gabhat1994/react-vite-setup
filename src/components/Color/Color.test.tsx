import { render } from '@/test-utils';
import { Color } from './Color';

test('Color', () => {
  const { getByText } = render(<Color color="--color-base-primary-60" />);
  expect(getByText('--color-base-primary-60')).toBeInTheDocument();
});
