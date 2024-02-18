import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  type SearchableNoumContactFragment,
  useArchiveNoumContactsMutation,
  useUnarchiveNoumContactsMutation,
} from '@/apollo/graphql';
import {
  useAddNewNoumContact,
  useUpdateNoumContact,
} from '@/features/noumContacts/components/ContactSelector';
import { type NoumContactFormValues } from '@/features/noumContacts/hooks/contactForm';
import { useError, useToast } from '@/hooks';
import { NoumContactStatus } from '@/apollo/generated/types';
import { ContactsManagerUtils } from '../utils';

type UseContactsManagerOptions = {
  contact?: SearchableNoumContactFragment | null;
  onSuccess: () => void;
};
export function useContactsManager({
  contact,
  onSuccess,
}: UseContactsManagerOptions) {
  const { t } = useTranslation();

  const [archiveContactsMutation] = useArchiveNoumContactsMutation();
  const [unarchiveContactsMutation] = useUnarchiveNoumContactsMutation();
  const [addNewNoumContact] = useAddNewNoumContact();
  const [updateNoumContact] = useUpdateNoumContact();

  const { addSuccessIconToast } = useToast();
  const { logError } = useError();

  const handleEditContact = useCallback(
    async (values: NoumContactFormValues) => {
      if (!contact) {
        return;
      }

      try {
        const result = await updateNoumContact(contact._id, values);
        const updatedContact = result.data?.updateNoumContact;
        if (!updatedContact) {
          return;
        }

        addSuccessIconToast(
          t('noumena.noum_contacts.contact_selector.toast.contact_updated'),
        );
        onSuccess();
      } catch (err) {
        logError(err, 'edit_contact', true);
      }
    },
    [addSuccessIconToast, contact, logError, onSuccess, t, updateNoumContact],
  );

  const handleAddContact = useCallback(
    async (values: NoumContactFormValues) => {
      try {
        const result = await addNewNoumContact(values);
        const newContact = result.data?.addNewNoumContact;
        if (!newContact) {
          return;
        }

        addSuccessIconToast(
          t('noumena.noum_contacts.contact_selector.toast.contact_added'),
        );
        onSuccess();
      } catch (err) {
        logError(err, 'add_new_contact', true);
      }
    },
    [addNewNoumContact, addSuccessIconToast, logError, onSuccess, t],
  );

  const handleArchiveContacts = useCallback(
    async (ids: string[]) => {
      try {
        await archiveContactsMutation({
          variables: {
            contactIDs: ids,
          },
          update: (cache, result) => {
            ids.forEach((id) => {
              ContactsManagerUtils.updateSearchableNoumContactCacheFragment({
                cache,
                id,
                status: result.data?.archiveNoumContacts
                  ? NoumContactStatus.Archived
                  : NoumContactStatus.Active,
              });
            });
          },
        });
        addSuccessIconToast('Contact archived successfully');
      } catch (error) {
        logError(error, 'handleArchiveContact');
      }
    },
    [addSuccessIconToast, archiveContactsMutation, logError],
  );

  const handleUnarchiveContacts = useCallback(
    async (ids: string[]) => {
      try {
        await unarchiveContactsMutation({
          variables: {
            contactIDs: ids,
          },
          update: (cache, result) => {
            ids.forEach((id) => {
              ContactsManagerUtils.updateSearchableNoumContactCacheFragment({
                cache,
                id,
                status: result.data?.unarchiveNoumContacts
                  ? NoumContactStatus.Active
                  : NoumContactStatus.Archived,
              });
            });
          },
        });
        addSuccessIconToast('Contact unarchived successfully');
      } catch (error) {
        logError(error, 'handleArchiveContact');
      }
    },
    [addSuccessIconToast, logError, unarchiveContactsMutation],
  );

  return {
    handleEditContact,
    handleAddContact,
    handleArchiveContacts,
    handleUnarchiveContacts,
  };
}
