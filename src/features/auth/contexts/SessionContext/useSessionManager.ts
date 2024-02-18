import { useAuth } from '@/features/auth/contexts';
import { useSessionDurationTimer } from '@/features/auth/contexts/SessionContext/useSessionDurationTimer';
import { useWindowFocus } from '@/hooks';
import { throttle } from 'lodash';
import { useCallback, useEffect, useLayoutEffect, useMemo } from 'react';

const sessionProlongingEvents = [
  'click',
  'mousemove',
  'load',
  'scroll',
  'keydown',
  'wheel',
];

export interface UseSessionManagerOptions {
  isIdleStateAllowed: boolean;
  sessionDurationSeconds: number;
}

export function useSessionManager({
  isIdleStateAllowed,
  sessionDurationSeconds,
}: UseSessionManagerOptions) {
  const focused = useWindowFocus();
  const { user } = useAuth();

  const { sessionState, startTracking, stopTracking, refreshSessionDuration } =
    useSessionDurationTimer({ sessionDurationSeconds });

  const isAuthorized = !!user;
  const shouldStartTracking =
    sessionState === 'stopped' && isAuthorized && !isIdleStateAllowed;
  const shouldStopTracking =
    sessionState !== 'stopped' && (!isAuthorized || isIdleStateAllowed);

  const prolongSession = useMemo(
    () =>
      throttle(
        () => {
          refreshSessionDuration();
        },
        1000,
        {
          leading: true,
          trailing: false,
        },
      ),
    [refreshSessionDuration],
  );

  const stopSession = useCallback(() => {
    stopTracking();
    sessionProlongingEvents.forEach((eventName) => {
      window.removeEventListener(eventName, prolongSession, false);
    });
  }, [prolongSession, stopTracking]);

  useLayoutEffect(() => {
    if (shouldStartTracking) {
      startTracking();

      sessionProlongingEvents.forEach((eventName) => {
        window.addEventListener(eventName, prolongSession, false);
      });
    }
  }, [prolongSession, shouldStartTracking, startTracking]);

  useLayoutEffect(() => {
    if (shouldStopTracking) {
      stopSession();
    }
  }, [shouldStopTracking, stopSession]);

  useLayoutEffect(() => {
    if (sessionState === 'tracking' && focused) {
      prolongSession();
    }
  }, [focused, prolongSession, sessionState]);

  useEffect(
    () => () => {
      stopSession();
    },
    [stopSession],
  );

  return {
    showCountdownModal: sessionState === 'timeout',
    restartSession: startTracking,
    stopSession,
  };
}
