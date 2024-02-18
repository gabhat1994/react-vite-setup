import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { useBreakpoints } from '@/hooks';
import { Stack } from '@/layout';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FileList from '../../elements/FileManagerElement/components/FileList';
import { FileManagerSearch } from '../../elements/FileManagerElement/components/FileManagerSearch/FileManagerSearch';
import { FileManagerTabs } from '../../elements/FileManagerElement/components/FileManagerTabs';

type FileManagerShowAllModalProps = {
  isOpenModal: boolean;
  onClose: () => void;
};
export const FileManagerShowAllModal: React.FC<
  FileManagerShowAllModalProps
> = ({ isOpenModal, onClose }) => {
  const { t } = useTranslation();
  const { isDesktop, isMobile } = useBreakpoints();

  return (
    <Modal
      isFullScreen={!isDesktop}
      open={isOpenModal}
      testId="file-manager-show-all-modal"
      onClose={onClose}
      disableBackdropClick
      size={ModalSize.XL}
      spacingMode="gap-content"
      enableCloseButton
    >
      <ModalHeader>
        {t('noumena.file_manager.modal.all_files.title')}
      </ModalHeader>

      <ModalBody>
        <Stack fullWidth vertical>
          <Stack fullWidth padding={isMobile ? '0 16px' : undefined}>
            <FileManagerSearch />
          </Stack>

          <FileManagerTabs />
        </Stack>

        <Stack vertical gap={16} fullWidth padding="16px 0 0">
          <FileList />
        </Stack>
      </ModalBody>
    </Modal>
  );
};
