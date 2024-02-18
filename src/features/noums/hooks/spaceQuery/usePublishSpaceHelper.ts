import {
  ElementStatusEnum,
  ElementTypeEnum,
  type SocialLink,
  SpaceStatusEnum,
  SpaceTypeEnum,
  type ElementOutput,
  type Maybe,
} from '@/apollo/generated/types';
import {
  type SpaceOutputFragment,
  useChangeProjectChamberStatusMutation,
  useRemoveCalendarMutation,
  useUpdateUserProfileMutation,
} from '@/apollo/graphql';
import { SpaceUtils } from '@/utils/space';
import { makeSocialLink, type TSocialName } from '@/utils/url';
import * as Sentry from '@sentry/react';
import { t } from 'i18next';
import { useCallback } from 'react';
import { useToast } from '@/hooks/toast';
import usePublishElementStateHelper from './usePublishElementStateHelper';

export function usePublishSpaceHelper() {
  const { addToast } = useToast();
  const [updateProfile] = useUpdateUserProfileMutation();
  const [removeCalendar] = useRemoveCalendarMutation();
  const { publishElementStateHelper, loading } = usePublishElementStateHelper();
  const [changeProjectChamberStatus, { loading: isLoading }] =
    useChangeProjectChamberStatusMutation();

  const clearCalendar = useCallback(
    (chamberId: string, elements: Maybe<ElementOutput>[]) => {
      const hasRemovedCalendar = elements.some(
        (el) =>
          el?.elementType === ElementTypeEnum.Calendar &&
          !!el.unSaved?.isDeleted,
      );

      if (hasRemovedCalendar) {
        removeCalendar({
          variables: {
            chamberId,
          },
        });
      }
    },
    [removeCalendar],
  );

  const publishSpaceHelper = useCallback(
    async (
      spaceId: string,
      space: SpaceOutputFragment | undefined,
      callback?: () => void,
    ) => {
      let isSuccess;
      try {
        if (space && space?.type === SpaceTypeEnum.Home) {
          const elements = SpaceUtils.getTools(space);
          const networkElem = elements.find(
            (ele) => ele.elementType === ElementTypeEnum.Usernetwork,
          );
          // update user profile according to network element
          const body =
            JSON.parse(
              networkElem?.unSaved?.bodyContent ||
                networkElem?.draft?.bodyContent ||
                networkElem?.bodyContent ||
                '{}',
            ) || {};
          const socailLinks: SocialLink[] = [];
          Object.keys(body).map((key) => {
            socailLinks.push({
              link: makeSocialLink(key as TSocialName, body[key]),
              name: key,
            });
            return undefined;
          });
          updateProfile({
            variables: {
              input: {
                profile: {
                  socialLinks: socailLinks,
                },
              },
            },
          });
          callback?.();
        }

        await publishElementStateHelper(
          spaceId,
          [ElementStatusEnum.Unsaved, ElementStatusEnum.Draft],
          ElementStatusEnum.Published,
        );

        // Publish draft setting: visibility
        await changeProjectChamberStatus({
          variables: { spaceId, status: SpaceStatusEnum.Published },
        });
        addToast(
          'success',
          'icon',
          t(`noumena.container.chamber_publish.success`),
        );

        clearCalendar(spaceId, space?.elements || []);
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
    [
      publishElementStateHelper,
      changeProjectChamberStatus,
      addToast,
      clearCalendar,
      updateProfile,
    ],
  );

  return {
    loading: loading || isLoading,
    publishSpaceHelper,
  };
}

export default usePublishSpaceHelper;
