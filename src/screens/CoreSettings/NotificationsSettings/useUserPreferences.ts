import {
  GetUserPreferencesDocument,
  type GetUserPreferencesQuery,
  type UpdateUserPreferencesMutationVariables,
  useGetUserPreferencesQuery,
  useUpdateUserPreferencesMutation,
} from '@/apollo/graphql';
import { useCallback, useMemo } from 'react';
import { type EmailSubscriptionType } from './types';
import { subscriptionsOptionsList } from './utils';

type UseUserPreferencesOptions = {
  disableQuery?: boolean;
};

export const useUserPreferences = ({
  disableQuery,
}: UseUserPreferencesOptions = {}) => {
  const { data, loading, error } = useGetUserPreferencesQuery({
    fetchPolicy: 'cache-and-network',
    skip: !!disableQuery,
  });

  const options = useMemo(
    () =>
      subscriptionsOptionsList.map((option) => ({
        ...option,
        isSubscribed: !!data?.getUserPreferences?.emailSubscriptions[option.id],
      })),
    [data?.getUserPreferences?.emailSubscriptions],
  );

  const [updateUserPreferencesMutation, { loading: loadingUpdate }] =
    useUpdateUserPreferencesMutation();

  const updatePreference = useCallback(
    async (id: EmailSubscriptionType, value: boolean) => {
      await updateUserPreferencesMutation({
        variables: {
          input: {
            emailSubscriptions: {
              [id]: value,
            },
          },
        },
        update: (cache, { data: currentData }) => {
          if (!currentData?.updateUserPreferences) {
            return;
          }
          cache.writeQuery<
            GetUserPreferencesQuery,
            UpdateUserPreferencesMutationVariables
          >({
            query: GetUserPreferencesDocument,
            variables: {
              input: {
                emailSubscriptions: {
                  [id]: currentData?.updateUserPreferences?.emailSubscriptions[
                    id
                  ],
                },
              },
            },
            data: {
              getUserPreferences: {
                ...currentData?.updateUserPreferences,
              },
            },
          });
        },
      });
    },
    [updateUserPreferencesMutation],
  );

  return {
    options,
    subscriptions: data?.getUserPreferences?.emailSubscriptions,
    loading,
    error,
    loadingUpdate,
    updatePreference,
  };
};
