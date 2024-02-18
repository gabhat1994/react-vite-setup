import { NoumMemberStatus } from '@/apollo/generated/types';
import {
  type GetNoumMembersQueryHookResult,
  type NoumMemberWithInvitationFragment,
} from '@/apollo/graphql';
import { DataGrid } from '@/components/DataGrid';
import { type TableColumn } from '@/components/DataGrid/Table/Table';
import { Infinite, getBottomStatusFromQuery } from '@/components/Infinite';
import SkeletonLoaderProvider from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { useBreakpoints } from '@/hooks';
import { Stack } from '@/layout';
import { NetworkStatus } from '@apollo/client';
import { debounce } from 'lodash';
import { useMemo } from 'react';
import { BulkActionsPopover } from './BulkActionsPopover';
import { type NoumMembersListQueryFilters } from './filters';
import { type BulkActionType, type RowActionType } from './types';
import { desktopColumns } from './membersColumns';
import { Filters } from './Components/Filters';
import { ManageMembersCollapsibleList } from './Components/ManageMembersCollapsibleList';
import MembersActionMenu from './MembersActionMenu';

type NoumPageTableTypes = {
  onRowActionSelect: (
    value: RowActionType,
    item: NoumMemberWithInvitationFragment,
  ) => void;
  networkStatus: NetworkStatus;
  fetchMore: () => void;
  refetch: GetNoumMembersQueryHookResult['refetch'];
  data: NoumMemberWithInvitationFragment[];
  currentCount: number;
  totalCount: number;
  rowsPerPage: number;
  onBulkAction: (
    value: BulkActionType,
    items: NoumMemberWithInvitationFragment[],
  ) => void;
  onInviteMembers(): void;
};

export const NoumPageTable = ({
  networkStatus,
  fetchMore,
  refetch,
  data,
  currentCount,
  totalCount,
  rowsPerPage,
  onRowActionSelect,
  onBulkAction,
  onInviteMembers,
}: NoumPageTableTypes) => {
  const { isMobile } = useBreakpoints();

  const columns: TableColumn<NoumMemberWithInvitationFragment>[] = [
    ...desktopColumns,
    {
      id: 'actions',
      renderValue: (item) => (
        <MembersActionMenu item={item} onRowActionSelect={onRowActionSelect} />
      ),

      title: '',
    },
  ];

  const debouncedSubmit = useMemo(
    () =>
      debounce((values: NoumMembersListQueryFilters) => {
        refetch({
          input: {
            statuses: values.statuses,
            roleIDs: values.roleIDs,
            searchTerm: values.search,
            offset: 0,
            limit: rowsPerPage,
          },
        });
      }, 500),
    [refetch, rowsPerPage],
  );

  return (
    <SkeletonLoaderProvider isLoading={networkStatus === NetworkStatus.loading}>
      <DataGrid.Provider data={data}>
        <Stack
          gap={24}
          vertical
          align="stretch"
          maxHeight="100%"
          padding={isMobile ? '0 4px' : 0}
        >
          <DataGrid.Filters<NoumMembersListQueryFilters>
            submitOnChange={true}
            defaultValues={{
              search: '',
              roleIDs: undefined,
              statuses: [
                NoumMemberStatus.Connected,
                NoumMemberStatus.Invited,
                NoumMemberStatus.Requested,
              ],
            }}
            onSubmit={debouncedSubmit}
          >
            <Filters onInviteMembers={onInviteMembers} />
          </DataGrid.Filters>

          <Infinite
            onFetchMore={fetchMore}
            status={getBottomStatusFromQuery({
              networkStatus,
              currentCount,
              totalCount,
            })}
            disableFetchMoreWhileLoading
            isSpinnerRelative
          >
            {isMobile ? (
              <ManageMembersCollapsibleList
                data={data}
                loading={[
                  NetworkStatus.loading,
                  NetworkStatus.setVariables,
                ].includes(networkStatus)}
                rowsPerPage={rowsPerPage}
                onRowActionSelect={onRowActionSelect}
              />
            ) : (
              <DataGrid.Table
                loading={[
                  NetworkStatus.loading,
                  NetworkStatus.setVariables,
                ].includes(networkStatus)}
                columns={columns}
                rowsPerPage={rowsPerPage}
                keyExtractor={(item) => item._id}
                enableRowSelection
                noResultsMessageRowSpan={1}
              />
            )}
          </Infinite>
        </Stack>
        <BulkActionsPopover onBulkAction={onBulkAction} />
      </DataGrid.Provider>
    </SkeletonLoaderProvider>
  );
};
