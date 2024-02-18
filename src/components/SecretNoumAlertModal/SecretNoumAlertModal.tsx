import React, { useState } from 'react';
import { Modal } from '@/components/ExtendedModal/Modal';
import { Stack } from '@/layout';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { Accordion } from '@/components/Accordion';
import { Infobox } from '@/components/Infobox';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Separator } from '@/components/Separator/Separator';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import S from './styles';

const typesOfUsers = [
  {
    title: 'Noumena Member',
    description: 'Registered app users with full access.',
  },
  {
    title: 'Non-Noumena Member',
    description:
      'Users invited by members and authenticated by Noumena. Can view certain pages.',
  },
  {
    title: 'External Guest User',
    description: `Guest access for non-registered users without a member invitation. Can view documents issued by members and take actions such as:
    • View and Pay Invoices
    • View and Sign Contracts and Statements of Work`,
  },
];

type SecretNoumAlertModalProps = {
  isOpenModal: boolean;
  warningText: string;
  description: string | React.ReactElement;
  title: string;
  onClose: () => void;
};

const SecretNoumAlertModal: React.FC<SecretNoumAlertModalProps> = ({
  isOpenModal,
  warningText,
  description,
  title,
  onClose,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { isMobile } = useBreakpoints();

  return (
    <Modal
      isFullScreen={isMobile}
      open={isOpenModal}
      testId="update_invoice_modal"
      size={ModalSize.L}
      onClose={onClose}
      disableBackdropClick
      isScrollableContent
      enableCloseButton
    >
      <ModalHeader>
        <TSpan
          font="heading-xs-bold"
          colorToken="--text-modal-header-neutral-default"
        >
          {title}
        </TSpan>
      </ModalHeader>
      <ModalBody>
        <Stack gap={16} padding={14} vertical align="center" justify="center">
          <Infobox type="negative">{warningText}</Infobox>

          <S.DescriptionText
            font="body-l"
            colorToken="--text-modal-neutral-default"
          >
            {description}
          </S.DescriptionText>

          <Accordion
            expanded={expanded}
            onToggle={() => setExpanded((prev) => !prev)}
            title="Types of Users"
            headerPadding="8px 0 16px 0"
            borders={[]}
          >
            <>
              {typesOfUsers.map((item, index) => (
                <Stack
                  key={item.title}
                  vertical
                  gap={12}
                  fullWidth
                  padding="0 0 12px 0"
                >
                  <Stack vertical fullWidth>
                    <TSpan
                      font="body-l-bold"
                      colorToken="--text-tablecell-header-neutral-highlighted"
                    >
                      {item.title}
                    </TSpan>
                    <S.DescriptionText
                      font="body-m"
                      colorToken="--text-tablecell-body-neutral-default"
                    >
                      {item.description}
                    </S.DescriptionText>
                  </Stack>
                  {index !== typesOfUsers.length - 1 && (
                    <Separator fullWidth noMargin />
                  )}
                </Stack>
              ))}
            </>
          </Accordion>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <Button primary onClick={onClose} size="full" testId="close_btn">
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SecretNoumAlertModal;
