import { render, cleanup } from '@testing-library/react';
import { intersectionObserver } from '@/test-utils/stubs';
import { Infinite } from './Infinite';
import { ObservedDiv } from './ObservedDiv';

describe('ObserverDiv', () => {
  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    cleanup();
    intersectionObserver.restore();
  });

  test('fires intersection handler on intersection events', async () => {
    const onIntersect = vi.fn();

    const { getByTestId } = render(<ObservedDiv onIntersect={onIntersect} />);

    intersectionObserver.simulate({
      target: getByTestId('observer'),
      isIntersecting: true,
    });

    expect(onIntersect).toHaveBeenCalled();
  });

  test('does not fire again if the handler changes', () => {
    const onIntersect = vi.fn();
    const onIntersect2 = vi.fn();

    const { getByTestId, rerender } = render(
      <ObservedDiv onIntersect={onIntersect} />,
    );

    intersectionObserver.simulate({
      target: getByTestId('observer'),
      isIntersecting: true,
    });

    rerender(<ObservedDiv onIntersect={onIntersect2} />);

    expect(onIntersect2).toHaveBeenCalledTimes(0);
  });

  test('fires fetchMore handler on intersection events', async () => {
    const onFetchMore = vi.fn();

    const { getByTestId } = render(<Infinite onFetchMore={onFetchMore} />);

    intersectionObserver.simulate({
      target: getByTestId('observer'),
      isIntersecting: true,
    });

    expect(onFetchMore).toHaveBeenCalled();
  });

  test('fires fetchMore handler on intersection events', async () => {
    const onFetchMore = vi.fn();

    const { getByTestId } = render(
      <Infinite onFetchMore={onFetchMore} status="loading" />,
    );

    intersectionObserver.simulate({
      target: getByTestId('observer'),
      isIntersecting: true,
    });

    expect(onFetchMore).toHaveBeenCalled();
  });

  test('fires fetchMore handler on intersection events when status is end', async () => {
    const onFetchMore = vi.fn();

    const { getByTestId } = render(
      <Infinite onFetchMore={onFetchMore} status="end" />,
    );

    intersectionObserver.simulate({
      target: getByTestId('observer'),
      isIntersecting: true,
    });

    expect(onFetchMore).toHaveBeenCalledTimes(0);
  });
  test('Checks reverse true and status loading', async () => {
    const { queryByTestId } = render(
      <Infinite reverse={true} status="loading" />,
    );

    const spinner = queryByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('Checks reverse true and status hasNextPage', async () => {
    const { queryByTestId } = render(
      <Infinite reverse={true} status="hasNextPage" />,
    );

    const spinner = queryByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('Checks reverse true and status end', async () => {
    const { queryByTestId } = render(<Infinite reverse={true} status="end" />);

    const spinner = queryByTestId('spinner');
    expect(spinner).toBeFalsy();
  });

  test('Checks reverse true and status end-with-force', async () => {
    const { queryByTestId } = render(
      <Infinite reverse={true} status="end-with-force" />,
    );

    const button = queryByTestId('button');
    expect(button).toBeTruthy();
  });

  test('Checks reverse false and status loading', async () => {
    const { queryByTestId, queryAllByTestId } = render(
      <Infinite reverse={false} testId="stack" status="loading" />,
    );

    const spinner = queryByTestId('spinner');
    expect(spinner).toBeTruthy();
    const stacks = queryAllByTestId('stack');
    expect(stacks).toHaveLength(2);
  });

  test('Checks reverse false and status hasNextPage ', async () => {
    const { queryByTestId, queryAllByTestId } = render(
      <Infinite reverse={false} testId="stack" status="hasNextPage" />,
    );
    const spinner = queryByTestId('spinner');
    expect(spinner).toBeTruthy();
    const stacks = queryAllByTestId('stack');
    expect(stacks).toHaveLength(2);
  });
});
