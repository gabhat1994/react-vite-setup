import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { useCancelProjectNoumCampaignMutation } from '@/apollo/graphql';
import { useToast } from '@/hooks';
import { TSpan } from '@/components/Typography';
import { type DeleteChamberBroadcastModalProps } from '../types';
import * as S from '../styles';

export const DeleteChamberBroadcastModal = ({
  isOpen,
  onClose,
  campaignId,
  onRefetchCampaigns,
}: DeleteChamberBroadcastModalProps) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [cancelProjectNoumCampaignMutation, { loading }] =
    useCancelProjectNoumCampaignMutation({
      variables: {
        campaignId,
      },
      onCompleted: (response) => {
        if (response.cancelProjectNoumCampaign) {
          onRefetchCampaigns();
          onClose();
          addToast(
            'primary',
            'icon',
            t('noumena.chamber_edit.broadcasting.campaign.cancel_success'),
          );
        }
      },
      onError: (err) => {
        addToast('error', 'none', err.message);
      },
    });

  return (
    <Modal
      testId="chamber-campaign-delete-modal"
      open={isOpen}
      onClose={onClose}
      size={ModalSize.S}
      disableBackdropClick
    >
      <ModalHeader>
        {t(`noumena.chamber_edit.broadcasting.campaign.cancel`)}
      </ModalHeader>
      <ModalBody
        loading={loading}
        loadingDescription={t(
          'noumena.chamber_edit.broadcasting.campaign.cancel.loading_description',
        )}
      >
        <TSpan
          font="body-l"
          colorToken="--text-modal-neutral-default"
          textAlign="center"
        >
          {t(`noumena.chamber_edit.broadcasting.campaign.cancel_subheading`)}
        </TSpan>
      </ModalBody>
      <ModalFooter flexDirection="column" gap={16} loading={loading}>
        <S.ModalButton
          size="full"
          intent="negative"
          testId="chamber-broadcast-cancel-btn"
          onClick={() => cancelProjectNoumCampaignMutation()}
        >
          {t(`noumena.chamber_edit.broadcasting.campaign.cancel`)}
        </S.ModalButton>
        <S.ModalButton
          size="full"
          tertiary
          testId="chamber-broadcast-cancel-no-btn"
          onClick={onClose}
        >
          {t(`noumena.chamber_edit.broadcasting.campaign.dont_cancel`)}
        </S.ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteChamberBroadcastModal;
