import { memo } from 'react';
import { Upload } from '@/features/upload/components';
import { type CommonAvatarProps } from '@/components/Avatar/Avatar/types';
import { type UploadMediaType } from '@/features/upload/types';
import { MediaInfoWrapper } from './styles';
import MediaPreview from './MediaPreview';

interface EditableAvatarProps extends CommonAvatarProps {
  onContentChange: (next: string) => void;
  acceptedFileTypes?: string;
  fileName?: string;
  onUploadFile?: (file: File) => void;
  type: UploadMediaType;
}

export const UploadFile = memo(
  ({
    url,
    maximumFileSize,
    defaultImagePlaceHolder,
    onContentChange,
    acceptedFileTypes,
    fileSize,
    fileName,
    type,
    onUploadFile,
  }: EditableAvatarProps) => (
    <Upload<HTMLDivElement>
      url={url || ''}
      type={type}
      maxSize={maximumFileSize}
      acceptedFileTypes={acceptedFileTypes}
      onContentChange={onContentChange}
      generateThumbnail={true}
      onUploadFile={onUploadFile}
    >
      {({ triggerElRef, ...rest }) => (
        <MediaInfoWrapper gap={12} ref={triggerElRef} align="center">
          <MediaPreview
            url={url || defaultImagePlaceHolder}
            isUploadComplete={rest.isUploadComplete}
            isUploadStarted={rest.isUploadStarted}
            uploadPercentage={rest.uploadPercentage}
            fileName={fileName}
            fileSize={fileSize}
            onClick={rest.onClickHandler}
          />
        </MediaInfoWrapper>
      )}
    </Upload>
  ),
);
