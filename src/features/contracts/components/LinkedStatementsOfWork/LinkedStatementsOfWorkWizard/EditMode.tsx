import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ApiEntityPickerFieldWithLocalSearch } from '@/components/ApiEntityPickerField';
import { ApiEntitySelectionPreviewComponent } from '@/components/ApiEntityPickerField/ApiEntitySelectionPreviewComponent';
import { type DropdownValueType } from '@/components/Dropdown';
import { InlineEdit } from '@/components/FieldArrayWizard/InlineEdit';
import { type CreateEditOptions } from '@/components/FieldArrayWizard/shared/types';
import { type ContractFormValues } from '@/features/contracts/hooks/contractForm';
import { StackItem } from '@/layout';
import { useFieldArrayWizardFormContext } from '@/components/FieldArrayWizard/shared/context';
import { DocumentStatusTag } from '../../DocumentStatusTag/DocumentStatusTag';
import { type LinkedStatementOfWorkItem } from '../types';

type EditModeProps = CreateEditOptions<
  ContractFormValues,
  'linkedStatementsOfWork'
> & {
  options: DropdownValueType<LinkedStatementOfWorkItem, string>[];
};

export function EditMode({ index, fieldNamePrefix, options }: EditModeProps) {
  const { t } = useTranslation();

  const { watch } = useFormContext<ContractFormValues>();
  const { deleteItem } = useFieldArrayWizardFormContext<
    ContractFormValues,
    'linkedStatementsOfWork'
  >();

  const fields = watch('linkedStatementsOfWork');

  // Need to keep the options list for each field to show the selected value correctly,
  // but also need to remove already used IDs from the list for new fields.
  const selectedIds = fields.map((field) => field.statementOfWorkId);
  const possibleOptionsLeft = options.filter(
    (option) => !selectedIds.includes(option.key),
  );

  return (
    <InlineEdit.EditMode<ContractFormValues>>
      {({ control }) => (
        <StackItem grow>
          <Controller
            control={control}
            name={`${fieldNamePrefix}statementOfWorkId`}
            render={({ field: { value, onChange } }) => (
              <ApiEntityPickerFieldWithLocalSearch<
                string,
                LinkedStatementOfWorkItem
              >
                autoFocus
                inputSize="small"
                options={value ? options : possibleOptionsLeft}
                value={value}
                placeholderText={t(
                  'noumena.contract_form.linked_statements_of_work.id.placeholder',
                )}
                onChange={(option) => {
                  onChange(option?.key);
                }}
                renderSelectionPreviewComponent={(props) => {
                  const optionValue = props.selectedOption?.value;
                  const shouldSoftDisable = !optionValue?.canEdit;

                  return (
                    <ApiEntitySelectionPreviewComponent
                      {...props}
                      inputSize="small"
                      softDisabled={shouldSoftDisable}
                      softDisabledReason={
                        shouldSoftDisable
                          ? t(
                              'noumena.contract_form.linked_statements_of_work.tooltip.editing_disabled',
                            )
                          : undefined
                      }
                      onChange={() => {
                        deleteItem(index);
                      }}
                      selectedRightSideOption={
                        optionValue && (
                          <DocumentStatusTag
                            status={optionValue.status}
                            size="small"
                          />
                        )
                      }
                    />
                  );
                }}
              />
            )}
          />
        </StackItem>
      )}
    </InlineEdit.EditMode>
  );
}
