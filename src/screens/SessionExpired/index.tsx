import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { GuestHeader } from '@/layout/GuestHeader';
import routes from '@/constants/routes';
import {
  Container,
  SessionExpiredContainer,
  SessionExpiredModal,
} from './styles';

const SessionExpired = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const deviceType = useDeviceType();

  return (
    <Container>
      <Header isBorderRadius={false}>
        <GuestHeader expired />
      </Header>
      <SessionExpiredContainer data-testid="session_expired_container">
        <SessionExpiredModal>
          <TSpan
            font={
              deviceType === DeviceTypeEnum.DESKTOP
                ? 'heading-m-bold'
                : 'heading-s-bold'
            }
            data-testid="session_expired_title"
            colorToken="--text-card-header-neutral-highlighted"
          >
            <Trans
              i18nKey="noumena.session_expired.logged_out"
              components={{
                newline: <br />,
              }}
            />
          </TSpan>
          <Spacer height={16} />
          <TSpan
            font="body-l"
            colorToken="--text-card-neutral-default"
            data-testid="session_expired_guide"
          >
            {t('noumena.session_expired.require_login')}
          </TSpan>
          <Spacer height={24} />
          <Button
            primary
            size={deviceType === DeviceTypeEnum.MOBILE ? 'full' : undefined}
            onClick={() => navigate(routes.LOGIN, { replace: true })}
            testId="session_expired_action_btn"
          >
            {t('noumena.session_expired.return_to_login')}
          </Button>
        </SessionExpiredModal>
      </SessionExpiredContainer>
    </Container>
  );
};

export default SessionExpired;
