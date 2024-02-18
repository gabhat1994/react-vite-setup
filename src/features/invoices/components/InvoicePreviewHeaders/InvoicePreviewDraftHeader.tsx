import { type InvoiceOutputFragment } from '@/apollo/graphql';
import { Button } from '@/components/Button';
import { StickyFormHeader } from '@/components/FormHeader/StickyFormHeader/StickyFormHeader';
import { Icon } from '@/components/Icon';
import routes from '@/constants/routes';
import { useError } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import EllipsisMenu from '@/screens/Chambers/EllipsisMenu';
import { type ComponentProps } from 'react';
import { generatePath, useNavigate } from 'react-router';
import { useInvoiceForm } from '../../hooks/useInvoiceForm';
import { InvoiceFormMapper } from '../../utils/invoiceFormMapper';
import DeleteDraftModal from '../DeleteDraftModal/DeleteDraftModal';
import useInvoicePermissions from '../../hooks/useInvoicePermissions';

type FormHeaderProps = Pick<
  ComponentProps<typeof StickyFormHeader>,
  'title' | 'onGoBack'
> & {
  onDelete?(): Promise<void>;
  onSubmit?(): void;
  onDuplicate?(): void;
  title: string;
  invoice: InvoiceOutputFragment;
};

type ModalType = 'deleteDraft';

const InvoicePreviewDraftHeader = ({
  onDelete,
  onSubmit,
  onDuplicate,
  invoice,
  ...formHeaderProps
}: FormHeaderProps) => {
  const { isMobile } = useBreakpoints();
  const navigate = useNavigate();
  const { logError } = useError();
  const { openModal, closeModal, modalType } = useModalManager<ModalType>();
  const invoiceUtils = useInvoicePermissions();

  const {
    formState: { isValid },
  } = useInvoiceForm({ defaultValues: InvoiceFormMapper.fromInvoice(invoice) });

  const handleEdit = () => {
    if (!invoice.id) {
      return;
    }
    navigate(generatePath(routes.INVOICE_EDIT, { id: invoice.id }));
  };

  const handleDelete = async () => {
    try {
      await onDelete?.();

      navigate({
        pathname: routes.INVOICE_MANAGER,
      });
    } catch {
      logError(
        new Error('Unable to delete an invoice. Please try again later.'),
        'onDelete',
      );
    }
  };

  const DraftButtons = !isMobile ? (
    <>
      {invoiceUtils.canDuplicate(invoice) && (
        <Button
          size="small"
          tertiary
          leftIcon={<Icon name="copy_m" size={16} />}
          onClick={onDuplicate}
        >
          Duplicate
        </Button>
      )}
      <Button
        size="small"
        tertiary
        onClick={handleEdit}
        leftIcon={<Icon name="edit_m" size={16} />}
      >
        Edit
      </Button>
      <Button
        size="small"
        intent="negative"
        secondary
        leftIcon={<Icon name="delete_m" size={16} />}
        onClick={() => openModal('deleteDraft')}
      >
        Delete
      </Button>
      <Button
        size="small"
        tooltipText={
          !isValid
            ? 'Please note that you cannot send an incomplete invoice. To proceed, switch to Edit Mode and provide all required data.'
            : ''
        }
        tooltipPosition="bottom-left"
        intent="positive"
        type="submit"
        disabled={!isValid}
        onClick={onSubmit}
      >
        Confirm & Send
      </Button>
    </>
  ) : (
    <EllipsisMenu
      containerWidth="125px"
      neutral
      onClick={() => {}}
      menuOptions={[
        {
          key: 'edit',
          label: 'Edit',
          type: 'value',
          value: 'edit',
          intent: 'default',
          onClick: handleEdit,
        },
        {
          key: 'delete',
          label: 'Delete',
          type: 'value',
          value: 'delete',
          intent: 'danger',
          onClick: handleDelete,
        },
      ]}
      iconColorToken="--button-card-neutral-default"
    />
  );

  return (
    <>
      <StickyFormHeader
        {...formHeaderProps}
        buttons={DraftButtons}
        isFullScreenMode
      />
      <DeleteDraftModal
        isOpenModal={modalType === 'deleteDraft'}
        onConfirm={handleDelete}
        onClose={() => closeModal()}
      />
    </>
  );
};

export default InvoicePreviewDraftHeader;
