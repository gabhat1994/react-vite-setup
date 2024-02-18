import { useEffect, useRef } from 'react';
import { SinleOtpInputStyled } from './styles';
import { type SingleOtpProps } from './types';

const RenderInput = ({
  isDisabled = false,
  isInputNum = true,
  launchFrom,
  isInputPassword = false,
  value = '',
  focus = false,
  color,
  ...rest
}: SingleOtpProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && focus) {
      inputRef.current.focus();
    }
  }, [focus]);

  function getType(): string {
    if (isInputPassword) {
      return 'password';
    }
    if (isInputNum) {
      return 'tel';
    }
    return 'text';
  }

  return (
    <SinleOtpInputStyled
      autoComplete="off"
      type={getType()}
      maxLength={1}
      disabled={isDisabled}
      ref={inputRef}
      value={value || ''}
      color={color}
      {...rest}
      launchFrom={launchFrom}
    />
  );
};

export const SingleOtpInput = (props: SingleOtpProps) => RenderInput(props);
