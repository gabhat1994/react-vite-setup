import { Button } from '@/components/Button';
import { DataGrid } from '@/components/DataGrid';
import { Icon } from '@/components/Icon';
import { TextField } from '@/components/TextField';
import { RolesInfoModal } from '@/features/noums/components/RolesInfoModal';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { Stack } from '@/layout';
import { type NoumMembersListQueryFilters } from '../../filters';
import MembersMobileActions from '../../MembersMobileActions';
import ManageMembersFilterModal from '../../ManageMembersFilterModal';

type ModalType = 'roles-info' | 'members-filter';
type MobileFiltersType = {
  onInviteMembers(): void;
};
export const MobileFilters = ({ onInviteMembers }: MobileFiltersType) => {
  const { modalType, openModal, closeModal } = useModalManager<ModalType>();

  return (
    <>
      <Stack gap={16} justify="space-between" fullWidth>
        <Stack gap={16} justify="flex-start">
          <Button
            size="small"
            tertiary
            leftIcon={<Icon name="info_m" size={24} />}
            onClick={() => openModal('roles-info')}
          >
            Roles
          </Button>
        </Stack>
        <Stack gap={16} justify="flex-start">
          <DataGrid.FilterInput<NoumMembersListQueryFilters, 'search'>
            name="search"
            render={({ field: { value, onChange } }) => (
              <TextField
                inputSize="small"
                placeholder="Search..."
                value={value}
                onChange={onChange}
                leftIcon={
                  <Icon
                    name="search_m"
                    size={24}
                    color="--icon-input-neutral-default"
                  />
                }
              />
            )}
          />
        </Stack>
      </Stack>
      <RolesInfoModal
        isOpen={modalType === 'roles-info'}
        onClose={closeModal}
      />
      <MembersMobileActions
        onToggleFilter={() => openModal('members-filter')}
        inviteMembers={onInviteMembers}
      />

      <ManageMembersFilterModal
        isOpen={modalType === 'members-filter'}
        onClose={closeModal}
      />
    </>
  );
};
