import { Button } from '@/components/Button';
import { StickyFormHeader } from '@/components/FormHeader/StickyFormHeader/StickyFormHeader';
import { Icon } from '@/components/Icon';
import { useModalManager } from '@/hooks/modal/useModalManager';
import useLoadingCallback from '@/hooks/useLoadingCallback';
import { useEffect, useState, type ComponentProps } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { type InvoiceOutputFragment } from '@/apollo/graphql';
import { useInvoiceContext } from '../../hooks/useInvoiceContext';
import { type InvoiceFormValues } from '../../hooks/useInvoiceForm';
import { InvoiceUtils } from '../../utils/invoice';
import UpdateInvoiceModal from '../UpdateInvoiceModal/UpdateInvoiceModal';
import useInvoicePermissions from '../../hooks/useInvoicePermissions';

type ModalType = 'updateInvoice';
type InvoiceFormEditHeaderProps = Pick<
  ComponentProps<typeof StickyFormHeader>,
  'title' | 'hasUnsavedChanges' | 'onGoBack' | 'badgeText' | 'isFullScreenMode'
> & {
  onSave?(): Promise<void>;
  onSend?(): Promise<void>;
  onDuplicate?(): void;
  isValid?: boolean;
  values: InvoiceFormValues;
  isDraft?: boolean;
  invoice?: InvoiceOutputFragment | null;
};

const InvoiceFormEditHeader = ({
  onSave,
  isValid,
  onSend,
  onDuplicate,
  invoice,
  values,
  isDraft,
  hasUnsavedChanges,
  ...formHeaderProps
}: InvoiceFormEditHeaderProps) => {
  const { control } = useFormContext<InvoiceFormValues>();
  const formValues = useWatch({ control });
  const [updatedAt, setUpdatedAt] = useState<string>();
  const [handleSaveDraft, isLoading] = useLoadingCallback(onSave);
  const [handleSend, isSendLoading] = useLoadingCallback(onSend);
  const { openModal, closeModal, modalType } = useModalManager<ModalType>();
  const { selectedBuyer } = useInvoiceContext();
  const invoiceUtils = useInvoicePermissions();

  useEffect(() => {
    setUpdatedAt(new Date().toISOString());
  }, [formValues]);

  const handleSaveChanges = async () => {
    if (isDraft) {
      handleSaveDraft();
    } else {
      openModal('updateInvoice');
    }
  };

  const DuplicateInvoiceButton =
    invoice && invoiceUtils.canDuplicate(invoice) ? (
      <Button
        size="small"
        tertiary
        leftIcon={<Icon name="copy_m" size={16} />}
        onClick={onDuplicate}
      >
        Duplicate
      </Button>
    ) : null;

  const SaveAndResendButton = (
    <Button
      size="small"
      softDisabled={!isValid}
      disabled={!hasUnsavedChanges}
      onClick={handleSaveChanges}
      loading={isLoading}
      primary
    >
      Save & Resend
    </Button>
  );

  const OtherButtons = (
    <>
      {DuplicateInvoiceButton}
      {SaveAndResendButton}
    </>
  );

  const DraftButtons = (
    <>
      {DuplicateInvoiceButton}
      <Button
        size="small"
        disabled={!hasUnsavedChanges}
        onClick={handleSaveChanges}
        loading={isLoading}
        primary
      >
        Save Changes
      </Button>
      <Button
        size="small"
        softDisabled={!isValid}
        onClick={handleSend}
        loading={isSendLoading}
        intent="positive"
        primary
      >
        Review & Send
      </Button>
    </>
  );

  const totalAmount = InvoiceUtils.getAllItemsTotalValue(values.lineItems);

  return (
    <>
      <StickyFormHeader
        {...formHeaderProps}
        updatedAt={updatedAt}
        buttons={isDraft ? DraftButtons : OtherButtons}
      />

      <UpdateInvoiceModal
        isOpenModal={modalType === 'updateInvoice'}
        onConfirm={async () => {
          await handleSaveDraft();
          closeModal();
        }}
        loading={isLoading}
        onClose={closeModal}
        amount={totalAmount}
        currency={values.currency}
        customerName={selectedBuyer?.name ?? ''}
      />
    </>
  );
};

export default InvoiceFormEditHeader;
