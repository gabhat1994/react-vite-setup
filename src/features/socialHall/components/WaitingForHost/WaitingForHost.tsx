import { t } from 'i18next';
import { Spacer } from '@/layout';
import ROUTES from '@/constants/routes';
import { useNavigate } from 'react-router';
import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import { TSpan } from '@/components/Typography';

import { Wrapper, Container, Loader } from './styles';

export const WaitingForHost = () => {
  const navigate = useNavigate();

  const onLeave = () => navigate(ROUTES.HOME_NOUM);

  return (
    <Wrapper>
      <Container>
        <Loader>
          <Spinner />
        </Loader>
        <Spacer height={32} />
        <TSpan
          font="heading-s-bold"
          colorToken="--text-modal-header-neutral-default"
        >
          Waiting for the Host
        </TSpan>
        <Spacer height={8} />
        <TSpan font="body-l" colorToken="--text-modal-neutral-default">
          The event will start soon.
        </TSpan>
        <Spacer height={24} />
        <Button
          tertiary
          size="full"
          onClick={() => onLeave()}
          data-testid="leave-event-button"
        >
          {t('noumena.social_hall.hardware_testing_cancel_btn')}
        </Button>
      </Container>
    </Wrapper>
  );
};
