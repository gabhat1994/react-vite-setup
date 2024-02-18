import { act, renderHook } from '@testing-library/react-hooks';
import { useButtonLoadingGroup } from './buttonLoadingGroup';

type LoadingId = 'first' | 'second' | 'third';

function setup() {
  return renderHook(() => useButtonLoadingGroup<LoadingId>());
}

async function fakeCallback() {
  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });
}

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

test('Initially, renders all buttons in the neutral state', () => {
  const { result } = setup();

  expect(
    result.current.getButtonProps({ id: 'first', onClick: fakeCallback }),
  ).toEqual({
    id: 'first',
    disabled: false,
    loading: false,
    onClick: expect.any(Function),
  });

  expect(
    result.current.getButtonProps({ id: 'second', onClick: fakeCallback }),
  ).toEqual({
    id: 'second',
    disabled: false,
    loading: false,
    onClick: expect.any(Function),
  });
  expect(
    result.current.getButtonProps({ id: 'third', onClick: fakeCallback }),
  ).toEqual({
    id: 'third',
    disabled: false,
    loading: false,
    onClick: expect.any(Function),
  });
});

test('Sets loading state to the pressed button, while others are disabled, then returns to the neutral state', async () => {
  const { result } = setup();

  act(() => {
    const secondButtonProps = result.current.getButtonProps({
      id: 'second',
      onClick: fakeCallback,
    });
    secondButtonProps.onClick();
  });

  expect(
    result.current.getButtonProps({ id: 'first', onClick: fakeCallback }),
  ).toMatchObject({
    id: 'first',
    disabled: true,
    loading: false,
  });

  expect(
    result.current.getButtonProps({ id: 'second', onClick: fakeCallback }),
  ).toMatchObject({
    id: 'second',
    disabled: false,
    loading: true,
  });
  expect(
    result.current.getButtonProps({ id: 'third', onClick: fakeCallback }),
  ).toMatchObject({
    id: 'third',
    disabled: true,
    loading: false,
  });

  await act(async () => {
    await vi.runAllTimersAsync();
  });

  expect(
    result.current.getButtonProps({ id: 'first', onClick: fakeCallback }),
  ).toMatchObject({
    id: 'first',
    disabled: false,
    loading: false,
  });

  expect(
    result.current.getButtonProps({ id: 'second', onClick: fakeCallback }),
  ).toMatchObject({
    id: 'second',
    disabled: false,
    loading: false,
  });
  expect(
    result.current.getButtonProps({ id: 'third', onClick: fakeCallback }),
  ).toMatchObject({
    id: 'third',
    disabled: false,
    loading: false,
  });
});
