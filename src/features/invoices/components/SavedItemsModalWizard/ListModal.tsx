import React from 'react';
import { Modal } from '@/components/ExtendedModal/Modal';
import { Stack } from '@/layout';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Icon } from '@/components/Icon';
import { type InvoiceLineItem } from '@/apollo/generated/types';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import S from './styles';
import { InvoiceUtils } from '../../utils/invoice';

type ListModalProps = {
  isOpenModal: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  items: InvoiceLineItem[];
};

export const ListModal: React.FC<ListModalProps> = ({
  isOpenModal,
  items = [],
  onDelete,
  onEdit,
  onClose,
}) => {
  const { isMobile } = useBreakpoints();

  return (
    <Modal
      isFullScreen={isMobile}
      open={isOpenModal}
      testId="saved_items_list_modal"
      size={ModalSize.L}
      onClose={onClose}
      enableCloseButton
      isScrollableContent
      disableBackdropClick
    >
      <ModalHeader>Saved Products & Services</ModalHeader>
      <ModalBody hasScrollBar>
        <Stack gap={16} padding={14} vertical fullWidth>
          {items.map((item) => (
            <S.ListItem align="center" fullWidth justify="space-between">
              <TSpan
                colorToken="--text-card-neutral-highlighted"
                font="body-m-bold"
              >
                {item.description}
              </TSpan>

              <Stack align="center" gap={4}>
                <TSpan font="body-m" colorToken="--text-card-neutral-default">
                  {InvoiceUtils.formatAmount(item.unitPrice.toFixed(2))}
                </TSpan>
                <Button
                  neutral
                  onClick={() => onEdit(item.id)}
                  size="small"
                  icon={
                    <Icon
                      name="edit_m"
                      color="--icon-button-brand-primary-default"
                      size={16}
                    />
                  }
                />
                <Button
                  neutral
                  onClick={() => onDelete(item.id)}
                  size="small"
                  icon={
                    <Icon
                      name="delete_m"
                      size={16}
                      color="--icon-tablecell-danger-primary-default"
                    />
                  }
                />
              </Stack>
            </S.ListItem>
          ))}
        </Stack>
      </ModalBody>
      <ModalFooter>
        <Stack fullWidth gap={16}>
          <Button size="full" tertiary loading={false} onClick={onClose}>
            Close
          </Button>
        </Stack>
      </ModalFooter>
    </Modal>
  );
};
