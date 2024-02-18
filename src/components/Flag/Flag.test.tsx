import { render } from '@/test-utils';

import Icon from './Flag';

describe('<Flag>', () => {
  test('Flag', () => {
    const { getByTestId } = render(<Icon flag="flag_us" size={24} />);
    expect(getByTestId('svgIcon')).toBeInTheDocument();
  });
});
