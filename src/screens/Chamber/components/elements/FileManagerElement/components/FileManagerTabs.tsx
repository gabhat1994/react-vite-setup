import { NoumFilesFilterType } from '@/apollo/generated/types';
import { BasicChipsTabsForm } from '@/components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NetworkStatus } from '@apollo/client';
import { type InputListTypes } from '@/components/Tabs/types';
import { compact } from 'lodash';
import { useFileManagerElementContext } from '../providers/FileManagerElementProvider';

export const FileManagerTabs: React.FC = () => {
  const { t } = useTranslation();

  const {
    filterType,
    setFilterType,
    networkStatus,
    hasFiles,
    searchQuery,
    hasDownloadAnyFilePermission,
    hasDownloadFilesOnlyUploadedBySelfPermission,
  } = useFileManagerElementContext();

  const showFileManagerTabs =
    hasFiles ||
    networkStatus === NetworkStatus.setVariables ||
    (!hasFiles && !!searchQuery);

  if (!showFileManagerTabs) return null;

  const tabLists: InputListTypes<NoumFilesFilterType>[] = compact([
    (hasDownloadAnyFilePermission ||
      hasDownloadFilesOnlyUploadedBySelfPermission) && {
      id: NoumFilesFilterType.All,
      name: 'all',
      text: t('noumena.file_manager.tabs.all'),
      labelSize: 'medium',
    },
    {
      id: NoumFilesFilterType.UploadedByMe,
      name: 'uploadedByMe',
      text: t('noumena.file_manager.tabs.uploadedByMe'),
      labelSize: 'medium',
    },
  ]);

  return (
    <BasicChipsTabsForm
      onChange={setFilterType}
      inputList={tabLists}
      selectedId={filterType}
      mode="isUnderline"
      tabWidth="120px"
      tabCSS={{
        maxHeight: 35,
      }}
      isWithoutImage
      isMobile={false}
      fontSize="--font-button-small-size"
    />
  );
};
