import { reach } from 'yup';
import { Controller } from 'react-hook-form';
import { useState } from 'react';
import { CreateEditPreview } from '@/components/FieldArrayWizard/CreateEditPreview';
import {
  statementOfWorkFormSchema,
  type StatementOfWorkFormValues,
} from '@/features/contracts/hooks/statementOfWorkForm';
import { Stack, StackItem } from '@/layout';
import { TextField } from '@/components/TextField';
import { DatePicker } from '@/components/DatePicker';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { type CreateEditOptions } from '@/components/FieldArrayWizard/shared/types';
import { TextArea } from '@/components/TextArea';

const schema = reach(statementOfWorkFormSchema, 'deliverables.0');

export function EditMode({
  values,
  index,
}: CreateEditOptions<StatementOfWorkFormValues, 'deliverables'>) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(
    !!values.description,
  );

  return (
    <CreateEditPreview.EditMode schema={schema} values={values}>
      {({ control, setValue }) => (
        <>
          <CreateEditPreview.FormMainRow index={index}>
            <StackItem grow>
              <Stack gap={16}>
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <TextField
                      placeholder="Deliverable Name"
                      inputSize="small"
                      {...field}
                      error={!!fieldState.error}
                    />
                  )}
                />
                <StackItem shrink={0}>
                  <Controller
                    control={control}
                    name="dueDate"
                    render={({ field: { ref, ...fieldProps }, fieldState }) => (
                      <DatePicker
                        size="small"
                        label="Due Date (optional)"
                        placeholder="MM/DD/YYYY"
                        {...fieldProps}
                        onChange={(newValue) =>
                          fieldProps.onChange(newValue ?? null)
                        }
                        error={!!fieldState.error}
                      />
                    )}
                  />
                </StackItem>
              </Stack>
            </StackItem>
          </CreateEditPreview.FormMainRow>

          <Controller
            control={control}
            name="description"
            render={({ field }) =>
              isDescriptionVisible ? (
                <StackItem grow>
                  <TextArea
                    placeholder="Description"
                    maxLength={300}
                    autoResize
                    {...field}
                  />
                </StackItem>
              ) : (
                <></>
              )
            }
          />

          <CreateEditPreview.FormFooter index={index}>
            {isDescriptionVisible ? (
              <Button
                textOnly
                size="small"
                leftIcon={<Icon name="close_m" size={24} />}
                onClick={() => {
                  setIsDescriptionVisible(false);
                  setValue('description', '');
                }}
              >
                Remove description
              </Button>
            ) : (
              <Button
                textOnly
                size="small"
                leftIcon={<Icon name="edit_m" size={24} />}
                onClick={() => {
                  setIsDescriptionVisible(true);
                }}
              >
                Add description{' '}
                <TSpan colorToken="--text-body-neutral-default">
                  (optional)
                </TSpan>
              </Button>
            )}
          </CreateEditPreview.FormFooter>
        </>
      )}
    </CreateEditPreview.EditMode>
  );
}
