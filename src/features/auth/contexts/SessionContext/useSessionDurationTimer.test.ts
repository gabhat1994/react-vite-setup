import { act, renderHook } from '@testing-library/react-hooks';
import { add } from 'date-fns';
import {
  useSessionDurationTimer,
  type UseSessionDurationTimerOptions,
} from './useSessionDurationTimer';

const startDate = new Date('2023-01-01T00:00:00Z');

function setup(options: UseSessionDurationTimerOptions) {
  return renderHook(() => useSessionDurationTimer(options));
}

beforeAll(() => {
  vi.useFakeTimers();
});

beforeEach(() => {
  vi.setSystemTime(startDate);
});

afterAll(() => {
  vi.useRealTimers();
});

test('Initially, the session is stopped', () => {
  const { result } = setup({ sessionDurationSeconds: 5 });

  expect(result.current.sessionState).toBe('stopped');
  expect(vi.getTimerCount()).toBe(0);
});

test('Can start and stop the session tracking', () => {
  const { result } = setup({ sessionDurationSeconds: 5 });
  act(() => {
    result.current.startTracking();
  });
  expect(result.current.sessionState).toBe('tracking');
  expect(vi.getTimerCount()).toBe(1);

  act(() => {
    result.current.stopTracking();
  });
  expect(result.current.sessionState).toBe('stopped');
  expect(vi.getTimerCount()).toBe(0);

  act(() => {
    result.current.startTracking();
  });
  expect(result.current.sessionState).toBe('tracking');
  expect(vi.getTimerCount()).toBe(1);

  act(() => {
    result.current.stopTracking();
  });
  expect(result.current.sessionState).toBe('stopped');
  expect(vi.getTimerCount()).toBe(0);
});

test('After the session tracking is started, times out after the provided duration', () => {
  const { result } = setup({ sessionDurationSeconds: 5 });
  act(() => {
    result.current.startTracking();
  });
  expect(result.current.sessionState).toBe('tracking');
  expect(vi.getTimerCount()).toBe(1);

  act(() => {
    vi.setSystemTime(add(startDate, { seconds: 2 }));
    vi.advanceTimersByTime(2000);
  });
  expect(result.current.sessionState).toBe('tracking');

  act(() => {
    vi.setSystemTime(add(startDate, { seconds: 5 }));
    vi.advanceTimersByTime(3000);
  });
  expect(result.current.sessionState).toBe('timeout');
  expect(vi.getTimerCount()).toBe(0);
});
