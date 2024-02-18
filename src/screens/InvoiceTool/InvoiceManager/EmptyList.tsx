import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';

type EmptyListProps = {
  onCreateInvoice(): void;
};
export function EmptyList({ onCreateInvoice }: EmptyListProps) {
  return (
    <Stack fullWidth vertical>
      <TSpan font="heading-xs-bold">Invoice Manager</TSpan>

      <Stack fullWidth vertical align="center" gap={16}>
        <Icon name="invoice_m" size={96} />
        <TSpan font="body-l" colorToken="--text-placeholder-neutral-default">
          No invoices added or received yet.
        </TSpan>
        <Button
          secondary
          size="small"
          onClick={onCreateInvoice}
          leftIcon={<Icon name="add_m" size={24} />}
        >
          New Invoice
        </Button>
      </Stack>
    </Stack>
  );
}
