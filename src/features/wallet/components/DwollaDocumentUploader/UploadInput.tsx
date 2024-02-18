import { memo } from 'react';
import { applicationreviewTypes } from '@/constants/fileTypes';
import { Upload } from '@/features/upload/components';
import { Input } from './Input';
import { type UploadComponentProps } from './types';

export const UploadInput = memo(
  ({
    url,
    maximumFileSize,
    defaultPlaceHolder,
    defaultSubPlaceHolder,
    onContentChange,
    onUploadFile,
    isUploadStarted,
    isUploadComplete,
    linkPlaceHolder,
    onDragOverText,
    isMobile,
    type,
    isTablet,
    isSingleSideUpload,
  }: UploadComponentProps) => (
    <Upload<HTMLDivElement>
      url={url}
      maxSize={maximumFileSize}
      acceptedFileTypes={applicationreviewTypes}
      onContentChange={onContentChange}
      uploadToS3={false}
      type={type}
      onUploadFile={onUploadFile}
    >
      {({ triggerElRef, ...rest }) => (
        <div ref={triggerElRef}>
          <Input
            isUploadComplete={isUploadComplete}
            isUploadStarted={isUploadStarted}
            onClick={rest.onClickHandler}
            defaultPlaceHolder={defaultPlaceHolder}
            defaultSubPlaceHolder={defaultSubPlaceHolder}
            isDraggingOver={rest.isDraggingOver}
            linkPlaceHolder={linkPlaceHolder}
            onDragOverText={onDragOverText}
            isMobile={isMobile}
            isTablet={isTablet}
            isSingleSideUpload={!!isSingleSideUpload}
          />
        </div>
      )}
    </Upload>
  ),
);
