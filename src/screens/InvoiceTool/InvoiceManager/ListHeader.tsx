import { Button } from '@/components/Button';
import { DataGrid } from '@/components/DataGrid';
import { Icon } from '@/components/Icon';
import { TextField } from '@/components/TextField';
import { TSpan } from '@/components/Typography';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Stack } from '@/layout';
import { AmountFilterField } from './Filters/AmountFilterField';
import { CustomersFilterField } from './Filters/CustomersFilterField';
import { InvoiceDateRangeFilterField } from './Filters/DateRangePicker/InvoiceDateRangeFilterField';
import { InvoiceStatusFilterField } from './Filters/InvoiceStatusFilterField';
import { NoumFilterField } from './Filters/NoumFilterField';
import { TypeFilterField } from './Filters/TypeFilterField';
import { type Filters } from './types';

interface ListHeaderProps {
  onCreateInvoice: () => void;
  onFiltersChange: (values: Filters) => void;
}

export function ListHeader({
  onCreateInvoice,
  onFiltersChange,
}: ListHeaderProps) {
  const { isMobile } = useBreakpoints();

  return (
    <DataGrid.Filters<Filters>
      defaultValues={{
        search: '',
        status: [],
        noums: [],
        amountRange: {
          from: undefined,
          to: undefined,
        },
        dateRange: {
          from: undefined,
          to: undefined,
        },
        invoiceType: [],
        customers: [],
      }}
      onSubmit={onFiltersChange}
      clearRowSelectionOnSubmit
    >
      <Stack gap={24} vertical align="stretch">
        <Stack
          gap={24}
          justify="space-between"
          align={isMobile ? 'start' : 'center'}
          vertical={isMobile}
          fullWidth
        >
          <Stack fullWidth>
            <TSpan font="heading-xs-bold">Invoice Manager</TSpan>
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
                onClick={onCreateInvoice}
              >
                New Invoice
              </Button>
            )}
          </Stack>
        </Stack>

        <Stack gap={8} align="center" vertical={isMobile}>
          <Stack fullWidth>
            <DataGrid.FilterInput<Filters, 'status'>
              name="status"
              render={({ field: { value, onChange } }) => (
                <InvoiceStatusFilterField
                  value={value ?? []}
                  onChange={onChange}
                />
              )}
            />
          </Stack>
          <Stack fullWidth>
            <DataGrid.FilterInput<Filters, 'invoiceType'>
              name="invoiceType"
              render={({ field: { value, onChange } }) => (
                <TypeFilterField value={value ?? []} onChange={onChange} />
              )}
            />
          </Stack>

          <Stack fullWidth>
            <DataGrid.FilterInput<Filters, 'customers'>
              name="customers"
              render={({ field: { value, onChange } }) => (
                <CustomersFilterField value={value ?? []} onChange={onChange} />
              )}
            />
          </Stack>
        </Stack>

        <Stack gap={8} align="center" fullWidth vertical={isMobile}>
          <Stack fullWidth>
            <DataGrid.FilterInput<Filters, 'noums'>
              name="noums"
              render={({ field: { value, onChange } }) => (
                <NoumFilterField value={value ?? []} onChange={onChange} />
              )}
            />
          </Stack>
          <Stack fullWidth>
            <DataGrid.FilterInput<Filters, 'dateRange'>
              name="dateRange"
              render={({ field: { value, onChange } }) => (
                <InvoiceDateRangeFilterField
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Stack>
          <Stack fullWidth>
            <DataGrid.FilterInput<Filters, 'amountRange'>
              name="amountRange"
              render={({ field: { value, onChange } }) => (
                <AmountFilterField value={value} onChange={onChange} />
              )}
            />
          </Stack>
        </Stack>
      </Stack>
    </DataGrid.Filters>
  );
}
