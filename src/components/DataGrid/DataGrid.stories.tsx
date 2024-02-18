/* eslint-disable no-console */
import { type Meta } from '@storybook/react';
import { Stack } from '@/layout';
import { Icon } from '../Icon';
import { SelectField } from '../SelectField';
import { TextField } from '../TextField';
import { DataGrid } from './index';
import {
  type Item,
  type QueryFilters,
  RoleEnum,
  StatusEnum,
  useFakePaginatedList,
} from './mockData';
import { type TableColumn } from './Table/Table';

export default {
  title: 'Atoms/DataGrid',
  component: StoryComponent,
  argTypes: {
    pagination: {
      control: 'boolean',
    },
    rowSelection: {
      control: 'boolean',
    },
    filters: {
      control: 'boolean',
    },
  },
} as Meta<typeof StoryComponent>;

const columns: TableColumn<Item>[] = [
  {
    id: 'firstName',
    renderValue: (item) => item.firstName,
    title: 'First Name',
    width: '30%',
  },
  {
    id: 'lastName',
    renderValue: (item) => item.lastName,
    title: 'Last Name',
    width: '30%',
  },
  {
    id: 'age',
    renderValue: (item) => item.age,
    title: 'Age',
    width: 'fit-contents',
  },
  {
    id: 'role',
    renderValue: (item) => item.role,
    title: 'Role',
    width: 'fit-contents',
  },
  {
    id: 'status',
    renderValue: (item) => item.status,
    title: 'Status',
    width: 'fit-contents',
  },
  {
    id: 'actions',
    renderValue: (item) => (
      <DataGrid.ActionsMenu<'view' | 'delete'>
        size="small"
        onClick={(value) => {
          if (value === 'view') {
            console.log('View', item.id);
          } else if (value === 'delete') {
            console.log('Delete', item.id);
          }
        }}
        menuOptions={[
          {
            key: 'view',
            value: 'view',
            label: 'View',
            iconName: 'eye_on_m',
          },
          {
            key: 'delete',
            value: 'delete',
            label: 'Delete',
            iconName: 'delete_m',
            intent: 'danger',
          },
        ]}
      />
    ),
    title: '',
    width: 'fit-contents',
  },
];

interface StoryComponentProps {
  pagination: boolean;
  rowSelection: boolean;
  filters: boolean;
}

function StoryComponent({
  pagination,
  rowSelection,
  filters,
}: StoryComponentProps) {
  const { data, fetchMore, refetch, variables } = useFakePaginatedList({
    initialVariables: {
      offset: 0,
      limit: 5,
    },
  });

  return (
    <DataGrid.Provider data={data.data}>
      <Stack gap={24} vertical align="stretch">
        {filters && (
          <DataGrid.Filters<QueryFilters>
            submitOnChange={true}
            defaultValues={{ search: '', role: 'ALL', status: 'ALL' }}
            onSubmit={(values) => refetch({ filters: values, offset: 0 })}
          >
            <Stack gap={16}>
              <DataGrid.FilterInput<QueryFilters, 'role'>
                name="role"
                render={({ field: { value, onChange } }) => (
                  <SelectField
                    inputSize="small"
                    label="Role"
                    onChange={(option) => onChange(option.value)}
                    value={value}
                    options={[
                      {
                        key: 'ALL',
                        label: 'All Roles',
                        type: 'value',
                        value: 'ALL',
                        selected: value === 'ALL',
                      },
                      ...Object.entries(RoleEnum).map(
                        ([roleName, roleValue]) => ({
                          key: roleValue,
                          value: roleValue,
                          label: roleName,
                          type: 'value' as const,
                          selected: value === roleValue,
                        }),
                      ),
                    ]}
                  />
                )}
              />
              <DataGrid.FilterInput<QueryFilters, 'status'>
                name="status"
                render={({ field: { value, onChange } }) => (
                  <SelectField
                    inputSize="small"
                    label="Status"
                    onChange={(option) => onChange(option.value)}
                    value={value}
                    options={[
                      {
                        key: 'ALL',
                        label: 'All Statuses',
                        type: 'value',
                        value: 'ALL',
                        selected: value === 'ALL',
                      },
                      ...Object.entries(StatusEnum).map(
                        ([roleName, roleValue]) => ({
                          key: roleValue,
                          value: roleValue,
                          label: roleName,
                          type: 'value' as const,
                          selected: value === roleValue,
                        }),
                      ),
                    ]}
                  />
                )}
              />
              <DataGrid.FilterInput<QueryFilters, 'search'>
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
          </DataGrid.Filters>
        )}

        <DataGrid.Table
          columns={columns}
          rowsPerPage={5}
          keyExtractor={(item) => item.id}
          enableRowSelection={rowSelection}
        />

        <DataGrid.Footer
          leftElement={
            pagination && (
              <DataGrid.Pagination
                totalCount={data.count ?? 0}
                currentOffset={variables?.offset}
                onChange={({ offset }) =>
                  fetchMore({
                    variables: { offset },
                  })
                }
              />
            )
          }
          rightElement={
            rowSelection && (
              <DataGrid.BulkAction
                label="Download"
                rightIcon={<Icon name="download_m" size={20} />}
                onClick={(selectedRows) => {
                  console.log({ selectedRows });
                }}
              />
            )
          }
        />
      </Stack>
    </DataGrid.Provider>
  );
}

export const Basic = {
  args: {
    pagination: false,
    rowSelection: false,
    filters: false,
  },
};

export const Pagination = {
  args: {
    pagination: true,
    rowSelection: false,
    filters: false,
  },
};

export const RowSelection = {
  args: {
    pagination: false,
    rowSelection: true,
    filters: false,
  },
};

export const Filters = {
  args: {
    pagination: false,
    rowSelection: false,
    filters: true,
  },
};

export const AllFeatures = {
  args: {
    pagination: true,
    rowSelection: true,
    filters: true,
  },
};
