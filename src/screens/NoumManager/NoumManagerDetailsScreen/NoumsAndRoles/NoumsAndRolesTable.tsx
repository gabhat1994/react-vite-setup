import { NoumMemberStatus } from '@/apollo/generated/types';
import {
  type InvoiceOutputFragment,
  type SpaceOutputFragment,
} from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import { TSpan, Tag } from '@/components';
import { Avatar } from '@/components/Avatar/Avatar';
import { DataGrid } from '@/components/DataGrid';
import { type PaginationProps } from '@/components/DataGrid/Pagination';
import { type TableColumn } from '@/components/DataGrid/Table/Table';
import { MemberRoleTag } from '@/features/noums/components/MemberRoleTag';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { Stack } from '@/layout';
import { UserUtil } from '@/utils/user';
import { compact } from 'lodash';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { type RowActionType } from './types';

type ModalType = 'some-modal';
interface NoumsAndRolesTableProps {
  offset: number;
  noum: Maybe<SpaceOutputFragment>;
  onRowActionSelect: (value: RowActionType, item: SpaceOutputFragment) => void;
  onPaginationChange: PaginationProps['onChange'];
}

export function NoumsAndRolesTable({
  offset,
  noum,
  onPaginationChange,
  onRowActionSelect,
}: NoumsAndRolesTableProps) {
  const noumsAndRoles: SpaceOutputFragment[] = [noum!];
  const totalCount = 0;

  useModalManager<ModalType, InvoiceOutputFragment>();

  const columns = useMemo<TableColumn<SpaceOutputFragment>[]>(
    () => [
      {
        id: 'noum',
        title: 'Noum',
        width: '30%',
        renderValue: (item) => (
          <Stack gap={8} align="center">
            <Avatar size="M" url={item?.uid?.profile?.profilePicture ?? ''} />

            <TSpan
              font="body-m-bold"
              colorToken="--text-tablecell-header-neutral-highlighted"
            >
              {UserUtil.renderFullName(item.uid)}
            </TSpan>
          </Stack>
        ),
      },
      {
        id: 'role',
        title: 'Role',
        width: '30%',
        renderValue: () => (
          <MemberRoleTag
            member={{
              _id: '0',
              role: { _id: '0', isManager: true, name: 'Test' },
              status: NoumMemberStatus.Connected,
              noumId: '0',
            }}
          />
        ),
      },
      {
        id: 'status',
        title: 'Status',
        width: '20%',
        renderValue: (item) => (
          <Tag success contentFont="footnote-bold" size="medium">
            {item?.status}
          </Tag>
        ),
      },
      {
        id: 'connected',
        title: 'Connected',
        width: '20%',
        renderValue: () => format(new Date(), 'dd/MM/yyyy, hh:mm a'),
      },
      {
        id: 'actions',
        title: '',
        renderValue: (item) => (
          <Stack justify="flex-end">
            <DataGrid.ActionsMenu<RowActionType>
              size="small"
              onClick={(value) => onRowActionSelect(value, item)}
              menuOptions={compact([
                {
                  key: 'edit_role',
                  value: 'edit_role',
                  label: 'Edit Role',
                  iconName: 'edit_m',
                },
                {
                  key: 'disconnect',
                  value: 'disconnect',
                  label: 'Disconnect',
                  iconName: 'close_m',
                  intent: 'danger',
                },
              ])}
            />
          </Stack>
        ),
      },
    ],
    [onRowActionSelect],
  );

  return (
    <>
      <Stack gap={24} vertical fullWidth align="stretch">
        <DataGrid.Table<SpaceOutputFragment>
          keyExtractor={(item) => item._id ?? ''}
          data={noumsAndRoles}
          columns={columns}
          rowsPerPage={5}
          loading={false}
          wordWrap
        />

        <DataGrid.Footer
          leftElement={
            <DataGrid.Pagination
              totalCount={totalCount}
              itemsPerPage={10}
              currentOffset={offset}
              onChange={onPaginationChange}
            />
          }
          rightElement={null}
        />
      </Stack>
    </>
  );
}
