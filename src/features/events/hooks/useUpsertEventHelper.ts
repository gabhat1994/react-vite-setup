import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import {
  useCreateEventMutation,
  useUpdateEventMutation,
} from '@/apollo/graphql';
import {
  type CreateEventInput,
  type UpdateEventInput,
  type Event,
} from '@/apollo/generated/types';
import { useEventHandlers } from './useEventHandlers';

export function useUpsertEventHelper() {
  const { updateEventParticipatedCache } = useEventHandlers();
  const [createEvent, { loading: creating }] = useCreateEventMutation();
  const [updateEvent, { loading: updating }] = useUpdateEventMutation();

  const createEventHelper = useCallback(
    async (input: CreateEventInput) => {
      let isSuccess;
      let errorMsg = 'Unknown';
      try {
        await createEvent({
          variables: { input: { ...input, isInstantEvent: true } },
          update(cache, { data }) {
            updateEventParticipatedCache({
              cache,
              hosted: (evnts) => [...evnts, data?.createEvent as Event],
            });
          },
        });

        isSuccess = true;
      } catch (error) {
        if (error instanceof Error) {
          errorMsg = error.message;
        }
        Sentry.captureException(new Error(errorMsg), {
          tags: {
            section: 'createEvent',
          },
        });

        isSuccess = false;
      }

      return { isSuccess, errorMsg };
    },
    [createEvent, updateEventParticipatedCache],
  );

  const updateEventHelper = useCallback(
    async (input: UpdateEventInput) => {
      let isSuccess;
      let errorMsg = 'Unknown';
      try {
        await updateEvent({
          variables: { input },
          update(cache, { data }) {
            updateEventParticipatedCache({
              cache,
              hosted: (evnts) =>
                evnts.map((evnt) =>
                  evnt._id === data?.updateEvent?._id ? data.updateEvent : evnt,
                ) as Event[],
            });
          },
        });

        isSuccess = true;
      } catch (error) {
        if (error instanceof Error) {
          errorMsg = error.message;
        }
        Sentry.captureException(new Error(errorMsg), {
          tags: {
            section: 'updateEvent',
          },
        });

        isSuccess = false;
      }

      return { isSuccess, errorMsg };
    },
    [updateEvent, updateEventParticipatedCache],
  );

  return {
    loading: creating || updating,
    createEventHelper,
    updateEventHelper,
  };
}

export default useUpsertEventHelper;
