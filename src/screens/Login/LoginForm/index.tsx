import { type FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { TSpan } from '@/components/Typography';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { Spacer } from '@/layout';
import routes from '@/constants/routes';
import { IdentityServices } from '@/services/rest/identity';
import { useRecaptcha } from '@/hooks';
import { useWindowDimensions } from '@/hooks/dimensions';

import { useInitialSignUp } from '@/features/onboarding/hooks';
import EmailLoginForm from './EmailLoginForm';
import PhoneLoginForm from './PhoneLoginForm';

import { type LoginData } from '../types';
import { StyledTabPanel, Screen, LinkContainer, RecaptchaNote } from './styles';
import { type LoginFormProps } from './types';
import { listOfTabs } from './constants';

const LoginForm: FC<LoginFormProps> = ({
  loading,
  beforeSubmit,
  onLoginFailed,
  onLoginSuccess,
  errorMessage,
  clearInput,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { height } = useWindowDimensions();
  const { recaptchaToken, returnNewReCaptcha } = useRecaptcha();
  const { isLoggingingUpFromNextApp, quickSignUpNoumId, backUrl } =
    useInitialSignUp();

  const [activeTab, setActiveTab] = useState(1);

  const onLogin = useCallback(
    async (data: LoginData) => {
      if (!recaptchaToken) {
        return;
      }
      beforeSubmit(false);

      const token = await returnNewReCaptcha();
      const signInFunc =
        data.type === 'phone'
          ? IdentityServices.signInPhone
          : IdentityServices.signInEmail;
      const resp = await signInFunc(data.value, token);

      if (resp?.errorMessage) {
        onLoginFailed(data.type, resp.errorStatus, resp.errorMessage);
        return;
      }

      onLoginSuccess(
        resp.message,
        resp.nextRequestAfterInSecond,
        resp.remainingRequest,
        data,
        false,
      );
    },
    [
      recaptchaToken,
      beforeSubmit,
      returnNewReCaptcha,
      onLoginSuccess,
      onLoginFailed,
    ],
  );

  const goToSignUp = useCallback(() => {
    if (isLoggingingUpFromNextApp) {
      navigate(
        `${routes.QUICK_SIGN_UP}?quickNoumID=${quickSignUpNoumId}&backurl=${backUrl}`,
      );
    } else {
      navigate(routes.SIGN_UP);
    }
  }, [isLoggingingUpFromNextApp, navigate, quickSignUpNoumId, backUrl]);

  return (
    <Screen data-testid="loginFormContainer">
      <div>
        {height < 600 && <Spacer height={100} />}
        <TSpan
          font="heading-xl-bold"
          colorToken="--text-body-header-neutral-default"
          data-testid="heading"
        >
          {t('noumena.login_in.heading')}
        </TSpan>

        <Spacer height={11} />

        <TSpan font="body-l" colorToken="--text-body-neutral-default">
          {t('noumena.phone_or_email.text')}
        </TSpan>

        <Spacer height={31} />

        <BasicChipsTabsForm
          onChange={(v: string) => {
            setActiveTab(+v);
            if (clearInput) {
              clearInput();
            }
          }}
          inputList={listOfTabs}
          selectedId={activeTab.toString()}
          mode="isUnderline"
          isWithoutImage
          fullWidth
          animateOnLoad={false}
        />
        {activeTab ? (
          <StyledTabPanel>
            <EmailLoginForm
              recaptchaToken={recaptchaToken}
              loading={loading}
              submitLoginData={onLogin}
            />
          </StyledTabPanel>
        ) : (
          <StyledTabPanel>
            <PhoneLoginForm
              recaptchaToken={recaptchaToken}
              submitLoginData={onLogin}
              loading={loading}
              errorMessage={errorMessage}
            />
          </StyledTabPanel>
        )}

        <LinkContainer align="center" justify="center">
          <TSpan
            colorToken="--text-input-neutral-default"
            style={{ paddingRight: '8px' }}
          >
            {t('noumena.no_account.text')}
          </TSpan>
          <div>
            <TSpan
              font="button-m"
              onClick={goToSignUp}
              colorToken="--text-button-brand-secondary-default"
              data-testid="signUp"
            >
              {t('noumena.sign_up.title')}
            </TSpan>
          </div>
        </LinkContainer>
      </div>
      <RecaptchaNote data-testid="recaptcha">
        {t(`noumena.signup.foot_note`)}
      </RecaptchaNote>
    </Screen>
  );
};

export default LoginForm;
