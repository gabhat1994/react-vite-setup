import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import { OtpInput } from '@/components/Otp/OtpInput';
import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import Logo from '@/components/Logo';
import { useAccessHelper } from './useAccesshelper';
import OTPResend from '../Login/OTPResend';
import {
  Container,
  ContainerOTP,
  Header,
  LogoContainer,
  Main,
  StyledSpacer,
  TextHead,
} from './styles';

const Access = () => {
  const {
    otp,
    setOtp,
    loading,
    isResendLoading,
    loginData,
    remainingRequests,
    timeLeftForNextResend,
    onEnter,
    onLoginSuccess,
    onBeforeLogin,
    onLoginFailed,
    disabledSubmit,
    onVerify,
    loader,
    ottEmail,
  } = useAccessHelper();
  return (
    <Container data-testid="t-nm-login">
      {loader ? (
        <>
          <Spinner />
          <TextHead>
            {' '}
            <TSpan
              font="heading-xs-bold"
              colorToken="--text-card-neutral-highlighted"
            >
              {t('noumena.non_member.login_loader_text')}
            </TSpan>
          </TextHead>
        </>
      ) : (
        <>
          <Header>
            <LogoContainer>
              <Logo />
            </LogoContainer>
          </Header>
          <Main>
            <div>
              <header>
                <TSpan
                  font="heading-xs-bold"
                  colorToken="--text-modal-header-neutral-default"
                >
                  {t('noumena.non_member.verify_your_identity')}
                </TSpan>
              </header>
              <TSpan font="body-l" colorToken="--text-modal-neutral-default">
                {t('noumena.non_member.enter_code')}
              </TSpan>
              <div>
                <TSpan
                  font="body-l"
                  colorToken="--text-modal-neutral-highlighted"
                >
                  {ottEmail}
                </TSpan>
              </div>
              <ContainerOTP>
                <OtpInput
                  value={otp}
                  onChange={(val) => setOtp(val)}
                  isDisabled={isResendLoading}
                  onEnter={onEnter}
                />
              </ContainerOTP>
              <OTPResend
                minHeight="0px"
                loginData={loginData}
                remainingRequests={remainingRequests}
                timeLeftForNextResend={timeLeftForNextResend}
                beforeSubmit={onBeforeLogin}
                onLoginFailed={onLoginFailed}
                onLoginSuccess={onLoginSuccess}
                isResendLoading={isResendLoading}
              />
            </div>
            <StyledSpacer />
            <Button
              data-testid="otp-submit-button"
              primary
              size="full"
              disabled={disabledSubmit(otp?.trim(), loginData) || loading}
              loading={loading}
              onClick={onVerify}
            >
              {t('noumena.continue')}
            </Button>
          </Main>
        </>
      )}
    </Container>
  );
};

export default Access;
