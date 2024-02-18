import { render } from '@/test-utils';

import Icon from './Icon';

describe('<Icon>', () => {
  test('Icon', () => {
    const { getByTestId } = render(
      <Icon
        name="add_m"
        size={24}
        color="--icon-button-brand-primary-default"
      />,
    );
    expect(getByTestId('svgIcon')).toBeInTheDocument();
  });
});
