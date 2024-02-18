import { memo, useEffect } from 'react';
import { Avatar } from '@/components/Avatar/Avatar/Avatar';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { Stack } from '@/layout';
import fileSizeConverter from '@/utils/fileSizeConverter';
import { TSpan } from '@/components/Typography';
import { getFileNameWithEllipsis } from '@/utils/strings';
import { UploadFileButton } from './UploadFileButton';
import { type MediaPreviewProps } from './types';

const MediaPreview = memo((props: MediaPreviewProps) => {
  const {
    noumLayoutToolUpdating,
    mediaUploadPercentage,
    setMediaUploadPercentage,
  } = useEditChamberState();
  const {
    url,
    uploadPercentage,
    isUploadComplete,
    isUploadStarted,
    fileName,
    fileSize,
    onClick,
  } = props;
  useEffect(() => {
    const percent = isUploadStarted
      ? isUploadComplete
        ? 100
        : uploadPercentage % 100
      : 0;
    setMediaUploadPercentage?.(percent);
  }, [
    isUploadComplete,
    isUploadStarted,
    mediaUploadPercentage,
    setMediaUploadPercentage,
    uploadPercentage,
  ]);

  return (
    <>
      <Avatar
        url={url}
        size="XL"
        isUploadComplete={isUploadComplete && !noumLayoutToolUpdating}
        isUploadStarted={isUploadStarted}
        spinnerColor="var(--icon-spinner-neutral-alt-default)"
        overlayColor="var(--overlay-avatar-neutral-default)"
      />
      <Stack vertical justify="space-between">
        {fileName && (
          <TSpan font="footnote" colorToken="--text-card-neutral-highlighted">
            {getFileNameWithEllipsis(fileName)}
          </TSpan>
        )}
        {fileSize && (
          <TSpan font="footnote" colorToken="--text-card-neutral-default">
            {fileSizeConverter(fileSize)}
          </TSpan>
        )}
        <UploadFileButton onClick={onClick} />
      </Stack>
    </>
  );
});

export default MediaPreview;
