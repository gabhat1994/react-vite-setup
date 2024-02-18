import {
  type FC,
  useCallback,
  useEffect,
  useState,
  type KeyboardEvent,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Spacer, Stack } from '@/layout';
import { Button } from '@/components/Button';
import { PhoneInput } from '@/components/PhoneInput/PhoneInput';
import { isValidPhoneNumber } from '@/utils/phonenumber';
import { type PhoneLoginFormProps } from './types';

const PhoneLoginForm: FC<PhoneLoginFormProps> = ({
  recaptchaToken,
  loading,
  submitLoginData,
  errorMessage,
}) => {
  const { t } = useTranslation();

  const [phone, setPhone] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  const handlePhoneChange = useCallback(
    (value: string) => {
      setPhone(value);
    },
    [setPhone],
  );

  const handleClick = useCallback(() => {
    setPhoneError('');
    if (!phone) {
      setPhoneError(t('noumena.phone_login_form.valid_phone.field_empty'));
      return;
    }
    if (phone.includes('-') || !isValidPhoneNumber(`+${phone}`)) {
      setPhoneError(t('noumena.phone_login_form.valid_phone.error_message'));
      return;
    }

    submitLoginData({ type: 'phone', value: phone.trim() });
  }, [phone, submitLoginData, t]);

  const handlePhoneInputKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleClick();
      }
    },
    [handleClick],
  );

  useEffect(() => {
    if (isValidPhoneNumber(phone)) {
      setPhoneError('');
    }
    if (errorMessage) {
      setPhoneError(errorMessage);
    }
  }, [phone, setPhoneError, errorMessage]);

  return (
    <Stack vertical padding="16px 0">
      <PhoneInput
        label={t('noumena.phone_login_form.phone.label')}
        error={!!phoneError}
        helperText={phoneError}
        onPhoneChange={handlePhoneChange}
        onKeyPress={handlePhoneInputKeyPress}
        data-testid="testLoginPhoneInput"
      />
      <Spacer height={29.5} />
      <Button
        id="phone-login-btn"
        primary
        size="full"
        onClick={handleClick}
        loading={loading}
        softDisabled={!recaptchaToken || phone.trim() === '' || loading}
        testId="testPhoneLoginButton"
      >
        {t('noumena.login_button.text')}
      </Button>
    </Stack>
  );
};

export default PhoneLoginForm;
