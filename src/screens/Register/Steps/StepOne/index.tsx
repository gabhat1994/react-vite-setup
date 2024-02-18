import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Spacer, Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';
import { PhoneInput } from '@/components/PhoneInput/PhoneInput';
import { IdentityServices } from '@/services/rest/identity';
import * as Storyblok from '@/services/rest/storyblok';
import { useWindowDimensions } from '@/hooks';
import routes from '@/constants/routes';
import { sizes } from '@/constants/devices';
import EVENTS from '@/constants/trackingEvents';
import { trackEvent } from '@/utils/tracking';
import { useInitialSignUp } from '@/features/onboarding/hooks';
import TermsAndPrivacy from './TermsAndPrivacy';
import { type Content, type RootObject, type SignUpValues } from './types';
import { LinkContainer, Screen, StyledTabPanel } from './styles';
import { handleBackendError } from '../../helpers';
import { useSignUpForm } from './useSignUpForm';

const tabletWidth = parseInt(sizes.TABLET, 10) || 768;

const mobileMaxWidth = parseInt(sizes.MOBILE_MAX, 10) || 767;

export const SignUpForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const windowSize = useWindowDimensions();
  const {
    userInfo,
    recaptchaToken,
    timedOut,
    signUpEmail,
    setUserInfo,
    showBlockedErrorMsg,
    isSigningUpFromNextApp,
    quickSignUpNoumId,
    backUrl,
  } = useInitialSignUp();
  const [loading, setLoading] = useState<boolean>(false);
  const componentMounted = useRef(true);
  const [content, setContent] = useState<Content>();
  const [isValidReferral, setIsValidReferral] = useState<boolean>(false);

  const [searchParams] = useSearchParams();

  const referralCodeParam = searchParams.get('referral-code') || '';
  const referralCode = referralCodeParam.replace(/[^a-zA-Z0-9]/g, '');

  const { control, errors, isValid, handleSubmit, setError, clearErrors } =
    useSignUpForm({
      userInfo,
      onChangeUserInfo: setUserInfo,
    });

  const utmParams: Record<string, string> = useMemo(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((v, k) => {
      if (k.startsWith('utm_')) {
        params[k] = v;
      }
    });
    return params;
  }, [searchParams]);

  useEffect(() => {
    async function getContent() {
      const res = await IdentityServices.serviceValidateReferralCode(
        referralCode,
      );

      const isValidReferralCode = !!(!res.errorMessage && res.isValid);
      setIsValidReferral(isValidReferralCode);
      if (isValidReferralCode && componentMounted?.current) {
        setUserInfo({ ...userInfo, referralCode } as SignUpValues);
        try {
          const { data }: { data: RootObject } =
            await Storyblok.getSignUpPageData(referralCode);
          setContent(data?.story?.content);
        } catch (error) {
          /* empty */
        }
      }
      if (res.errorStatus === 102) showBlockedErrorMsg();
    }
    if (referralCode && !isSigningUpFromNextApp) {
      getContent();
    }

    return () => {
      componentMounted.current = false;
    };
  }, [
    referralCode,
    setUserInfo,
    userInfo,
    showBlockedErrorMsg,
    isSigningUpFromNextApp,
  ]);

  const validateReferralCode = async (code: string): Promise<boolean> => {
    const resp = await IdentityServices.serviceValidateReferralCode(code);
    if (!resp.errorMessage && resp?.isValid && resp?.countExceed === false) {
      clearErrors('referralCode');
      return true;
    }
    if (resp.errorStatus === 102) {
      showBlockedErrorMsg();
      return false;
    }
    setError(
      'referralCode',
      {
        type: 'focus',
        message: handleBackendError(resp),
      },
      { shouldFocus: true },
    );
    return false;
  };

  const validateContact = async (
    type: 'phone' | 'email',
    contact: string,
  ): Promise<boolean> => {
    if (!contact) {
      return false;
    }
    const resp = await IdentityServices.validateContact(type, contact);
    if (resp && !resp.errorMessage) {
      clearErrors(type);
      return true;
    }

    if (resp.errorStatus === 102) {
      showBlockedErrorMsg();
      return false;
    }

    setError(
      type,
      {
        type: 'focus',
        message: handleBackendError(resp),
      },
      { shouldFocus: true },
    );
    return false;
  };

  const submit = async (value: SignUpValues) => {
    setLoading(true);

    let isValidReferralCode = !value.referralCode;
    if (value.referralCode) {
      isValidReferralCode = await validateReferralCode(value.referralCode);
    }

    if (!isValidReferralCode || !value.email) {
      setLoading(false);
      return;
    }

    const isUniqueEmail = await validateContact('email', value.email);
    if (!isUniqueEmail) {
      setLoading(false);
      return;
    }

    if (value.phone) {
      const isUniquePhone = await validateContact('phone', value.phone);
      if (!isUniquePhone) {
        setLoading(false);
        return;
      }
    }

    setUserInfo({ ...userInfo, ...value });
    trackEvent(EVENTS.ONBOARDING.INITIAL_SIGNUP_SCREEN.SUBMIT, {
      Email: userInfo?.email,
      Phone: userInfo?.phone,
      FirstName: userInfo?.firstName,
      LastName: userInfo?.lastName,
      DateOfBirth: userInfo?.dob,
      ReferralCode: userInfo?.referralCode,
      ...utmParams,
    });
    const signUpSuccess = await signUpEmail(value.email);

    if (signUpSuccess) {
      if (isSigningUpFromNextApp) {
        navigate(routes.SIGN_UP_OTP);
      } else {
        navigate(routes.SIGN_UP_OTP, { replace: true });
      }
    }

    setLoading(false);
  };

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    let event = '';
    switch (e.target.name) {
      case 'email':
        event = EVENTS.ONBOARDING.INITIAL_SIGNUP_SCREEN.EMAIL;
        break;
      case 'firstName':
        event = EVENTS.ONBOARDING.INITIAL_SIGNUP_SCREEN.FIRST_NAME;
        break;
      case 'lastName':
        event = EVENTS.ONBOARDING.INITIAL_SIGNUP_SCREEN.LAST_NAME;
        break;
      case 'dob':
        event = EVENTS.ONBOARDING.INITIAL_SIGNUP_SCREEN.DOB;
        break;
      case 'phone':
        event = EVENTS.ONBOARDING.INITIAL_SIGNUP_SCREEN.PHONE;
        break;
      case 'referralCode':
        event = EVENTS.ONBOARDING.INITIAL_SIGNUP_SCREEN.REFERRAL_CODE;
        break;
      default:
        break;
    }
    trackEvent(event);
  }, []);

  if (isSigningUpFromNextApp) {
    return (
      <Screen vertical data-testid="stepOneContainer">
        <TSpan
          font="heading-m-bold"
          colorToken="--text-body-header-neutral-default"
          style={{
            whiteSpace:
              windowSize.width > mobileMaxWidth ? 'nowrap' : undefined,
            alignSelf: 'center',
          }}
        >
          Sign up, and elevate your experience.
        </TSpan>
        <Spacer height={24} />
        <TSpan
          $fill
          colorToken="--text-body-neutral-default"
          font="body-l"
          style={{ whiteSpace: 'nowrap', alignSelf: 'center' }}
        >
          Create an account to dive into a world of Noums.
        </TSpan>
        <Spacer height={windowSize.width > tabletWidth ? 56 : 24} />
        <StyledTabPanel>
          <form onSubmit={handleSubmit(submit)} data-testid="handleSubmitID">
            <Stack vertical gap={16}>
              <TSpan
                colorToken="--text-card-header-neutral-highlighted"
                font="body-m-bold"
              >
                What’s your name?
              </TSpan>
              <Stack vertical gap={12} style={{ width: '100%' }}>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      name="firstName"
                      value={value || ''}
                      label={t(`noumena.first_name`)}
                      error={!!errors.firstName}
                      onChange={onChange}
                      helperText={errors.firstName?.message}
                      data-testid="firstNameInput"
                      onFocus={handleFocus}
                    />
                  )}
                  name="firstName"
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      name="lastName"
                      value={value || ''}
                      label={t(`noumena.last_name`)}
                      error={!!errors.lastName}
                      onChange={onChange}
                      helperText={errors.lastName?.message}
                      data-testid="lastNameInput"
                      onFocus={handleFocus}
                    />
                  )}
                  name="lastName"
                />
              </Stack>
              <TSpan
                colorToken="--text-card-header-neutral-highlighted"
                font="body-m-bold"
              >
                What’s your email?
              </TSpan>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    name="email"
                    value={value || ''}
                    label={t('noumena.email_address')}
                    error={!!errors.email}
                    onChange={onChange}
                    helperText={errors.email?.message}
                    data-testid="emailInput"
                    onFocus={handleFocus}
                  />
                )}
                name="email"
              />
            </Stack>
          </form>
        </StyledTabPanel>
        <Spacer height={16} />
        <Button
          primary
          size="full"
          onClick={handleSubmit(submit)}
          disabled={!recaptchaToken || loading || !isValid}
          loading={loading}
          data-testid="submitBtn"
        >
          Continue
        </Button>
        <Spacer height={16} />
        <LinkContainer align="center" justify="center">
          <TSpan
            font="body-l"
            colorToken="--text-input-neutral-default"
            style={{ paddingRight: '8px' }}
          >
            {t('noumena.signup.already_have_account')}
          </TSpan>
          <div>
            <TSpan
              font="body-l"
              onClick={() => {
                timedOut();
                trackEvent(EVENTS.ONBOARDING.INITIAL_SIGNUP_SCREEN.LOG_IN);
                if (quickSignUpNoumId) {
                  navigate(
                    `${routes.LOGIN}?quickNoumID=${quickSignUpNoumId}&backurl=${backUrl}`,
                  );
                } else {
                  navigate(routes.LOGIN);
                }
              }}
              colorToken="--text-button-brand-secondary-default"
              data-testid="goToLogInID"
            >
              {t('noumena.session_expired.login')}
            </TSpan>
          </div>
        </LinkContainer>
        <Spacer height={56} />
        <Stack
          vertical
          fixedHeight={115}
          justify="space-between"
          align="center"
        >
          <TSpan
            font="footnote"
            colorToken="--text-body-neutral-disabled"
            textAlign="center"
          >
            By continuing, you agree to Noumena’s Terms of Use.
          </TSpan>
          <TSpan
            font="footnote"
            colorToken="--text-body-neutral-disabled"
            textAlign="center"
          >
            {t('noumena.signup.foot_note')}
          </TSpan>
        </Stack>
        <Spacer height={windowSize.width > tabletWidth ? 55 : 100} />
      </Screen>
    );
  }

  return (
    <Screen vertical data-testid="stepOneContainer">
      <Spacer height={16} />
      <TSpan
        font="heading-m-bold"
        $fill
        colorToken="--text-body-header-neutral-default"
      >
        {content?.Header ? content?.Header : t('noumena.sign_up.step1.title')}
      </TSpan>
      <Spacer height={16} />
      <TSpan $fill colorToken="--text-body-neutral-default" font="body-l">
        {content?.Subtitle
          ? content?.Subtitle
          : t('noumena.sign_up.step1.sub_title')}
      </TSpan>
      <Spacer height={windowSize.width > tabletWidth ? 32 : 24} />
      <StyledTabPanel>
        <form onSubmit={handleSubmit(submit)} data-testid="handleSubmitID">
          <Stack vertical gap={16}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  name="email"
                  value={value || ''}
                  label={t('noumena.email_address')}
                  error={!!errors.email}
                  onChange={onChange}
                  helperText={
                    errors.email
                      ? errors.email?.message
                      : t('noumena.email_professional')
                  }
                  data-testid="emailInput"
                  onFocus={handleFocus}
                />
              )}
              name="email"
            />
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  name="firstName"
                  value={value || ''}
                  label={t(`noumena.first_name`)}
                  error={!!errors.firstName}
                  onChange={onChange}
                  helperText={errors.firstName?.message}
                  data-testid="firstNameInput"
                  onFocus={handleFocus}
                />
              )}
              name="firstName"
            />
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  name="lastName"
                  value={value || ''}
                  label={t(`noumena.last_name`)}
                  error={!!errors.lastName}
                  onChange={onChange}
                  helperText={errors.lastName?.message}
                  data-testid="lastNameInput"
                  onFocus={handleFocus}
                />
              )}
              name="lastName"
            />
            <Controller
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <PhoneInput
                  name={name}
                  onPhoneChange={onChange}
                  value={value || ''}
                  label={t(`noumena.phone_number.optional`)}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  onFocus={handleFocus}
                />
              )}
              name="phone"
            />
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  name="referralCode"
                  value={value || ''}
                  label={t(`noumena.referral_code.optional`)}
                  error={!!errors.referralCode}
                  onChange={onChange}
                  helperText={
                    errors.referralCode
                      ? errors.referralCode?.message
                      : t('noumena.referral_code.helper')
                  }
                  data-testid="referralCodeInput"
                  disabled={isValidReferral}
                  onFocus={handleFocus}
                  style={{ color: 'gray' }}
                />
              )}
              name="referralCode"
            />
          </Stack>
        </form>
      </StyledTabPanel>
      <Spacer height={32} />
      <TermsAndPrivacy />
      <Spacer height={windowSize.width > tabletWidth ? 32 : 24} />
      <Button
        primary
        size="full"
        onClick={handleSubmit(submit)}
        disabled={!recaptchaToken || loading || !isValid}
        loading={loading}
        data-testid="submitBtn"
      >
        {t('noumena.sign_up.title')}
      </Button>
      <Spacer height={windowSize.width > tabletWidth ? 32 : 24} />
      <LinkContainer align="center" justify="center">
        <TSpan
          font="body-l"
          colorToken="--text-input-neutral-default"
          style={{ paddingRight: '8px' }}
        >
          {t('noumena.signup.already_have_account')}
        </TSpan>
        <div>
          <TSpan
            font="body-l"
            onClick={() => {
              timedOut();
              trackEvent(EVENTS.ONBOARDING.INITIAL_SIGNUP_SCREEN.LOG_IN);
              navigate(routes.LOGIN);
            }}
            colorToken="--text-button-brand-secondary-default"
            data-testid="goToLogInID"
          >
            {t('noumena.session_expired.login')}
          </TSpan>
        </div>
      </LinkContainer>
      <Spacer height={32} />
      <TSpan
        font="footnote"
        colorToken="--text-body-neutral-disabled"
        textAlign="center"
      >
        {t('noumena.signup.foot_note')}
      </TSpan>
      <Spacer height={windowSize.width > tabletWidth ? 55 : 100} />
    </Screen>
  );
};

export default SignUpForm;
