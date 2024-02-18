import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { type Maybe, type OtpResponseOutput } from '@/apollo/generated/types';
import { Spacer } from '@/layout';
import { TextFieldWrapper } from '@/screens/CoreSettings/AccountSettings/styles';
import { TextField } from '@/components/TextField';
import { EMAIL_REGEX } from '@/constants/regex';
import { Button } from '@/components/Button';
import { useGenerateOtpForVerificationMutation } from '@/apollo/graphql';
import { useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import { isValidEmail } from '@/utils/email';
import {
  type EditPhoneNumberModalProps,
  type EmailLoginFormInputs,
} from '../types';

export const EditAndEnableEmailAddressModal = ({
  cancelCallback,
  onSuccess,
  isEdit,
}: EditPhoneNumberModalProps) => {
  const { t } = useTranslation();

  const validationSchema = useMemo(
    () =>
      yup
        .object({
          email: yup
            .string()
            .trim()
            .required(t('noumena.input.complete_field'))
            .email(t('noumena.signup.error.incorrect_email'))
            .test(
              'validateEmail',
              t('noumena.signup.error.incorrect_email'),
              (value) => isValidEmail(value || ''),
            ),
        })
        .required(),
    [t],
  );

  const {
    register,
    setError,
    formState: { errors, isValid },
  } = useForm<EmailLoginFormInputs>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const submitEmailData = useCallback(
    async (data: Maybe<OtpResponseOutput | undefined>, email: string) => {
      if (data?.error && data?.message) {
        setError('email', {
          message: data?.message,
        });
        return;
      }
      onSuccess('email', data, email);
    },
    [onSuccess, setError],
  );

  const btnType: { [key: string]: boolean } = {};
  const [email, setEmail] = useState<string>('');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.currentTarget.value);
    },
    [setEmail],
  );

  const [generateOtpForVerificationMutation] =
    useGenerateOtpForVerificationMutation({
      variables: {
        email,
      },
    });

  const handleClick = useCallback(async () => {
    await generateOtpForVerificationMutation().then((response) => {
      const res: Maybe<OtpResponseOutput | undefined> =
        response?.data?.generateOTPForVerification;
      submitEmailData(res, email);
    });
  }, [submitEmailData, email, generateOtpForVerificationMutation]);

  const { width } = useWindowDimensions();
  const isMobile = width < breakpoints.TABLET;

  return (
    <Modal
      onClose={cancelCallback}
      style={{ textAlign: isMobile ? 'left' : 'center' }}
      isFullScreen={isMobile}
      open={true}
      enableCloseButton
      disableBackdropClick
      disableEscapeKeyDown
    >
      <ModalHeader isFullScreen={isMobile} topPadding={0}>
        {isEdit
          ? t(`noumena.myaccount.account_settings_edit_email_address_popup`)
          : t(`noumena.account.settings_to_enable_email_popup`)}
      </ModalHeader>
      <ModalBody
        style={{ maxWidth: isMobile ? '100%' : 350 }}
        isFullScreen={isMobile}
      >
        <TSpan
          font="body-l"
          colorToken="--text-body-neutral-default"
          data-testid="description"
        >
          {isEdit
            ? t(`noumena.myaccount.account_settings.email_description`)
            : t(`noumena.myaccount.account_settings.email_description`)}
        </TSpan>
        <Spacer height={16} />
        <TextFieldWrapper>
          <TextField
            {...register('email', {
              required: {
                value: true,
                message: t('noumena.email_login_form.valid_email.field_empty'),
              },
              pattern: {
                value: EMAIL_REGEX,
                message: t(
                  'noumena.email_login_form.valid_email.error_message',
                ),
              },
              onChange: handleChange,
            })}
            name="email"
            value={email}
            label={t('noumena.email_address_new')}
            error={!!errors.email}
            helperText={
              errors.email?.message || t('noumena.email_professional')
            }
            data-testid="testEmailLoginTextField"
          />
        </TextFieldWrapper>
      </ModalBody>
      <ModalFooter isFullScreen={isMobile}>
        <Button
          tertiary
          size="full"
          onClick={cancelCallback}
          testId="cancelButton"
          textTestId="secondaryBtnLabel"
        >
          {t('noumena.cancel')}
        </Button>
        <Spacer width={20} />
        <Button
          type="submit"
          primary
          disabled={!email || !isValid}
          size="full"
          testId="nextButton"
          textTestId="primaryBtnLabel"
          onClick={handleClick}
          {...btnType}
        >
          {t(`noumena.changeEmail`)}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
