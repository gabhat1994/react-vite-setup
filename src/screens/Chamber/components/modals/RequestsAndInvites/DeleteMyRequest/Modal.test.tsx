import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@/test-utils';
import { DeleteMyRequest } from './Modal';
import { type DeleteMyRequestProps } from './types';

const deleteRequestProps: DeleteMyRequestProps = {
  requestId: 'request_id',
  onClose: vi.fn(),
  onDelete: vi.fn(),
  isDeleting: true,
  component: undefined,
  isOpen: true,
};

describe('<DeleteMyRequest />', () => {
  test('renders', () => {
    const { getByTestId } = render(<DeleteMyRequest {...deleteRequestProps} />);
    const deleteRequestModal = getByTestId('delete_request');
    const deleteConfirmText = getByTestId('delete_confirm_text');
    const deleteRequestBtn = getByTestId('request_delete_btn');
    const deleteRequestCancelBtn = getByTestId('request_delete_cancel_btn');

    expect(deleteRequestModal).toBeTruthy();
    expect(deleteConfirmText).toBeTruthy();
    expect(deleteRequestBtn).toBeTruthy();
    expect(deleteRequestCancelBtn).toBeTruthy();
  });

  test('Clicked Cancel Button', () => {
    const { getByTestId } = render(<DeleteMyRequest {...deleteRequestProps} />);
    const cancelBtn = getByTestId('request_delete_cancel_btn');

    act(() => {
      fireEvent.click(cancelBtn);
    });

    expect(deleteRequestProps.onClose).toHaveBeenCalled();
  });

  test('Clicked Cancel Button', () => {
    const { getByTestId } = render(<DeleteMyRequest {...deleteRequestProps} />);
    const deleteBtn = getByTestId('request_delete_btn');

    act(() => {
      fireEvent.click(deleteBtn);
    });

    expect(deleteRequestProps.onDelete).toHaveBeenCalled();
  });
});
