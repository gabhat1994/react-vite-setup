import { type Maybe } from '@/apollo/generated/types';
import { type SearchableNoumContactFragment } from '@/apollo/graphql';
import {
  ApiEntityPickerFieldWithRemoteSearch,
  type ApiEntityPickerFieldProps,
} from '@/components/ApiEntityPickerField';
import { ApiEntitySelectionPreviewComponent } from '@/components/ApiEntityPickerField/ApiEntitySelectionPreviewComponent';
import { type ApiEntitySelectionPreviewComponentProps } from '@/components/ApiEntityPickerField/types';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { cleanList } from '@/utils/list';
import { type SearchableNoumContact, type SelectedContact } from '../../types';
import { ContactDetails } from '../ContactDetails/ContactDetails';
import { ContactFormModal } from '../ContactFormModal';
import { useContactSelector } from './hooks/useContactSelector';
import { useContactSelectorOptions } from './hooks/useContactSelectorOptions';
import { useContactSelectorValidation } from './hooks/useContactSelectorValidation';
import { mapToDropdownValue } from './mapper';

type ContactSelectorProps = Omit<
  ApiEntityPickerFieldProps<string, SearchableNoumContact | string>,
  'options' | 'onChange' | 'children' | 'preselectedOption'
> &
  Pick<
    ApiEntitySelectionPreviewComponentProps<string>,
    'clearButtonDisabled'
  > & {
    noumId?: string;
    preselectedContact?: Maybe<SearchableNoumContactFragment>;
    excludedIds?: string[];
    excludeCurrentUser?: boolean;
    addContactDisabled?: boolean;
    onChange: (
      value: string | null | undefined,
      item: SelectedContact | null,
    ) => void;
    onContactInfoValidation?(isValid: boolean): void;
    onContactDetailsUpdate?(contact: SelectedContact): void;
  };

type ModalType = 'create' | 'edit';

export function ContactSelector({
  noumId,
  disabled,
  value,
  excludedIds,
  excludeCurrentUser,
  preselectedContact,
  onChange,
  onContactInfoValidation,
  onContactDetailsUpdate,
  clearButtonDisabled,
  addContactDisabled,
  ...apiEntityPickerProps
}: ContactSelectorProps) {
  const { modalType, openModal, closeModal } = useModalManager<ModalType>();

  const {
    data,
    loading,
    searchTerm,
    debouncedSearch,
    handleChange,
    handleAddFormSubmit,
    handleEditFormSubmit,
    handleFetchMore,
    setSearchTerm,
  } = useContactSelector({
    noumId,
    onChange,
    onCreateNew: () => openModal('create'),
    onAddSuccess: (contact) => {
      onContactDetailsUpdate?.(contact);
      closeModal();
    },
    onEditSuccess: (contact) => {
      onContactDetailsUpdate?.(contact);
      closeModal();
    },
  });

  const { contacts, options, headerOptions } = useContactSelectorOptions({
    data,
    excludedIds,
    excludeCurrentUser,
    addContactDisabled,
  });

  const selectedContact = cleanList([...contacts, preselectedContact]).find(
    (c) => c._id === value,
  );

  const contactValidation = useContactSelectorValidation({
    selectedContact,
    onContactInfoValidation,
  });

  return (
    <>
      <ApiEntityPickerFieldWithRemoteSearch<
        string,
        SearchableNoumContact | string
      >
        {...apiEntityPickerProps}
        options={options}
        maxContainerHeight="350px"
        stickyHeaderOptions={headerOptions}
        renderStickyHeader={() => {}}
        hideIcons={false}
        isLoading={loading}
        disabled={disabled || !noumId}
        calRefTop={false}
        inputValue={searchTerm}
        onInputChange={debouncedSearch}
        onFetchMore={handleFetchMore}
        renderSelectionPreviewComponent={(renderProps) => (
          <ApiEntitySelectionPreviewComponent
            {...renderProps}
            inputSize="normal"
            clearButtonDisabled={clearButtonDisabled}
            onClear={() => setSearchTerm('')}
            selectedRightSideOption={
              disabled ? null : contactValidation.isValid ? (
                <Icon
                  name="edit_m"
                  size={24}
                  onClick={() => openModal('edit')}
                  color="--icon-input-neutral-default"
                />
              ) : (
                <Button primary size="small" onClick={() => openModal('edit')}>
                  Add Missing Details
                </Button>
              )
            }
          />
        )}
        preselectedOption={
          value && preselectedContact
            ? mapToDropdownValue(preselectedContact)
            : undefined
        }
        value={selectedContact?._id ?? ''}
        leftIcon={
          <Icon
            name="search_m"
            color="--icon-input-neutral-default"
            size={20}
          />
        }
        onChange={handleChange}
      />

      {selectedContact && (
        <ContactDetails
          contact={selectedContact}
          errors={contactValidation.errors}
        />
      )}

      {modalType === 'create' && (
        <ContactFormModal
          isOpenModal
          onClose={closeModal}
          onConfirm={handleAddFormSubmit}
        />
      )}

      {modalType === 'edit' && (
        <ContactFormModal
          isOpenModal
          contact={selectedContact}
          onClose={closeModal}
          onConfirm={(values) =>
            handleEditFormSubmit(selectedContact?._id, values)
          }
        />
      )}
    </>
  );
}
