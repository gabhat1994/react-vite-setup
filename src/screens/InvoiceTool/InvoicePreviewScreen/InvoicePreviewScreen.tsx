import {
  AllCurrencyEnum,
  InvoiceStatusEnum,
  type ProjectChamberType,
} from '@/apollo/generated/types';
import { Header } from '@/components/Header';
import { UnauthenticatedHeader } from '@/layout/UnauthenticatedHeader';
import { Spinner } from '@/components/Spinner';
import routes from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import DuplicateInvoiceModal from '@/features/invoices/components/DuplicateInvoiceModal/DuplicateInvoiceModal';
import InvoicePreviewDraftHeader from '@/features/invoices/components/InvoicePreviewHeaders/InvoicePreviewDraftHeader';
import InvoicePreviewHeader from '@/features/invoices/components/InvoicePreviewHeaders/InvoicePreviewHeader';
import InvoicePreviewIssuedHeader from '@/features/invoices/components/InvoicePreviewHeaders/InvoicePreviewIssuedHeader';
import UnauthenticatedUserHeaderButtons from '@/features/invoices/components/InvoicePreviewHeaders/UnauthenticatedUserHeaderButtons';
import InvoiceSecretNoumAlertModal from '@/features/invoices/components/InvoiceSecretNoumAlertModal/InvoiceSecretNoumAlertModal';
import InvoiceDetailsSection from '@/features/invoices/components/InvoiceSummary/InvoiceDetailsSection';
import InvoiceSummary from '@/features/invoices/components/InvoiceSummary/InvoiceSummary';
import PlanDetails from '@/features/invoices/components/InvoiceSummary/PlanDetails';
import { InvoiceTimeline } from '@/features/invoices/components/InvoiceTimeline/InvoiceTimeline';
import ReviewInvoiceConfirmatioModal from '@/features/invoices/components/ReviewInvoiceConfirmatioModal/ReviewInvoiceConfirmatioModal';
import { InvoiceProvider } from '@/features/invoices/providers/InvoiceProvider';
import useContactNoumConnection from '@/features/noumContacts/hooks/contactNoumConnection';
import { useError, useToast } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { useNavigateWithOrigin } from '@/hooks/navigation';
import { Stack } from '@/layout';
import { FullScreenLayout } from '@/layout/FullScreenLayout';
import { ResponsiveMain } from '@/layout/SinglePageLayout';
import { UserUtil } from '@/utils/user';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import S from '../styles';
import { type InvoicePreviewScreenParams } from './types';
import useInvoicePreviewScreen from './useInvoicePreviewScreen';
import { useRestrictInvoicePreviewRouteAccess } from './useRestrictInvoicePreviewRouteAccess';

type ModalType = 'confirmation' | 'secretNoumAlert' | 'duplicate-invoice';

