import { cleanup, render, fireEvent } from '@/test-utils';

import { Pagination } from './Pagination';

const onPageChange = vi.fn();

describe('Pagination', () => {
  afterEach(() => {
    cleanup();
  });

  test('Should render and should have pagination buttons', () => {
    const { getByTestId, getAllByTestId } = render(
      <Pagination
        currentPage={1}
        pageSize={10}
        siblingCount={1}
        totalCount={30}
        onPageChange={onPageChange}
      />,
    );
    expect(getByTestId('pagination')).toBeInTheDocument();
    expect(getAllByTestId('page-button').length).toBe(3);
    expect(getByTestId('page-prev-button')).toBeInTheDocument();
    expect(getByTestId('page-next-button')).toBeInTheDocument();
  });

  test('Should be disabled', () => {
    const { getByTestId } = render(
      <Pagination
        currentPage={1}
        pageSize={10}
        siblingCount={1}
        totalCount={30}
        disabled
        onPageChange={onPageChange}
      />,
    );

    expect(getByTestId('page-prev-button')).toHaveStyle(`cursor: not-allowed;`);
    expect(getByTestId('page-next-button')).toHaveStyle(`cursor: not-allowed;`);
  });

  test('Should render break label for large data', () => {
    const { getByText } = render(
      <Pagination
        currentPage={1}
        pageSize={10}
        siblingCount={1}
        totalCount={100}
        breakLabel="..."
        onPageChange={onPageChange}
      />,
    );

    expect(getByText('...')).toBeInTheDocument();
  });

  test('Should not render without data', () => {
    const { queryByTestId } = render(
      <Pagination
        currentPage={1}
        pageSize={10}
        siblingCount={1}
        totalCount={0}
        onPageChange={onPageChange}
      />,
    );

    expect(queryByTestId('pagination')).toBeNull();
  });

  test('Should not render for single page', () => {
    const { queryByTestId } = render(
      <Pagination
        currentPage={1}
        pageSize={10}
        siblingCount={1}
        totalCount={10}
        renderOnOnePageCount={false}
        onPageChange={onPageChange}
      />,
    );

    expect(queryByTestId('pagination')).toBeNull();
  });

  test('Click', () => {
    const { getByTestId, getByText } = render(
      <Pagination
        currentPage={2}
        pageSize={10}
        siblingCount={1}
        totalCount={30}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(getByTestId('page-prev-button'));
    fireEvent.click(getByTestId('page-next-button'));
    fireEvent.click(getByText('1'));
  });
});
