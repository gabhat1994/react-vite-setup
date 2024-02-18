import { useTranslation } from 'react-i18next';
import { ModalBody, ModalFooter } from '@/components/ExtendedModal';
import { Button, TSpan } from '@/components';
import { type IFailure } from './type';

export const Failure = ({ onClose }: IFailure) => {
  const { t } = useTranslation();

  return (
    <>
      <ModalBody isFullScreen={false}>
        <TSpan
          font="body-l"
          colorToken="--text-modal-neutral-default"
          textAlign="center"
        >
          {t(`noumena.money.money-detail.verifaction_failed_sub_heading`)}
        </TSpan>
      </ModalBody>
      <ModalFooter isFullScreen={false}>
        <Button size="full" tertiary onClick={onClose}>
          {t(`noumena.okClose`)}
        </Button>
      </ModalFooter>
    </>
  );
};
