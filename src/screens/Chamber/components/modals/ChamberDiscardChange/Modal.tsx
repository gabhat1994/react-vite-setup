import { type SpaceOutputFragment } from '@/apollo/graphql';
import { Button } from '@/components/Button';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Spinner } from '@/components/Spinner';
import { TSpan } from '@/components/Typography';
import {
  useCancelNoumLayoutChangesHelper,
  useDiscardSpaceChangeHelper,
  useNoumLayoutAsDraftHelper,
  useSaveAsDraftSpaceHelper,
} from '@/features/noums/hooks/spaceQuery';
import { Spacer } from '@/layout';
import {
  WrapperLoading,
  WrapperSpinner,
} from '@/screens/Chamber/components/ElementWrapper/styles';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ChamberDiscardChangeProps {
  spaceId: string;
  space?: SpaceOutputFragment;
  isOpen: boolean;
  handleClose: () => void;
  handleSuccess: () => void;
}

export const ChamberDiscardChange = memo((props: ChamberDiscardChangeProps) => {
  const { t } = useTranslation();
  const [waiting, setWaiting] = useState(false);
  const { discardSpaceChangeHelper, loading: discardLoading } =
    useDiscardSpaceChangeHelper();
  const { saveAsDraftSpaceHelper, loading: saveLoading } =
    useSaveAsDraftSpaceHelper();
  const { noumLayoutAsDraftHelper, loading: saveAsDraftLoading } =
    useNoumLayoutAsDraftHelper();
  const { cancelNoumLayoutChangesHelper, loading: cancelLoading } =
    useCancelNoumLayoutChangesHelper();

  const handleConfirm = async () => {
    setWaiting(true);

    setTimeout(async () => {
      await cancelNoumLayoutChangesHelper(props.spaceId);
      await discardSpaceChangeHelper(props.spaceId);
      setWaiting(false);
      props.handleClose();
      props.handleSuccess();
    }, 1000);
  };

  const handleSaveAsDraft = async () => {
    setWaiting(true);

    setTimeout(async () => {
      await noumLayoutAsDraftHelper(props.spaceId);
      await saveAsDraftSpaceHelper(props.spaceId, props.space);
      setWaiting(false);
      props.handleClose();
      props.handleSuccess();
    }, 1000);
  };

  const message = saveLoading
    ? t(`noumena.container.chamber_save_as_draft.body.loading`)
    : t(`noumena.container.chamber_discard_change.body.loading`);

  return (
    <Modal
      testId="testChamberDiscardChange"
      open={props.isOpen || discardLoading || saveLoading}
      onClose={props.handleClose}
      size={ModalSize.S}
      disableBackdropClick
    >
      {waiting ||
      discardLoading ||
      saveLoading ||
      saveAsDraftLoading ||
      cancelLoading ? (
        <WrapperLoading>
          <WrapperSpinner>
            <Spinner />
            <Spacer height="20px" />
          </WrapperSpinner>
          <Spacer height="16px" />

          <TSpan
            colorToken="--text-modal-neutral-default"
            data-testid="bodyChamberDiscardChangeSaving"
            font="body-l"
          >
            {message}
          </TSpan>
        </WrapperLoading>
      ) : (
        <>
          <ModalHeader data-testid="titleChamberDiscardChange">
            {t(`noumena.container.chamber_discard_change.title`)}
          </ModalHeader>
          <ModalBody align="center">
            <TSpan
              colorToken="--text-modal-neutral-default"
              data-testid="bodyChamberDiscardChange"
              font="body-l"
              textAlign="center"
            >
              {t(`noumena.container.chamber_discard_change.body`)}
            </TSpan>
          </ModalBody>
          <ModalFooter flexDirection="column" gap={16}>
            <Button
              data-testid="confirmChamberDiscardChange"
              primary
              intent="negative"
              size="full"
              onClick={handleConfirm}
            >
              {t(`noumena.container.chamber_discard_change.discard_changes`)}
            </Button>
            <Button
              data-testid="saveAsDraftChamberDiscardChange"
              tertiary
              size="full"
              onClick={handleSaveAsDraft}
            >
              {t(`noumena.container.chamber_discard_change.save_as_a_draft`)}
            </Button>
            <Button
              data-testid="continueEditingChamberDiscardChange"
              tertiary
              size="full"
              onClick={() => props.handleClose()}
            >
              {t(`noumena.container.chamber_discard_change.continue_editing`)}
            </Button>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
});

export default ChamberDiscardChange;
