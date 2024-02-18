import { Button } from '@/components/Button';
import { DataGrid } from '@/components/DataGrid';
import { Icon } from '@/components/Icon';
import { TextField } from '@/components/TextField';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import TabsForm from '@/components/Tabs/TabsForm';
import { type Filters, ListPOV } from './types';

type ListHeaderProps = {
  handelCreateNew: () => void;
};

export function ListHeader({ handelCreateNew }: ListHeaderProps) {
  const { isMobile } = useBreakpoints();

  return (
    <Stack gap={24} vertical align="stretch">
      <Stack gap={24} justify="space-between" align="center">
        <Stack fullWidth>
          <TSpan font="heading-xs-bold">Contacts</TSpan>
        </Stack>
        <Stack gap={8} justify="flex-end" align="center" fullWidth>
          <Stack fullWidth={isMobile}>
            <DataGrid.FilterInput<Filters, 'search'>
              name="search"
              render={({ field: { value, onChange } }) => (
                <TextField
                  inputSize="small"
                  value={value}
                  onChange={onChange}
                  placeholder="Search..."
                  leftIcon={
                    <Icon
                      name="search_m"
                      size={24}
                      color="--icon-input-neutral-default"
                    />
                  }
                  rightIcon={
                    !!value && (
                      <Icon
                        name="clear_m"
                        size={24}
                        color="--icon-input-brand-primary-default"
                        onClick={() => onChange('')}
                      />
                    )
                  }
                />
              )}
            />
          </Stack>
          {!isMobile && (
            <Button
              primary
              size="small"
              leftIcon={<Icon name="add_m" size={24} />}
              onClick={handelCreateNew}
            >
              Add a Contact
            </Button>
          )}
        </Stack>
      </Stack>

      <DataGrid.FilterInput<Filters, 'perspective'>
        name="perspective"
        render={({ field: { value, onChange } }) => (
          <TabsForm
            selectedId={value}
            mode="isUnderline"
            isWithoutImage
            fontSize="--font-body-medium-bold-size"
            onChange={(newTab) => onChange(newTab as ListPOV)}
            inputList={[
              {
                id: ListPOV.ACTIVE,
                name: 'active',
                text: 'Active',
                labelSize: 'small',
              },
              {
                id: ListPOV.ACHIVED,
                name: 'archived',
                text: 'Archived',
                labelSize: 'small',
              },
            ]}
          />
        )}
      />
    </Stack>
  );
}
