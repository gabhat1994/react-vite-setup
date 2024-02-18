import { debounce } from 'lodash';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NoumContactStatus } from '@/apollo/generated/types';
import { useAllNoumsContactsQuery } from '@/apollo/graphql';
import { type SelectedContact } from '@/features/noumContacts/types';
import { useToast } from '@/hooks';
import { mergeListsForCache } from '@/utils/apollo';
import { useContactSelectorHandlers } from './useContactSelectorHandlers';

interface UseContactSelectorOptions {
  noumId?: string;
  onChange: (
    value: string | null | undefined,
    item: SelectedContact | null,
  ) => void;
  onCreateNew: () => void;
  onAddSuccess: (contact: SelectedContact) => void;
  onEditSuccess: (contact: SelectedContact) => void;
}

export function useContactSelector({
  noumId,
  onChange,
  onCreateNew,
  onAddSuccess,
  onEditSuccess,
}: UseContactSelectorOptions) {
  const { t } = useTranslation();
  const { addSuccessIconToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const { data, loading, refetch, fetchMore, variables } =
    useAllNoumsContactsQuery({
      variables: {
        offset: 0,
        limit: 20,
        status: NoumContactStatus.Active,
        query: searchTerm || null,
      },
      skip: !noumId,
      fetchPolicy: 'cache-and-network',
    });

  const currentCount = data?.allNoumsContacts.data.length ?? 0;
  const totalCount = data?.allNoumsContacts.count ?? 0;

  const debouncedSearch = useMemo(
    () =>
      debounce((newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
      }, 500),
    [],
  );

  const handleFetchMore = () => {
    if (currentCount >= totalCount) {
      return;
    }
    fetchMore({
      variables: {
        ...variables,
        offset: currentCount,
      },
      updateQuery(prevResult, { fetchMoreResult }) {
        // Handle infinite scroll explicitly, because this query has type policy configured for possible pagination.
        return {
          ...prevResult,
          allNoumsContacts: {
            ...prevResult.allNoumsContacts,
            count: fetchMoreResult.allNoumsContacts.count,
            data: mergeListsForCache(
              prevResult.allNoumsContacts.data,
              fetchMoreResult.allNoumsContacts.data,
              currentCount,
            ),
          },
        };
      },
    });
  };

  const refreshList = () => {
    // From the user perspective, it won't matter when it happens.
    // From our perspective, we want to eventually update cache with real data instead of relying on optimistic UI from cache.
    setTimeout(() => refetch(), 5000);
  };

  const { handleChange, handleAddFormSubmit, handleEditFormSubmit } =
    useContactSelectorHandlers({
      noumId,
      onChange: (value, item) => {
        onChange(value, item);
      },
      onCreateNew,
      onAddSuccess: (contact) => {
        refreshList();
        addSuccessIconToast(
          t('noumena.noum_contacts.contact_selector.toast.contact_added'),
        );
        onAddSuccess(contact);
      },
      onEditSuccess: (contact) => {
        refreshList();
        addSuccessIconToast(
          t('noumena.noum_contacts.contact_selector.toast.contact_updated'),
        );
        onEditSuccess(contact);
      },
    });

  return {
    data: data?.allNoumsContacts.data,
    loading,
    searchTerm,
    debouncedSearch,
    handleFetchMore,
    handleChange,
    handleAddFormSubmit,
    handleEditFormSubmit,
    setSearchTerm,
  };
}
