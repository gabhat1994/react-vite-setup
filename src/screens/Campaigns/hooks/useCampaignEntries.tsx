import { useCallback, useMemo } from 'react';

import { AdCampaignSettingsType } from '@/apollo/generated/types';

import {
  useCampaignFiltersQuery,
  useCampaignListQuery,
  useDeleteCampaignMutation,
} from '@/apollo/graphql';

import { useError, useToast } from '@/hooks';
import { cleanList } from '@/utils/list';
import { type DropdownValueType } from '@/components/Dropdown';
import { Avatar } from '@/components/Avatar/Avatar';
import DefaultImage from '@/assets/images/chamber_default.png';

import { useModalManager } from '@/hooks/modal/useModalManager';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useCampaignFilterContext } from '@/providers/CampaignListFilterProvider';
import { type CampaignFilters } from '../CampaignEntries/types';
import { Utils } from '../utils';

type UseCampaignEntries = {
  onDelete?: () => void;
};

type ModalTypes =
  | 'sort-filter'
  | 'noum-filter'
  | 'status-filter'
  | 'delete-confirmation';

export function useCampaignEntries({ onDelete }: UseCampaignEntries) {
  const logger = useError();
  const devices = useBreakpoints();
  const toast = useToast();
  const Modal = useModalManager<
    ModalTypes,
    DropdownValueType<string, string>[] | { id: string; title: string }
  >();

  const { updateFilterState, offset, ...filter } = useCampaignFilterContext();

  const filters = useCampaignFiltersQuery({
    fetchPolicy: 'cache-and-network',
    onError: (error) => logger.logError(error, 'campaign-filters', true),
    variables: {
      input: { settingsType: AdCampaignSettingsType.AdCampaignStatus },
    },
  });

  const campaigns = useCampaignListQuery({
    fetchPolicy: 'cache-and-network',
    onError: (error) => logger.logError(error, 'campaign-list', true),
    variables: {
      offset,
      limit: devices.isMobile ? 7 : 8,
      // @ts-ignore
      filter: Utils.mapFilter(filter),
    },
  });

  const [deleteCampaignFn, { loading: isDeleting }] = useDeleteCampaignMutation(
    {
      onError: (error) => logger.logError(error, 'list-delete-campaign', true),
      onCompleted: ({ deleteAdCampaign }) => {
        if (deleteAdCampaign?.isDeleted) {
          Modal.closeModal();
          toast.addSuccessIconToast('Campaign has been deleted');
          filters.refetch();
          campaigns.refetch();
          onDelete?.();
        }
      },
    },
  );

  const softDelete = useCallback(
    (campaign: { id: string; title: string } | null) => {
      if (!campaign?.id) {
        toast.addErrorToast('Campaign not found');
        return;
      }
      deleteCampaignFn({
        variables: {
          campaignId: campaign.id,
        },
      });
    },
    [deleteCampaignFn, toast],
  );

  const noumsOptions = useMemo<DropdownValueType<string, string>[]>(
    () =>
      cleanList(filters?.data?.noums).map(($noums) => ({
        key: ($noums?.noumId?._id || '') as string,
        value: ($noums?.noumId?._id || '') as string,
        label: $noums?.noumId?.name || '',
        icon: (
          <Avatar url={$noums?.noumId?.profileImage || DefaultImage} size="M" />
        ),
        type: 'value',
      })),
    [filters?.data],
  );

  const statusOptions = useMemo<DropdownValueType<string, string>[]>(
    () =>
      cleanList(filters?.data?.status?.settingsValue)?.map(($status) => ({
        key: $status as string,
        value: $status as string,
        label: Utils.capitalizeFirstLetter($status as string),
        type: 'value',
      })),
    [filters?.data],
  );

  const openNoumFilter = useCallback(() => {
    Modal.openModal('noum-filter', noumsOptions);
  }, [Modal, noumsOptions]);

  const openStatusFilter = useCallback(() => {
    Modal.openModal('status-filter', statusOptions);
  }, [Modal, statusOptions]);

  const closeFilterModal = useCallback(() => {
    Modal.closeModal();
    Modal.openModal('sort-filter');
  }, [Modal]);

  const openSortAndFilter = useCallback(() => {
    Modal.openModal('sort-filter');
  }, [Modal]);

  const openDeleteConfirmationModal = useCallback(
    (campaign: { id: string; title: string }) => {
      Modal.openModal('delete-confirmation', campaign);
    },
    [Modal],
  );

  const mapNoumForMobileFilter = (v: string[]) =>
    cleanList(
      filters.data?.noums?.map((n) => {
        if (n?.noumId?._id && v.includes(n?.noumId?._id))
          return n?.noumId?.name;
        return undefined;
      }),
    );

  const mapStatusForMobileFilter = (v: string[]) =>
    cleanList(
      filters.data?.status?.settingsValue?.map((n: string) => {
        if (n && v.includes(n)) return Utils.capitalizeFirstLetter(n);
        return undefined;
      }),
    );

  const setOffset = (next: number) => {
    updateFilterState({ offset: next });
  };

  const setFilter = (next: CampaignFilters) => {
    const { search, noums, status } = next;
    updateFilterState({ search, noums, status });
  };

  return {
    Modal: {
      ...Modal,
      openNoumFilter,
      openStatusFilter,
      closeFilterModal,
      openSortAndFilter,
      openDeleteConfirmationModal,
    },
    Campaign: {
      isDeleting,
      softDelete,
      list: cleanList(campaigns?.data?.getAdCampaignsByUser?.data),
      loading: campaigns.loading,
      count: campaigns?.data?.getAdCampaignsByUser?.count ?? 0,
    },
    Filter: {
      value: filter,
      update: setFilter,
      loading: filters.loading,
      mapNoumFilter: mapNoumForMobileFilter,
      mapStatusFilter: mapStatusForMobileFilter,
    },
    Offset: {
      value: offset,
      update: setOffset,
    },
    Dropdown: {
      noum: noumsOptions,
      status: statusOptions,
    },
  };
}
