import { fireEvent, render } from '@/test-utils';
import { HandsUpModal } from './HandsUpModal';

describe('<HandsUpModal />', () => {
  test(`render hands up modal with true`, () => {
    const handleClose = vi.fn();
    const handleConfirm = vi.fn();
    const { getByTestId, container } = render(
      <HandsUpModal
        isOpen={true}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />,
    );
    expect(getByTestId('hands-up-modal')).toBeInTheDocument();
    const confirmButton = getByTestId('confirm-button');
    const cancelButton = getByTestId('cancel-button');
    fireEvent.click(confirmButton);
    fireEvent.click(cancelButton);
    expect(container).toBeTruthy();
  });
});
