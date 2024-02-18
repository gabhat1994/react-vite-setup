import { type FC, useEffect, useState, useContext } from 'react';
import * as Sentry from '@sentry/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { handleBackendError } from '@/screens/Register/helpers';
import { IdentityServices } from '@/services/rest/identity';
import { DeviceTypeEnum, useDeviceType, useRecaptcha, useToast } from '@/hooks';
import { Spacer, Stack } from '@/layout';
import { TextField } from '@/components/TextField';
import { OtpInput } from '@/components/Otp/OtpInput';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import Timer from '@/components/Timer/Timer';
import { Icon } from '@/components/Icon';
import { isValidEmail } from '@/utils/email';
import {
  useCheckPassCodeExistsQuery,
  useUpdateUserProfileMutation,
} from '@/apollo/graphql';
import Errors from '@/constants/errors';
import {
  FormText,
  FormHelperText,
  FormWrapper,
  StyledSpinner,
  StyledResendSpan,
  StyledResendWaitSpan,
} from '../styles';
import { type FormValues, type ResendOTPMessageProps } from './types';
import { SetupWalletContext } from '../../context';

const FormEmailVerification: FC = () => {
  const { data: passCodeData, loading: passCodeCheckLoading } =
    useCheckPassCodeExistsQuery({
      fetchPolicy: 'cache-and-network',
    });
  const {
    handleNextStep,
    handlePreviousStep,
    setPayLoad,
    setState,
    currentUser: { email: existingEmail },
  } = useContext(SetupWalletContext);
  const [steps, setSteps] = useState<1 | 2>(1);
  const [otp, setOtp] = useState<string>();
  const [typedEmail, setTypedEmail] = useState<string>('');
  const [isResendOTPDisabled, setDisableResendOTP] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const minimumTimeToShowCountDown = 90;
  const [nextRequestAfter, setNextRequestAfter] = useState<number>(0);
  const [updateUserProfileMutation] = useUpdateUserProfileMutation();
  const { returnNewReCaptcha } = useRecaptcha();
  const isPassCodeExist = !!passCodeData?.checkPassCodeExists;

  const { addToast } = useToast();

  const deviceType = useDeviceType();

  const defaultResendRequests = 3;

  const { t } = useTranslation();
  const {
    getValues,
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    if (existingEmail) {
      setValue('email', existingEmail, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [existingEmail, setValue]);

  const captureSentryException = (
    sentryError: Error,
    toastError: string,
    showToast: boolean,
  ) => {
    Sentry.captureException(sentryError, {
      tags: {
        section: 'signupEmailSetupWallet',
      },
    });
    if (showToast) addToast('error', 'none', toastError);
  };

  const timedOut = () => {
    setDisableResendOTP(false);
    setNextRequestAfter(0);
  };

  const handleNextSubState = () => {
    if (steps === 1) setSteps(2);
  };
  const handlePreviousSubState = () => {
    if (steps === 2) setSteps(1);
  };

  const requestAfter = (
    nextRequestAfterInSecond: number,
    remainingRequest: number,
  ) => {
    setDisableResendOTP(
      nextRequestAfterInSecond > 0 ||
        remainingRequest !== defaultResendRequests,
    );
    setNextRequestAfter(nextRequestAfterInSecond);
  };

  const convertedMessages: { [key: string]: string } = {
    'Invalid OTP, Please try again!': t`noumena.resend_otp_invalid_code.text`,
  };

  const convertedMessage = (value: string | undefined) => {
    if (value && convertedMessages[value]) {
      return convertedMessages[value];
    }
    return value || '';
  };

  const handleIfPreviousPassCodeExists = () => {
    if (isPassCodeExist) {
      setState(6);
    } else {
      handleNextStep();
    }
  };

  const handleSignUp = async (email: string) => {
    setIsLoading(true);
    setTypedEmail(email);
    if (existingEmail === email && setPayLoad) {
      setPayLoad((_payload) => ({ ..._payload, email }));
      handleIfPreviousPassCodeExists();
      return;
    }
    const token = await returnNewReCaptcha();
    const response = await IdentityServices.signUpEmail(email, token, false);
    if (!response?.errorMessage) {
      requestAfter(
        response.nextRequestAfterInSecond,
        response.remainingRequest,
      );
      addToast('success', 'none', `${response.message}`);
      reset({ email: '' });
      handleNextSubState();
    } else {
      captureSentryException(
        new Error(handleBackendError(response)),
        `${handleBackendError(response)}`,
        false,
      );
      if (response.errorStatus === 102) {
        addToast('error', 'none', Errors.BLOCKED_IP);
      }
    }

    setIsLoading(false);
  };

  const submit = async ({ email }: FormValues) => {
    setTypedEmail(email);
    handleSignUp(email);
  };

  const handleResendOtp = () => {
    setOtp('');
    handleSignUp(typedEmail);
  };

  const submitOtp = async () => {
    if (otp) {
      setIsLoading(true);
      const response = await IdentityServices.signUpEmailVerification(
        typedEmail,
        otp,
        undefined,
        undefined,
        true,
      );

      if (!response?.errorMessage && setPayLoad) {
        setPayLoad((_payload) => ({ ..._payload, email: typedEmail }));
        updateUserProfileMutation({
          variables: {
            input: {
              email: typedEmail,
            },
          },
        });
        handleNextStep();
      } else {
        captureSentryException(
          new Error(handleBackendError(response)),
          convertedMessage(handleBackendError(response)),
          true,
        );
        if (response.errorStatus === 102) {
          addToast('error', 'none', Errors.BLOCKED_IP);
        }
        setOtp('');
      }

      setIsLoading(false);
    }
  };

  const RenderResendOTPMessage: FC<ResendOTPMessageProps> = ({
    duration,
    handleTimedOut,
  }) => {
    if (duration !== 0 && duration <= minimumTimeToShowCountDown) {
      return (
        <>
          <StyledResendSpan>
            <TSpan font="body-m" $fill colorToken="--text-body-neutral-default">
              {t('noumena.resend_otp_code_sent.text')}{' '}
            </TSpan>
          </StyledResendSpan>
          <StyledResendWaitSpan duration={duration}>
            <TSpan font="body-m" $fill colorToken="--text-body-neutral-default">
              {t('noumena.resend_otp_please_wait.text')}{' '}
              {<Timer initialSeconds={duration} timedOut={handleTimedOut} />}{' '}
              {t('noumena.resend_otp_before_request.text')}
            </TSpan>
          </StyledResendWaitSpan>
        </>
      );
    }
    return (
      <TSpan font="body-m" $fill colorToken="--text-body-neutral-default">
        {t('noumena.resend_otp_please_wait_24h.text')}
      </TSpan>
    );
  };

  const renderResendOTPInfo = () => {
    if (!isResendOTPDisabled) {
      return (
        <Button
          primary
          textOnly
          size="small"
          disabled={isLoading}
          onClick={handleResendOtp}
          data-testid="handleResendOtpID"
        >
          <TSpan colorToken="--text-button-brand-secondary-default">
            {t('noumena.signup.otp.resend_code')}
          </TSpan>
        </Button>
      );
    }
    return (
      <TSpan font="body-m" $fill colorToken="--text-body-neutral-default">
        <RenderResendOTPMessage
          handleTimedOut={timedOut}
          duration={nextRequestAfter}
        />
      </TSpan>
    );
  };

  return (
    <FormWrapper>
      {steps === 1 ? (
        <FormWrapper>
          <FormText
            font="heading-s-bold"
            colorToken="--text-body-header-neutral-default"
            textAlign="center"
          >
            {t('noumena.money.setupWallet.email.form_text')}
          </FormText>
          <Spacer height={16} />
          <FormHelperText
            font="body-l"
            colorToken="--text-body-neutral-default"
            textAlign="center"
          >
            {t('noumena.money.setupWallet.email.sub_text')}
          </FormHelperText>
          <Spacer height={64} />
          <form
            onSubmit={handleSubmit(submit)}
            style={{
              width: '100%',
              height: '90%',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}
          >
            <TextField
              data-testid="step-three-email"
              label={t('noumena.email_address')}
              {...register('email', {
                required: {
                  value: true,
                  message: t(`noumena.input.not_empty`),
                },
                validate: {
                  isValidEmail: (value) =>
                    isValidEmail(value) ||
                    t(`noumena.signup.error.incorrect_email`),
                },
              })}
              value={getValues('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <Spacer height={16} />
            {isLoading ? (
              <StyledSpinner>
                <Spacer height={40} />
                <Spinner />
              </StyledSpinner>
            ) : (
              <Stack
                fullWidth
                style={{ justifyContent: 'space-between', gap: '16px' }}
              >
                <Button
                  data-testid="step-three-back-button-sub-state-one"
                  type="button"
                  style={
                    deviceType === DeviceTypeEnum.MOBILE
                      ? { width: '102px' }
                      : undefined
                  }
                  size={
                    deviceType !== DeviceTypeEnum.MOBILE ? 'large' : undefined
                  }
                  onClick={handlePreviousStep}
                  leftIcon={
                    <Icon
                      name="arrow_left_m"
                      size={24}
                      color="--icon-button-neutral-default"
                    />
                  }
                >
                  {t('noumena.back.text')}
                </Button>
                <Button
                  data-testid="step-three-next-button-sub-state-one"
                  type="submit"
                  primary
                  loading={passCodeCheckLoading}
                  size={
                    deviceType !== DeviceTypeEnum.MOBILE ? 'full' : undefined
                  }
                  style={
                    deviceType === DeviceTypeEnum.MOBILE
                      ? { width: '226px' }
                      : undefined
                  }
                  disabled={!isDirty || !isValid || passCodeCheckLoading}
                >
                  {t('noumena.continue')}
                </Button>
              </Stack>
            )}
          </form>
        </FormWrapper>
      ) : (
        <FormWrapper>
          <FormText
            font="heading-s-bold"
            colorToken="--text-body-header-neutral-default"
            textAlign="center"
          >
            {t('noumena.signup.error.confirm_email_text')}
          </FormText>
          <Spacer height={16} />
          <FormHelperText
            font="body-l"
            colorToken="--text-body-neutral-default"
            textAlign="center"
          >
            {`${t('noumena.signup.error.confirm_email_sub_text')} `}
          </FormHelperText>
          <Spacer height={64} />
          <OtpInput value={otp} onChange={(val) => setOtp(val)} />
          <Spacer height={32} />
          <Stack
            fullWidth
            style={{ justifyContent: 'space-between', gap: '16px' }}
          >
            <Button
              data-testid="step-one-submit-button"
              type="button"
              onClick={handlePreviousSubState}
              style={
                deviceType === DeviceTypeEnum.MOBILE
                  ? { width: '102px' }
                  : undefined
              }
              size={deviceType !== DeviceTypeEnum.MOBILE ? 'large' : undefined}
              leftIcon={
                <Icon
                  name="arrow_left_m"
                  size={24}
                  color="--icon-button-neutral-default"
                />
              }
            >
              {t('noumena.back.text')}
            </Button>
            <Button
              data-testid="step-one-submit-button"
              type="submit"
              primary
              size={deviceType !== DeviceTypeEnum.MOBILE ? 'full' : undefined}
              style={
                deviceType === DeviceTypeEnum.MOBILE
                  ? { width: '226px' }
                  : undefined
              }
              disabled={!(otp?.length === 4)}
              onClick={submitOtp}
            >
              {t('noumena.continue')}
            </Button>
          </Stack>
          <Spacer height={32} />
          {renderResendOTPInfo()}
        </FormWrapper>
      )}
    </FormWrapper>
  );
};
export default FormEmailVerification;
