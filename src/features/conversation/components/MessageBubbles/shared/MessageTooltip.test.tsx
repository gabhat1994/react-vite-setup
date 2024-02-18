import { set, subDays } from 'date-fns';
import { fireEvent, render } from '@/test-utils';
import { MessageTooltip } from './MessageTooltip';

const Child = () => (
  <div data-testid="child-el" style={{ width: '100px', height: '50px' }} />
);

describe('MessageTooltip', () => {
  test('Should render hoverable area', () => {
    const { queryByTestId, getByTestId } = render(
      <MessageTooltip
        type="received"
        sendDate={new Date(2022, 6, 5)}
        status="sending"
      />,
    );
    expect(getByTestId('message-bubble-hover-area')).toBeInTheDocument();
    expect(queryByTestId('message-tooltip')).toBeInTheDocument();
  });

  test('Should render children', () => {
    const { getByTestId } = render(
      <MessageTooltip
        type="received"
        sendDate={new Date(2022, 6, 5)}
        status="sending"
      >
        <Child />
      </MessageTooltip>,
    );
    expect(getByTestId('child-el')).toBeInTheDocument();
  });

  test('Should display date tooltip on mouse enter', () => {
    const mockDate = set(new Date(), {
      year: 2022,
      month: 6,
      date: 11,
      hours: 11,
      minutes: 22,
    });
    vi.useFakeTimers().setSystemTime(mockDate);

    const { getByTestId, queryByTestId } = render(
      <MessageTooltip type="sent" status="sent" sendDate={subDays(mockDate, 1)}>
        <Child />
      </MessageTooltip>,
    );
    expect(queryByTestId('message-tooltip')).toBeInTheDocument();

    fireEvent.mouseEnter(getByTestId('message-bubble-hover-area'));
    const tooltip = getByTestId('message-tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip.firstElementChild).toHaveTextContent('Sent');
    expect(tooltip.lastElementChild).toHaveTextContent('Yesterday, 11:22 AM');
  });
});
