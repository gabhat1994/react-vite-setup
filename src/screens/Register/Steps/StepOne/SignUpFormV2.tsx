import { Button, Icon, TSpan } from '@/components';
import { t } from 'i18next';
import { Controller } from 'react-hook-form';
import { TextField } from '@/components/TextField';
import { Spacer, Stack } from '@/layout';
import {
  useSignup,
  SocialButton,
  PasswordHelper,
} from '@/features/social-authentication';
import NewAuthLayout from '@/layout/NewAuthLayout';
import { Main } from '@/layout/NewAuthLayout/childrenStyles';
import { useBreakpoints } from '@/hooks';
import * as S from './stylesV2';
import { ReferralInfo } from './ReferralInfo';

export const SignUpFormV2 = () => {
  const {
    formMethods,
    handlers,
    password,
    loading,
    recaptchaToken,
    validReferral,
    referralValidating,
    referralCode,
    referralOwner,
  } = useSignup();

  const { control, errors } = formMethods;

  const devices = useBreakpoints();

  return (
    <NewAuthLayout
      overflow="auto"
      dynamicHeight={devices.isMobile}
      // fullHeightChildren={devices.isSmallerThanLaptop}
    >
      <Main justify={devices.isMobile ? 'flex-start' : 'center'}>
        {validReferral && <ReferralInfo name={referralOwner} />}
        <S.Header fullWidth>
          <S.SignupTitle>{t('noumena.sign_up.title')}</S.SignupTitle>
          <S.SignupSubTitle>{t('noumena.sign_up.subtitle')}</S.SignupSubTitle>
        </S.Header>
        <S.Body>
          <S.Form onSubmit={handlers.handleSubmit}>
            <S.FormWrapper>
              <S.AuthenticationWrapper>
                <SocialButton
                  name="google_logo"
                  label={t('noumena.signup.continue.with.google')}
                  onClick={() => {
                    if (referralValidating) return;
                    const $referralCode = validReferral ? referralCode : '';
                    handlers.initiateAuth('google', 'signup', $referralCode);
                  }}
                />
                <SocialButton
                  name="linkedin1_m"
                  label={t('noumena.signup.continue.with.linkedin')}
                  onClick={() => {
                    if (referralValidating) return;
                    const $referralCode = validReferral ? referralCode : '';
                    handlers.initiateAuth('linkedin', 'signup', $referralCode);
                  }}
                />
                <div className="divider">
                  <TSpan
                    font="body-m"
                    colorToken="--text-card-neutral-disabled"
                  >
                    {t('noumena.or.text')}
                  </TSpan>
                </div>
              </S.AuthenticationWrapper>
              <Stack gap={12} vertical={devices.isMobile} fullWidth={true}>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      name="firstName"
                      value={value || ''}
                      label={t(`noumena.signup.v2.first_name`)}
                      error={!!errors.firstName}
                      onChange={onChange}
                      helperText={errors.firstName?.message}
                      data-testid="firstNameInput"
                      onFocus={handlers.handleFocus}
                      fullWidth
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
                      label={t(`noumena.signup.v2.last_name`)}
                      error={!!errors.lastName}
                      onChange={onChange}
                      helperText={errors.lastName?.message}
                      data-testid="lastNameInput"
                      onFocus={handlers.handleFocus}
                      fullWidth
                    />
                  )}
                  name="lastName"
                />
              </Stack>
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
                    onFocus={handlers.handleFocus}
                  />
                )}
                name="email"
              />
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <S.PasswordContainer>
                    <TextField
                      blockEmptySpaces
                      name="password"
                      type={password.visible ? 'text' : 'password'}
                      value={value || ''}
                      label={t('noumena.password')}
                      error={
                        errors.password?.type === 'required'
                          ? !!errors.password
                          : undefined
                      }
                      onChange={(e) => {
                        handlers.analyze(e);
                        onChange(e);
                      }}
                      helperText={
                        errors.password?.type === 'required'
                          ? errors.password.message
                          : undefined
                      }
                      data-testid="passwordInput"
                      onFocus={(e) => {
                        handlers.toggleFocus();
                        handlers.handleFocus(e);
                      }}
                      onBlur={handlers.toggleFocus}
                      rightIcon={
                        <Icon
                          name={password.visible ? 'eye_off_m' : 'eye_on_m'}
                          size={24}
                          onClick={password.toggleVisibility}
                        />
                      }
                    />
                    {password.showHelper && !devices.isSmallerThanLaptop && (
                      <S.TooltipContainer>
                        <PasswordHelper
                          passwordStates={password.passwordCheck}
                        />
                      </S.TooltipContainer>
                    )}
                  </S.PasswordContainer>
                )}
                name="password"
              />
              {devices.isSmallerThanLaptop && password.showHelper && (
                <PasswordHelper passwordStates={password.passwordCheck} />
              )}
              <Spacer height={8} />
              <Stack vertical gap={16} fullWidth align="center">
                <Button
                  primary
                  size="full"
                  type="submit"
                  disabled={!recaptchaToken || !formMethods.isValid || loading}
                  loading={loading}
                  data-testid="submitBtn"
                >
                  {t('noumena.signup.title.v2')}
                </Button>
                <S.Note>
                  {t('noumena.signup.login.v2')}
                  <S.LoginLink onClick={handlers.login}>
                    {t('noumena.login_in.heading')}
                  </S.LoginLink>
                </S.Note>
              </Stack>
            </S.FormWrapper>
          </S.Form>
        </S.Body>
        <S.Footer>
          <S.FooterNote textAlign="center">
            {t('noumena.signup.term.and.condition.v2')}
            <S.TermsLink onClick={handlers.termsOfUse}>
              {t('noumena.signup.terms_of_use')}
            </S.TermsLink>
            .
          </S.FooterNote>
          <Spacer height={16} />
          <S.FooterNote textAlign="center">
            {t('noumena.signup.google.privacy.policy.v2')}
          </S.FooterNote>
        </S.Footer>
      </Main>
    </NewAuthLayout>
  );
};
