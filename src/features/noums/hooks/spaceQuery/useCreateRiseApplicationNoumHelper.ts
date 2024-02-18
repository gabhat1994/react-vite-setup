import { useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { t } from 'i18next';
import { useApplyForRiseApplicationMutation } from '@/apollo/graphql';
import { trackEvent } from '@/utils/tracking';
import EVENTS from '@/constants/trackingEvents';
import { useAuth } from '@/features/auth/contexts';
import { useToast } from '@/hooks/toast';

type CreateRiseApplicationChamberResponse = {
  id: string | undefined;
  alredayCreated: boolean | undefined;
};

export function useCreateRiseApplicationNoumHelper() {
  const { addToast } = useToast();
  const { user } = useAuth();

  const [applyForRiseApplication, { loading }] =
    useApplyForRiseApplicationMutation();

  const createRiseApplicationNoumHelper = useCallback(
    async (noumId: string) => {
      const riseSpace: CreateRiseApplicationChamberResponse = {
        id: undefined,
        alredayCreated: undefined,
      };
      await applyForRiseApplication({
        variables: { noumId },
        onCompleted: (data) => {
          if (data.applyForRiseApplication?.data?._id) {
            riseSpace.id = data.applyForRiseApplication?.data?._id || undefined;
            riseSpace.alredayCreated =
              data.applyForRiseApplication?.alredayCreated || undefined;
            if (!riseSpace.alredayCreated) {
              trackEvent(EVENTS.RISE.APPLY, {
                UUID: user?._id,
                noumId,
              });
              addToast(
                'success',
                'none',
                t(`noumena.riseprogram.created_rise_application`),
              );
            }
          }
        },
        onError: (error) => {
          if (error instanceof Error) {
            addToast('error', 'none', error.message);
            Sentry.captureException(new Error(error.message), {
              tags: {
                section: 'applyForRiseApplication',
              },
            });
          }
        },
      });

      return riseSpace;
    },
    [addToast, applyForRiseApplication, user],
  );

  return {
    loading,
    createRiseApplicationNoumHelper,
  };
}

export default useCreateRiseApplicationNoumHelper;
