import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Stack } from '@/layout';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ElementWrapperV2 } from '@/screens/Chamber/components/ElementWrapperV2';
import { useFileManagerElementContext } from '../../providers/FileManagerElementProvider';
import FileList from '../FileList';
import { FileManagerTabs } from '../FileManagerTabs';

const MAX_FILES_COUNT_TO_DISPLAY = 5;

const FileManagerBody: FC = () => {
  const { t } = useTranslation();
  const { setShowAllFilesModal, files } = useFileManagerElementContext();

  return (
    <>
      <ElementWrapperV2.Body>
        <FileManagerTabs />
      </ElementWrapperV2.Body>

      <FileList maxFilesToDisplay={MAX_FILES_COUNT_TO_DISPLAY} />

      {files.length > MAX_FILES_COUNT_TO_DISPLAY && (
        <Stack fullWidth justify="center">
          <Button
            textOnly
            rightIcon={
              <Icon
                name="chevron_small_right_m"
                size={24}
                color="--icon-tablecell-neutral-default"
              />
            }
            onClick={() => setShowAllFilesModal(true)}
          >
            {t('noumena.file_manager.button.all_files')}
          </Button>
        </Stack>
      )}
    </>
  );
};
export default FileManagerBody;
