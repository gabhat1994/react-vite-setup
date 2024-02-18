import { type FieldArrayWithId } from 'react-hook-form';
import { CreateEditPreview } from '@/components/FieldArrayWizard/CreateEditPreview';
import { TSpan } from '@/components/Typography';
import { type StatementOfWorkFormValues } from '@/features/contracts/hooks/statementOfWorkForm';
import { Stack, StackItem } from '@/layout';
import { formatDateString } from '@/utils/getTimeStampForDisplaying';

type Values = FieldArrayWithId<StatementOfWorkFormValues, 'milestones'>;

interface PreviewModeProps {
  values: Values;
  index: number;
}

export function PreviewMode({ values, index }: PreviewModeProps) {
  return (
    <CreateEditPreview.PreviewMainRow displayLineNumbers index={index}>
      <StackItem grow>
        <Stack gap={16} align="center">
          <Stack gap={4} vertical align="stretch" grow>
            <TSpan font="body-m">{values.name}</TSpan>
            {values.description && (
              <TSpan font="footnote" colorToken="--text-card-neutral-default">
                {values.description}
              </TSpan>
            )}
          </Stack>
          <Stack gap={8} shrink={0}>
            <TSpan font="body-m-bold">Delivery Date:</TSpan>
            <TSpan font="body-m">{formatDateString(values.dueDate)}</TSpan>
          </Stack>
        </Stack>
      </StackItem>
    </CreateEditPreview.PreviewMainRow>
  );
}
