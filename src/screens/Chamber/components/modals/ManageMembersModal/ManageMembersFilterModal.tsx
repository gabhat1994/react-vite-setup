import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@/components/ExtendedModal';
import { Button } from '@/components/Button';
import { t } from 'i18next';
import { MultiselectList } from '@/screens/Chamber/components/modals/ManageMembersModal/Components/MultiselectList';
import { DataGrid } from '@/components/DataGrid';
import {
  type NoumMembersListQueryFilters,
  useNoumMembersListFilters,
} from './filters';

type ManageMembersFilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ManageMembersFilterModal: React.FC<ManageMembersFilterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { statuses, roles } = useNoumMembersListFilters();

  return (
    <Modal
      open={isOpen}
      isFullScreen
      enableCloseButton
      onClose={onClose}
      disableBackdropClick
    >
      <ModalHeader isFullScreen justifyContent="flex-start">
        {t('noumena.manage_members_filtering')}
      </ModalHeader>
      <ModalBody maxHeight="unset">
        <DataGrid.FilterInput<NoumMembersListQueryFilters, 'statuses'>
          name="statuses"
          render={({ field: { value, onChange } }) => (
            <MultiselectList
              label="Status"
              options={statuses.options}
              value={value ?? statuses.allValues}
              onChange={onChange}
              onSubmit={onClose}
            />
          )}
        />
        <DataGrid.FilterInput<NoumMembersListQueryFilters, 'roleIDs'>
          name="roleIDs"
          render={({ field: { value, onChange } }) => (
            <MultiselectList
              label="Roles"
              options={roles.options}
              value={value ?? roles.allValues}
              onChange={onChange}
              onSubmit={onClose}
            />
          )}
        />
      </ModalBody>
      <ModalFooter justifyContent="center">
        <Button onClick={onClose} primary size="full">
          {t(`noumena.manage_members.close`)}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ManageMembersFilterModal;
