import { Button, TSpan } from '@/components';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Radiobox } from '@/components/Radiobox';
import { Separator } from '@/components/Separator/Separator';
import { useBreakpoints, useToast } from '@/hooks';
import { Stack } from '@/layout';
import { useState } from 'react';

type ResignFlowProps = {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: (disconnectFromNoum: boolean) => void;
};

export function ResignFlow({
  isOpen,
  loading,
  onClose,
  onConfirm,
}: ResignFlowProps) {
  const [selectedOption, setSelectedOption] = useState<
    'disconnect' | 'stay-connected'
  >();

  const { addErrorToast } = useToast();

  const { isMobile } = useBreakpoints();

  const handleConfirm = () => {
    if (!selectedOption) {
      addErrorToast('Select one of the options.');
      return;
    }
    onConfirm(selectedOption === 'disconnect');
  };

  return (
    <Modal
      open={isOpen}
      size={ModalSize.L}
      isFullScreen={isMobile}
      onClose={onClose}
      testId="resign-flow-modal"
      disableBackdropClick
    >
      <ModalHeader topPadding={0}>Resign from the Manager Role</ModalHeader>
      <ModalBody gap={32}>
        <TSpan font="body-l" colorToken="--text-modal-neutral-default">
          Once you decide to resign, you will no longer have access to the
          management tools and features associated with the Manager role.
        </TSpan>

        <Stack gap={20} vertical fullWidth padding="0 0 16px 0">
          <Stack gap={16}>
            <Radiobox
              isChecked={selectedOption === 'stay-connected'}
              onChange={() => setSelectedOption('stay-connected')}
            />
            <TSpan
              font="body-l"
              colorToken="--text-tablecell-header-neutral-highlighted"
            >
              Resign and stay connected as a guest
            </TSpan>
          </Stack>

          <Separator fullWidth noMargin />

          <Stack gap={16}>
            <Radiobox
              isChecked={selectedOption === 'disconnect'}
              onChange={() => setSelectedOption('disconnect')}
            />
            <TSpan
              font="body-l"
              colorToken="--text-tablecell-header-neutral-highlighted"
            >
              Resign and disconnect from Noum
            </TSpan>
          </Stack>
        </Stack>
      </ModalBody>

      <ModalFooter
        isFullScreen={isMobile}
        gap={16}
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <Button
          tertiary
          size="full"
          onClick={onClose}
          data-testid="confirm-button"
        >
          Cancel
        </Button>
        <Button
          intent="negative"
          size="full"
          softDisabled={!selectedOption}
          onClick={handleConfirm}
          loading={loading}
        >
          Resign
        </Button>
      </ModalFooter>
    </Modal>
  );
}
