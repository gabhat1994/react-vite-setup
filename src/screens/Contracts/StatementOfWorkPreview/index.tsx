import { FormProvider } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';
import { Spinner } from '@/components/Spinner';
import routes from '@/constants/routes';
import { DocumentSignaturePreview } from '@/features/contracts/components/DocumentSignaturePreview/DocumentSignaturePreview';
import {
  StatementOfWorkPreview,
  StatementOfWorkPreviewHeader,
} from '@/features/contracts/components/StatementOfWorkPreview';
import { useToast } from '@/hooks';
import useScrollIntoElement from '@/hooks/useScrollIntoElement';
import SinglePageLayout, {
  FullHeightMain,
  ResponsiveMain,
} from '@/layout/SinglePageLayout';
import { StatementOfWorkSigningHeader } from '@/features/contracts/components/StatementOfWorkPreview/StatementOfWorkSigningHeader';
import { ContractToolRoutes } from '@/features/contracts/utils/routes';
import { StatementOfWorkUtils } from '@/features/contracts/utils/statementOfWork';
import { useNavigateWithOrigin } from '@/hooks/navigation';
import { downloadFileFromUrl } from '@/utils/file';
import { useStatementOfWorkPermissions } from '@/features/contracts/hooks/statementOfWorkPermissions';
import S from './styles';
import { useStatementOfWorkPreviewScreen } from './useStatementOfWorkPreviewScreen';

function StatementOfWorkPreviewScreen() {
  const { id } = useParams();
  const { goBackToOrigin } = useNavigateWithOrigin();
  const { addErrorToast } = useToast();
  const { scrollIntoElement } = useScrollIntoElement();
  const StatementOfWorkPermissions = useStatementOfWorkPermissions();

  const {
    summary,
    signature,
    statementOfWork,
    previewStep,
    changeStep,
    deleteStatementOfWork,
    declineStatementOfWork,
    duplicateStatementOfWork,
    resendStatementOfWork,
  } = useStatementOfWorkPreviewScreen({ id });

  const goBackToList = () => {
    goBackToOrigin({ fallbackUrl: ContractToolRoutes.contractManager() });
  };

  const handleGoBackToSummary = () => {
    changeStep('Summary');
  };

  const handleSubmitError = () => {
    addErrorToast(
      'Please check all the agreements in the last section to continue.',
    );
    scrollIntoElement('agreements');
  };

  if (
    !id ||
    (!statementOfWork && !summary.isLoading) ||
    (statementOfWork &&
      !StatementOfWorkPermissions.canSeeSummary(statementOfWork))
  ) {
    return <Navigate to={routes.NOT_FOUND} replace />;
  }

  if (previewStep === 'Summary') {
    return (
      <SinglePageLayout>
        <form
          onSubmit={summary.form.handleSubmit(
            summary.onSubmit,
            handleSubmitError,
          )}
        >
          <FormProvider {...summary.form}>
            <StatementOfWorkPreviewHeader
              statementOfWork={statementOfWork}
              onConfirmDelete={deleteStatementOfWork}
              onConfirmDecline={declineStatementOfWork}
              onConfirmResend={resendStatementOfWork}
              onDuplicate={duplicateStatementOfWork}
              onGoBackToList={goBackToList}
            />

            <ResponsiveMain>
              {summary.isLoading ? (
                <Spinner />
              ) : statementOfWork ? (
                <StatementOfWorkPreview statementOfWork={statementOfWork} />
              ) : null}
            </ResponsiveMain>
          </FormProvider>
        </form>
      </SinglePageLayout>
    );
  }

  if (previewStep === 'ConfirmSignature') {
    return (
      <SinglePageLayout>
        <FullHeightMain>
          <StatementOfWorkSigningHeader
            title="Check your SOW before signing"
            onGoBack={handleGoBackToSummary}
            statementOfWork={statementOfWork}
            onDownloadPdf={() => {
              if (!statementOfWork || !signature.pdfWithSignature) {
                return;
              }
              downloadFileFromUrl(
                signature.pdfWithSignature,
                'application/json',
                StatementOfWorkUtils.formatPdfFileName(statementOfWork),
              );
            }}
          />
          <S.SignatureModalForm
            onSubmit={signature.form.handleSubmit(
              signature.onSubmit,
              handleSubmitError,
            )}
          >
            <FormProvider {...signature.form}>
              <DocumentSignaturePreview
                pdfData={signature.pdfWithSignature}
                isLoading={signature.isLoading}
                onGoBack={handleGoBackToSummary}
              />
            </FormProvider>
          </S.SignatureModalForm>
        </FullHeightMain>
      </SinglePageLayout>
    );
  }

  return <Navigate to={routes.NOT_FOUND} replace />;
}

export default StatementOfWorkPreviewScreen;
