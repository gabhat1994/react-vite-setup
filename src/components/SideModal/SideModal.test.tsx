import { render, screen, fireEvent } from '@/test-utils';
import { SideModal } from './SideModal';

vi.mock('@/hooks/launchDarkly', () => ({
  useLaunchDarkly: () => ({ flags: { newAppNavigation: false } }),
}));

describe('<SideModal />', () => {
  const testId = 'side-modal-testid';
  test('renders', () => {
    render(
      <SideModal open>
        <p>Hello world</p>
      </SideModal>,
    );
    const modal = screen.getByTestId(testId);
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveTextContent('Hello world');
  });

  test('closes on `Escape` key press and backdrop click', () => {
    const onClose = vi.fn();
    render(<SideModal open onClose={onClose} />);

    fireEvent.keyDown(screen.getByTestId(testId), { code: 'Escape' });
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  test("doesn't close on `Escape` key press or backdrop click", () => {
    const onClose = vi.fn();
    render(
      <SideModal
        open
        onClose={onClose}
        disableEscapeKeyDown
        disableBackdropClick
      />,
    );

    fireEvent.keyDown(screen.getByTestId(testId), { code: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });
});
