import { render } from '@/test-utils';
import { EventDurationField } from './components/EventDurationField';

describe('<EventDurationField>', () => {
  test('EventDurationField', () => {
    const { getByTestId } = render(<EventDurationField />);

    expect(getByTestId('event-duration-wrapper')).toBeInTheDocument();
  });
});
