import { type ComponentProps, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Button } from '@/components/Button';
import { StickyFormHeader } from '@/components/FormHeader/StickyFormHeader/StickyFormHeader';
import { Icon } from '@/components/Icon';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import EllipsisMenu from '@/screens/Chambers/EllipsisMenu';
import routes from '@/constants/routes';
import { useError } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import useLoadingCallback from '@/hooks/useLoadingCallback';
import { type InvoiceOutputFragment } from '@/apollo/graphql';
import DeleteDraftModal from '../DeleteDraftModal/DeleteDraftModal';
import { type InvoiceFormValues } from '../../hooks/useInvoiceForm';
import useInvoicePermissions from '../../hooks/useInvoicePermissions';

type ModalType = 'deleteDraft';

type InvoiceFormDraftHeaderProps = Pick<
  ComponentProps<typeof StickyFormHeader>,
  'title' | 'hasUnsavedChanges' | 'onGoBack' | 'badgeText' | 'isFullScreenMode'
> & {
  onSave?(): Promise<void>;
  onDelete(): Promise<void>;
  onSend?(): Promise<void>;
  onDuplicate?(): void;
  isValid?: boolean;
  draftId?: string;
  invoice?: InvoiceOutputFragment | null;
};

const InvoiceFormDraftHeader = ({
  onSave,
  onDelete,
  isValid,
  draftId,
  onSend,
  invoice,
  onDuplicate,
  ...formHeaderProps
}: InvoiceFormDraftHeaderProps) => {
  const { isMobile } = useBreakpoints();
  const { control } = useFormContext<InvoiceFormValues>();
  const formValues = useWatch({ control });
  const [updatedAt, setUpdatedAt] = useState<string>();
  const navigate = useNavigate();
  const { logError } = useError();
  const { openModal, closeModal, modalType } = useModalManager<ModalType>();
  const [handleSaveDraft, isLoadingSave] = useLoadingCallback(onSave);
  const [handleSend, isLoadingSend] = useLoadingCallback(onSend);
  const invoiceUtils = useInvoicePermissions();

  useEffect(() => {
    setUpdatedAt(new Date().toISOString());
  }, [formValues]);

  const handleDelete = async () => {
    try {
      await onDelete();

      navigate({
        pathname: routes.INVOICE_MANAGER,
      });
    } catch {
      logError(
        new Error('Unable to delete an invoice draft. Please try again later.'),
        'onDeleteDraft',
      );
    }
  };

  const DeleteDraftButton = (
    <Button
      size="small"
      intent="negative"
      secondary
      disabled={!draftId}
      leftIcon={<Icon name="delete_m" size={16} />}
      onClick={() => openModal('deleteDraft')}
    >
      Delete draft
    </Button>
  );

  const DuplicateInvoiceButton = (
    <Button
      size="small"
      tertiary
      disabled={!draftId || !invoiceUtils.canDuplicate(invoice)}
      leftIcon={<Icon name="copy_m" size={16} />}
      onClick={onDuplicate}
    >
      Duplicate
    </Button>
  );

  const SaveDraftButton = (
    <Button
      size="small"
      secondary
      loading={isLoadingSave}
      disabled={!formHeaderProps.hasUnsavedChanges && !!draftId}
      onClick={handleSaveDraft}
    >
      Save draft
    </Button>
  );

  const ReviewAndSendButton = (
    <Button
      size="small"
      intent="positive"
      softDisabled={!isValid}
      disabled={!draftId}
      loading={isLoadingSend}
      onClick={handleSend}
    >
      Review & Send
    </Button>
  );

  const DraftButtons = !isMobile ? (
    <>
      {DuplicateInvoiceButton}
      {DeleteDraftButton}
      {SaveDraftButton}
      {ReviewAndSendButton}
    </>
  ) : (
    <>
      {ReviewAndSendButton}
      <EllipsisMenu
        containerWidth="125px"
        neutral
        onClick={() => {}}
        menuOptions={[
          {
            key: 'save-draft',
            label: 'Save draft',
            type: 'value',
            value: 'save-draft',
            disabled: !formHeaderProps.hasUnsavedChanges,
            onClick: onSave,
          },
          {
            key: 'delete-draft',
            label: 'Delete draft',
            type: 'value',
            value: 'delete-draft',
            intent: 'danger',
            disabled: !draftId,
            onClick: () => openModal('deleteDraft'),
          },
        ]}
        iconColorToken="--button-card-neutral-default"
      />
    </>
  );

  return (
    <>
      <StickyFormHeader
        {...formHeaderProps}
        updatedAt={updatedAt}
        buttons={DraftButtons}
      />
      <DeleteDraftModal
        isOpenModal={modalType === 'deleteDraft'}
        onConfirm={handleDelete}
        onClose={() => closeModal()}
      />
    </>
  );
};

export default InvoiceFormDraftHeader;
