import { useTranslation } from 'react-i18next';
import {
  SelectField,
  type SelectFieldProps,
} from '@/components/SelectField/SelectField';
import { DocumentType } from '@/features/contracts/types';

type DocumentTypeFilterFieldProps = Pick<
  SelectFieldProps<DocumentType, DocumentType>,
  'value'
> & {
  onChange(newValue: DocumentType): void;
};

export function DocumentTypeFilterField({
  value,
  onChange,
}: DocumentTypeFilterFieldProps) {
  const { t } = useTranslation();

  return (
    <SelectField<DocumentType, DocumentType>
      inputSize="small"
      label="Type"
      value={value}
      searchable={false}
      options={[
        {
          key: DocumentType.Contract,
          value: DocumentType.Contract,
          label: t('noumena.contract_manager.filters.document_type.contracts'),
          type: 'value',
        },
        {
          key: DocumentType.Sow,
          value: DocumentType.Sow,
          label: t(
            'noumena.contract_manager.filters.document_type.statements_of_work',
          ),
          type: 'value',
        },
      ]}
      onChange={(option) => onChange(option.key)}
    />
  );
}
