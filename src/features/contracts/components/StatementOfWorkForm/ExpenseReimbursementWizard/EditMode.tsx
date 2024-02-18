import { Controller } from 'react-hook-form';
import { InlineEdit } from '@/components/FieldArrayWizard/InlineEdit';
import { type CreateEditOptions } from '@/components/FieldArrayWizard/shared/types';
import { FormControl } from '@/components/FormControl';
import { TextField } from '@/components/TextField';
import { TSpan } from '@/components/Typography';
import { type StatementOfWorkFormValues } from '@/features/contracts/hooks/statementOfWorkForm';
import { Stack, StackItem } from '@/layout';
import { getErrorProps } from '@/utils/forms';

export function EditMode({
  index,
  fieldNamePrefix,
}: CreateEditOptions<StatementOfWorkFormValues, 'expenseReimbursement'>) {
  return (
    <InlineEdit.EditMode>
      {({ control }) => (
        <>
          <InlineEdit.FormMainRow index={index} displayLineNumbers>
            <Stack gap={16} fullWidth>
              <StackItem grow={3}>
                <Controller
                  control={control}
                  name={`${fieldNamePrefix}name`}
                  render={({ field, fieldState }) => (
                    <TextField
                      placeholder="Description"
                      inputSize="small"
                      {...field}
                      {...getErrorProps(fieldState)}
                    />
                  )}
                />
              </StackItem>
              <StackItem shrink={1}>
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
            </Stack>
          </InlineEdit.FormMainRow>
        </>
      )}
    </InlineEdit.EditMode>
  );
}
