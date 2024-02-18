import { memo } from 'react';
import { UploadInput } from './UploadInput';
import { type UploadComponentProps } from './types';
import { FileDisplay } from './FileDisplay';

export const UploadComponent = memo(
  ({
    uploadedFile,
    clearFile,
    ...rest
  }: { clearFile: () => void } & UploadComponentProps) =>
    uploadedFile ? (
      <FileDisplay
        uploadedFileBlob={URL.createObjectURL(uploadedFile)}
        fileName={uploadedFile.name}
        fileSize={uploadedFile.size}
        clearFile={clearFile}
        isSingleFileUpload={!!rest.isSingleSideUpload}
      />
    ) : (
      <UploadInput uploadedFile={uploadedFile} {...rest} />
    ),
);
