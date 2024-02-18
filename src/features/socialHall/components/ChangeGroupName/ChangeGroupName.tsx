import React, { useCallback, useEffect, useState } from 'react';
import { t } from 'i18next';
import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';
import { useSocialHallContext, useSocialHallEventContext } from '@/providers';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { useSocialHallData } from '@/features/socialHall/hooks';
import { type ChangeGroupNameProps } from './types';

export const ChangeGroupNameModal = ({
  isOpen,
  onClose,
}: ChangeGroupNameProps) => {
  const [groupName, setGroupName] = useState<string>('');
  const { groupName: originalGroupName } = useSocialHallEventContext();
  const { groupId } = useSocialHallContext();
  const { handleChangeGroupName, isChangingGroupName } = useSocialHallData();

  const handleCancel = useCallback(() => {
    setGroupName('');
    onClose();
  }, [onClose]);

  const onConfirm = useCallback(async () => {
    const result = await handleChangeGroupName(groupId!, groupName);
    if (result) {
      handleCancel();
    }
  }, [groupId, groupName, handleChangeGroupName, handleCancel]);

  const onChangeGroupName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.value.replace(/\s/g, '')) {
        setGroupName('');
      } else {
        setGroupName(e.target.value);
      }
    },
    [],
  );

  useEffect(() => {
    if (isOpen && originalGroupName) {
      setGroupName(originalGroupName);
    }
  }, [isOpen, originalGroupName]);

  return (
    <Modal
      data-testid="change-group-name-modal"
      open={isOpen}
      onClose={handleCancel}
      size={ModalSize.M}
      enableCloseButton
      disableBackdropClick
    >
      <ModalHeader>
        {t('noumena.social_hall.change_group_name.title')}
      </ModalHeader>
      <ModalBody overflowY="initial">
        <TSpan
          font="body-l"
          textAlign="center"
          colorToken="--text-body-neutral-default"
        >
          {t('noumena.social_hall.change_group_name.description')}
        </TSpan>
        <Spacer height={16} />
        <TextField
          label={t('noumena.social_hall.change_group_name.label')}
          value={groupName}
          onChange={onChangeGroupName}
          maxLength={50}
          fullWidth
          hideLengthHelperText
        />
      </ModalBody>
      <ModalFooter gap={16}>
        <Button
          tertiary
          intent="negative"
          size="full"
          onClick={handleCancel}
          data-testid="cancel-button"
        >
          {t('noumena.social_hall.change_group_name.cancel_btn')}
        </Button>
        <Button
          primary
          size="full"
          onClick={onConfirm}
          data-testid="confirm-button"
          disabled={!groupName}
          loading={isChangingGroupName}
        >
          {t('noumena.social_hall.change_group_name.confirm_btn')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
