import { FormProvider } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';
import { Spinner } from '@/components/Spinner';
import routes from '@/constants/routes';
import {
  ContractPreview,
  ContractPreviewHeader,
} from '@/features/contracts/components/ContractPreview';
import { DocumentSignaturePreview } from '@/features/contracts/components/DocumentSignaturePreview/DocumentSignaturePreview';
import { useToast } from '@/hooks';
import useScrollIntoElement from '@/hooks/useScrollIntoElement';
import SinglePageLayout, {
  FullHeightMain,
  ResponsiveMain,
} from '@/layout/SinglePageLayout';
import { ContractToolRoutes } from '@/features/contracts/utils/routes';
import { useNavigateWithOrigin } from '@/hooks/navigation';
import { ContractSigningHeader } from '@/features/contracts/components/ContractPreview/ContractSigningHeader';
import { downloadFileFromUrl } from '@/utils/file';
import { ContractUtils } from '@/features/contracts/utils/contract';
import { useContractPermissions } from '@/features/contracts/hooks/contractPermissions';
import { ContractSecretNoumAlertModal } from '@/features/contracts/components/ContractSecretNoumAlertModal/ContractSecretNoumAlertModal';
import S from './styles';
import { useContractPreviewScreen } from './useContractPreviewScreen';

export default function ContractPreviewScreen() {
  const { id } = useParams();
  const { addErrorToast } = useToast();
  const { scrollIntoElement } = useScrollIntoElement();

  const { goBackToOrigin } = useNavigateWithOrigin();
  const ContractPermissions = useContractPermissions();

  const {
    summary,
    signature,
    contract,
    previewStep,
    linkedSows,
    closeModal,
    modalType,
    contextData,
    changeStep,
    deleteContract,
    declineContract,
    duplicateContract,
    resendContract,
  } = useContractPreviewScreen({ id });

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
    (!contract && !summary.isLoading) ||
    (contract && !ContractPermissions.canSeeSummary(contract))
  ) {
    return <Navigate to={routes.NOT_FOUND} replace />;
  }

  if (previewStep === 'Summary') {
    return (
      <SinglePageLayout>
        <FormProvider {...summary.form}>
          <form
            onSubmit={summary.form.handleSubmit(
              summary.onSubmit,
              handleSubmitError,
            )}
          >
            <ContractPreviewHeader
              contract={contract}
              onConfirmDelete={deleteContract}
              onConfirmDecline={declineContract}
              onDuplicate={duplicateContract}
              onGoBackToList={goBackToList}
              onConfirmResend={resendContract}
            />
            <ResponsiveMain>
              {summary.isLoading ? (
                <Spinner />
              ) : contract ? (
                <ContractPreview
                  contract={contract}
                  linkedSows={linkedSows.data}
                  isLoadingLinkedSows={linkedSows.loading}
                />
              ) : null}
            </ResponsiveMain>
          </form>

          <ContractSecretNoumAlertModal
            isOpenModal={modalType === 'secretNoumAlert'}
            onClose={closeModal}
            isUnauthenticated={!!contextData?.isUnauthenticated}
          />
        </FormProvider>
      </SinglePageLayout>
    );
  }

  if (previewStep === 'ConfirmSignature') {
    return (
      <SinglePageLayout>
        <FullHeightMain>
          <ContractSigningHeader
            title="Check your Contract before signing"
            onGoBack={handleGoBackToSummary}
            contract={contract}
            onDownloadPdf={() => {
              if (!contract || !signature.pdfWithSignature) {
                return;
              }
              downloadFileFromUrl(
                signature.pdfWithSignature,
                'application/json',
                ContractUtils.formatPdfFileName(contract),
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
