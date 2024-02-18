import { type KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@/components/ExtendedModal';
import { type Maybe, type OtpResponseOutput } from '@/apollo/generated/types';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import { Button } from '@/components/Button';
import { TextFieldWrapper } from '@/screens/CoreSettings/AccountSettings/styles';
import { useGenerateOtpForVerificationMutation } from '@/apollo/graphql';
import { isValidPhoneNumber } from '@/utils/phonenumber';
import { PhoneInput } from '@/components/PhoneInput';
import { type EditPhoneNumberModalProps } from '../types';

export const EditAndEnablePhoneNumberModal = ({
  cancelCallback,
  onFailed,
  onSuccess,
  isEdit,
}: EditPhoneNumberModalProps) => {
  const { t } = useTranslation();

  const submitPhoneData = useCallback(
    async (data: Maybe<OtpResponseOutput | undefined>, phoneNumber: string) => {
      if (data?.error) {
        onFailed('phone', data);
        return;
      }
      onSuccess('phone', data, phoneNumber);
    },
    [onSuccess, onFailed],
  );

  const { width } = useWindowDimensions();
  const isMobile = width < breakpoints.TABLET;

  const [phone, setPhone] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const handlePhoneChange = useCallback(
    (value: string) => {
      setPhone(value);
    },
    [setPhone],
  );

  const [generateOtpForVerificationMutation] =
    useGenerateOtpForVerificationMutation({
      variables: {
        phone,
      },
    });
  const handleClick = useCallback(async () => {
    setPhoneError('');
    if (!phone) {
      setPhoneError(t('noumena.phone_login_form.valid_phone.field_empty'));
      return;
    }
    if (phone.includes('-') || !isValidPhoneNumber(`+${phone}`)) {
      setPhoneError(t('noumena.phone_login_form.valid_phone.error_message'));
      return;
    }
    await generateOtpForVerificationMutation().then((response) => {
      const res: Maybe<OtpResponseOutput | undefined> =
        response?.data?.generateOTPForVerification;
      submitPhoneData(res, phone);
    });
  }, [phone, submitPhoneData, generateOtpForVerificationMutation, t]);

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
  }, [phone, setPhoneError]);

  return (
    <Modal
      style={{ textAlign: isMobile ? 'left' : 'center' }}
      onClose={cancelCallback}
      isFullScreen={isMobile}
      open={true}
    >
      <ModalHeader isFullScreen={isMobile}>
        {isEdit
          ? t(`noumena.myaccount.account_settings_edit_popoup`)
          : t(`noumena.account.settings_to_enable_phone_popup`)}
      </ModalHeader>
      <ModalBody
        style={{ maxWidth: isMobile ? '100%' : 350 }}
        isFullScreen={isMobile}
        flexDirection="column"
      >
        <TSpan
          font="body-l"
          colorToken="--text-body-neutral-default"
          data-testid="description"
        >
          {isEdit
            ? t(`noumena.myaccount.account_settings.phone_description`)
            : t(`noumena.myaccount.account_settings.phone_description_new`)}
        </TSpan>
        <Spacer height="16px" />
        <>
          <TextFieldWrapper>
            <PhoneInput
              label={t('noumena.phone_login_form.phone.label')}
              error={!!phoneError}
              helperText={phoneError}
              onPhoneChange={handlePhoneChange}
              onKeyPress={handlePhoneInputKeyPress}
              data-testid="testLoginPhoneInput"
            />
          </TextFieldWrapper>
        </>
      </ModalBody>
      <ModalFooter gap={20} isFullScreen={isMobile}>
        <Button
          tertiary
          size="full"
          onClick={cancelCallback}
          testId="cancelButton"
          textTestId="secondaryBtnLabel"
        >
          {t('noumena.cancel')}
        </Button>
        <Button
          primary
          size="full"
          onClick={handleClick}
          softDisabled={phone.trim() === ''}
        >
          {t(`noumena.next.text`)}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
