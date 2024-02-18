import { Icon } from '@/components/Icon';

import React from 'react';
import { NetworkStatus } from '@apollo/client';
import { ElementWrapperV2 } from '@/screens/Chamber/components/ElementWrapperV2';
import { useTranslation } from 'react-i18next';
import { ButtonUtils } from '@/components/Button/utils';
import { useFileManagerElementContext } from '../../providers/FileManagerElementProvider';
import { FileManagerSearch } from '../FileManagerSearch/FileManagerSearch';
import {
  AddButton,
  FileManagerSearchWrapper,
  HeaderRightWrapper,
} from './styles';

type FileManagerHeaderProps = {};

const FileManagerHeader: React.FC<FileManagerHeaderProps> = () => {
  const { t } = useTranslation();
  const {
    setShowAddFileModal,
    hasFiles,
    isEditing,
    searchQuery,
    networkStatus,
    currentTitle,
    hasUploadFilePermission,
  } = useFileManagerElementContext();

  const showSearch =
    hasFiles || !!searchQuery || networkStatus === NetworkStatus.setVariables;

  const showAddButton = !isEditing && (hasFiles || !!searchQuery);

  return (
    <ElementWrapperV2.Header title={currentTitle}>
      <HeaderRightWrapper>
        {showSearch ? (
          <FileManagerSearchWrapper>
            <FileManagerSearch />
          </FileManagerSearchWrapper>
        ) : null}
        {showAddButton && (
          <AddButton
            data-testid="add-button"
            onClick={() => setShowAddFileModal(true)}
            size="small"
            secondary
            icon={
              <Icon
                name="add_s"
                size={16}
                color="--icon-button-brand-secondary-default"
              />
            }
            disabled={!hasUploadFilePermission}
            {...ButtonUtils.getTooltipProps({
              message: t('noumena.file_manager.no_permission.upload_file'),
              visible: !hasUploadFilePermission,
            })}
          />
        )}
      </HeaderRightWrapper>
    </ElementWrapperV2.Header>
  );
};

export default FileManagerHeader;
