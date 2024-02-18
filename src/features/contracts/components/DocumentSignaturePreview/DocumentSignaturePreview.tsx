import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';

import {
  type DocumentPreviewSignatureFormValues,
  useDocumentPreviewSignatureFormContext,
} from '../../hooks/documentPreviewSignatureForm';
import { AgreementCheckbox } from '../AgreementCheckbox/AgreementCheckbox';
import { DocumentPdfFullPreview } from '../DocumentPdfFullPreview/DocumentPdfFullPreview';
import { Section } from '../Section/Section';
import S from './styles';

interface DocumentSignaturePreviewProps {
  pdfData: string | undefined;
  isLoading: boolean;
  onGoBack(): void;
}

export function DocumentSignaturePreview({
  pdfData,
  isLoading,
  onGoBack,
}: DocumentSignaturePreviewProps) {
  const { t } = useTranslation();

  const {
    formState: { isSubmitted, isValid, isDirty },
  } = useDocumentPreviewSignatureFormContext();

  const hasAgreementsError = isSubmitted && !isValid;
  const canSubmit = isDirty && isValid;

  return (
    <>
      <S.PdfPreview>
        <DocumentPdfFullPreview data={pdfData} isLoading={isLoading} />
      </S.PdfPreview>

      <S.AgreementsPanel>
        <Section variant="main" title="Agreements" hasSeparator>
          <Stack gap={16} align="stretch" vertical fullWidth>
            <AgreementCheckbox<DocumentPreviewSignatureFormValues>
              name="documentContentsChecked"
              label={t(
                'noumena.contracts_document_signature_preview.document_contents_checked.label',
              )}
            />
            <AgreementCheckbox<DocumentPreviewSignatureFormValues>
              name="validSignature"
              label={t(
                'noumena.contracts_document_signature_preview.valid_signature.label',
              )}
            />

            {hasAgreementsError && (
              <TSpan
                font="body-m"
                colorToken="--bg-button-danger-primary-default"
              >
                {t('noumena.contracts_document_preview.agreements.required')}
              </TSpan>
            )}
          </Stack>
        </Section>

        <Stack gap={16} align="stretch" vertical fullWidth>
          <Button
            primary
            intent="positive"
            type="submit"
            softDisabled={!canSubmit}
          >
            {t(
              'noumena.contracts_document_signature_preview.cta.confirm_and_sign',
            )}
          </Button>
          <Button tertiary onClick={onGoBack}>
            {t('noumena.contracts_document_signature_preview.cta.go_back')}
          </Button>
        </Stack>
      </S.AgreementsPanel>
    </>
  );
}
