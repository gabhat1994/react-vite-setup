import { SessionCount } from '@/components/SessionCount';
import routes from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import { useCallback, useMemo, useState, type FC, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { SessionContext } from './SessionContext';
import { useSessionManager } from './useSessionManager';

interface SessionProviderProps {
  children?: ReactNode;
  sessionDurationSeconds: number;
  countdownTimeSeconds: number;
}

export const SessionProvider: FC<SessionProviderProps> = ({
  children,
  sessionDurationSeconds,
  countdownTimeSeconds,
}) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [isIdleStateAllowed, setIsIdleStateAllowed] = useState(false);

  const { showCountdownModal, restartSession, stopSession } = useSessionManager(
    {
      isIdleStateAllowed,
      sessionDurationSeconds,
    },
  );

  const handleSessionExpired = useCallback(() => {
    signOut();
    stopSession();
    navigate(routes.SESSION_EXPIRED, {
      replace: true,
      state: { fromPath: window.location.pathname },
    });
  }, [stopSession, signOut, navigate]);

  const handleLogout = useCallback(() => {
    signOut();
    stopSession();
  }, [signOut, stopSession]);

  const payload = useMemo(() => ({ setIsIdleStateAllowed }), []);

  return (
    <SessionContext.Provider value={payload}>
      {showCountdownModal ? (
        <SessionCount
          count={countdownTimeSeconds}
          reset={restartSession}
          handleSessionOut={handleSessionExpired}
          logout={handleLogout}
        />
      ) : (
        children
      )}
    </SessionContext.Provider>
  );
};
