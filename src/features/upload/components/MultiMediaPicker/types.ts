import { type RefObject } from 'react';
import { type UploadMediaType } from '../../types';

export interface MultiMediaPickerProps {
  acceptedFileTypes?: string;
  maxSize?: number;
  type: UploadMediaType;
  onUploading: (uploading: boolean) => void;
  onContentChange?: (next: string) => void;
  onUploadFile: (file: File) => void;
  disabled?: boolean;
  clipboard?: RefObject<HTMLElement>;
}
