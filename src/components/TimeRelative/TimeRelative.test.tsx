import { cleanup, render } from '@/test-utils';
import { TimeRelative } from './TimeRelative';

describe('<TimeRelative />', () => {
  afterEach(() => {
    cleanup();
  });

  test('From now: using date props with current time should render time relative component with text "now"', () => {
    const { getByTestId } = render(<TimeRelative date={new Date()} />);
    expect(getByTestId('time-relative-testid')).toBeInTheDocument();
    expect(getByTestId('time-relative-testid')).toHaveTextContent('now');
  });

  test('From now: using date props with 5 mins ago value should render time relative component with proper text', () => {
    const before5mins = new Date();
    before5mins.setMinutes(before5mins.getMinutes() - 5);
    const { getByTestId } = render(<TimeRelative date={before5mins} />);
    expect(getByTestId('time-relative-testid')).toBeInTheDocument();
    expect(getByTestId('time-relative-testid')).toHaveTextContent(
      '5 minutes ago',
    );
  });

  test('From yesterday: using earlier date value than base date should render time relative component with previous date time text', () => {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 1);
    const before5mins = new Date(fromDate);
    before5mins.setMinutes(before5mins.getMinutes() - 5);
    const { getByTestId } = render(
      <TimeRelative date={before5mins} fromDate={fromDate} />,
    );
    expect(getByTestId('time-relative-testid')).toBeInTheDocument();
    expect(getByTestId('time-relative-testid')).toHaveTextContent(
      '5 minutes ago',
    );
  });

  test('From yesterday: using later date value than base date should render time relative component with future date time text', () => {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 1);
    const after5mins = new Date(fromDate);
    after5mins.setMinutes(after5mins.getMinutes() + 5);
    const { getByTestId } = render(
      <TimeRelative date={after5mins} fromDate={fromDate} />,
    );
    expect(getByTestId('time-relative-testid')).toBeInTheDocument();
    expect(getByTestId('time-relative-testid')).toHaveTextContent(
      'in 5 minutes',
    );
  });
});
