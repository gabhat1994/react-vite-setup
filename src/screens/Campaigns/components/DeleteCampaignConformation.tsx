import { Button } from '@/components/Button';
import * as EM from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';

type OfferActionsProps = {
  open: boolean;
  campaign: { id: string; title: string } | null;
  onDelete: (campaign: { id: string; title: string } | null) => void;
  actionButtonLoading: boolean;
  onClose: () => void;
};

export const DeleteCampaignConfirmation = ({
  open,
  campaign,
  onClose,
  onDelete,
  actionButtonLoading,
}: OfferActionsProps) => (
  <EM.Modal open={open} size={EM.ModalSize.S} onClose={onClose}>
    <EM.ModalHeader>Delete Campaign</EM.ModalHeader>
    <EM.ModalBody align="center">
      <TSpan
        font="body-l"
        textAlign="center"
        colorToken="--text-modal-neutral-default"
      >
        You’re about to delete the Campaign <br />“
        <TSpan
          font="body-l"
          textAlign="center"
          colorToken="--text-modal-neutral-highlighted"
        >
          {campaign?.title ?? ''}
        </TSpan>
        ”.
        <br />
        It can’t be undone.
      </TSpan>
    </EM.ModalBody>
    <EM.ModalFooter gap={16} justifyContent="center" flexDirection="column">
      <Button
        size="full"
        primary
        intent="negative"
        disabled={actionButtonLoading}
        loading={actionButtonLoading}
        onClick={() => {
          onDelete(campaign);
        }}
      >
        Yes, Delete
      </Button>
      <Button size="full" tertiary onClick={onClose}>
        Cancel
      </Button>
    </EM.ModalFooter>
  </EM.Modal>
);
