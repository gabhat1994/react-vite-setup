import { render, screen, fireEvent, act } from '@/test-utils';
import { ReportSuccessModal } from './ReportSuccessModal';

const onClose = vi.fn();

describe('<ReportSuccessModal />', () => {
  test('renders', () => {
    const { getByTestId } = render(<ReportSuccessModal onClose={onClose} />);
    const modalEle = getByTestId('report_post_success');
    const titleEle = getByTestId('report_post_success_title');
    const descriptionEle = getByTestId('report_post_success_description');
    const closeBtn = getByTestId('report_post_success_close_btn');

    expect(modalEle).toBeTruthy();
    expect(titleEle).toBeTruthy();
    expect(descriptionEle).toBeTruthy();
    expect(closeBtn).toBeTruthy();
  });

  test('Not closed on `Escape` key press and backdrop click', () => {
    const { getByTestId } = render(<ReportSuccessModal onClose={onClose} />);

    act(() => {
      fireEvent.keyDown(getByTestId('report_post_success'), {
        code: 'Escape',
      });
    });
    expect(onClose).toHaveBeenCalledTimes(0);

    act(() => {
      fireEvent.click(screen.getByRole('dialog'));
    });
    expect(onClose).toHaveBeenCalledTimes(0);
  });

  test('Clicked Close Button', () => {
    const { getByTestId } = render(<ReportSuccessModal onClose={onClose} />);
    const closeBtn = getByTestId('report_post_success_close_btn');

    act(() => {
      fireEvent.click(closeBtn);
    });

    expect(onClose).toHaveBeenCalled();
  });
});
