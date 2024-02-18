import React from 'react';
import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { useSubmitRiseApplicationMutation } from '@/apollo/graphql';
import { useError } from '@/hooks';
import { useAuth } from '@/features/auth/contexts/AuthContext/AuthContext';
import { trackEvent } from '@/utils/tracking';
import { ApplicationResultStatus } from '@/apollo/generated/types';
import EVENTS from '@/constants/trackingEvents';
import { Spinner } from '@/components';
import { Stack } from '@/layout';
import { type ISubmitRiseApplication } from './types';
import { WrapperLoading, WrapperSpinner } from '../../../ElementWrapper/styles';

export const SubmitRiseApplicationModal: React.FC<ISubmitRiseApplication> = ({
  onClose,
  open,
  applicationId,
  refresh,
  resultJson,
}) => {
  const { t } = useTranslation();
  const { logError } = useError();
  const { user } = useAuth();

  const [submitApplication, { loading }] = useSubmitRiseApplicationMutation({
    onCompleted: () => {
      trackEvent(EVENTS.RISE.APPLICATION_SUBMIT, {
        UUID: user?._id,
      });
      refresh();
      onClose();
    },
    onError: (error) => {
      logError(error, 'submit-rise-application', true);
    },
  });

  const handleSubmitButtonClick = () => {
    if (!applicationId) return;
    submitApplication({
      variables: {
        _id: applicationId,
        input: {
          resultJSON: resultJson,
          status: ApplicationResultStatus.Submitted,
        },
      },
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size={ModalSize.S}
      disableBackdropClick
      disableEscapeKeyDown
    >
      {loading ? (
        <WrapperLoading>
          <Stack vertical gap={20}>
            <WrapperSpinner>
              <Spinner />
            </WrapperSpinner>
            <TSpan
              font="body-l"
              colorToken="--text-body-neutral-default"
              textAlign="center"
            >
              {t('noumena.chamber.rise.submitting_application')}
            </TSpan>
          </Stack>
        </WrapperLoading>
      ) : (
        <>
          <ModalHeader>
            {t('noumena.chamber.rise.submit_my_application')}
          </ModalHeader>
          <ModalBody align="center">
            <TSpan
              font="body-l"
              textAlign="center"
              colorToken="--text-modal-neutral-default"
            >
              {t('noumena.chamber.rise.submit_my_application_modal_info')}
            </TSpan>
          </ModalBody>
          <ModalFooter flexDirection="column" gap={16}>
            <Button
              primary
              align="center"
              size="full"
              onClick={handleSubmitButtonClick}
            >
              {t('noumena.submit')}
            </Button>
            <Button align="center" size="full" onClick={onClose}>
              {t('noumena.cancel')}
            </Button>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
};
