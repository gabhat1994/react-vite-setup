import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { type SearchableNoumContactFragment } from '@/apollo/graphql';
import { Avatar } from '@/components/Avatar/Avatar';
import { DataGrid } from '@/components/DataGrid';
import { type PaginationProps } from '@/components/DataGrid/Pagination';
import { type TableColumn } from '@/components/DataGrid/Table/Table';
import { TSpan } from '@/components/Typography';
import { ContactDetailsUtils } from '@/features/noumContacts/utils/contactDetails';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Stack } from '@/layout';
import { ApiPayloadParser } from '@/utils/api/payloadParser';
import { formatDateString } from '@/utils/getTimeStampForDisplaying';
import { UserUtil } from '@/utils/user';
import { ActionMenu } from './ActionMenu';
import { ContactsCollapsibleList } from './ContactsCollapsibleList';
import { type Filters, ListPOV } from './types';

interface ContactsListProps {
  contacts: SearchableNoumContactFragment[];
  totalCount: number;
  offset: number;
  filters: Filters;
  listPerspective: ListPOV;
  loading?: boolean;
  onPaginationChange: PaginationProps['onChange'];
  onEdit: (contact: SearchableNoumContactFragment) => void;
  onArchive: (ids: string[]) => void;
  onUnarchive: (ids: string[]) => void;
}

export function ContactsList({
  contacts,
  totalCount,
  offset,
  filters,
  listPerspective,
  loading,
  onPaginationChange,
  onEdit,
  onArchive,
  onUnarchive,
}: ContactsListProps) {
  const { t } = useTranslation();
  const { isMobile } = useBreakpoints();

  const columns = useMemo<TableColumn<SearchableNoumContactFragment>[]>(
    () => [
      {
        id: 'name',
        title: 'Name',
        width: '25%',
        renderValue: (item) => (
          <Stack align="center" gap={8}>
            <Avatar size="M" url={UserUtil.getProfilePicture(item.user)} />
            <Stack vertical>
              <TSpan
                font="body-m-bold"
                color="--text-tablecell-header-neutral-highlighted"
              >
                {item.displayName}
              </TSpan>
              <TSpan
                font="body-m"
                colorToken="--text-tablecell-header-neutral-default"
              >
                {item.user.email}
              </TSpan>
            </Stack>
          </Stack>
        ),
      },
      {
        id: 'title',
        title: 'Title',
        renderValue: (item) => item.title ?? '-',
        width: '15%',
      },
      {
        id: 'company',
        title: 'Company',
        renderValue: (item) => item.companyName ?? '-',
        width: '15%',
      },
      {
        id: 'billingDetails',
        title: 'Contact / Billing Details',
        renderValue: (item) => ContactDetailsUtils.formatAddress(item),
        width: '25%',
      },
      {
        id: 'added',
        title: 'Added',
        renderValue: (item) =>
          formatDateString(ApiPayloadParser.parseDateString(item.createdAt)),
        width: '15%',
        wordWrap: false,
      },

      {
        id: 'actions',
        title: '',
        renderValue: (item) => (
          <Stack justify="end">
            <ActionMenu
              contact={item}
              onEdit={onEdit}
              onArchive={(id) => onArchive([id])}
              onUnarchive={(id) => onUnarchive([id])}
            />
          </Stack>
        ),
        width: '5%',
      },
    ],
    [onEdit, onArchive, onUnarchive],
  );

  return (
    <>
      <Stack gap={24} vertical fullWidth align="stretch" padding="0 0 64px 0">
        {isMobile ? (
          <ContactsCollapsibleList
            onArchive={(id) => onArchive([id])}
            onUnarchive={(id) => onUnarchive([id])}
            onEdit={onEdit}
            contacts={contacts}
            loading={loading}
          />
        ) : (
          <DataGrid.Table<SearchableNoumContactFragment>
            keyExtractor={(item) => item._id ?? ''}
            data={contacts}
            columns={columns}
            rowsPerPage={5}
            loading={loading}
            enableRowSelection
            wordWrap
          />
        )}
        <DataGrid.Footer
          leftElement={
            <DataGrid.Pagination
              totalCount={totalCount}
              itemsPerPage={filters.limit}
              currentOffset={offset}
              onChange={onPaginationChange}
            />
          }
          rightElement={
            <DataGrid.BulkAction
              intent="negative"
              label={
                listPerspective === ListPOV.ACHIVED ? 'Unarchive' : 'Archive'
              }
              onClick={(selectedItems) =>
                listPerspective === ListPOV.ACHIVED
                  ? onUnarchive(selectedItems)
                  : onArchive(selectedItems)
              }
              renderCounterLabel={(selectedItemsCount) =>
                t('noumena.contact_manager.rows_selected', {
                  count: selectedItemsCount,
                  postProcess: 'interval',
                })
              }
            />
          }
        />
      </Stack>
    </>
  );
}
