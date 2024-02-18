import { imageTypes } from '@/constants/fileTypes';
import { Upload } from '@/features/upload/components';
import EditPreUpload from './EditPreUpload';
import EditUploading from './EditUploading';
import { type ImageEditorProps } from './types';

const ImageEditor = (props: ImageEditorProps) => {
  const url = props.url === 'undefined' ? undefined : props.url;

  return (
    <Upload<HTMLDivElement>
      url={url}
      acceptedFileTypes={imageTypes}
      onContentChange={props.onContentChange}
      maxSize={20}
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
              meta={props.meta}
              elementId={props.elementId}
            />
          )}
        </div>
      )}
    </Upload>
  );
};

export default ImageEditor;
