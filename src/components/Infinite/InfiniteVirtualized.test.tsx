import { render } from '@testing-library/react';
import { InfiniteVirtualized } from '.';

describe('Infinite Virtualized', () => {
  test('Checks topStatus with value loading', () => {
    const { queryByTestId } = render(
      <InfiniteVirtualized
        firstItemIndex={1}
        initialTopMostItemIndex={1}
        itemContent={(index) => <div>Item {index}</div>}
        data={[]}
        topStatus="loading"
      />,
    );
    const spinner = queryByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('Checks topStatus with value hasPreviousPage', () => {
    const { queryByTestId } = render(
      <InfiniteVirtualized
        firstItemIndex={1}
        initialTopMostItemIndex={1}
        itemContent={(index) => <div>Item {index}</div>}
        data={[]}
        topStatus="hasPreviousPage"
      />,
    );
    const spinner = queryByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('Checks topStatus with value start', () => {
    const { queryByTestId } = render(
      <InfiniteVirtualized
        firstItemIndex={1}
        initialTopMostItemIndex={1}
        itemContent={(index) => <div>Item {index}</div>}
        data={[]}
        topStatus="start"
      />,
    );
    const spinner = queryByTestId('spinner');
    expect(spinner).toBeFalsy();
  });

  test('Checks bottomStatus with vlaue loading', () => {
    const { queryByTestId, queryAllByTestId } = render(
      <InfiniteVirtualized
        firstItemIndex={1}
        initialTopMostItemIndex={1}
        itemContent={(index) => <div>Item {index}</div>}
        data={[]}
        bottomStatus="loading"
      />,
    );
    const spinner = queryByTestId('spinner');
    expect(spinner).toBeTruthy();
    const stacks = queryAllByTestId('stack');
    expect(stacks).toHaveLength(3);
  });

  test('Checks bottomStatus with vlaue hasNextPage', () => {
    const { queryByTestId, queryAllByTestId } = render(
      <InfiniteVirtualized
        firstItemIndex={1}
        initialTopMostItemIndex={1}
        itemContent={(index) => <div>Item {index}</div>}
        data={[]}
        bottomStatus="hasNextPage"
      />,
    );
    const spinner = queryByTestId('spinner');
    expect(spinner).toBeTruthy();

    const stacks = queryAllByTestId('stack');
    expect(stacks).toHaveLength(3);
  });

  test('Checks bottomStatus with vlaue end', () => {
    const { queryByTestId } = render(
      <InfiniteVirtualized
        firstItemIndex={1}
        initialTopMostItemIndex={1}
        itemContent={(index) => <div>Item {index}</div>}
        data={[]}
        bottomStatus="end"
      />,
    );
    const spinner = queryByTestId('spinner');
    expect(spinner).toBeFalsy();
  });

  test('Checks bottomStatus with vlaue end', () => {
    const { queryByTestId } = render(
      <InfiniteVirtualized
        firstItemIndex={1}
        initialTopMostItemIndex={1}
        itemContent={(index) => <div>Item {index}</div>}
        data={[]}
        bottomStatus="end-with-force"
      />,
    );
    const spinner = queryByTestId('spinner');
    expect(spinner).toBeFalsy();
  });
});
