import { type FC, useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import { Spacer } from '@/layout';
import { getFormattedDuration } from '@/utils/getFormattedDuration';
import { TSpan } from '../Typography';
import { type SessionCountProps } from './types';
import { Container, SessionExpiredContainer } from './styles';
import { Button } from '../Button';

export const SessionCount: FC<SessionCountProps> = ({
  count,
  reset,
  logout,
  handleSessionOut,
}) => {
  const counterInterval = useRef<NodeJS.Timer | undefined>(undefined);

  const [sessionCounter, setSessionCounter] = useState<number>(count);

  useEffect(() => {
    counterInterval.current = setInterval(() => {
      setSessionCounter((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearInterval(counterInterval.current);
    };
  }, [setSessionCounter]);

  useEffect(() => {
    if (sessionCounter < 1) {
      clearInterval(counterInterval.current);
      handleSessionOut();
    }
  }, [handleSessionOut, sessionCounter]);

  return (
    <Container>
      <SessionExpiredContainer data-testid="session_count_container">
        <TSpan
          font="heading-s-bold"
          data-testid="session_count_title"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {t('noumena.session_expired.title')}
        </TSpan>
        <Spacer height={24} />
        <TSpan
          font="body-l"
          colorToken="--text-card-neutral-default"
          data-testid="session_count_guide"
        >
          {t('noumena.session_expired.guide')}
        </TSpan>
        <Spacer height={8} />
        <TSpan font="heading-s" colorToken="--text-modal-neutral-highlighted">
          {getFormattedDuration(sessionCounter, 'formatted')}
        </TSpan>
        <Spacer height={24} />
        <Button
          primary
          size="full"
          onClick={reset}
          testId="session_count_continue_btn"
        >
          {t('noumena.session_expired.continue_session')}
        </Button>
        <Spacer height={16} />
        <Button size="full" onClick={logout} testId="session_count_logout_btn">
          {t('noumena.session_expired.log_out')}
        </Button>
      </SessionExpiredContainer>
    </Container>
  );
};

export default SessionCount;
