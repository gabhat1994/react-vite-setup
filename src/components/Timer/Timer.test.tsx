import { render, act } from '@/test-utils';
import Timer from './Timer';

describe('<Timer />', () => {
  test('Render Timer', async () => {
    vi.useFakeTimers();
    const initialSeconds = 60;
    const timedOut = vi.fn();
    const { getByText } = render(
      <Timer initialSeconds={initialSeconds} timedOut={timedOut} />,
    );
    act(() => {
      vi.advanceTimersByTime(initialSeconds * 1000);
    });
    expect(getByText('0s')).toBeInTheDocument();
    expect(timedOut).toHaveBeenCalled();
  });
});
