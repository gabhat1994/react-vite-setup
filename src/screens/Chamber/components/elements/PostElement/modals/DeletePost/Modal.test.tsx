import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@/test-utils';
import { DeletePost } from './Modal';
import { type DeletePostProps } from './types';

const deletePostProps: DeletePostProps = {
  postId: 'post_id',
  onClose: vi.fn(),
  onDelete: vi.fn(),
};

describe('<DeletePost />', () => {
  test('renders', () => {
    const { getByTestId } = render(<DeletePost {...deletePostProps} />);
    const deletePostModal = getByTestId('delete_post');
    const deleteConfirmText = getByTestId('delete_confirm_text');
    const deletePostBtn = getByTestId('post_delete_btn');
    const deletePostCancelBtn = getByTestId('post_delete_cancel_btn');

    expect(deletePostModal).toBeTruthy();
    expect(deleteConfirmText).toBeTruthy();
    expect(deletePostBtn).toBeTruthy();
    expect(deletePostCancelBtn).toBeTruthy();
  });

  test('closes on `Escape` key press and backdrop click', () => {
    const { getByTestId } = render(<DeletePost {...deletePostProps} />);

    fireEvent.keyDown(getByTestId('delete_post'), {
      code: 'Escape',
    });
    expect(deletePostProps.onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(deletePostProps.onClose).toHaveBeenCalled();
  });

  test('Clicked Cancel Button', () => {
    const { getByTestId } = render(<DeletePost {...deletePostProps} />);
    const cancelBtn = getByTestId('post_delete_cancel_btn');

    act(() => {
      fireEvent.click(cancelBtn);
    });

    expect(deletePostProps.onClose).toHaveBeenCalled();
  });

  test('Clicked Cancel Button', () => {
    const { getByTestId } = render(<DeletePost {...deletePostProps} />);
    const deleteBtn = getByTestId('post_delete_btn');

    act(() => {
      fireEvent.click(deleteBtn);
    });

    expect(deletePostProps.onDelete).toHaveBeenCalled();
  });
});
