import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { useBreakpoints } from '@/hooks';
import { type IAddFundingSourceForm } from './type';

export const AccountNotFoundInPlaid = (props: IAddFundingSourceForm) => {
  const { t } = useTranslation();
  const { isMobile } = useBreakpoints();
  const { open, onClose, openFundingSourceModal } = props;

  return (
    <Modal
      isFullScreen={false}
      enableCloseButton={false}
      size={isMobile ? ModalSize.S : ModalSize.M}
      disableBackdropClick
      disableEscapeKeyDown
      closeButtonStyles={{ tertiary: true, enforceRight: true }}
      onClose={onClose}
      open={open}
    >
      <ModalHeader isFullScreen={false} topPadding={0} maxTitleWidth={312}>
        {t(`noumena.money.money-detail.unable_to_connect_account`)}
      </ModalHeader>
      <ModalBody
        isFullScreen={false}
        gap={16}
        align={isMobile ? 'center' : 'flex-start'}
      >
        <TSpan
          font="body-l"
          colorToken="--text-modal-neutral-default"
          textAlign={isMobile ? 'center' : 'start'}
        >
          {t(
            `noumena.money.money-detail.unable_to_connect_account_sub_heading_1`,
          )}
        </TSpan>
        <TSpan
          font="body-l"
          colorToken="--text-modal-neutral-default"
          textAlign={isMobile ? 'center' : 'start'}
        >
          {t(
            `noumena.money.money-detail.unable_to_connect_account_sub_heading_2`,
          )}
        </TSpan>
      </ModalBody>
      <ModalFooter
        isFullScreen={false}
        gap={16}
        flexDirection={isMobile ? 'column' : 'row-reverse'}
      >
        <Button size="full" primary onClick={openFundingSourceModal}>
          {t(`noumena.money.money-detail.Continue`)}
        </Button>
        <Button size="full" tertiary onClick={onClose}>
          {t(`noumena.cancel`)}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
