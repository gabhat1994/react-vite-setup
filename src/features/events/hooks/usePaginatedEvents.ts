import { useMemo, useState } from 'react';

import useEvents from './useEvents';

interface IUseEvents {
  chamberId: string;
  limit?: number;
  preventGetEvents?: boolean;
  shouldGetActiveEvents?: boolean;
}

const usePaginatedEvents = ({
  chamberId,
  limit = 10,
  preventGetEvents = false,
  shouldGetActiveEvents = true,
}: IUseEvents) => {
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * limit;

  const { events, ...eventsProps } = useEvents({
    chamberId,
    // @TODO: Temporary solution for events getting merged because of appollo type policies
    limit: limit * currentPage,
    preventGetEvents,
    shouldGetActiveEvents,
    offset: 0,
  });

  const onChangePage = (page: number) => {
    setCurrentPage(Math.max(1, page));
  };

  const paginatedEvents = useMemo(
    () => events.slice(offset, offset + limit),
    [events, limit, offset],
  );

  return {
    ...eventsProps,
    onChangePage,
    currentPage,
    events: paginatedEvents,
  };
};

export default usePaginatedEvents;
