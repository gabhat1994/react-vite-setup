import {
  type InvoiceStatusEnum,
  type InvoiceStatusEnumInput,
} from '@/apollo/generated/types';
import {
  GetInvoiceTimeLinesDocument,
  useGetInvoiceAmountQuery,
  type InvoiceOutputFragment,
} from '@/apollo/graphql';
import { Button } from '@/components/Button';
import { StickyFormHeader } from '@/components/FormHeader/StickyFormHeader/StickyFormHeader';
import { Icon } from '@/components/Icon';
import routes from '@/constants/routes';
import { useModalManager } from '@/hooks/modal/useModalManager';
import convertToCurrency from '@/utils/currencyToCurrency';
import { useApolloClient } from '@apollo/client';
import { delay } from 'lodash';
import { type ComponentProps } from 'react';
import { generatePath, useNavigate } from 'react-router';
import useInvoicePdfDownload from '../../hooks/useInvoicePdfDownload';
import useInvoicePermissions from '../../hooks/useInvoicePermissions';
import useInvoiceStatusChange from '../../hooks/useInvoiceStatusChange';
import ChangeInvoiceStatusModal from '../ChangeInvoiceStatusModal/ChangeInvoiceStatusModal';
import MakeInvoicePaymentWizard from '../MakeInvoicePaymentWizard/MakeInvoicePaymentWizard';

type ModalType = 'change-status' | 'make-payment';

type FormHeaderProps = Pick<
  ComponentProps<typeof StickyFormHeader>,
  'title' | 'onGoBack'
> & {
  onDelete?(): Promise<void>;
  onSubmit?(): void;
  onDuplicate?(): void;
  onRefetchInvoice?(): void;
  title: string;
  invoice: InvoiceOutputFragment;
  status?: InvoiceStatusEnum | null;
};

const InvoicePreviewIssuedHeader = ({
  onDelete,
  onSubmit,
  onDuplicate,
  onRefetchInvoice,
  invoice,
  status,
  ...formHeaderProps
}: FormHeaderProps) => {
  const apolloClient = useApolloClient();
  const { openModal, closeModal, modalType } = useModalManager<ModalType>();

  const invoiceUtils = useInvoicePermissions();
  const { download, loading } = useInvoicePdfDownload();
  const invoiceId = invoice.id ?? '';
  const navigate = useNavigate();
  const { changeStatus } = useInvoiceStatusChange();

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

  const handleStatusChange = async (
    newStatus: InvoiceStatusEnumInput,
    amount?: number,
  ) => {
    if (!invoice?.id) {
      return;
    }
    closeModal();
    await changeStatus({ invoice, status: newStatus, amount });

    delay(() => {
      apolloClient.refetchQueries({
        include: [GetInvoiceTimeLinesDocument],
        onQueryUpdated: (previousResult) => {
          previousResult.refetch({
            invoiceId: invoice.id,
          });
        },
      });
      onRefetchInvoice?.();
    }, 500);
  };

  const remainingAmount =
    invoiceAmountData?.getInvoiceAmount?.remainingAmount ?? 0;

  const handleEdit = () => {
    if (!invoiceId) {
      return;
    }
    navigate(generatePath(routes.INVOICE_EDIT, { id: invoiceId }));
  };

  const onPaymentSuccess = async () => {
    setTimeout(() => {
      apolloClient.refetchQueries({ include: [GetInvoiceTimeLinesDocument] });
      refetch();
    }, 1500);
  };

  const Buttons = (
    <>
      {invoiceUtils.canDuplicate(invoice) ? (
        <Button
          size="small"
          tertiary
          leftIcon={<Icon name="copy_m" size={16} />}
          onClick={onDuplicate}
        >
          Duplicate
        </Button>
      ) : null}
      {invoiceUtils.canEdit(invoice) ? (
        <Button
          size="small"
          tertiary
          leftIcon={<Icon name="edit_m" size={16} />}
          type="submit"
          onClick={handleEdit}
        >
          Edit
        </Button>
      ) : null}
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

      {invoiceUtils.canChangeStatus(invoice) ? (
        <Button
          size="small"
          leftIcon={<Icon name="transfer_m" size={16} />}
          tertiary
          type="submit"
          onClick={() => openModal('change-status')}
        >
          Change Status
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
    </>
  );

  return (
    <>
      <StickyFormHeader
        {...formHeaderProps}
        buttons={Buttons}
        isFullScreenMode
      />
      <ChangeInvoiceStatusModal
        isOpenModal={modalType === 'change-status'}
        onCancel={closeModal}
        onConfirm={handleStatusChange}
        currentStatus={status ?? undefined}
        key={modalType}
        currency={invoice.currency ?? undefined}
        invoiceId={invoice.id ?? ''}
      />
      {modalType === 'make-payment' && (
        <MakeInvoicePaymentWizard
          onClose={closeModal}
          invoice={invoice}
          onPaymentSuccess={onPaymentSuccess}
        />
      )}
    </>
  );
};

export default InvoicePreviewIssuedHeader;
