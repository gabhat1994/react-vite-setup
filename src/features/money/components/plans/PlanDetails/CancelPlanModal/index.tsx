import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalSize,
  ModalFooter,
} from '@/components/ExtendedModal';
import { Button, TSpan } from '@/components';
import { Stack } from '@/layout';
import { Radiobox } from '@/components/Radiobox';
import { type ICancelPlanModal } from './types';
import { useCancelModal } from './useCancelModal';
import { Wrapper } from './styles';

export function CancelPlanModal({ open, onClose, planId }: ICancelPlanModal) {
  const {
    handRemove,
    handleSubmitRequest,
    step,
    handReset,
    reasonList,
    canceling,
    updateCancellationReason,
    selectedReason,
  } = useCancelModal(planId);

  const handleClose = () => {
    onClose();
    handReset();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      size={step === 'submit' ? ModalSize.S : ModalSize.L}
      enableCloseButton={step === 'feedback'}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <ModalHeader topPadding={0}>
        {step === 'submit' ? 'Cancel Plan' : 'Cancellation Request'}
      </ModalHeader>
      <ModalBody gap={16} flexDirection="column">
        <Stack vertical fullWidth gap={16}>
          <TSpan
            font="body-l"
            colorToken="--text-card-neutral-default"
            textAlign={step === 'submit' ? 'center' : 'justify'}
          >
            {step === 'submit'
              ? 'Noums under this plan will expire at the end of the last period has been paid for.'
              : 'To initiate the cancellation of your subscription, kindly use our provided contact form and submit a cancellation request. All your Noums covered with this plan will be archived.'}
          </TSpan>
          <TSpan
            font="body-l"
            colorToken="--text-card-neutral-default"
            textAlign={step === 'submit' ? 'center' : 'justify'}
          >
            {step === 'submit'
              ? 'Are you sure to cancel this plan?'
              : ' What is the main reason hou have decided to cancel your subscription?'}
          </TSpan>
        </Stack>
        {step === 'feedback' &&
          reasonList.length > 0 &&
          reasonList.map((reason) => (
            <Wrapper borderBottom key={reason.label} gap={16}>
              <Stack vertical fullWidth>
                <TSpan font="body-l-bold">{reason.label}</TSpan>
                <TSpan font="body-m" colorToken="--text-card-neutral-default">
                  {reason.description}
                </TSpan>
              </Stack>
              <Radiobox
                isChecked={selectedReason === reason.label}
                onChange={() => {
                  updateCancellationReason(reason.label);
                }}
              />
            </Wrapper>
          ))}
      </ModalBody>
      <ModalFooter
        flexDirection={step === 'submit' ? 'column' : 'row'}
        gap={16}
      >
        <Button
          primary={step === 'submit'}
          tertiary={step === 'feedback'}
          size="full"
          onClick={handleClose}
        >
          {step === 'submit' ? 'No, Keep It Active' : 'Cancel'}
        </Button>
        <Button
          secondary={step === 'submit'}
          primary={step === 'feedback'}
          disabled={step === 'submit' ? false : canceling || !selectedReason}
          loading={canceling}
          size="full"
          onClick={() => {
            if (step === 'submit') {
              handRemove();
            } else {
              handleSubmitRequest();
            }
          }}
        >
          {step === 'submit' ? ' Yes, Cancel This Plan' : 'Send Request'}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
