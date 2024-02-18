import { Stack } from '@/layout';
import { BulkActionButton, type BulkActionButtonProps } from './BulkActionButton';
import {
  SelectedRowsCounter,
  type SelectedRowsCounterProps,
} from './SelectedRowsCounter';

type BulkActionProps = BulkActionButtonProps & {
  label: string;
  renderCounterLabel?: SelectedRowsCounterProps['render'];
};

export function BulkAction({
  label,
  renderCounterLabel,
  ...buttonProps
}: BulkActionProps) {
  return (
    <Stack gap={16} align="center">
      <SelectedRowsCounter render={renderCounterLabel} />
      <BulkActionButton secondary size="small" {...buttonProps}>
        {label}
      </BulkActionButton>
    </Stack>
  );
}
