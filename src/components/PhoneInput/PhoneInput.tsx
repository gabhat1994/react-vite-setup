import {
  type FC,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';
import { TextField } from '@/components/TextField';
import { parsePhoneNumber } from '@/utils/phonenumber';
import { type PhoneInputProps } from './types';
import { Container } from './styles';
import CountryCodePicker from './CountryCodePicker';

export const PhoneInput: FC<PhoneInputProps> = ({
  onPhoneChange,
  onPressEnterKey,
  ...props
}) => {
  const disallowedCharacters = ['e', 'E', '+', '-', '.'];
  const ref = useRef<HTMLInputElement>(null);
  const [countryCode, setCountryCode] = useState<string>();
  const [number, setNumber] = useState<string>();
  const [countryCodeSelected, setCountryCodeSelected] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const phone = useMemo(
    () => (number ? `${countryCode}${number}` : ''),
    [countryCode, number],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disallowedCharacters.includes(e.key)) e.preventDefault();
  };

  useEffect(() => {
    onPhoneChange(phone);
  }, [onPhoneChange, phone]);

  useEffect(() => {
    const phoneValue = props?.value?.toString();
    if (phoneValue) {
      const numberDetails = parsePhoneNumber(
        `+${phoneValue.replace(/[^\d]/g, '')}`,
      );
      setCountryCodeSelected(numberDetails?.country);
      setPhoneNumber(numberDetails?.nationalNumber);
    }
  }, [props?.value]);

  return (
    <Container>
      <CountryCodePicker
        onCountryCodeChange={(v) => setCountryCode(v)}
        selectedCountryCode={countryCodeSelected}
        disabled={props.disabled}
      />
      <TextField
        data-testid="testPhoneInput"
        ref={ref}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        numberOnly
        {...props}
        value={phoneNumber ?? ''}
        onPaste={(e) => {
          e.preventDefault();
          return false;
        }}
        onCopy={(e) => {
          e.preventDefault();
          return false;
        }}
      />
    </Container>
  );
};

export default PhoneInput;
