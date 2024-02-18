import { render } from '@/test-utils';
import { EventsFilter } from '@/apollo/generated/types';

import { EventFilter } from './EventFilter';

const testId = 'event-filter';

const onChange = vi.fn();

describe('EventFilter', () => {
  test('Should render with filter tabs', () => {
    const { getByTestId, getByText } = render(
      <EventFilter activeFilter="all" onChange={onChange} type="calendar" />,
    );
    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByText('All')).toBeInTheDocument();
    expect(getByText('Attending')).toBeInTheDocument();
    expect(getByText('Hosting')).toBeInTheDocument();
    expect(getByText('Invites')).toBeInTheDocument();
    expect(getByText('Past')).toBeInTheDocument();
  });

  test('Should not be visible', () => {
    const { queryByTestId } = render(
      <EventFilter
        visible={false}
        activeFilter="all"
        onChange={onChange}
        type="calendar"
      />,
    );
    expect(queryByTestId(testId)).toBeNull();
  });

  test('Should have active filter', () => {
    const { getByText } = render(
      <EventFilter
        activeFilter={EventsFilter.Attending}
        onChange={onChange}
        type="calendar"
      />,
    );
    expect(getByText('Attending')).toHaveStyle(`
      color: var(--text-tab-chips-brand-primary-selected);
    `);
  });
});
