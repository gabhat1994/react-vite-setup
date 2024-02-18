import { Icon } from '@/components/Icon';
import useDebouncedCallback from '@/hooks/useDebouncedCallback';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFileManagerElementContext } from '../../providers/FileManagerElementProvider';

import S from './styles';

type FileManagerHeaderProps = {};

export const FileManagerSearch: React.FC<FileManagerHeaderProps> = () => {
  const { t } = useTranslation();
  const { setSearchQuery, searchQuery } = useFileManagerElementContext();

  const debouncedChangeHandler = useDebouncedCallback(setSearchQuery, 500);

  return (
    <S.SearchField
      fullWidth
      inputSize="small"
      placeholder={t('noumena.file_manager.search')}
      leftIcon={
        <Icon name="search_m" size={24} color="--icon-input-neutral-default" />
      }
      rightIcon={
        searchQuery && (
          <Icon
            onClick={() => setSearchQuery('')}
            name="clear_m"
            size={24}
            color="--icon-input-neutral-default"
          />
        )
      }
      rightIconColor="var(--icon-input-brand-primary-default)"
      value={searchQuery || ''}
      onChange={(event) => debouncedChangeHandler(event.currentTarget.value)}
      data-testid="global-search-input"
    />
  );
};
