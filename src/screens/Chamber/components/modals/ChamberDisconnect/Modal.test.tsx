import { render, screen, fireEvent } from '@/test-utils';
import { ChamberDisconnect } from './Modal';

const onClose = vi.fn();
const onDisconnect = vi.fn();

describe('<ChamberDisconnect />', () => {
  test('renders', () => {
    render(<ChamberDisconnect onDisconnect={onDisconnect} onClose={onClose} />);

    const modal = screen.getByTestId('chamber-disconnect');
    expect(modal).toBeInTheDocument();

    const disconnectBtn = screen.getByTestId('chamber-disconnect-button');
    expect(disconnectBtn).toBeInTheDocument();

    const closeBtn = screen.getByTestId('chamber-close-button');
    expect(closeBtn).toBeInTheDocument();
  });

  test('closes on `Escape` key press and backdrop click', () => {
    render(<ChamberDisconnect onDisconnect={onDisconnect} onClose={onClose} />);

    fireEvent.keyDown(screen.getByTestId('chamber-disconnect'), {
      code: 'Escape',
    });
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  test('closes confirm clicked', () => {
    render(<ChamberDisconnect onDisconnect={onDisconnect} onClose={onClose} />);

    const disconnectBtn = screen.getByTestId('chamber-disconnect-button');
    expect(disconnectBtn).toBeInTheDocument();

    fireEvent.click(disconnectBtn);
    expect(onClose).toHaveBeenCalled();
  });
});
