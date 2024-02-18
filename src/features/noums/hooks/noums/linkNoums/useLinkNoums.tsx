import { SortOperator, SpaceStatusEnum } from '@/apollo/generated/types';
import {
  useGetNoumLinkLazyQuery,
  useGetOwnNoumsToLinkQuery,
  useGetSpaceForLinkedNoumsLazyQuery,
  useLinkNoumsMutation,
  usePreCalculateNoumLinkDataLazyQuery,
} from '@/apollo/graphql';
import { getBottomStatusFromQuery } from '@/components/Infinite';
import { useLaunchDarkly, useToast } from '@/hooks';
import { cleanList } from '@/utils/list';
import * as Sentry from '@sentry/react';
import { t } from 'i18next';
import { useCallback, useMemo, useState } from 'react';
import { transformNoum } from './helper';

const DEFAULT_PAGE_SIZE = 10;

export const useLinkNoums = (
  isInfinite?: boolean,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const {
    flags: { elementPermission },
  } = useLaunchDarkly();
  const { addToast } = useToast();
  const [search, setSearch] = useState('');

  const onSearchChange = (value: string) => {
    setSearch(value);
  };

  const {
    data: ownedProjectData,
    loading,
    error,
    fetchMore,
    refetch,
    networkStatus,
  } = useGetOwnNoumsToLinkQuery({
    variables: {
      limit: isInfinite ? pageSize : DEFAULT_PAGE_SIZE,
      offset: 0,
      sort: {
        column: 'publishedAt',
        operator: SortOperator.Asc,
      },
      filter: {
        search,
        status: SpaceStatusEnum.Published,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const ownedNoums = useMemo(
    () =>
      cleanList(ownedProjectData?.getOwnProjectChambers?.data).map((noum) =>
        transformNoum({
          data: noum,
          isElementPermissionsEnabled: elementPermission,
        }),
      ),
    [elementPermission, ownedProjectData?.getOwnProjectChambers?.data],
  );

  const infiniteState = getBottomStatusFromQuery({
    networkStatus,
    currentCount: ownedNoums.length,
    totalCount: ownedProjectData?.getOwnProjectChambers?.count ?? 0,
  });

  const [getSpaceForLink] = useGetSpaceForLinkedNoumsLazyQuery();
  const [getNoumLink] = useGetNoumLinkLazyQuery();

  const getDefaultNoum = useCallback(
    async (noumId: string) => {
      const response = await getSpaceForLink({
        variables: {
          noumId,
        },
      });
      if (response.data?.getSpaceById) {
        const transformedNoum = transformNoum({
          data: response.data.getSpaceById,
          defaultVal: {
            disabled: true,
            checked: true,
          },
          isElementPermissionsEnabled: elementPermission,
        });
        return transformedNoum;
      }
      return false;
    },
    [elementPermission, getSpaceForLink],
  );

  const getDefaultNoumLink = useCallback(
    async (noumLinkId: string) => {
      const response = await getNoumLink({
        variables: {
          noumLinkId,
        },
      });
      if (response.data?.getNoumLink) {
        return cleanList(response.data.getNoumLink?.linkedNoums).map((item) =>
          transformNoum({
            data: item,
            defaultVal: {
              disabled: true,
              checked: true,
            },
            isElementPermissionsEnabled: elementPermission,
          }),
        );
      }
      return false;
    },
    [elementPermission, getNoumLink],
  );

  const fetchMoreOwnedNoums = useCallback(async () => {
    await fetchMore({
      variables: {
        offset: ownedNoums?.length || 0,
      },
    });
  }, [fetchMore, ownedNoums?.length]);

  const [
    preCalculateNoumLinkData,
    {
      data: linkedNoumsCalculatedData,
      loading: linkedNoumsCalculatedLoading,
      error: linkedNoumsCalculationError,
    },
  ] = usePreCalculateNoumLinkDataLazyQuery();

  const [linkNoumsMutation, { loading: mutationLoading }] =
    useLinkNoumsMutation({
      onCompleted: (response) => {
        if (response.linkNoums?.status) {
          addToast(
            'success',
            'icon',
            t('noumena.link_noums.mutation.success.message'),
          );
        }
      },
      onError: ({ networkError = null, graphQLErrors = [] }) => {
        const [err] = graphQLErrors;
        const defaultError = t('noumena.toast_error.text');
        const e = err?.message
          ? `${defaultError}: ${err?.message}`
          : `${defaultError}: ${networkError}`;

        addToast('error', 'none', e);
        Sentry.captureException(new Error(err?.message ?? networkError), {
          tags: {
            section: 'linkNoumsMutation',
          },
        });
      },
    });

  return {
    noums: ownedNoums,
    loading,
    error,
    infiniteState,
    fetchMore: fetchMoreOwnedNoums,
    refetch,
    preCalculateNoumLinkData,
    linkedNoumsCalculatedData,
    linkedNoumsCalculatedLoading,
    linkedNoumsCalculationError,
    linkNoumsMutation,
    mutationLoading,
    getDefaultNoum,
    getDefaultNoumLink,
    onSearchChange,
    search,
  };
};
