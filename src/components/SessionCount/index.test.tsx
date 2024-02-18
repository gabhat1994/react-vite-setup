import { render, screen, fireEvent } from '@/test-utils';
import { SessionCount } from './SessionCount';

describe('<SessionCount />', () => {
  test('renders', () => {
    const reset = vi.fn();
    const handleSessionOut = vi.fn();
    const logout = vi.fn();

    const events: { [key: string]: EventListenerOrEventListenerObject } = {};
    vi.spyOn(window, 'addEventListener').mockImplementation((event, handle) => {
      events[event] = handle;
    });
    render(
      <SessionCount
        count={60}
        reset={reset}
        handleSessionOut={handleSessionOut}
        logout={logout}
      />,
    );
    const sessionCountModal = screen.getByTestId('session_count_container');
    const title = screen.getByTestId('session_count_title');
    const description = screen.getByTestId('session_count_guide');
    const continueBtn = screen.getByTestId('session_count_continue_btn');
    const logoutBtn = screen.getByTestId('session_count_logout_btn');

    expect(sessionCountModal).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(continueBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();

    fireEvent.click(continueBtn);
    expect(reset).toHaveBeenCalled();

    fireEvent.click(logoutBtn);
    expect(logout).toHaveBeenCalled();

    fireEvent.click(sessionCountModal);
    expect(reset).toHaveBeenCalled();
  });
});
