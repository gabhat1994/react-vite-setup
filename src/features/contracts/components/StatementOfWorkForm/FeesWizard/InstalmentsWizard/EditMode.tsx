import { Controller } from 'react-hook-form';
import { DatePicker } from '@/components/DatePicker';
import { InlineEdit } from '@/components/FieldArrayWizard/InlineEdit';
import { FormControl } from '@/components/FormControl';
import { TextField } from '@/components/TextField';
import { TSpan } from '@/components/Typography';
import { Stack, StackItem } from '@/layout';
import { getErrorProps } from '@/utils/forms';
import { type CreateEditOptions } from '@/components/FieldArrayWizard/shared/types';
import { type StatementOfWorkFormValues } from '@/features/contracts/hooks/statementOfWorkForm';

export function EditMode({
  index,
  fieldNamePrefix,
}: CreateEditOptions<StatementOfWorkFormValues, 'fees.instalments'>) {
  return (
    <InlineEdit.EditMode>
      {({ control }) => (
        <>
          <InlineEdit.FormMainRow index={index} displayLineNumbers>
            <Stack gap={16} fullWidth>
              <StackItem grow={0}>
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
              <StackItem grow={0}>
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
          <InlineEdit.FormErrorMessage index={index} />
        </>
      )}
    </InlineEdit.EditMode>
  );
}
