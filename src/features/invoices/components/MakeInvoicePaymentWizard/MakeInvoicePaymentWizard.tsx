import { useApolloClient } from '@apollo/client';
import { TransactionModal } from '@/features/TransactionModal';
import { TransactionModalType } from '@/features/TransactionModal/types';
import {
  GetInvoiceByIdDocument,
  type InvoiceOutputFragment,
  useCheckWalletExistDetailQuery,
  useGetInvoiceAmountQuery,
} from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import { AccountType } from '@/apollo/generated/types';
import { PaymentLoadingModal } from './PaymentLoadingModal';
import { PaymentErrorModal } from './PaymentErrorModal';

type MakeInvoicePaymentWizardProps = {
  onClose: () => void;
  invoice: InvoiceOutputFragment;
  onPaymentSuccess?: () => void;
};

const MakeInvoicePaymentWizard: React.FC<MakeInvoicePaymentWizardProps> = ({
  onClose,
  invoice,
  onPaymentSuccess,
}) => {
  const apolloClient = useApolloClient();
  const sourceUserId = invoice?.invoiceTo?.userId?._id;
  const targetUserId = invoice?.invoiceFrom?.userId?._id;

  const { data, loading } = useCheckWalletExistDetailQuery({
    variables: {
      sourceUserId: sourceUserId!,
      targetUserId: targetUserId!,
      noumId: invoice.noumId?._id!,
      invoiceId: invoice.id,
    },
    skip: !sourceUserId || !targetUserId || !invoice.noumId?._id,
  });

  const { data: invoiceAmountData, loading: invoiceAmountLoading } =
    useGetInvoiceAmountQuery({
      variables: {
        invoiceId: invoice.id,
      },
      fetchPolicy: 'cache-and-network',
    });

  const handlePaymentSuccess = () => {
    setTimeout(() => {
      apolloClient.refetchQueries({
        include: [GetInvoiceByIdDocument],
        onQueryUpdated: (previousResult) => {
          previousResult.refetch({
            id: invoice.id,
          });
        },
      });
    }, 1500);

    onPaymentSuccess?.();
  };

  const details = data?.checkWalletExistDetail;

  const subwallet = details?.targetWalletDetail?.find(
    (wallet) => wallet?.accountType === AccountType.SubWallet,
  );

  return loading || invoiceAmountLoading ? (
    <PaymentLoadingModal isOpenModal />
  ) : details?.targetWallet ? (
    <TransactionModal
      open
      type={TransactionModalType.PAY}
      handleClose={onClose}
      invoiceId={invoice.id}
      defaultWalletPayee={
        subwallet ?? details?.targetWalletDetail?.[0] ?? undefined
      }
      predefinedPayeeList={cleanList(details.targetWalletDetail)}
      isSourceWalletExists={details.sourceWallet}
      isDestinationDropdownDisabled={
        (details.targetWalletDetail ?? []).length <= 1
      }
      maxTransactionAmount={
        invoiceAmountData?.getInvoiceAmount?.remainingAmount ?? undefined
      }
      onSuccessfulTransaction={handlePaymentSuccess}
    />
  ) : (
    <PaymentErrorModal
      serviceProviderName={invoice?.invoiceFrom?.displayName ?? ''}
      isOpenModal
      onClose={onClose}
    />
  );
};

export default MakeInvoicePaymentWizard;
