import { render } from '@/test-utils';
import FilterDropDown from './FilterDropDown';

describe('<FilterDropDown />', () => {
  test('render', () => {
    const { container } = render(<FilterDropDown />);

    expect(container).toBeTruthy();
  });
});
