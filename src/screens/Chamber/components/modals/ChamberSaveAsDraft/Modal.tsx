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
  useNoumLayoutAsDraftHelper,
  useSaveAsDraftSpaceHelper,
} from '@/features/noums/hooks/spaceQuery';
import { useToast } from '@/hooks';
import { Spacer } from '@/layout';
import {
  WrapperLoading,
  WrapperSpinner,
} from '@/screens/Chamber/components/ElementWrapper/styles';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ChamberSaveAsDraftProps {
  spaceId: string;
  isOpen: boolean;
  space?: SpaceOutputFragment;
  handleClose: () => void;
  emptyElementErrorMessage?: string | undefined | null;
}

const ChamberSaveAsDraft = memo((props: ChamberSaveAsDraftProps) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [waiting, setWaiting] = useState(false);
  const { saveAsDraftSpaceHelper, loading } = useSaveAsDraftSpaceHelper();
  const { noumLayoutAsDraftHelper, loading: saveAsDraftLoading } =
    useNoumLayoutAsDraftHelper();

  const handleConfirm = async () => {
    if (props.emptyElementErrorMessage) {
      addToast('error', 'none', props.emptyElementErrorMessage);
      props.handleClose();
    } else {
      setWaiting(true);

      await noumLayoutAsDraftHelper(props.spaceId);
      await saveAsDraftSpaceHelper(props.spaceId, props.space);
      setWaiting(false);
      props.handleClose();
    }
  };

  return (
    <Modal
      testId="testChamberSaveAsDraft"
      open={props.isOpen || loading}
      onClose={props.handleClose}
      size={ModalSize.S}
      disableBackdropClick
    >
      {waiting || loading || saveAsDraftLoading ? (
        <WrapperLoading>
          <WrapperSpinner>
            <Spinner />
            <Spacer height="20px" />
          </WrapperSpinner>
          <Spacer height="16px" />
          <TSpan
            data-testid="bodyChamberSaveAsDraftSaving"
            font="body-l"
            colorToken="--text-modal-neutral-default"
          >
            {t(`noumena.container.chamber_save_as_draft.body.loading`)}
          </TSpan>
        </WrapperLoading>
      ) : (
        <>
          <ModalHeader data-testid="titleChamberSaveAsDraft">
            {t(`noumena.container.chamber_save_as_draft.title`)}
          </ModalHeader>
          <ModalBody style={{ textAlign: 'center' }}>
            <TSpan
              colorToken="--text-modal-neutral-default"
              data-testid="bodyChamberSaveAsDraft"
              font="body-l"
            >
              {t(`noumena.container.chamber_save_as_draft.body`)}
            </TSpan>
          </ModalBody>
          <ModalFooter flexDirection="column" gap={16}>
            <Button
              data-testid="confirmChamberSaveAsDraft"
              primary
              size="full"
              onClick={handleConfirm}
            >
              {t(`noumena.container.chamber_save_as_draft.confirm`)}
            </Button>
            <Button
              data-testid="cancelChamberSaveAsDraft"
              tertiary
              size="full"
              onClick={props.handleClose}
            >
              {t(`noumena.container.chamber_save_as_draft.cancel`)}
            </Button>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
});

export default ChamberSaveAsDraft;
