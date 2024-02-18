import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Spacer } from '@/layout';
import { Spinner } from '@/components/Spinner';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useCreateRiseApplicationNoumHelper } from '@/features/noums/hooks/spaceQuery';
import { WrapperLoading, WrapperSpinner } from '../../ElementWrapper/styles';
import type RiseProgramCreateNoumProps from './types';

export const RiseProgramCreateNoum: React.FC<RiseProgramCreateNoumProps> = ({
  onClose,
  setRiseApplicationNoumId,
  setOpenAlreadyCreated,
}) => {
  const { t } = useTranslation();
  const { createRiseApplicationNoumHelper, loading } =
    useCreateRiseApplicationNoumHelper();
  const { space } = useNoumContext();
  const navigate = useNavigate();

  const handleCreateRiseApplication = useCallback(async () => {
    const { id, alredayCreated } = await createRiseApplicationNoumHelper(
      space?._id!,
    );
    if (alredayCreated && id) {
      setRiseApplicationNoumId(id);
      setOpenAlreadyCreated(true);
      onClose();
    } else {
      onClose();
      if (id) navigate(`/noum/${id}`);
    }
  }, [
    createRiseApplicationNoumHelper,
    navigate,
    onClose,
    setOpenAlreadyCreated,
    setRiseApplicationNoumId,
    space?._id,
  ]);

  return (
    <>
      <Modal
        open
        testId="rise-program-create-noum"
        onClose={onClose}
        size={ModalSize.S}
        disableBackdropClick
      >
        {' '}
        {loading ? (
          <WrapperLoading>
            <WrapperSpinner>
              <Spinner />
              <Spacer height="20px" />
            </WrapperSpinner>
            <Spacer height="16px" />
            <TSpan
              data-testid="bodyElementDeleteSaving"
              font="body-l"
              colorToken="--text-modal-neutral-default"
            >
              {t(`noumena.riseprogram.create_rise_application.loading`)}
            </TSpan>
          </WrapperLoading>
        ) : (
          <>
            <ModalHeader>
              {t('noumena.chamber.riseprogram.create_noum_modal_heading')}
            </ModalHeader>
            <ModalBody align="center">
              <TSpan
                colorToken="--text-modal-neutral-default"
                font="body-l"
                textAlign="center"
              >
                {t('noumena.chamber.riseprogram.create_noum_modal_body')}
              </TSpan>
            </ModalBody>
            <ModalFooter flexDirection="column" gap={16}>
              <Button
                testId="chamber-disconnect-button"
                primary
                align="center"
                size="full"
                onClick={handleCreateRiseApplication}
              >
                {t(
                  'noumena.chamber.riseprogram.create_noum_modal.submitButton',
                )}
              </Button>
              <Button
                testId="chamber-close-button"
                align="center"
                size="full"
                onClick={onClose}
              >
                {t(
                  'noumena.chamber.riseprogram.create_noum_modal.cancelButton',
                )}
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </>
  );
};
