import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';

import {
  DisplayFileContainer,
  FileDetails,
  DocumentContainer,
  Image,
  ClearFile,
} from './styles';

import { type DisplayFileProps } from './types';

export const FileDisplay = ({
  uploadedFileBlob,
  fileName,
  fileSize,
  isSingleFileUpload,
  clearFile,
}: DisplayFileProps) => (
  <DisplayFileContainer isSingleFileDownload={isSingleFileUpload}>
    <FileDetails align="center" justify="space-between">
      <Stack vertical>
        <TSpan
          font="body-m"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {fileName}
        </TSpan>
        <TSpan font="footnote" colorToken="--text-card-neutral-default">
          {Math.ceil(fileSize / (1024 * 1024))} MB
        </TSpan>
      </Stack>
      <ClearFile
        onClick={() => clearFile()}
        name="close_m"
        size={24}
        color="--icon-card-neutral-default"
      />
    </FileDetails>
    <DocumentContainer isSingleFileDownload={isSingleFileUpload}>
      <Image
        isSingleFileDownload={isSingleFileUpload}
        src={uploadedFileBlob}
        alt=""
      />
    </DocumentContainer>
  </DisplayFileContainer>
);
