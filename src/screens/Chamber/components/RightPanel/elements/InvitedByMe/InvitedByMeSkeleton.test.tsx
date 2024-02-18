import { render } from '@testing-library/react';
import { InvitedByMeSkeleton } from './InvitedByMeSkeleton';

describe('<InvitedByMeSkeleton />', () => {
  test(`check Skeleton render correctly or not`, () => {
    const { container, getByTestId } = render(<InvitedByMeSkeleton />);
    expect(container).toBeTruthy();
    expect(getByTestId('invited-by-me-skeleton')).toBeTruthy();
  });

  test(`check Skeleton has 3 skeleton items or not`, () => {
    const { getAllByTestId } = render(<InvitedByMeSkeleton />);
    expect(getAllByTestId('skeleton_item')).toHaveLength(3);
  });
});
