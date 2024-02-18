import { ProjectChamberType } from '@/apollo/generated/types';
import { useUpdateNoumVisibilitySettingsHelper } from '@/features/noums/hooks/noums';
import { useToast } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { type LinkedNoumOptionType } from '@/screens/LinkNoum/components/types';
import { useTranslation } from 'react-i18next';
import { ChamberActionModal } from '../../ChamberActionModal/ActionModal';
import { ChamberVisibilityLinkModal } from './ChamberVisibilityLinkModal';
import {
  useVisibilitySettingsForm,
  type VisibilitySettingsValues,
} from './schema';
import { mapStringToProjectChamberType } from './utils';

type ModalType = 'linked-noums-visibility' | 'auto-accept-pending';

interface UseVisibilitySettingsOptions {
  noumId: string;
  defaultVisibility: string | undefined;
  linkedNoums: LinkedNoumOptionType[];
  isSEOEnabled: boolean;
  onSubmit: () => void;
}

export function useVisibilitySettings({
  defaultVisibility,
  noumId,
  linkedNoums,
  isSEOEnabled,
  onSubmit,
}: UseVisibilitySettingsOptions) {
  const { addErrorToast } = useToast();
  const { t } = useTranslation();
  const { modalType, openModal, closeModal } = useModalManager<ModalType>();

  const {
    handleSubmit,
    control,
    getValues,
    formState: { isDirty },
  } = useVisibilitySettingsForm({
    defaultValues: {
      visibility: mapStringToProjectChamberType(defaultVisibility),
    },
  });

  const { updateNoumVisibilitySettingsHelper, loading } =
    useUpdateNoumVisibilitySettingsHelper();

  const handleNewVisibilitySave = async () => {
    const newVisibility = getValues('visibility');
    if (newVisibility) {
      await updateNoumVisibilitySettingsHelper(noumId, newVisibility);
      onSubmit();
    }
  };

  const handleConfirmAutoAcceptPendingRequests = () => {
    if (linkedNoums?.length) {
      openModal('linked-noums-visibility');
    } else {
      handleNewVisibilitySave();
    }
  };

  const handleSave = async (values: VisibilitySettingsValues) => {
    const newVisibility = values.visibility;

    // Visibility of SEO enabled noums can not be change to private or secret. the noum should always accessible by public
    if (isSEOEnabled && newVisibility !== ProjectChamberType.Public) {
      addErrorToast('SEO enabled noums can only be public');
      return;
    }

    if (newVisibility === ProjectChamberType.Public) {
      openModal('auto-accept-pending');
    } else {
      handleConfirmAutoAcceptPendingRequests();
    }
  };

  const handleChangeLinkedNoumsVisibility = () => {
    handleNewVisibilitySave();
    closeModal();
  };

  const modalsElement = (
    <>
      <ChamberVisibilityLinkModal
        isOpen={modalType === 'linked-noums-visibility'}
        handleAccept={handleChangeLinkedNoumsVisibility}
        handleClose={closeModal}
        linkedNoums={linkedNoums}
      />
      <ChamberActionModal
        positiveBtnLabel={t(`noumena.continue`)}
        confirmCallback={handleConfirmAutoAcceptPendingRequests}
        cancelCallback={closeModal}
        isOpen={modalType === 'auto-accept-pending'}
        title={t('noumena.container.chamber_publish_visibility_link.title')}
        description={t(
          `noumena.noum.visibility.public.pending_request_auto_accept`,
        )}
        negativeBtnLabel={t(`noumena.cancel`)}
      />
    </>
  );

  return {
    control,
    isDirty,
    loading,
    modalsElement,
    onSubmit: handleSubmit(handleSave),
  };
}
