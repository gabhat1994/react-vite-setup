import { useRemoveNoumFromSubscriptionMutation } from '@/apollo/graphql';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalSize,
  ModalFooter,
} from '@/components/ExtendedModal';
import { Button, TSpan } from '@/components';
import { useError, useToast } from '@/hooks';
import {
  Noum_Fee_Operation_Type,
  SpaceStatusEnum,
} from '@/apollo/generated/types';
import { useChangeProjectChamberStatusHelper } from '@/features/noums/hooks/noums';
import { type IRemoveNoumFromPlanModal } from './types';

export function RemoveNoumFromPlanModal({
  open,
  onClose,
  noumId,
  subscriptionId,
  onRemoveNoum,
}: IRemoveNoumFromPlanModal) {
  const toast = useToast();
  const { logError } = useError();

  const { changeProjectChamberStatusHelper } =
    useChangeProjectChamberStatusHelper();

  const [removeNoum, { loading }] = useRemoveNoumFromSubscriptionMutation({
    onError: (error) => {
      logError(error, 'removeNoumFromSubscription', true);
    },

    onCompleted: () => {
      toast.addSuccessIconToast(
        'Noum was archived and removed from this Plan.',
      );
      onRemoveNoum();
      onClose();
    },
  });

  const handleRemove = () => {
    if (noumId) {
      removeNoum({
        variables: {
          noumInput: {
            chamber_id: noumId,
            subscription_id: subscriptionId,
            operation_type: Noum_Fee_Operation_Type.Archived,
          },
        },
      });

      // TODO : remove below mutation when BE fixes SNS events. This is to sync the status across microservices
      changeProjectChamberStatusHelper(noumId, SpaceStatusEnum.Archived);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size={ModalSize.S}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <ModalHeader>Remove Noum</ModalHeader>
      <ModalBody flexDirection="column" gap={16}>
        <TSpan
          font="body-l"
          colorToken="--text-card-neutral-default"
          textAlign="center"
        >
          This Noum will be archived and removed from this Subscription Plan.
        </TSpan>
        <TSpan
          font="body-l"
          colorToken="--text-card-neutral-default"
          textAlign="center"
        >
          Are you sure to unlink this Noum from this Subscription Plan?
        </TSpan>
      </ModalBody>
      <ModalFooter flexDirection="column" gap={16}>
        <Button
          primary
          size="full"
          onClick={handleRemove}
          loading={loading}
          disabled={loading}
        >
          Yes, Remove
        </Button>
        <Button secondary size="full" onClick={onClose}>
          No, Keep It
        </Button>
      </ModalFooter>
    </Modal>
  );
}
