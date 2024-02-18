import { DataGrid } from '@/components/DataGrid';
import { type DropdownValueType } from '@/components/Dropdown';
import { MultiselectField } from '@/components/MultiselectField';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { TextField } from '@/components/TextField';
import { type CampaignFilters } from './types';
import { FilterContainer, HeadingContainer, Heading, Actions } from './styles';

type CampaignHeaderProps = {
  hideFilters: boolean;
  onNewCampaign: () => void;
  statusOptions: DropdownValueType<string, string>[];
  noumsOptions: DropdownValueType<string, string>[];
};

export function CampaignHeader({
  hideFilters,
  onNewCampaign,
  statusOptions,
  noumsOptions,
}: CampaignHeaderProps) {
  return (
    <>
      <HeadingContainer
        vertical={hideFilters}
        align={hideFilters ? 'start' : 'center'}
        justify="space-between"
        gap={hideFilters ? 10 : undefined}
      >
        <Heading>Campaigns</Heading>
        <Actions>
          <DataGrid.FilterInput<CampaignFilters, 'search'>
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
          {!hideFilters && (
            <Button
              primary
              size="small"
              leftIcon={<Icon name="add_m" size={24} />}
              onClick={onNewCampaign}
            >
              New Campaign
            </Button>
          )}
        </Actions>
      </HeadingContainer>

      {!hideFilters && (
        <FilterContainer>
          <DataGrid.FilterInput<CampaignFilters, 'status'>
            name="status"
            render={({ field: { value, onChange } }) => (
              <MultiselectField<string, string>
                inputSize="small"
                value={value}
                options={statusOptions}
                label="Status"
                onChange={onChange}
                usePortal
                renderContainerFromBottom
              />
            )}
          />
          <DataGrid.FilterInput<CampaignFilters, 'noums'>
            name="noums"
            render={({ field: { value, onChange } }) => (
              <MultiselectField<string, string>
                leftIcon={
                  <Icon
                    name="search_m"
                    size={20}
                    color="--icon-input-neutral-default"
                  />
                }
                inputSize="small"
                value={value}
                options={noumsOptions}
                label="Noums"
                onChange={onChange}
                usePortal
                renderContainerFromBottom
                hideIcons={false}
                allOptionLabel="All Owned Noums"
              />
            )}
          />
        </FilterContainer>
      )}
    </>
  );
}
