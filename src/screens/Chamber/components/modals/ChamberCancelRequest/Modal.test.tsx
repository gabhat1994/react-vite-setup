import { render, screen, fireEvent } from '@/test-utils';
import { ChamberCancelRequest } from './Modal';

const onClose = vi.fn();
const onCancelRequest = vi.fn();

describe('<ChamberCancelRequest />', () => {
  test('renders', () => {
    render(
      <ChamberCancelRequest
        onCancelRequest={onCancelRequest}
        onClose={onClose}
      />,
    );

    const modal = screen.getByTestId('chamber-cancel-request');
    expect(modal).toBeInTheDocument();

    const cancelBtn = screen.getByTestId('chamber-cancel-request-button');
    expect(cancelBtn).toBeInTheDocument();

    const closeBtn = screen.getByTestId('chamber-close-button');
    expect(closeBtn).toBeInTheDocument();
  });

  test('closes on `Escape` key press and backdrop click', () => {
    render(
      <ChamberCancelRequest
        onCancelRequest={onCancelRequest}
        onClose={onClose}
      />,
    );

    fireEvent.keyDown(screen.getByTestId('chamber-cancel-request'), {
      code: 'Escape',
    });
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  test('closes confirm clicked', () => {
    render(
      <ChamberCancelRequest
        onCancelRequest={onCancelRequest}
        onClose={onClose}
      />,
    );

    const cancelBtn = screen.getByTestId('chamber-cancel-request-button');
    expect(cancelBtn).toBeInTheDocument();

    fireEvent.click(cancelBtn);
    expect(onClose).toHaveBeenCalled();
  });
});
