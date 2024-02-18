import * as windowFocus from '@/hooks/useWindowFocus';
import { act, renderHook } from '@testing-library/react-hooks';
import { type EventType, fireEvent } from '@testing-library/dom';
import * as authContext from '../AuthContext/AuthContext';
import * as durationTimer from './useSessionDurationTimer';
import {
  type UseSessionManagerOptions,
  useSessionManager,
} from './useSessionManager';

vi.mock('../AuthContext/AuthContext');
vi.mock('./useSessionDurationTimer');
vi.mock('@/hooks/useWindowFocus');

const authContextMember = {
  ...authContext.defaultAuthContextState,
  user: { _id: '123' },
};
const authContextGuest = {
  ...authContext.defaultAuthContextState,
  user: null,
};

const useAuthMock = vi.mocked(authContext.useAuth);
const useSessionDurationTimerMock = vi.mocked(
  durationTimer.useSessionDurationTimer,
);
const useWindowFocusMock = vi.mocked(windowFocus.useWindowFocus);

type SessionDurationTimerValues = ReturnType<
  typeof durationTimer.useSessionDurationTimer
>;

function mockSessionDuration(
  overrides: Partial<SessionDurationTimerValues> = {},
) {
  const sessionDurationMock: SessionDurationTimerValues = {
    sessionState: 'stopped',
    startTracking: vi.fn(),
    refreshSessionDuration: vi.fn(),
    stopTracking: vi.fn(),
    ...overrides,
  };
  useSessionDurationTimerMock.mockReturnValue(sessionDurationMock);

  return sessionDurationMock;
}

function setup(options: Partial<UseSessionManagerOptions> = {}) {
  return renderHook(useSessionManager, {
    initialProps: {
      isIdleStateAllowed: false,
      sessionDurationSeconds: 5,
      ...options,
    },
  });
}

describe('Given the user is logged in (member)', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  beforeEach(() => {
    useAuthMock.mockReturnValue(authContextMember);
  });

  test('The session tracking starts immediately and stops after unmount', () => {
    const sessionDurationMock = mockSessionDuration({
      sessionState: 'stopped',
    });

    const { unmount } = setup();

    expect(sessionDurationMock.startTracking).toHaveBeenCalledTimes(1);
    expect(sessionDurationMock.stopTracking).toHaveBeenCalledTimes(0);

    act(() => {
      unmount();
    });

    expect(sessionDurationMock.startTracking).toHaveBeenCalledTimes(1);
    expect(sessionDurationMock.stopTracking).toHaveBeenCalledTimes(1);
  });

  test('The session should stop after logging out', () => {
    const sessionDurationMock = mockSessionDuration({
      sessionState: 'tracking',
      stopTracking: vi.fn().mockName('siemandero'),
    });

    const { rerender } = setup();

    useAuthMock.mockReturnValue(authContextGuest);

    act(() => {
      rerender();
    });

    expect(sessionDurationMock.stopTracking).toHaveBeenCalledTimes(1);
  });

  describe('The session should be prolonged/refreshed on any activity', () => {
    test('When user focuses the tab/window', () => {
      mockSessionDuration({
        sessionState: 'stopped',
      });

      const { rerender } = setup();

      const sessionDurationMock = mockSessionDuration({
        sessionState: 'tracking',
      });

      act(() => {
        rerender();
      });
      expect(sessionDurationMock.refreshSessionDuration).toHaveBeenCalledTimes(
        0,
      );

      useWindowFocusMock.mockReturnValue(false);
      act(() => {
        rerender();
      });
      expect(sessionDurationMock.refreshSessionDuration).toHaveBeenCalledTimes(
        0,
      );

      useWindowFocusMock.mockReturnValue(true);
      act(() => {
        rerender();
      });
      expect(sessionDurationMock.refreshSessionDuration).toHaveBeenCalledTimes(
        1,
      );
    });

    test('When user triggers any event in the tab/window', () => {
      let sessionDurationMock = mockSessionDuration({
        sessionState: 'stopped',
      });
      useWindowFocusMock.mockReturnValue(false);

      const sessionProlongingEvents = [
        'click',
        'mouseMove',
        'load',
        'scroll',
        'keyDown',
        'wheel',
      ];

      const { rerender } = setup();

      sessionDurationMock = mockSessionDuration({
        ...sessionDurationMock,
        sessionState: 'tracking',
      });

      act(() => {
        rerender();
      });
      expect(sessionDurationMock.refreshSessionDuration).toHaveBeenCalledTimes(
        0,
      );

      act(() => {
        sessionProlongingEvents.forEach((eventName) => {
          // Fire all events at once to test throttling.
          fireEvent[eventName as EventType](window);
        });
      });

      expect(sessionDurationMock.refreshSessionDuration).toHaveBeenCalledTimes(
        1,
      ); // Because they have been throttled.

      vi.mocked(sessionDurationMock.refreshSessionDuration).mockClear();
      act(() => {
        sessionProlongingEvents.forEach((eventName) => {
          // Session refresh is throttled every 1 second, need to simulate time flow.
          vi.advanceTimersByTime(1000);
          fireEvent[eventName as EventType](window);
        });
      });

      expect(sessionDurationMock.refreshSessionDuration).toHaveBeenCalledTimes(
        sessionProlongingEvents.length,
      );
    });
  });

  describe('When idle state is allowed', () => {
    test('The session should not start', () => {
      const sessionDurationMock = mockSessionDuration({
        sessionState: 'stopped',
      });

      setup({
        isIdleStateAllowed: true,
      });

      expect(sessionDurationMock.startTracking).not.toBeCalled();
    });

    test('The session should be stopped when idle state becomes allowed', () => {
      const sessionDurationMock = mockSessionDuration({
        sessionState: 'tracking',
      });

      const { rerender } = setup({
        sessionDurationSeconds: 5,
        isIdleStateAllowed: false,
      });

      expect(sessionDurationMock.stopTracking).toBeCalledTimes(0);

      act(() => {
        rerender({
          sessionDurationSeconds: 5,
          isIdleStateAllowed: true,
        });
      });

      expect(sessionDurationMock.stopTracking).toBeCalledTimes(1);
    });
  });
});

describe('Given the user is not logged in (guest)', () => {
  beforeAll(() => {
    useAuthMock.mockReturnValue(authContextGuest);
  });

  test('The session tracking never starts', () => {
    const sessionDurationMock = mockSessionDuration({
      sessionState: 'stopped',
    });
    useSessionDurationTimerMock.mockReturnValue(sessionDurationMock);

    const { unmount } = setup();

    act(() => {
      unmount();
    });

    expect(sessionDurationMock.startTracking).toHaveBeenCalledTimes(0);
    expect(sessionDurationMock.stopTracking).toHaveBeenCalledTimes(1);
  });
});
