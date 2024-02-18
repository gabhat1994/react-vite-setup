import { debounce } from 'lodash';
import { useCallback, useMemo } from 'react';
import { generatePath, useNavigate } from 'react-router';

import { Spacer, Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { DataGrid } from '@/components/DataGrid';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { type TableColumn } from '@/components/DataGrid/Table/Table';
import DefaultImage from '@/assets/images/chamber_default.png';
import ROUTES from '@/constants/routes';
import { type CampaignBasicFragment } from '@/apollo/graphql';

import { Spinner } from '@/components/Spinner';
import { Wrapper } from './styles';
import { CampaignsCollapsibleList } from './CampaignsCollapsibleList';
import { CampaignHeader } from './CampaignHeader';
import { CampaignTable } from './CampaignTable';
import { Badge, type Props as BadgeProps } from '../components/Badge';
import { NOUMCard } from '../components/NoumCard';
import { SortingAndFiltering } from './SortingAndFiltering';
import { MobileActions } from './MobileAcrions';
import { type CampaignFilters } from './types';
import { ActionMenu } from './ActionMenu';
import { useCampaignEntries } from '../hooks/useCampaignEntries';
import { NoumFilter } from './NoumFilter';
import { StatusFilter } from './StatusFilter';
import { Utils } from '../utils';
import { DeleteCampaignConfirmation } from '../components/DeleteCampaignConformation';

export const CampaignEntries = () => {
  const device = useBreakpoints();
  const navigate = useNavigate();
  const { Filter, Dropdown, Campaign, Offset, Modal } = useCampaignEntries({});

  const columns = useMemo<TableColumn<CampaignBasicFragment>[]>(
    () => [
      {
        id: 'name',
        title: 'Name',
        renderValue: (item) => (
          <TSpan font="body-m-bold">
            {Utils.truncateString(item.title || '', 37)}
          </TSpan>
        ),
      },
      {
        id: 'status',
        title: 'Status',
        renderValue: (item) => (
          <Badge
            status={(item.status ?? 'In Review') as BadgeProps['status']}
          />
        ),
      },
      {
        id: 'noum',
        title: 'Noum',
        renderValue: (item) => (
          <NOUMCard
            name={item.noumId?.name || ''}
            image={item.noumId?.profileImage ?? DefaultImage}
          />
        ),
      },
      {
        id: 'startDate',
        title: 'Start Date',
        renderValue: (item) => (
          <TSpan font="body-m" colorToken="--text-card-neutral-default">
            {Utils.formatDate(item.startDate)}
          </TSpan>
        ),
      },
      {
        id: 'endDate',
        title: 'End Date',
        renderValue: (item) => (
          <TSpan font="body-m" colorToken="--text-card-neutral-default">
            {item.endDate ? Utils.formatDate(item.endDate) : '-'}
          </TSpan>
        ),
      },
      {
        id: 'action',
        title: '',
        renderValue: (item) => (
          <Stack justify="end">
            <ActionMenu
              campaign={item}
              onDelete={Modal.openDeleteConfirmationModal}
            />
            ,
          </Stack>
        ),
      },
    ],
    [Modal.openDeleteConfirmationModal],
  );

  const handleFilterChange = useMemo(
    () =>
      debounce(($filter: CampaignFilters) => {
        Offset.update(0);
        Filter.update($filter);
      }, 500),
    [Filter, Offset],
  );

  const handleNavigate = useCallback(() => {
    navigate(generatePath(ROUTES.CAMPAIGN_CREATE, { id: 'new' }));
  }, [navigate]);

  const handleRowClick = useCallback(
    ($campaign: CampaignBasicFragment) => {
      navigate(
        generatePath(ROUTES.CAMPAIGN_SUMMARY, { id: $campaign._id || '' }),
      );
    },
    [navigate],
  );

  return (
    <>
      {Filter.loading ? (
        <Spinner />
      ) : (
        <Wrapper>
          <DataGrid.Provider<CampaignBasicFragment> data={[]}>
            <DataGrid.Filters<CampaignFilters>
              defaultValues={{
                status: [...Filter.value.status.map(Utils.mapItem)],
                noums: [...Filter.value.noums.map(Utils.mapItem)],
                search: Filter.value.search,
              }}
              onSubmit={handleFilterChange}
              clearRowSelectionOnSubmit
            >
              <CampaignHeader
                statusOptions={Dropdown.status}
                noumsOptions={Dropdown.noum}
                hideFilters={device.isMobile}
                onNewCampaign={handleNavigate}
              />

              <Spacer height={24} />

              {device.isMobile && (
                <CampaignsCollapsibleList
                  campaigns={Campaign.list}
                  onDelete={Modal.openDeleteConfirmationModal}
                />
              )}

              {!device.isMobile && (
                <CampaignTable<CampaignBasicFragment>
                  keyExtractor={($campaign) => $campaign._id ?? ''}
                  campaigns={Campaign.list}
                  columns={columns}
                  loading={Campaign.loading || Filter.loading}
                  onRowClick={handleRowClick}
                />
              )}
              <Spacer height={24} />

              <DataGrid.Footer
                leftElement={
                  <DataGrid.Pagination
                    totalCount={Campaign.count}
                    itemsPerPage={8}
                    onChange={({ offset }) => Offset.update(offset)}
                    currentOffset={Offset.value}
                  />
                }
              />

              {device.isMobile && <Spacer height={145} />}

              <MobileActions
                onToggleFilter={Modal.openSortAndFilter}
                onNewCampaign={handleNavigate}
              />

              <SortingAndFiltering
                open={Modal.modalType === 'sort-filter'}
                onClose={Modal.closeModal}
                filters={[
                  {
                    key: 'noum-filter',
                    label: 'Noum',
                    value:
                      Filter.value.noums.length &&
                      Filter.value.noums.length !== Dropdown.noum.length
                        ? Filter.mapNoumFilter(Filter.value.noums).join(', ')
                        : 'All',
                    onClick: Modal.openNoumFilter,
                  },
                  {
                    key: 'status-filter',
                    label: 'Status',
                    value:
                      Filter.value.status.length &&
                      Filter.value.status.length !== Dropdown.status.length
                        ? Filter.mapStatusFilter(Filter.value.status).join(', ')
                        : 'All',
                    onClick: Modal.openStatusFilter,
                  },
                ]}
              />

              <DeleteCampaignConfirmation
                open={Modal.modalType === 'delete-confirmation'}
                onClose={Modal.closeModal}
                onDelete={Campaign.softDelete}
                actionButtonLoading={Campaign.isDeleting}
                campaign={
                  Modal.contextData && Array.isArray(Modal.contextData)
                    ? null
                    : Modal.contextData
                }
              />

              <NoumFilter
                open={Modal.modalType === 'noum-filter'}
                dropDownOptions={
                  Modal.contextData && Array.isArray(Modal.contextData)
                    ? Modal.contextData
                    : []
                }
                title={Modal.modalType === 'noum-filter' ? 'Noum' : 'Status'}
                onClose={Modal.closeFilterModal}
              />

              <StatusFilter
                open={Modal.modalType === 'status-filter'}
                dropDownOptions={
                  Modal.contextData && Array.isArray(Modal.contextData)
                    ? Modal.contextData
                    : []
                }
                onClose={Modal.closeFilterModal}
              />
            </DataGrid.Filters>
          </DataGrid.Provider>
        </Wrapper>
      )}
    </>
  );
};
