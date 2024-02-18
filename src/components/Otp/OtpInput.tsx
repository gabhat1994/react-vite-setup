import { useState, useEffect } from 'react';
import { SingleOtpInput } from './SingleOtpInput/SingleOtpInput';
import { OtpStyled } from './styles';
import { type CommonOtpProps } from './types';

const RenderInputs = ({
  numInputs = 4,
  isDisabled = false,
  isInputNum = true,
  isInputPassword = false,
  launchFrom = '',
  dataCy = 'OtpInput-cy',
  dataTestId = 'OtpInputTestId',
  onChange,
  value,
  width,
  onEnter,
  color,
}: CommonOtpProps) => {
  const [activeInput, setActiveInput] = useState<number>(0);
  const inputs = [];
  const getOtpValue = () => (value ? value.toString().split('') : []);

  useEffect(() => {
    if (!value?.length) {
      setActiveInput(0);
    }
  }, [value]);

  const otp = getOtpValue();
  let isNormalFlow = true;

  // calls parent onChange method to return OTP from input
  function handleOtpChange(otpArr: string[]): void {
    let otpValue = otpArr.join('');
    // checking whether user hasn't entered input from first box
    isNormalFlow = Object.values(otpArr).length === otpArr.length;
    if (!isNormalFlow) {
      otpValue = new Array(numInputs)
        .fill('')
        .map((_, i) => otpArr[i] || ' ')
        .join('');
    }
    onChange(otpValue);
  }

  // Checks the input is valid or not based on the type given in isInputNum
  function isInputValueValid(val: string): boolean {
    const isTypeValid = isInputNum
      ? !Number.isNaN(parseInt(val, 10))
      : typeof value === 'string';

    return isTypeValid && val.trim().length === 1;
  }

  // Focus on input by index
  function focusInput(input: number) {
    const updateInput = Math.max(Math.min(numInputs - 1, input), 0);

    setActiveInput(updateInput);
  }

  // Focus on next input
  function focusNextInput() {
    focusInput(activeInput + 1);
  }

  // Focus on previous input
  function focusPrevInput() {
    focusInput(activeInput - 1);
  }

  // Change OTP value at focused input
  const changeCodeAtFocus = (val: string) => {
    const otpVal = getOtpValue();
    const otpTemp = val[0];
    otpVal[activeInput] = otpTemp;

    handleOtpChange(otpVal);
  };

  // Change OTP value at focused input
  const changeCodeAtIndex = (val: string[], index: number) => {
    const otpVal = getOtpValue();
    const otpTemp = val[0];
    otpVal[index] = otpTemp;

    handleOtpChange(otpVal);
  };

  // Handle pasted OTP
  const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();

    if (isDisabled) {
      return;
    }

    const otpVal = getOtpValue();
    let nextActiveInput = activeInput;

    // Get pastedData in an array of max size (num of inputs - current position)
    const pastedData = e.clipboardData
      .getData('text/plain')
      .slice(0, numInputs - activeInput)
      .split('');

    // Paste data from focused input onwards
    for (let pos = 0; pos < numInputs; pos += 1) {
      if (pos >= activeInput && pastedData.length > 0) {
        otpVal[pos] = pastedData.shift() as string;
        nextActiveInput += 1;
      }
    }

    setActiveInput(nextActiveInput);
    focusInput(nextActiveInput);
    handleOtpChange(otpVal);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value: val } = e.target;
    if (isInputValueValid(val) && isNormalFlow) {
      changeCodeAtFocus(val);
    }
  };

  // Handle cases of backspace, delete, left arrow, right arrow, space
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (e.currentTarget.value === '' && activeInput > 0) {
        changeCodeAtIndex([], activeInput - 1);
        focusPrevInput();
      } else {
        changeCodeAtFocus('');
      }
    } else if (e.key === 'Delete') {
      e.preventDefault();
      changeCodeAtFocus('');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusPrevInput();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusNextInput();
    } else if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Space') {
      e.preventDefault();
    } else if (e.key === 'Enter') {
      onEnter?.();
    } else {
      e.stopPropagation();
      const isDigit = Number(e.key);
      if (!Number.isNaN(isDigit) && isDigit >= 0 && isDigit <= 9) {
        changeCodeAtIndex([e.key], activeInput);
        focusNextInput();
      }
    }
  };

  for (let i = 0; i < numInputs; i += 1) {
    inputs.push(
      <SingleOtpInput
        key={i}
        focus={activeInput === i}
        value={otp && otp[i]}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        onPaste={handleOnPaste}
        onFocus={() => {
          setActiveInput(i);
        }}
        onBlur={() => setActiveInput(-1)}
        isDisabled={isDisabled}
        isInputPassword={isInputPassword}
        isInputNum={isInputNum}
        data-cy={dataCy && `${dataCy}-${i}`}
        data-testid={dataTestId && `${dataTestId}-${i}`}
        width={width}
        color={color}
        launchFrom={launchFrom}
      />,
    );
  }

  return inputs;
};

export const OtpInput = ({ ...rest }: CommonOtpProps) => (
  <OtpStyled>{RenderInputs(rest)}</OtpStyled>
);