const InvoicePreviewScreen = () => {
  const { id: invoiceId } = useParams<InvoicePreviewScreenParams>();
  const location = useLocation();
  const { logError } = useError();
  const navigate = useNavigate();
  const { openModal, closeModal, modalType, contextData } = useModalManager<
    ModalType,
    boolean
  >();
  const { addSuccessIconToast } = useToast();
  const isViewMode = !location.pathname.includes('/preview');
  const { isUnauthenticated } = useAuth();
  const {
    deleteInvoice,
    invoice,
    loading,
    sendInvoice,
    handleDuplicate,
    refetchInvoice,
  } = useInvoicePreviewScreen({
    invoiceId,
  });

  useRestrictInvoicePreviewRouteAccess({ status: invoice?.status });

  const [checkConnectionWithSecretNoum] = useContactNoumConnection();

  const { goBackToOrigin } = useNavigateWithOrigin();

  const submit = async () => {
    const { isConnected, isSecretNoum } = await checkConnectionWithSecretNoum(
      invoice?.noumId?._id ?? '',
      invoice?.invoiceTo?._id ?? '',
      invoice?.noumId?.projectType as ProjectChamberType,
    );
    if (isSecretNoum && !isConnected) {
      openModal(
        'secretNoumAlert',
        UserUtil.isUnauthenticated(invoice?.invoiceTo?.userId),
      );
    } else {
      openModal('confirmation');
    }
  };

  const onConfirm = async () => {
    try {
      await sendInvoice();

      addSuccessIconToast(
        `Your invoice has been sent to ${invoice?.invoiceTo?.displayName}`,
      );
      navigate(routes.INVOICE_MANAGER);
    } catch {
      logError(
        new Error('Unable to send an invoice. Please try again later.'),
        'onConfirm',
      );
    }
  };

  const handleGoBack = () => {
    goBackToOrigin({ fallbackUrl: routes.INVOICE_MANAGER });
  };

  if (!invoiceId || (!loading && !invoice)) {
    return <Navigate replace to={routes.INVOICE_MANAGER} />;
  }

  return (
    <FullScreenLayout>
      <>
        {!invoice && loading ? (
          <Spinner />
        ) : invoice ? (
          <>
            <S.FormHeaderContainer>
              {isUnauthenticated ? (
                <Header isBorderRadius={false}>
                  <UnauthenticatedHeader
                    title="Your Invoice"
                    rightElement={
                      <UnauthenticatedUserHeaderButtons invoice={invoice} />
                    }
                  />
                </Header>
              ) : !isViewMode && invoice?.status === InvoiceStatusEnum.Draft ? (
                <InvoicePreviewHeader
                  title="Invoice Summary"
                  onSubmit={submit}
                  onGoBack={handleGoBack}
                  invoice={invoice}
                  onDuplicate={() => openModal('duplicate-invoice')}
                />
              ) : isViewMode && invoice?.status === InvoiceStatusEnum.Draft ? (
                <InvoicePreviewDraftHeader
                  title="Invoice Summary"
                  onDelete={deleteInvoice}
                  invoice={invoice}
                  onSubmit={submit}
                  onGoBack={handleGoBack}
                  onDuplicate={() => openModal('duplicate-invoice')}
                />
              ) : (
                <InvoicePreviewIssuedHeader
                  title="Invoice Summary"
                  onDelete={deleteInvoice}
                  invoice={invoice}
                  onSubmit={submit}
                  status={invoice?.status}
                  onGoBack={handleGoBack}
                  onRefetchInvoice={refetchInvoice}
                  onDuplicate={() => openModal('duplicate-invoice')}
                />
              )}
            </S.FormHeaderContainer>

            <ResponsiveMain>
              <S.Content gap={16} padding="16px 0" oneColumn>
                {invoice ? (
                  <Stack vertical gap={16}>
                    <PlanDetails invoice={invoice} />
                    <InvoiceSummary invoice={invoice} />
                    <InvoiceDetailsSection invoice={invoice} />
                    <InvoiceTimeline invoice={invoice} />
                  </Stack>
                ) : null}
              </S.Content>
            </ResponsiveMain>
          </>
        ) : null}
      </>
      {invoice && (
        <ReviewInvoiceConfirmatioModal
          isOpenModal={modalType === 'confirmation'}
          amount={invoice?.amount ?? 0}
          currency={invoice?.currency ?? AllCurrencyEnum.Usd}
          customerName={invoice.invoiceTo?.displayName || ''}
          onConfirm={onConfirm}
          onCancel={closeModal}
        />
      )}
      <InvoiceSecretNoumAlertModal
        isOpenModal={modalType === 'secretNoumAlert'}
        onClose={closeModal}
        isUnauthenticated={!!contextData}
      />
      <DuplicateInvoiceModal
        isOpenModal={modalType === 'duplicate-invoice'}
        onClose={closeModal}
        onConfirm={() => {
          handleDuplicate();
          closeModal();
        }}
      />
    </FullScreenLayout>
  );
};

export default () => (
  <InvoiceProvider>
    <InvoicePreviewScreen />
  </InvoiceProvider>
);
