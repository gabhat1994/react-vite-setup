import { type ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { DocumentType } from '../../types';
import S from './styles';

type DocumentTypeTagProps = {
  type: DocumentType;
} & ComponentProps<typeof S.TypeTag>;

export function DocumentTypeTag({ type, ...rest }: DocumentTypeTagProps) {
  const { t } = useTranslation();

  switch (type) {
    case DocumentType.Contract:
      return null; // No tag for contracts
    case DocumentType.Sow:
      return (
        <S.TypeTag tertiary {...rest}>
          {t('noumena.contracts.document_type.statement_of_work')}
        </S.TypeTag>
      );
    default: {
      return null;
    }
  }
}
