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
import { getErrorProps } from '@/utils/forms';

export function EditMode({
  values,
  index,
}: CreateEditOptions<StatementOfWorkFormValues, 'milestones'>) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(
    !!values.description,
  );

  return (
    <CreateEditPreview.EditMode
      schema={reach(statementOfWorkFormSchema, 'milestones.0')}
      values={values}
    >
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
                      placeholder="Milestone Name"
                      inputSize="small"
                      {...field}
                      {...getErrorProps(fieldState)}
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
                        label="Delivery Date"
                        {...fieldProps}
                        {...getErrorProps(fieldState)}
                        required
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
