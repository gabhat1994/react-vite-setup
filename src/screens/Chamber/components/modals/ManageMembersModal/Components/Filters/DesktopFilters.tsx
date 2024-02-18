import { Button } from '@/components/Button';
import { DataGrid } from '@/components/DataGrid';
import { Icon } from '@/components/Icon';
import { MultiselectField } from '@/components/MultiselectField';
import { TextField } from '@/components/TextField';
import { RolesInfoModal } from '@/features/noums/components/RolesInfoModal';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { Stack } from '@/layout';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { ButtonUtils } from '@/components/Button/utils';
import { useTranslation } from 'react-i18next';
import {
  useNoumMembersListFilters,
  type NoumMembersListQueryFilters,
} from '../../filters';

type ModalType = 'roles-info';

type DesktopFiltersType = {
  onInviteMembers(): void;
};

export const DesktopFilters = ({ onInviteMembers }: DesktopFiltersType) => {
  const { modalType, openModal, closeModal } = useModalManager<ModalType>();
  const { statuses, roles } = useNoumMembersListFilters();

  const { t } = useTranslation();
  const { isOwner } = useNoumContext();
  const { hasNoumPermission } = useNoumAuthorization();
  const hasInviteMembersPermission = hasNoumPermission('invite-users', isOwner);

  return (
    <>
      <Stack gap={16} justify="space-between" padding="0px">
        <Stack gap={16} justify="flex-start">
          <DataGrid.FilterInput<NoumMembersListQueryFilters, 'statuses'>
            name="statuses"
            render={({ field: { value, onChange } }) => (
              <MultiselectField
                inputSize="small"
                hideIcons
                label="Status"
                allOptionLabel="All"
                options={statuses.options}
                isLoading={statuses.loading}
                value={value ?? statuses.allValues}
                onChange={onChange}
                maxContainerHeight="500px"
                allSelectionStrategy="empty-means-none"
              />
            )}
          />
          <DataGrid.FilterInput<NoumMembersListQueryFilters, 'roleIDs'>
            name="roleIDs"
            render={({ field: { value, onChange } }) => (
              <MultiselectField
                inputSize="small"
                hideIcons
                label="Role"
                allOptionLabel="All"
                options={roles.options}
                isLoading={roles.loading}
                value={value ?? roles.allValues}
                onChange={onChange}
                maxContainerHeight="500px"
                allSelectionStrategy="empty-means-none"
              />
            )}
          />
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
          <Button
            size="small"
            secondary
            leftIcon={<Icon name="add_m" size={22} />}
            disabled={!hasInviteMembersPermission}
            {...ButtonUtils.getTooltipProps({
              message: t(
                'noumena.chamber.member_management.no_permission.invite_users',
              ),
              position: 'bottom-center',
              visible: !hasInviteMembersPermission,
            })}
            onClick={onInviteMembers}
          >
            Invite Members
          </Button>
        </Stack>
      </Stack>
      <RolesInfoModal
        isOpen={modalType === 'roles-info'}
        onClose={closeModal}
      />
    </>
  );
};
