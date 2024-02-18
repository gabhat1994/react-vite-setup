import { memo } from 'react';
import { Upload } from '@/features/upload/components';
import { videoTypes } from '@/constants/fileTypes';
import EditPreUpload from './EditPreUpload';
import EditUploading from './EditUploading';
import { type VideoEditorProps } from './types';

const VideoEditor = memo((props: VideoEditorProps) => {
  const url = props.url === 'undefined' ? undefined : props.url;

  return (
    <Upload<HTMLDivElement>
      url={url}
      acceptedFileTypes={videoTypes}
      onContentChange={props.onContentChange}
      maxSize={200}
      generateThumbnail={true}
      type="noum"
    >
      {({ triggerElRef, ...rest }) => (
        <div ref={triggerElRef}>
          {!rest.isUploadStarted && !rest.isUploadComplete && (
            <EditPreUpload
              isDraggingOver={rest.isDraggingOver}
              error={rest.error}
              onClick={rest.onClickHandler}
            />
          )}
          {rest.isUploadStarted && (
            <EditUploading
              isUploadComplete={rest.isUploadComplete}
              url={rest.url}
              fileName={rest.fileName}
              fileSize={rest.fileSize}
              fileType={rest.fileType}
              error={rest.error}
              uploadPercentage={rest.uploadPercentage}
              onClose={rest.onCloseHandler}
              meta={props?.meta}
              elementId={props.elementId}
            />
          )}
        </div>
      )}
    </Upload>
  );
});

export default VideoEditor;
