import { useApolloClient } from '@apollo/client';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { useModalManager } from '@/hooks/modal/useModalManager';
import {
  GetInvoiceByIdDocument,
  GetInvoiceTimeLinesDocument,
  type InvoiceOutputFragment,
  useGetInvoiceAmountQuery,
} from '@/apollo/graphql';
import convertToCurrency from '@/utils/currencyToCurrency';
import { Stack } from '@/layout';
import useInvoicePdfDownload from '../../hooks/useInvoicePdfDownload';
import useInvoicePermissions from '../../hooks/useInvoicePermissions';
import MakeInvoicePaymentWizard from '../MakeInvoicePaymentWizard/MakeInvoicePaymentWizard';

type ModalType = 'change-status' | 'make-payment';

type FormHeaderProps = {
  invoice: InvoiceOutputFragment;
};

const UnauthenticatedUserHeaderButtons = ({ invoice }: FormHeaderProps) => {
  const apolloClient = useApolloClient();
  const { openModal, closeModal, modalType } = useModalManager<ModalType>();
  const invoiceUtils = useInvoicePermissions();
  const { download, loading } = useInvoicePdfDownload();
  const invoiceId = invoice.id ?? '';

  const {
    data: invoiceAmountData,
    loading: invoiceAmountLoading,
    refetch,
  } = useGetInvoiceAmountQuery({
    variables: {
      invoiceId: invoice.id,
    },
    fetchPolicy: 'cache-and-network',
  });

  const remainingAmount =
    invoiceAmountData?.getInvoiceAmount?.remainingAmount ?? 0;

  const onPaymentSuccess = async () => {
    apolloClient.refetchQueries({ include: [GetInvoiceTimeLinesDocument] });

    // there is some delay in the backend to update the invoice status
    setTimeout(() => {
      refetch();

      apolloClient.refetchQueries({
        include: [GetInvoiceByIdDocument],
        onQueryUpdated: (previousResult) => {
          previousResult.refetch({
            id: invoiceId,
          });
        },
      });
    }, 1000);
  };

  return (
    <Stack gap={16}>
      {invoiceUtils.canDownload(invoice) ? (
        <Button
          size="small"
          leftIcon={<Icon name="download_m" size={16} />}
          tertiary
          type="submit"
          loading={loading}
          onClick={() => download(invoice.id, invoice.invoiceNumber ?? '')}
        >
          Download PDF
        </Button>
      ) : null}

      {invoiceUtils.canPay(invoice) ? (
        <Button
          size="small"
          leftIcon={<Icon name="lock_m" size={16} />}
          primary
          loading={invoiceAmountLoading}
          onClick={() => openModal('make-payment', invoice)}
          disabled={remainingAmount <= 0}
        >
          {remainingAmount < (invoice.amount ?? 0) ? 'Pay missing ' : 'Pay '}
          {convertToCurrency(remainingAmount, invoice.currency ?? undefined)}
        </Button>
      ) : null}

      {modalType === 'make-payment' && (
        <MakeInvoicePaymentWizard
          onClose={closeModal}
          invoice={invoice}
          onPaymentSuccess={onPaymentSuccess}
        />
      )}
    </Stack>
  );
};

export default UnauthenticatedUserHeaderButtons;
