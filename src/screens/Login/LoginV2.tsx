import { Controller } from 'react-hook-form';
import { t } from 'i18next';
import { Spacer, Stack } from '@/layout';
import { TextField } from '@/components/TextField';
import { Button, Icon, TSpan } from '@/components';
import { useLogin, SocialButton } from '@/features/social-authentication';
import NewAuthLayout from '@/layout/NewAuthLayout';
import { Main, Footer } from '@/layout/NewAuthLayout/childrenStyles';
import { useBreakpoints } from '@/hooks';
import * as S from './stylesv2';

export const LoginV2 = () => {
  const { formMethods, handlers, password, loading } = useLogin();
  const { control, errors } = formMethods;
  const devices = useBreakpoints();

  return (
    <NewAuthLayout
      overflow="auto"
      dynamicHeight={devices.isMobile}
      minHeightChildren={780}
    >
      <Main justify={devices.isMobile ? 'flex-start' : 'center'}>
        <S.StyledForm onSubmit={handlers.login}>
          <S.Form fullWidth>
            {devices.isMobile && <Spacer height={108} />}
            <S.Heading>{t('noumena.login.heading')}</S.Heading>
            <Spacer height={32} />
            <S.Body>
              <S.AuthenticationWrapper>
                <SocialButton
                  name="google_logo"
                  label={t('noumena.signup.continue.with.google')}
                  onClick={() => {
                    handlers.initiateAuth('google', 'login');
                  }}
                />
                <SocialButton
                  name="linkedin1_m"
                  label={t('noumena.signup.continue.with.linkedin')}
                  onClick={() => {
                    handlers.initiateAuth('linkedin', 'login');
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
              <Spacer height={8} />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    name="email"
                    value={value || ''}
                    onChange={onChange}
                    label={t('noumena.email_login_form.email_address.label')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    data-testid="loginEmailTextField"
                  />
                )}
              />
              <Spacer height={12} />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    type={password.visible ? 'text' : 'password'}
                    blockEmptySpaces
                    name="password"
                    value={value || ''}
                    onChange={onChange}
                    label={t('noumena.password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    data-testid="loginPasswordTextField"
                    rightIcon={
                      <Icon
                        name={password.visible ? 'eye_off_m' : 'eye_on_m'}
                        size={24}
                        onClick={password.toggleVisibility}
                      />
                    }
                  />
                )}
              />

              <Spacer height={16} />
              <Footer>
                <Stack vertical align="center">
                  <Button
                    type="submit"
                    primary
                    size="full"
                    disabled={!formMethods.isValid || loading}
                    loading={loading}
                  >
                    {t('noumena.reset_password.success.login')}
                  </Button>

                  <Spacer height={16} />
                  <S.Note>
                    {t('noumena.login.forgot.or.dont.have.password')}
                    <S.LoginLink onClick={handlers.reset}>
                      {t('noumena.reset')}
                    </S.LoginLink>
                  </S.Note>
                  <Spacer height={8} />
                  <S.Note>
                    {t('noumena.login.dont.have.account')}
                    <S.LoginLink onClick={handlers.signup}>
                      {t('noumena.signup')}
                    </S.LoginLink>
                  </S.Note>
                  <Spacer height={32} />
                  <S.FooterNote textAlign="center">
                    {t('noumena.signup.term.and.condition.v2')}
                    <S.FooterLink onClick={handlers.termsOfUse}>
                      {t('noumena.signup.terms_of_use')}
                    </S.FooterLink>
                    .
                  </S.FooterNote>
                  <Spacer height={16} />
                  <S.FooterNote textAlign="center">
                    {t('noumena.signup.google.privacy.policy.v2')}
                  </S.FooterNote>
                </Stack>
              </Footer>
            </S.Body>
          </S.Form>
        </S.StyledForm>
      </Main>
    </NewAuthLayout>
  );
};
