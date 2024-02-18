import { fireEvent, render, screen } from '@/test-utils';
import { DeleteCommentModal } from './DeleteCommentModal';

const cancelCallback = vi.fn();
const confirmCallback = vi.fn();

describe('<DeleteCommentModal />', () => {
  test('renders ', () => {
    const { getByTestId } = render(
      <DeleteCommentModal
        isOpen
        cancelCallback={cancelCallback}
        confirmCallback={confirmCallback}
      />,
    );

    const primaryBtn = getByTestId('primaryBtn');
    const primaryBtnLabel = getByTestId('primaryBtnLabel');
    expect(primaryBtn).toBeInTheDocument();
    expect(primaryBtn).toContainElement(primaryBtnLabel);
  });

  test('render when mandatory props passed', () => {
    const { getByTestId } = render(
      <DeleteCommentModal
        isOpen
        cancelCallback={cancelCallback}
        confirmCallback={confirmCallback}
      />,
    );
    const primaryBtn = getByTestId('primaryBtn');
    const primaryBtnLabel = getByTestId('primaryBtnLabel');
    expect(primaryBtn).toBeInTheDocument();
    expect(primaryBtn).toContainElement(primaryBtnLabel);
  });

  test('closes on `Escape` key press and backdrop click', () => {
    render(
      <DeleteCommentModal
        isOpen
        cancelCallback={cancelCallback}
        confirmCallback={confirmCallback}
      />,
    );

    fireEvent.keyDown(screen.getByTestId('secondaryBtn'), {
      code: 'Escape',
    });
    expect(cancelCallback).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(cancelCallback).toHaveBeenCalled();
  });

  test('closes confirm clicked', () => {
    render(
      <DeleteCommentModal
        isOpen
        cancelCallback={cancelCallback}
        confirmCallback={confirmCallback}
      />,
    );

    const cancelBtn = screen.getByTestId('secondaryBtn');
    expect(cancelBtn).toBeInTheDocument();

    fireEvent.click(cancelBtn);
    expect(cancelCallback).toHaveBeenCalled();
  });
});
