import { type DropdownValueType } from '@/components/Dropdown';
import { type NoumContactFormValues } from '@/features/noumContacts/hooks/contactForm';
import {
  type SearchableNoumContact,
  type SelectedContact,
} from '@/features/noumContacts/types';
import { useError } from '@/hooks';
import { ADD_OPTION_VALUE } from '../constants';
import { mapToSelectedContact } from '../mapper';
import { useAddNewNoumContact } from './useAddNewNoumContact';
import { useUpdateNoumContact } from './useUpdateNoumContact';

interface UseContactSelectorHandlersOptions {
  noumId: string | undefined;
  onChange: (
    value: string | null | undefined,
    item: SelectedContact | null,
  ) => void;
  onCreateNew: () => void;
  onAddSuccess: (contact: SelectedContact) => void;
  onEditSuccess: (contact: SelectedContact) => void;
}

export function useContactSelectorHandlers({
  noumId,
  onChange,
  onCreateNew,
  onAddSuccess,
  onEditSuccess,
}: UseContactSelectorHandlersOptions) {
  const { logError } = useError();

  const [addNewNoumContact] = useAddNewNoumContact();
  const [updateNoumContact] = useUpdateNoumContact();

  const handleChange = (
    dropdownValue:
      | DropdownValueType<SearchableNoumContact | string, string>
      | undefined,
  ) => {
    if (!dropdownValue) {
      onChange('', null);
      return;
    }

    if (dropdownValue.key === ADD_OPTION_VALUE) {
      onCreateNew();
      return;
    }

    if (typeof dropdownValue.value !== 'string') {
      onChange(dropdownValue.key, mapToSelectedContact(dropdownValue.value));
    }
  };

  const handleAddFormSubmit = async (values: NoumContactFormValues) => {
    if (!noumId) {
      return;
    }

    try {
      const result = await addNewNoumContact(values);
      const newContact = result.data?.addNewNoumContact;
      if (!newContact) {
        return;
      }

      const newContactMapped = mapToSelectedContact(newContact);
      onChange(newContact._id, newContactMapped);
      onAddSuccess(newContactMapped);
    } catch (err) {
      logError(err, 'add_new_contact', true);
    }
  };

  const handleEditFormSubmit = async (
    id: string | undefined,
    values: NoumContactFormValues,
  ) => {
    if (!id) {
      return;
    }

    try {
      const result = await updateNoumContact(id, values);
      const updatedContact = result.data?.updateNoumContact;
      if (!updatedContact) {
        return;
      }

      const updatedContactMapped = mapToSelectedContact(updatedContact);
      onChange(updatedContact._id, updatedContactMapped);
      onEditSuccess(updatedContactMapped);
    } catch (err) {
      logError(err, 'edit_contact', true);
      throw err;
    }
  };
  return { handleChange, handleAddFormSubmit, handleEditFormSubmit };
}
