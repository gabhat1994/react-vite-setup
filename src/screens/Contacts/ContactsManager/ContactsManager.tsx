import { debounce } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { DataGrid } from '@/components/DataGrid';
import { Stack } from '@/layout';
import ListLayout from '@/layout/ListLayout';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { ContactFormModal } from '@/features/noumContacts/components/ContactFormModal';
import {
  type SearchableNoumContactFragment,
  useAllNoumsContactsQuery,
} from '@/apollo/graphql';
import { NoumContactStatus } from '@/apollo/generated/types';
import { type PaginationState } from '@/components/DataGrid/Pagination';
import { cleanList } from '@/utils/list';
import { type NoumContactFormValues } from '@/features/noumContacts/hooks/contactForm';
import { useContactsManager } from './hooks/useContactsManager';
import { ContactsList } from './ContactsList';
import { ContactsManagerUtils } from './utils';
import { type Filters, ListPOV } from './types';
import S from './styles';
import { ListHeader } from './ListHeader';

type ModalType = 'create' | 'edit';

export function ContactsManager() {
  const [filters, setFilters] = useState<Filters>(
    ContactsManagerUtils.getDefaultFilterValues(),
  );
  const [offset, setOffset] = useState(0);

  const { modalType, openModal, closeModal, contextData } = useModalManager<
    ModalType,
    SearchableNoumContactFragment
  >();

  const { data, loading, fetchMore, refetch } = useAllNoumsContactsQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: filters.limit,
      offset,
      query: filters.search,
      status:
        filters.perspective === ListPOV.ACTIVE
          ? NoumContactStatus.Active
          : NoumContactStatus.Archived,
    },
  });

  const {
    handleAddContact,
    handleEditContact,
    handleArchiveContacts,
    handleUnarchiveContacts,
  } = useContactsManager({
    contact: contextData,
    onSuccess: () => {
      closeModal();
      setTimeout(refetch, 3000);
    },
  });

  const contacts = useMemo(
    () =>
      // temporary solution to not refetch a backend as it returns not up to date data.
      // remove this once BE is refactored to search engine.
      cleanList(data?.allNoumsContacts.data).filter((contact) => {
        if (filters.perspective === ListPOV.ACTIVE) {
          return contact.status === NoumContactStatus.Active;
        }
        return contact.status === NoumContactStatus.Archived;
      }),
    [data?.allNoumsContacts.data, filters.perspective],
  );
  const totalCount = data?.allNoumsContacts.count ?? 0;

  const submitFilters = useMemo(
    () =>
      debounce((newFilters: Filters) => {
        setOffset(0);
        setFilters(newFilters);
      }, 1000),
    [],
  );

  const handelCreateNew = () => {
    openModal('create');
  };

  const handleEdit = (contact: SearchableNoumContactFragment) => {
    openModal('edit', contact);
  };

  const handleAdd = async (contact: NoumContactFormValues) => {
    await handleAddContact(contact);
    // BE data seems to be synced after a while.
    setTimeout(() => refetch(), 2000);
  };

  const handlePaginationChange = (state: PaginationState) => {
    fetchMore({
      variables: {
        offset: state.offset,
      },
    });
    setOffset(state.offset);
  };

  const handleArchive = useCallback(
    (ids: string[]) => {
      handleArchiveContacts(ids);
    },
    [handleArchiveContacts],
  );

  const handleUnarchive = useCallback(
    (ids: string[]) => {
      handleUnarchiveContacts(ids);
    },
    [handleUnarchiveContacts],
  );

  return (
    <>
      <ListLayout type="Contacts">
        <Stack gap={24}>
          <S.PageCard>
            <DataGrid.Provider<SearchableNoumContactFragment> data={contacts}>
              <Stack vertical align="stretch">
                <DataGrid.Filters<Filters>
                  defaultValues={filters}
                  onSubmit={submitFilters}
                  clearRowSelectionOnSubmit
                >
                  <ListHeader handelCreateNew={handelCreateNew} />
                </DataGrid.Filters>

                <ContactsList
                  offset={offset}
                  filters={filters}
                  listPerspective={filters.perspective}
                  loading={loading}
                  contacts={contacts}
                  totalCount={totalCount}
                  onPaginationChange={handlePaginationChange}
                  onEdit={handleEdit}
                  onArchive={handleArchive}
                  onUnarchive={handleUnarchive}
                />
              </Stack>
            </DataGrid.Provider>
          </S.PageCard>
        </Stack>
      </ListLayout>

      {modalType === 'create' && (
        <ContactFormModal
          isOpenModal
          onClose={closeModal}
          onConfirm={handleAdd}
        />
      )}

      {modalType === 'edit' && contextData && (
        <ContactFormModal
          isOpenModal
          contact={contextData}
          onClose={closeModal}
          onConfirm={handleEditContact}
        />
      )}
    </>
  );
}
