import { ReportType } from '@/apollo/generated/types';
import { render, fireEvent, act } from '@/test-utils';
import { ReportReasonItem } from './ReportReasonItem';
import { type ReportReasonItemProps } from './types';

const props: ReportReasonItemProps = {
  isChecked: false,
  label: 'Label',
  description: 'Description',
  reportText: '',
  borderBottom: false,
  value: ReportType.Offensive,
  onChangeText: vi.fn(),
  onSelect: vi.fn(),
};

describe('<ReportReasonItem />', () => {
  test('renders', () => {
    const { getByTestId } = render(<ReportReasonItem {...props} />);

    const container = getByTestId('report_reason_container');
    const reasonLabel = getByTestId('report_reason_label');
    const reasonDescription = getByTestId('report_reason_description');
    const radioBtn = getByTestId('radio_box');

    expect(container).toBeTruthy();
    expect(reasonLabel).toBeTruthy();
    expect(reasonDescription).toBeTruthy();
    expect(radioBtn).toBeTruthy();
  });

  test('Click radioBox', () => {
    const { getByTestId } = render(<ReportReasonItem {...props} />);

    const radioBtn = getByTestId('radio_box');
    act(() => {
      fireEvent.click(radioBtn);
    });

    expect(props.onSelect).toBeCalled();
  });

  test('Type any text for other reason', () => {
    const { getByTestId } = render(
      <ReportReasonItem
        {...props}
        value={ReportType.Other}
        isOtherChecked={true}
      />,
    );
    const textInputEle = getByTestId('report_reason_text_input');
    expect(textInputEle).toBeInTheDocument();
    textInputEle.focus();
    act(() => {
      fireEvent.change(textInputEle, { target: { value: 'Text' } });
    });

    expect(props.onChangeText).toHaveBeenCalled();
  });
});
