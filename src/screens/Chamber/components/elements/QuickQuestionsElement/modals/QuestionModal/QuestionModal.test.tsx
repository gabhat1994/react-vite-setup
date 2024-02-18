import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@/test-utils';
import { QuestionModal } from './QuestionModal';
import { type QuestionModalProps } from './types';

const questionProps: QuestionModalProps = {
  questionId: 'question_id',
  refetch: vi.fn(),
  isOpenModal: true,
  onClose: vi.fn(),
  onConfirm: vi.fn(),
};

describe('<ChamberEditMode />', () => {
  test('renders', () => {
    const { getByTestId } = render(<QuestionModal {...questionProps} />);
    const questoinModal = getByTestId('question_modal');
    const confirmText = getByTestId('confirm_text');
    const confirmBtn = getByTestId('confirm_btn');
    const CancelBtn = getByTestId('cancel_btn');

    expect(questoinModal).toBeTruthy();
    expect(confirmText).toBeTruthy();
    expect(confirmBtn).toBeTruthy();
    expect(CancelBtn).toBeTruthy();
  });

  test('closes on `Escape` key press and backdrop click', () => {
    const { getByTestId } = render(<QuestionModal {...questionProps} />);

    fireEvent.keyDown(getByTestId('question_modal'), {
      code: 'Escape',
    });
    expect(questionProps.onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog'));
    expect(questionProps.onClose).toHaveBeenCalled();
  });

  test('Clicked Cancel Button', () => {
    const { getByTestId } = render(<QuestionModal {...questionProps} />);
    const cancelBtn = getByTestId('cancel_btn');

    act(() => {
      fireEvent.click(cancelBtn);
    });

    expect(questionProps.onClose).toHaveBeenCalled();
  });

  test('Clicked Cancel Button', () => {
    const { getByTestId } = render(<QuestionModal {...questionProps} />);
    const confirmBtn = getByTestId('confirm_btn');

    act(() => {
      fireEvent.click(confirmBtn);
    });

    expect(questionProps.onConfirm).toHaveBeenCalled();
  });
});
