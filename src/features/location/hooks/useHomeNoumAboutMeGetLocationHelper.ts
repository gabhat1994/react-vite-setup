import { useCallback } from 'react';
import { t } from 'i18next';
import * as Sentry from '@sentry/react';
import { useToast } from '@/hooks/toast';
import { useGetLocationLazyQuery } from '@/apollo/graphql';
import { type LocationOutput } from '@/apollo/generated/types';

export function useHomeNoumAboutMeGetLocationHelper() {
  const { addToast } = useToast();

  const handleError = useCallback(
    (networkError: String | Error | null) => {
      addToast(
        'error',
        'none',
        `${t('noumena.toast_error.text')}: ${networkError}`,
      );
    },
    [addToast],
  );

  const [getLocation, { loading: locationsLoading }] =
    useGetLocationLazyQuery();

  const locationHelper = useCallback(
    async (search: string) => {
      let data: LocationOutput[] = [];
      await getLocation({
        variables: { search },
        onError: ({ networkError = null, graphQLErrors = [] }) => {
          const [err] = graphQLErrors;
          handleError(err?.message ?? networkError);
          Sentry.captureException(new Error(err?.message ?? networkError), {
            tags: {
              section: 'useGetLocationLazyQuery',
            },
          });
        },
        onCompleted: (response) => {
          if (response?.getLocation) {
            data = response?.getLocation as LocationOutput[];
          }
        },
      });
      return data;
    },
    [handleError, getLocation],
  );

  return { locationsLoading, locationHelper };
}
