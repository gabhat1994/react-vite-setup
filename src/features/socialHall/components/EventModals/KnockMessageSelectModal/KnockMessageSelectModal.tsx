import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Spacer } from '@/layout';
import { Icon } from '@/components/Icon';
import { Radiobox } from '@/components/Radiobox';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/Button';
import { useSocialHallCallContext } from '@/providers';
import { declineMessages, knockMessages } from './data';
import { Description, DescriptionSpan } from './styles';

export enum KnockMessageModalTypeEnum {
  knock = 'KNOCK',
  decline = 'DECLINE',
}

type KnockMessageSelectModalProps = {
  isOpen: boolean;
  onClose: (message: string | null) => void;
  modalType: KnockMessageModalTypeEnum;
};

export const KnockMessageSelectModal = ({
  isOpen,
  onClose,
  modalType,
}: KnockMessageSelectModalProps) => {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<number | null>();
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] =
    useState<{ key: number; description: string }[]>(knockMessages);
  const { setMessages: setSocialHallMessages } = useSocialHallCallContext();
  const handleClickItem = useCallback(
    (itemId: number) => {
      setSelectedId(itemId);
      setMessage('');
      if (itemId !== 3) {
        setMessage(messages[itemId].description);
      }
    },
    [messages],
  );

  const handleClickKnock = useCallback(() => {
    setSocialHallMessages([]);
    onClose(message);
  }, [message, onClose, setSocialHallMessages]);

  useEffect(() => {
    if (modalType === KnockMessageModalTypeEnum.knock) {
      setMessages(knockMessages);
    } else {
      setMessages(declineMessages);
    }
  }, [modalType]);

  return (
    <Modal
      open={isOpen}
      onClose={() => onClose(null)}
      testId="knock-message-select-modal"
      enableCloseButton
      size={ModalSize.L}
      disableBackdropClick
    >
      <ModalHeader>
        {t(
          modalType === KnockMessageModalTypeEnum.knock
            ? 'noumena.social_hall.knock_modal.title'
            : 'noumena.social_hall.decline_modal.title',
        )}
      </ModalHeader>
      <ModalBody>
        {messages.map((item, index) => (
          <Description
            isLast={messages.length - 1 === index}
            key={item.key}
            onClick={() => handleClickItem(item.key)}
          >
            <Radiobox
              icon={
                item.key === selectedId ? (
                  <Icon
                    name="radio_btn_m"
                    size={12}
                    color="--icon-radiobutton-brand-primary-default"
                  />
                ) : undefined
              }
              isChecked={item.key === selectedId}
            />
            {item.key === selectedId && item.key === 3 ? (
              <TextField
                label={item.description}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                hideLengthHelperText
              />
            ) : (
              <DescriptionSpan
                font="body-l"
                colorToken="--text-tablecell-header-neutral-highlighted"
              >
                {item.description}
              </DescriptionSpan>
            )}
          </Description>
        ))}
      </ModalBody>
      <Spacer height={16} />
      <ModalFooter gap={16} flexDirection="row" marginTop={12}>
        <Button
          tertiary
          size="full"
          onClick={() => onClose(null)}
          data-testid="cancel-button"
        >
          {t(
            modalType === KnockMessageModalTypeEnum.knock
              ? 'noumena.cancel'
              : 'noumena.close',
          )}
        </Button>
        <Button
          primary
          size="full"
          onClick={handleClickKnock}
          data-testid="knock-button"
        >
          {t(
            modalType === KnockMessageModalTypeEnum.knock
              ? 'noumena.social_hall.knock'
              : 'noumena.chamber.decline_button',
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
