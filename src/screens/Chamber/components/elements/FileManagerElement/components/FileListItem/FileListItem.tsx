import { useState } from 'react';
import { delay } from 'lodash';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { type NoumFile } from '@/apollo/generated/types';
import { Spinner } from '@/components/Spinner';
import { useTranslation } from 'react-i18next';
import { ButtonUtils } from '@/components/Button/utils';
import { useAuth } from '@/features/auth/contexts';
import S from './styles';
import FileManagerEllipsisMenu from '../FileManagerEllipsisMenu/FileManagerEllipsisMenu';
import { useFileManagerElementContext } from '../../providers/FileManagerElementProvider';
import {
  getIconColorByExtension,
  isImageType,
  isSupportedMediaType,
  isSupportedVideoType,
} from '../../utils';

type FileListItemProps = {
  file: NoumFile;
};

const FileListItem = ({ file }: FileListItemProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const {
    setShowEditFileModalId,
    setShowDeleteFileModalId,
    setShowFilePreviewModalId,
    markNoumFileAsDownloaded,
    hasDownloadAnyFilePermission,
    hasDownloadFilesOnlyUploadedBySelfPermission,
  } = useFileManagerElementContext();

  const [isLoaded, setIsLoaded] = useState(
    () => !isSupportedMediaType(file.extension ?? ''),
  );

  const onLoad = () => setIsLoaded(true);

  const isFileOwner = file.owner?._id === user?._id;
  const enabledToDownload =
    hasDownloadAnyFilePermission ||
    (isFileOwner && hasDownloadFilesOnlyUploadedBySelfPermission);

  return (
    <S.Container fullWidth justify="space-between">
      <S.LeftWrapper onClick={() => setShowFilePreviewModalId(file._id)}>
        <S.IconContainer>
          {!isLoaded && (
            <S.SpinnerContainer>
              <Spinner zIndex={10} />
            </S.SpinnerContainer>
          )}
          {isSupportedVideoType(file.extension ?? '') ? (
            <S.PreviewVideo
              data-testid="preivew-video"
              muted
              onLoadedData={onLoad}
              preload="metadata"
            >
              <source src={file.fileUrl ?? ''} />
            </S.PreviewVideo>
          ) : isImageType(file.extension ?? '') ? (
            <S.Image src={file.fileUrl ?? ''} onLoad={onLoad} />
          ) : (
            <S.FileIconContainer>
              <Icon
                name="file_m"
                size={24}
                color={getIconColorByExtension(file.extension ?? '')}
              />
            </S.FileIconContainer>
          )}
        </S.IconContainer>

        <S.TextContainer>
          <S.FileName
            overflow="ellipsis"
            font="body-m"
          >{`${file.name}.${file.extension}`}</S.FileName>
          <S.FileDescription overflow="ellipsis" font="footnote">
            {file.description}
          </S.FileDescription>
        </S.TextContainer>
      </S.LeftWrapper>
      <S.IconsContainer>
        <a
          href={file.fileUrl ?? ''}
          onClick={() => delay(() => markNoumFileAsDownloaded(file._id), 150)}
          download
          rel="noreferrer"
        >
          <Button
            size="small"
            tertiary
            icon={
              <Icon
                name="download_m"
                size={20}
                color="--button-card-neutral-default"
              />
            }
            neutral
            disabled={!enabledToDownload}
            {...ButtonUtils.getTooltipProps({
              message: t('noumena.file_manager.no_permission.download_file'),
              visible: !enabledToDownload,
              position: 'top-left',
            })}
          />
        </a>

        <FileManagerEllipsisMenu
          onDelete={() => setShowDeleteFileModalId(file._id)}
          onEdit={() => setShowEditFileModalId(file._id)}
          onPreview={() => setShowFilePreviewModalId(file._id)}
          fileOwnerId={file.owner?._id}
        />
      </S.IconsContainer>
    </S.Container>
  );
};

export default FileListItem;
