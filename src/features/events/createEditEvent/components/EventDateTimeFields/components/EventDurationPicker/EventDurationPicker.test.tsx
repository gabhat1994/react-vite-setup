import { render } from '@/test-utils';
import { EventDurationPicker } from './EventDurationPicker';

describe('<EventDurationPicker>', () => {
  test('EventDurationPicker', () => {
    const { getByTestId } = render(<EventDurationPicker />);

    expect(getByTestId('even-duration-picker-container')).toBeInTheDocument();
  });
});
