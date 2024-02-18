import { render, fireEvent, act } from '@/test-utils';
import { Icon } from '@/components/Icon';
import { Radiobox } from './Radiobox';

describe('<Radiobox />', () => {
  test('renders', () => {
    const { container, getByTestId } = render(
      <Radiobox
        isChecked={false}
        icon={
          <Icon
            name="radio_btn_m"
            size={12}
            color="--icon-radiobutton-brand-primary-default"
          />
        }
      />,
    );

    const outerBox = getByTestId('radio_box_outer');
    const innerBox = getByTestId('radio_box');

    expect(container).toBeTruthy();
    expect(outerBox).toBeTruthy();
    expect(innerBox).toBeTruthy();
  });

  test('should render text passed as prop', () => {
    const testText = 'Test';
    const { getByText, container } = render(
      <Radiobox
        text={testText}
        isChecked={false}
        icon={
          <Icon
            name="radio_btn_m"
            size={12}
            color="--icon-radiobutton-brand-primary-default"
          />
        }
      />,
    );
    expect(getByText(testText)).toBeInTheDocument();
    expect(container).toBeTruthy();
  });

  test('checking radioBox clicks', () => {
    const onChange = vi.fn();

    const { getByTestId, container } = render(
      <Radiobox
        text="Male"
        isChecked={false}
        icon={
          <Icon
            data-testid="radio_btn_icon"
            name="radio_btn_m"
            size={12}
            color="--icon-radiobutton-brand-primary-default"
          />
        }
        onChange={onChange}
      />,
    );
    expect(container).toBeTruthy();

    const radioBox = getByTestId('radio_box');

    act(() => {
      fireEvent.click(radioBox);
    });
    expect(onChange).toHaveBeenCalled();
  });
});
