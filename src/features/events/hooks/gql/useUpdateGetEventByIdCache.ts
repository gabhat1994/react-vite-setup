import { useCallback } from 'react';
import { type EventsStatus } from '@/apollo/generated/types';
import { useGetEventByIdCache } from './useGetEventByIdCache';

export const useUpdateGetEventByIdCache = () => {
  const [updateCache] = useGetEventByIdCache();

  const updateEventStatus = useCallback(
    (status: EventsStatus) => {
      updateCache({
        status,
        eventStatusUpdatedAt: new Date(),
      });
    },
    [updateCache],
  );

  return {
    updateEventStatus,
  };
};
