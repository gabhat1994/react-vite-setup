import { Button, TSpan } from '@/components';
import {
  Modal,
  ModalSize,
  type IModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@/components/ExtendedModal';
import { Radiobox } from '@/components/Radiobox';
import { type LinkOption } from '@/features/money/hooks';
import { Stack } from '@/layout';

type LinkNoumToSubscriptionModalProps = Pick<IModal, 'onClose' | 'open'> & {
  loading: boolean;
  isLastPlanInHierarchy: boolean;
  linkOption?: LinkOption;
  availableSlotsinExistingPlan: number;
  onUpdateLinkOption: (option: LinkOption) => void;
  onActionButtonClick: () => void;
};

export function LinkNoumToSubscriptionModal({
  onClose,
  open,
  linkOption,
  availableSlotsinExistingPlan,
  onUpdateLinkOption,
  loading,
  onActionButtonClick,
  isLastPlanInHierarchy,
}: LinkNoumToSubscriptionModalProps) {
  const showUpgradePlanMessage =
    !isLastPlanInHierarchy && availableSlotsinExistingPlan === 0;
  const showHighestPlanMessage =
    isLastPlanInHierarchy && availableSlotsinExistingPlan === 0;
  const showDefaultMessage =
    !isLastPlanInHierarchy && availableSlotsinExistingPlan > 0;
  return (
    <>
      <Modal
        size={ModalSize.L}
        open={open}
        onClose={onClose}
        enableCloseButton
        disableBackdropClick
        enableAnimation
      >
        <ModalHeader topPadding={0}>Link Noum To Plan</ModalHeader>
        <ModalBody flexDirection="column" gap={16}>
          <TSpan colorToken="--text-modal-neutral-default" font="body-l">
            To link this Noum, you have two options:
          </TSpan>
          <Stack fullWidth gap={16} align="center">
            <Stack maxWidth="90%" fullWidth vertical>
              <TSpan
                font="body-l-bold"
                colorToken="--text-tablecell-header-neutral-highlighted"
              >
                Use Your Membership Plan Slot
              </TSpan>
              <TSpan
                font="body-m"
                colorToken="--text-tablecell-body-neutral-default"
              >
                {showDefaultMessage &&
                  'You have an available slot in your Membership Plan. You can unarchive this Noum without any additional cost'}
                {showHighestPlanMessage &&
                  'Your current plan is highest plan. You have exhausted all your slots. Please use Pay As You Go options'}
                {showUpgradePlanMessage &&
                  'You have exhausted all your slots of current plan. Please upgrade'}
              </TSpan>
            </Stack>
            <Radiobox
              isChecked={linkOption === 'existing-pan'}
              disableClick={
                availableSlotsinExistingPlan === 0 && isLastPlanInHierarchy
              }
              onChange={() => onUpdateLinkOption('existing-pan')}
            />
          </Stack>
          <Stack fullWidth gap={16} align="center">
            <Stack maxWidth="90%" fullWidth vertical>
              <TSpan
                font="body-l-bold"
                colorToken="--text-tablecell-header-neutral-highlighted"
              >
                Buy a Pay as You Go Plan
              </TSpan>
              <TSpan
                font="body-m"
                colorToken="--text-tablecell-body-neutral-default"
              >
                Pay as You Go Plans allow you to unarchive Noums on a per-use
                basis.
              </TSpan>
            </Stack>
            <Radiobox
              isChecked={linkOption === 'pay-as-you-go'}
              onChange={() => onUpdateLinkOption('pay-as-you-go')}
            />
          </Stack>
        </ModalBody>
        <ModalFooter gap={16} justifyContent="center">
          <Button size="full">Cancel</Button>
          <Button
            primary
            size="full"
            disabled={!linkOption || loading}
            loading={loading}
            onClick={onActionButtonClick}
          >
            Link
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
