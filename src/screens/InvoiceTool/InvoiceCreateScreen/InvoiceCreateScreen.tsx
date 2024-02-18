import { InvoiceStatusEnum } from '@/apollo/generated/types';
import SkeletonLoaderProvider from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { Spinner } from '@/components/Spinner';
import routes from '@/constants/routes';
import DuplicateInvoiceModal from '@/features/invoices/components/DuplicateInvoiceModal/DuplicateInvoiceModal';
import InvoiceForm from '@/features/invoices/components/InvoiceForm/InvoiceForm';
import InvoiceFormDraftHeader from '@/features/invoices/components/InvoiceFormHeaders/InvoiceFormDraftHeader';
import InvoiceFormEditHeader from '@/features/invoices/components/InvoiceFormHeaders/InvoiceFormEditHeader';
import InvoiceSecretNoumAlertModal from '@/features/invoices/components/InvoiceSecretNoumAlertModal/InvoiceSecretNoumAlertModal';
import { useInvoiceContext } from '@/features/invoices/hooks/useInvoiceContext';
import { type InvoiceFormValues } from '@/features/invoices/hooks/useInvoiceForm';
import useInvoicePermissions from '@/features/invoices/hooks/useInvoicePermissions';
import { InvoiceProvider } from '@/features/invoices/providers/InvoiceProvider';
import useContactNoumConnection from '@/features/noumContacts/hooks/contactNoumConnection';
import { useError, useToast } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { useNavigateWithOrigin } from '@/hooks/navigation';
import { FullScreenLayout } from '@/layout/FullScreenLayout';
import { UserUtil } from '@/utils/user';
import { useCallback } from 'react';
import { FormProvider, useWatch } from 'react-hook-form';
import { generatePath, useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import S from '../styles';
import InvoicePreviewModal from './InvoicePreviewModal';
import { type InvoiceCreateScreenParams } from './types';
import useInvoiceCreateScreen from './useInvoiceCreateScreen';
import { useRestrictInvoiceCreateRouteAccess } from './useRestrictInvoiceCreateRouteAccess';

type ModalTypes = 'secretNoumAlert' | 'duplicate-invoice';

const InvoiceCreateScreen = () => {
  const navigate = useNavigate();

  const { id } = useParams<InvoiceCreateScreenParams>();
  const { logError } = useError();
  const [searchParams] = useSearchParams();
  const predefinedNoumId = searchParams.get('noumId') ?? id ?? undefined;
  const editMode = !!id && !searchParams.get('draft');
  const { addSuccessIconToast, addPrimaryIconToast, addToast } = useToast();
  const { closeModal, openModal, modalType, contextData } = useModalManager<
    ModalTypes,
    boolean
  >();
  const { selectedBuyer } = useInvoiceContext();
  const { isNoumOwner } = useInvoicePermissions();

  const {
    form,
    isLoading,
    saveDraft,
    deleteInvoice,
    handleDuplicate,
    invoiceId,
    invoice,
  } = useInvoiceCreateScreen({
    id,
    noumId: predefinedNoumId,
  });
  const noumId = form.watch('noumId');
  const formValues = useWatch({ control: form.control });

  const [checkConnectionWithSecretNoum] = useContactNoumConnection();

  useRestrictInvoiceCreateRouteAccess({ status: invoice?.status });
  const { goBackToOrigin } = useNavigateWithOrigin();

  const handleSaveDraft = useCallback(async () => {
    const values = form.getValues();
    if (!noumId) {
      addPrimaryIconToast(
        'Please assign the Noum first in order to save your draft.',
      );
      return;
    }
    try {
      await saveDraft(values);

      form.reset(undefined, {
        keepValues: true,
        keepIsValid: true,
        keepErrors: true,
        keepDirty: false,
        keepDirtyValues: false,
      });

      if (editMode) {
        addSuccessIconToast('Your invoice has been updated.');
      } else {
        addSuccessIconToast('Your draft has been saved.');
      }
    } catch {
      const error = new Error(
        'Unable to create a draft invoice. Please try again later.',
      );
      logError(error, 'InvoiceCreateScreen');
    }
  }, [
    addPrimaryIconToast,
    addSuccessIconToast,
    editMode,
    form,
    logError,
    noumId,
    saveDraft,
  ]);

  const { handleSubmit } = form;

  const submit = useCallback(
    async (values: InvoiceFormValues) => {
      try {
        await saveDraft(values);
        const { isConnected, isSecretNoum } =
          await checkConnectionWithSecretNoum(values.noumId, values.buyerId);

        if (isSecretNoum && !isConnected) {
          openModal(
            'secretNoumAlert',
            UserUtil.isUnauthenticated(selectedBuyer),
          );
          return;
        }

        if (invoiceId) {
          navigate(generatePath(routes.INVOICE_PREVIEW, { id: invoiceId }));
        }
      } catch (error) {
        logError(
          new Error(
            'Unable to update an invoice draft. Please try again later.',
          ),
          'updateDraft',
        );
      }
    },
    [
      saveDraft,
      checkConnectionWithSecretNoum,
      invoiceId,
      openModal,
      selectedBuyer,
      navigate,
      logError,
    ],
  );

  const handleGoBack = () => {
    goBackToOrigin({ fallbackUrl: routes.INVOICE_MANAGER });
  };

  const onSubmitError = () => {
    addToast(
      'error',
      'icon',
      'Please check all the required fields to continue.',
    );
  };

  const duplicatedFromBadgeText =
    invoice?.duplicatedFromInvoiceNumber && isNoumOwner(invoice)
      ? `Duplicated from ${invoice.duplicatedFromInvoiceNumber}`
      : null;

  return (
    <FullScreenLayout>
      <S.Container>
        <SkeletonLoaderProvider isLoading={false}>
          <FormProvider {...form}>
            {!invoice && isLoading ? (
              <Spinner />
            ) : (
              <>
                <S.FormHeaderContainer>
                  {editMode ? (
                    <InvoiceFormEditHeader
                      title="Edit invoice"
                      onSave={handleSaveDraft}
                      onSend={handleSubmit(submit, onSubmitError)}
                      hasUnsavedChanges={form.formState.isDirty}
                      isValid={form.formState.isValid}
                      invoice={invoice}
                      values={formValues as InvoiceFormValues}
                      isDraft={invoice?.status === InvoiceStatusEnum.Draft}
                      onGoBack={handleGoBack}
                      onDuplicate={() => openModal('duplicate-invoice')}
                      badgeText={duplicatedFromBadgeText}
                      isFullScreenMode
                    />
                  ) : (
                    <InvoiceFormDraftHeader
                      title="New invoice"
                      draftId={invoiceId}
                      onDelete={deleteInvoice}
                      onSave={handleSaveDraft}
                      invoice={invoice}
                      onSend={handleSubmit(submit, onSubmitError)}
                      hasUnsavedChanges={form.formState.isDirty}
                      isValid={form.formState.isValid}
                      onGoBack={handleGoBack}
                      onDuplicate={() => openModal('duplicate-invoice')}
                      badgeText={duplicatedFromBadgeText}
                      isFullScreenMode
                    />
                  )}
                </S.FormHeaderContainer>

                <InvoiceForm
                  key={predefinedNoumId}
                  predefinedNoumId={predefinedNoumId}
                  invoice={invoice}
                />
              </>
            )}
            <InvoicePreviewModal values={formValues} />
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
          </FormProvider>
        </SkeletonLoaderProvider>
      </S.Container>
    </FullScreenLayout>
  );
};

export default () => (
  <InvoiceProvider>
    <InvoiceCreateScreen />
  </InvoiceProvider>
);
