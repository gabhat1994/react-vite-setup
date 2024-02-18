import { render } from '@testing-library/react';
import { ReceivedRequestsSkeleton } from './ReceivedRequestsSkeleton';

describe('<ReceivedRequestsSkeleton />', () => {
  test(`check Skeleton render correctly or not`, () => {
    const { container, getByTestId } = render(<ReceivedRequestsSkeleton />);
    expect(container).toBeTruthy();
    expect(getByTestId('received-request-skeleton')).toBeTruthy();
  });

  test(`check Skeleton has 3 skeleton items or not`, () => {
    const { getAllByTestId } = render(<ReceivedRequestsSkeleton />);
    expect(getAllByTestId('skeleton_item')).toHaveLength(3);
  });
});
