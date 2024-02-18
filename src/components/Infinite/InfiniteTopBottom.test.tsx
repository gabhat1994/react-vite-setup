import { render, cleanup } from '@testing-library/react';
import { intersectionObserver } from '@/test-utils/stubs';
import { ObservedDiv } from './ObservedDiv';
import { InfiniteTopBottom } from '.';

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

  test('Checks onFetchMoreTop when topStatus loading', async () => {
    const onFetchMoreTop = vi.fn();
    const { queryByTestId, getAllByTestId } = render(
      <InfiniteTopBottom topStatus="loading" onFetchMoreTop={onFetchMoreTop} />,
    );
    const spinner = queryByTestId('spinner');
    expect(spinner).toBeTruthy();

    intersectionObserver.simulate({
      target: getAllByTestId('observer')[0],
      isIntersecting: true,
    });
    expect(onFetchMoreTop).toHaveBeenCalled();
  });

  test('Checks onFetchMoreTop when topStatus start', async () => {
    const onFetchMoreTop = vi.fn();
    const { getAllByTestId } = render(
      <InfiniteTopBottom topStatus="start" onFetchMoreTop={onFetchMoreTop} />,
    );

    intersectionObserver.simulate({
      target: getAllByTestId('observer')[0],
      isIntersecting: true,
    });
    expect(onFetchMoreTop).toHaveBeenCalledTimes(0);
  });

  test('Checks onFetchMoreBottom when bottomStatus loading', async () => {
    const onFetchMoreBottom = vi.fn();
    const { getAllByTestId, queryByTestId } = render(
      <InfiniteTopBottom
        bottomStatus="loading"
        onFetchMoreBottom={onFetchMoreBottom}
      />,
    );
    const spinner = queryByTestId('spinner');
    expect(spinner).toBeTruthy();

    intersectionObserver.simulate({
      target: getAllByTestId('observer')[1],
      isIntersecting: true,
    });

    expect(onFetchMoreBottom).toHaveBeenCalled();
  });

  test('Checks onFetchMoreBottom when bottomStatus end', async () => {
    const onFetchMoreBottom = vi.fn();
    const { getAllByTestId } = render(
      <InfiniteTopBottom
        bottomStatus="end"
        onFetchMoreBottom={onFetchMoreBottom}
      />,
    );
    intersectionObserver.simulate({
      target: getAllByTestId('observer')[1],
      isIntersecting: true,
    });
    expect(onFetchMoreBottom).toHaveBeenCalledTimes(0);
  });

  test('Checks Spinner topStatus loading', async () => {
    const { queryByTestId } = render(<InfiniteTopBottom topStatus="loading" />);
    const spinner = queryByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('Checks Spinner topStatus hasPreviousPage', async () => {
    const { queryByTestId } = render(
      <InfiniteTopBottom topStatus="hasPreviousPage" />,
    );
    const spinner = queryByTestId('spinner');
    expect(spinner).toBeTruthy();
  });
});
