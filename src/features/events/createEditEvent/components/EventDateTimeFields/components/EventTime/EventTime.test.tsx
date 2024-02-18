import { render } from '@/test-utils';
import { EventTime } from './EventTime';

describe('<EventStartTimeField>', () => {
  test('EventStartTimeField', () => {
    const { getByTestId } = render(<EventTime />);

    expect(getByTestId('event-datetime-wrapper')).toBeInTheDocument();
  });
});
