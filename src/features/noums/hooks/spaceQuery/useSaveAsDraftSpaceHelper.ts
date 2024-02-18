import { ElementStatusEnum, SpaceStatusEnum } from '@/apollo/generated/types';
import {
  type SpaceOutputFragment,
  useChangeProjectChamberStatusMutation,
} from '@/apollo/graphql';
import { SpaceUtils } from '@/utils/space';
import * as Sentry from '@sentry/react';
import { t } from 'i18next';
import { useCallback } from 'react';
import { useToast } from '@/hooks/toast';
import usePublishElementStateHelper from './usePublishElementStateHelper';

export function useSaveAsDraftSpaceHelper() {
  const { addToast } = useToast();

  const { publishElementStateHelper, loading } = usePublishElementStateHelper();
  const [changeProjectChamberStatus, { loading: isLoading }] =
    useChangeProjectChamberStatusMutation();
  const saveAsDraftSpaceHelper = useCallback(
    async (spaceId: string, space?: SpaceOutputFragment) => {
      let isSuccess;
      try {
        await publishElementStateHelper(
          spaceId,
          [ElementStatusEnum.Unsaved],
          ElementStatusEnum.Draft,
        );
        if (space && SpaceUtils.hasUnsavedSetting(space))
          await changeProjectChamberStatus({
            variables: { spaceId, status: SpaceStatusEnum.Draft },
          });
        addToast(
          'success',
          'icon',
          t(`noumena.container.chamber_save_as_draft.success`),
        );
        isSuccess = true;
      } catch (error) {
        let message = 'Unknown';
        if (error instanceof Error) {
          message = error.message;
        }
        addToast('error', 'none', message);
        if (
          message !== t('noumena.container.chamber_business_brief_error') &&
          message !== t('noumena.container.chamber_experience_error')
        ) {
          Sentry.captureException(new Error(message), {
            tags: {
              section: 'publishElementStateMutation',
            },
          });
        }
        isSuccess = false;
      }

      return isSuccess;
    },
    [addToast, changeProjectChamberStatus, publishElementStateHelper],
  );

  return {
    loading: loading || isLoading,
    saveAsDraftSpaceHelper,
  };
}

export default useSaveAsDraftSpaceHelper;
