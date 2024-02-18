import { DataGrid } from '@/components/DataGrid';
import { MultiselectField } from '@/components/MultiselectField';

import { Stack } from '@/layout';
import {
  useNoumMembersListFilters,
  type NoumMembersListQueryFilters,
} from '../../filters';
import { MobileFilters } from './MobileFilters';
import { TabletFilterStack } from './styles';

type TabletFiltersType = {
  onInviteMembers(): void;
};

export const TabletFilters = ({ onInviteMembers }: TabletFiltersType) => {
  const { statuses, roles } = useNoumMembersListFilters();

  return (
    <Stack vertical fullWidth gap={16} padding="0 16px">
      <MobileFilters onInviteMembers={onInviteMembers} />
      <TabletFilterStack fullWidth gap={16} padding={16}>
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
      </TabletFilterStack>
    </Stack>
  );
};
