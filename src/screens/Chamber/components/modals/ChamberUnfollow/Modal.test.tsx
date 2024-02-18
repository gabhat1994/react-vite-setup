import { render, screen, fireEvent } from '@/test-utils';
import { ChamberUnfollow } from './Modal';

const onClose = vi.fn();
const onUnfollow = vi.fn();

describe('<ChamberUnfollow />', () => {
  test('renders', () => {
    render(<ChamberUnfollow onUnfollow={onUnfollow} onClose={onClose} />);

    const modal = screen.getByTestId('chamber-unfollow');
    expect(modal).toBeInTheDocument();

    const unfollowBtn = screen.getByTestId('chamber-unfollow-button');
    expect(unfollowBtn).toBeInTheDocument();

    const closeBtn = screen.getByTestId('chamber-close-button');
    expect(closeBtn).toBeInTheDocument();
  });

  test('closes on `Escape` key press and backdrop click', () => {
    render(<ChamberUnfollow onUnfollow={onUnfollow} onClose={onClose} />);

    fireEvent.keyDown(screen.getByTestId('chamber-unfollow'), {
      code: 'Escape',
    });
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  test('closes confirm clicked', () => {
    render(<ChamberUnfollow onUnfollow={onUnfollow} onClose={onClose} />);

    const unfollowBtn = screen.getByTestId('chamber-unfollow-button');
    expect(unfollowBtn).toBeInTheDocument();

    fireEvent.click(unfollowBtn);
    expect(onClose).toHaveBeenCalled();
  });

  test('component styles', () => {
    render(
      <ChamberUnfollow
        onUnfollow={onUnfollow}
        onClose={onClose}
        spaceName="sample space"
      />,
    );

    expect(
      screen.getByText(/You are about to unfollow sample space/i),
    ).toBeInTheDocument();
  });
});
