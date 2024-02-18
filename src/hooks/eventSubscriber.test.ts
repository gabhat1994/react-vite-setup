import { renderHook } from '@testing-library/react-hooks';

import { useEventSubscriber } from './eventSubscriber';

test('Allows to add a subscriber and then unsubscribe', () => {
  const payload = { some: 'value', with: 'keys', and: 1234 };
  const handler = vi.fn();

  const hook = renderHook(useEventSubscriber);
  const result = hook.result.current;

  result.subscribe(handler);

  result.publish(payload);
  expect(handler).toBeCalledTimes(1);
  expect(handler).toBeCalledWith(payload);

  result.publish(payload);
  expect(handler).toBeCalledTimes(2);

  result.unsubscribe(handler);
  result.publish(payload);
  expect(handler).toBeCalledTimes(2);
});

test('Allows to add multiple subscribers', () => {
  const payload = { some: 'value', with: 'keys', and: 1234 };
  const handler1 = vi.fn();
  const handler2 = vi.fn();
  const handler3 = vi.fn();

  const hook = renderHook(useEventSubscriber);
  const result = hook.result.current;

  result.subscribe(handler1);
  result.subscribe(handler2);
  result.subscribe(handler3);

  result.publish(payload);
  expect(handler1).toBeCalledTimes(1);
  expect(handler1).toBeCalledWith(payload);
  expect(handler2).toBeCalledTimes(1);
  expect(handler2).toBeCalledWith(payload);
  expect(handler3).toBeCalledTimes(1);
  expect(handler3).toBeCalledWith(payload);

  result.unsubscribeAll();

  result.publish(payload);
  expect(handler1).toBeCalledTimes(1);
  expect(handler2).toBeCalledTimes(1);
  expect(handler3).toBeCalledTimes(1);
});
