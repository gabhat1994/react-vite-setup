import { add } from 'date-fns';
import { useState, useRef, useCallback } from 'react';

type SessionState = 'stopped' | 'tracking' | 'timeout';

export interface UseSessionDurationTimerOptions {
  sessionDurationSeconds: number;
}

// TODO: Can this entire hook be replaces by some kind of a refreshable setTimeout?
export const useSessionDurationTimer = ({
  sessionDurationSeconds,
}: UseSessionDurationTimerOptions) => {
  const [sessionState, setSessionState] = useState<SessionState>('stopped');

  const validationTimer = useRef<NodeJS.Timer | undefined>(undefined);
  const expiresAt = useRef<Date | null>(null);

  const clearTimers = useCallback(() => {
    expiresAt.current = null;
    clearInterval(validationTimer.current);
  }, []);

  const stopTracking = useCallback(() => {
    clearTimers();
    setSessionState('stopped');
  }, [clearTimers]);

  const refreshSessionDuration = useCallback(() => {
    expiresAt.current = add(new Date(), { seconds: sessionDurationSeconds });
  }, [sessionDurationSeconds]);

  const startTracking = useCallback(() => {
    stopTracking();

    refreshSessionDuration();
    validationTimer.current = setInterval(() => {
      const currentTime = new Date();
      const hasTimedOut =
        !!expiresAt.current && currentTime >= expiresAt.current;

      if (hasTimedOut) {
        clearTimers();
        setSessionState('timeout');
      }
    }, 1000);
    setSessionState('tracking');
  }, [clearTimers, refreshSessionDuration, stopTracking]);

  return {
    sessionState,
    startTracking,
    refreshSessionDuration,
    stopTracking,
  };
};
