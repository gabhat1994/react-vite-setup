import { Controller, type FieldPathValue } from 'react-hook-form';
import { DatePicker } from '@/components/DatePicker';
import { InlineEdit } from '@/components/FieldArrayWizard/InlineEdit';
import { type CreateEditOptions } from '@/components/FieldArrayWizard/shared/types';
import { FormControl } from '@/components/FormControl';
import { TextField } from '@/components/TextField';
import { TSpan } from '@/components/Typography';
import {
  type StatementOfWorkFormValues,
  useStatementOfWorkFormContext,
} from '@/features/contracts/hooks/statementOfWorkForm';
import { Stack, StackItem } from '@/layout';
import { getErrorProps } from '@/utils/forms';
import { formatDateString } from '@/utils/getTimeStampForDisplaying';

export function EditMode({
  index,
  fieldNamePrefix,
}: CreateEditOptions<StatementOfWorkFormValues, 'fees.milestones'>) {
  const { watch } = useStatementOfWorkFormContext();

  const milestone = watch(`milestones.${index}`) as
    | FieldPathValue<StatementOfWorkFormValues, `milestones.0`>
    | undefined;

  return (
    <InlineEdit.EditMode>
      {({ control }) => (
        <>
          <InlineEdit.FormMainRow index={index} displayLineNumbers>
            <Stack gap={16} align="center" fullWidth>
              <StackItem grow={2}>
                <Stack gap={4} vertical fullWidth align="stretch">
                  {milestone?.name}
                  <TSpan
                    font="footnote"
                    colorToken="--text-card-neutral-default"
                  >
                    Delivery Date:{' '}
                    {milestone?.dueDate
                      ? formatDateString(milestone.dueDate)
                      : '--'}
                  </TSpan>
                </Stack>
              </StackItem>
              <StackItem grow={1}>
                <FormControl label="Amount:" horizontal>
                  <Stack gap={8} align="center">
                    <Controller
                      control={control}
                      name={`${fieldNamePrefix}amount`}
                      render={({
                        field: { ref, ...fieldProps },
                        fieldState,
                      }) => (
                        <TextField
                          inputSize="small"
                          numberOnly
                          isCurrency
                          {...fieldProps}
                          {...getErrorProps(fieldState)}
                        />
                      )}
                    />
                    <TSpan colorToken="--text-tablecell-header-neutral-default">
                      USD
                    </TSpan>
                  </Stack>
                </FormControl>
              </StackItem>
              <StackItem grow={1}>
                <FormControl label="Due:" horizontal>
                  <Controller
                    control={control}
                    name={`${fieldNamePrefix}dueDate`}
                    render={({ field: { ref, ...fieldProps }, fieldState }) => (
                      <DatePicker
                        size="small"
                        {...fieldProps}
                        {...getErrorProps(fieldState)}
                      />
                    )}
                  />
                </FormControl>
              </StackItem>
            </Stack>
          </InlineEdit.FormMainRow>
        </>
      )}
    </InlineEdit.EditMode>
  );
}
