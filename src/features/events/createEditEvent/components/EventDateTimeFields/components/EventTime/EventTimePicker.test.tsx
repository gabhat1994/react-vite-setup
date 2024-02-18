import { render } from '@/test-utils';
import { EventTimePicker } from '../EventTimePicker';

const setCustomError = vi.fn();
const onChange = vi.fn();

describe('<EventTimePicker>', () => {
  test('EventTimePicker', () => {
    const { getByTestId } = render(
      <EventTimePicker
        date={new Date()}
        time="12:00 AM"
        availableTimes={[]}
        error={false}
        setCustomError={setCustomError}
        onChange={onChange}
      />,
    );

    expect(getByTestId('event-time-picker-container')).toBeInTheDocument();
  });
});
