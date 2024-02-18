import { render, fireEvent, createEvent } from '@/test-utils';
import { OtpInput } from './OtpInput';

describe('<OtpInput />', () => {
  it('Renders correctly', () => {
    const handleOnChange = vi.fn();

    const { getByTestId } = render(
      <OtpInput
        data-testid="OtpInputTestId"
        value="1234"
        numInputs={4}
        onChange={handleOnChange}
      />,
    );
    expect(getByTestId('OtpInputTestId-0')).toBeInTheDocument();
    expect(getByTestId('OtpInputTestId-0')).toHaveFocus();
    expect(getByTestId('OtpInputTestId-1')).toBeInTheDocument();
    expect(getByTestId('OtpInputTestId-2')).toBeInTheDocument();
    expect(getByTestId('OtpInputTestId-3')).toBeInTheDocument();
  });

  it('Checks the OtpInput function handleOnKeyDown Backspace', () => {
    const handleOnChange = vi.fn();
    const { getByTestId } = render(
      <OtpInput
        data-testid="OtpInputTestId"
        value="1234"
        numInputs={4}
        onChange={handleOnChange}
      />,
    );

    const input = getByTestId('OtpInputTestId-2');
    expect(input).toBeInTheDocument();
    input.focus();
    fireEvent.keyDown(input, { key: 'Backspace', keyCode: 8 });
    expect(handleOnChange).toHaveBeenCalledWith('124');
    expect(input).toHaveFocus();

    const input2 = getByTestId('OtpInputTestId-3');
    expect(input2).toBeInTheDocument();
    input2.focus();
    fireEvent.keyDown(input, { key: 'Backspace', keyCode: 8 });
    expect(handleOnChange).toHaveBeenCalledWith('123');
    expect(input2).toHaveFocus();

    const input3 = getByTestId('OtpInputTestId-0');
    expect(input3).toBeInTheDocument();
    input3.focus();
    fireEvent.keyDown(input, { key: 'Backspace', keyCode: 8 });
    expect(handleOnChange).toHaveBeenCalledWith('234');
    expect(input3).toHaveFocus();
  });

  it('Checks the OtpInput function handleOnKeyDown Delete', () => {
    const handleOnChange = vi.fn();
    const { getByTestId } = render(
      <OtpInput
        data-testid="OtpInputTestId"
        value="4567"
        numInputs={4}
        onChange={handleOnChange}
      />,
    );

    const input = getByTestId('OtpInputTestId-2');
    input.focus();
    expect(input).toBeInTheDocument();
    fireEvent.keyDown(input, { key: 'Delete', keyCode: 46 });
    expect(handleOnChange).toHaveBeenCalledWith('457');
    expect(input).toHaveFocus();
  });

  it('Checks the OtpInput function handleOnKeyDown Arrow Left', () => {
    const handleOnChange = vi.fn();
    const { getByTestId } = render(
      <OtpInput
        data-testid="OtpInputTestId"
        value="4567"
        numInputs={4}
        onChange={handleOnChange}
      />,
    );

    const input = getByTestId('OtpInputTestId-2');
    input.focus();
    expect(input).toBeInTheDocument();
    fireEvent.keyDown(input, { key: 'ArrowLeft', keyCode: 37 });
    const input2 = getByTestId('OtpInputTestId-1');
    expect(handleOnChange).toHaveBeenCalledTimes(0);
    expect(input2).toHaveFocus();
  });

  it('Checks the OtpInput function handleOnKeyDown Arrow Right', () => {
    const handleOnChange = vi.fn();
    const { getByTestId } = render(
      <OtpInput
        data-testid="OtpInputTestId"
        value="4567"
        numInputs={4}
        onChange={handleOnChange}
      />,
    );

    const input = getByTestId('OtpInputTestId-2');
    expect(input).toBeInTheDocument();
    input.focus();
    fireEvent.keyDown(input, { key: 'ArrowRight', keyCode: 39 });

    const input2 = getByTestId('OtpInputTestId-3');
    expect(input2).toBeInTheDocument();
    expect(handleOnChange).toHaveBeenCalledTimes(0);
    expect(input2).toHaveFocus();
  });

  it('Checks the OtpInput function handleOnKeyDown empty String, Spacebar', () => {
    const handleOnChange = vi.fn();
    const { getByTestId } = render(
      <OtpInput
        data-testid="OtpInputTestId"
        value="1234"
        numInputs={4}
        onChange={handleOnChange}
      />,
    );

    const input = getByTestId('OtpInputTestId-3');
    expect(input).toBeInTheDocument();

    fireEvent.keyDown(input, { key: ' ' });
    expect(handleOnChange).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(input, { key: 'Spacebar', keyCode: 32 });
    expect(handleOnChange).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(input, { key: 'Space' });
    expect(handleOnChange).toHaveBeenCalledTimes(0);
  });

  it('Checks the OtpInput function handleOnPaste', () => {
    const handleOnChange = vi.fn();
    const { getByTestId } = render(
      <OtpInput
        data-testid="OtpInputTestId"
        value="1234"
        numInputs={4}
        onChange={handleOnChange}
      />,
    );

    const input = getByTestId('OtpInputTestId-0');
    expect(input).toBeInTheDocument();

    const paste = createEvent.paste(input, {
      clipboardData: {
        getData: () => '4567',
      },
    });

    fireEvent(input, paste);
    expect(handleOnChange).toHaveBeenCalledWith('4567');
  });

  it('Checks the OtpInput function changeCodeAtIndex when no value present and did backspace', () => {
    const handleOnChange = vi.fn();
    const { getByTestId } = render(
      <OtpInput
        data-testid="OtpInputTestId"
        value="123"
        numInputs={4}
        onChange={handleOnChange}
      />,
    );

    const input = getByTestId('OtpInputTestId-3');
    expect(input).toBeInTheDocument();
    input.focus();
    fireEvent.keyDown(input, { key: 'Backspace', keyCode: 8 });
    expect(handleOnChange).toHaveBeenCalledWith('12');
    const input2 = getByTestId('OtpInputTestId-2');
    expect(input2).toBeInTheDocument();
    expect(input2).toHaveFocus();
  });

  it('Checks the OtpInput function changeCodeAtIndex when value present and pressed keydown', () => {
    const handleOnChange = vi.fn();
    const { getByTestId } = render(
      <OtpInput
        data-testid="OtpInputTestId"
        value="1234"
        numInputs={4}
        onChange={handleOnChange}
      />,
    );

    const input = getByTestId('OtpInputTestId-2');
    expect(input).toBeInTheDocument();
    input.focus();
    fireEvent.keyDown(input, { key: '5', keyCode: 53 });
    expect(handleOnChange).toHaveBeenCalledWith('1254');
    const input2 = getByTestId('OtpInputTestId-3');
    expect(input2).toBeInTheDocument();
    expect(input2).toHaveFocus();
  });

  it('Checks the OtpInput with empty otp value and default number of inputs', () => {
    const handleOnChange = vi.fn();
    const { getByTestId } = render(
      <OtpInput
        data-testid="OtpInputTestId"
        value=""
        onChange={handleOnChange}
      />,
    );

    expect(getByTestId('OtpInputTestId-0')).toBeInTheDocument();
    expect(getByTestId('OtpInputTestId-1')).toBeInTheDocument();
    expect(getByTestId('OtpInputTestId-2')).toBeInTheDocument();
    expect(getByTestId('OtpInputTestId-3')).toBeInTheDocument();
  });

  it('Checks the OtpInput function handleOnPaste when disaled', () => {
    const handleOnChange = vi.fn();
    const { getByTestId } = render(
      <OtpInput
        data-testid="OtpInputTestId"
        value="1234"
        numInputs={4}
        isDisabled={true}
        onChange={handleOnChange}
      />,
    );

    const input = getByTestId('OtpInputTestId-0');
    expect(input).toBeInTheDocument();

    const paste = createEvent.paste(input, {
      clipboardData: {
        getData: () => '4567',
      },
    });

    fireEvent(input, paste);
    expect(handleOnChange).toHaveBeenCalledTimes(0);
  });

  it('Checks the OtpInput function handleOnChange', () => {
    const handleOnChange = vi.fn();
    const { getByTestId } = render(
      <OtpInput
        data-testid="OtpInputTestId"
        value="1234"
        numInputs={4}
        onChange={handleOnChange}
      />,
    );

    const input = getByTestId('OtpInputTestId-1');
    expect(input).toBeInTheDocument();
    input.focus();

    fireEvent.change(input, { target: { value: '5' } });
    expect(handleOnChange).toHaveBeenCalledWith('1534');
  });

  it('Checks the OtpInput isInputValueValid and handleOnChange with String', () => {
    const handleOnChange = vi.fn();
    const { getByTestId } = render(
      <OtpInput
        data-testid="OtpInputTestId"
        value="abcd"
        numInputs={4}
        isInputNum={false}
        onChange={handleOnChange}
      />,
    );

    const input1 = getByTestId('OtpInputTestId-0');
    const input2 = getByTestId('OtpInputTestId-1');
    const input3 = getByTestId('OtpInputTestId-2');
    const input4 = getByTestId('OtpInputTestId-3');
    expect(input1).toBeInTheDocument();
    expect(input2).toBeInTheDocument();
    expect(input3).toBeInTheDocument();
    expect(input4).toBeInTheDocument();

    expect((input1 as HTMLInputElement).value).toBe('a');
    expect((input2 as HTMLInputElement).value).toBe('b');
    expect((input3 as HTMLInputElement).value).toBe('c');
    expect((input4 as HTMLInputElement).value).toBe('d');

    input2.focus();
    fireEvent.change(input2, { target: { value: 'e' } });
    expect(handleOnChange).toHaveBeenCalledWith('aecd');
  });
});
