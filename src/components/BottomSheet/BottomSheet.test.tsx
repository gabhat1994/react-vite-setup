import { render, screen, fireEvent } from '@/test-utils';
import { BottomSheet } from './BottomSheet';

describe('<BottomSheet />', () => {
  test('renders', () => {
    render(
      <BottomSheet open testId="bottomSheet">
        <p>Hello world</p>
      </BottomSheet>,
    );
    const modal = screen.getByTestId('bottomSheet');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveTextContent('Hello world');
  });

  test('closes on `Escape` key press and backdrop click', () => {
    const onClose = vi.fn();
    render(<BottomSheet open testId="bottomSheet" onClose={onClose} />);

    fireEvent.keyDown(screen.getByTestId('bottomSheet'), { code: 'Escape' });
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  test("doesn't close on `Escape` key press or backdrop click", () => {
    const onClose = vi.fn();
    render(
      <BottomSheet
        open
        testId="bottomSheet"
        onClose={onClose}
        disableEscapeKeyDown
        disableBackdropClick
      />,
    );

    fireEvent.keyDown(screen.getByTestId('bottomSheet'), { code: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });
});
