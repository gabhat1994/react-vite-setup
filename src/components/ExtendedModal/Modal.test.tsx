import { render, screen, fireEvent } from '@/test-utils';
import { Modal } from './Modal';

describe('<Modal />', () => {
  test('renders', () => {
    render(
      <Modal isFullScreen={false} open testId="modal">
        <p>Hello world</p>
      </Modal>,
    );
    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveTextContent('Hello world');
  });

  test('closes on `Escape` key press and backdrop click', () => {
    const onClose = vi.fn();
    render(
      <Modal isFullScreen={false} open testId="modal" onClose={onClose} />,
    );

    fireEvent.keyDown(screen.getByTestId('modal'), { code: 'Escape' });
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  test("doesn't close on `Escape` key press or backdrop click", () => {
    const onClose = vi.fn();
    render(
      <Modal
        open
        isFullScreen={false}
        testId="modal"
        onClose={onClose}
        disableEscapeKeyDown
        disableBackdropClick
      />,
    );

    fireEvent.keyDown(screen.getByTestId('modal'), { code: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });
});
