import { type DocumentType } from '@/apollo/generated/types';
import { type UploadMediaType } from '@/features/upload/types';

export type State = {
  documentUrl?: string | null;
  documentName?: string | null;
  frontSideFile?: File;
  backSideFile?: File;
  mergedFile?: File;
  documentType?: DocumentType;
  updatingIsInProgress: boolean;
};

export type ModalType = 'upload-document';

export interface UploadComponentProps {
  onContentChange?: (next: string) => void;
  defaultPlaceHolder: string;
  defaultSubPlaceHolder: string;
  maximumFileSize: number;
  url: string;
  isUploadStarted: boolean;
  isUploadComplete: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isSingleSideUpload?: boolean;
  uploadedFile: File | undefined;
  onUploadFile: (file: File) => void;
  linkPlaceHolder?: string;
  onDragOverText?: string;
  type: UploadMediaType;
}

export type DisplayFileProps = {
  fileName: string;
  uploadedFileBlob: string;
  fileSize: number;
  isSingleFileUpload: boolean;
  clearFile: () => void;
};

export type Files = {
  frontSideFile: File;
  backSideFile: File;
  mergedFile: File;
};
