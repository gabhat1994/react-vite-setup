import { type MouseEventHandler } from 'react';
import { type Maybe } from '@/common/types';
import { type NoumLayoutToolMetaValues } from '@/screens/Chamber/components/ElementWrapper/types';

export interface EditUploadingProps {
  isUploadComplete: boolean;
  url?: string;
  fileName: Maybe<string>;
  fileSize: Maybe<number>;
  fileType: Maybe<string>;
  error: boolean;
  uploadPercentage: number;
  onClose?: () => void;
  onTryAgain?: () => void;
  meta?: NoumLayoutToolMetaValues;
  isBackground?: boolean;
  elementId?: string | null;
}

export interface EditPreUploadProps {
  isDraggingOver: boolean;
  error: boolean;
  onClick?: MouseEventHandler<HTMLInputElement>;
}

export interface ImageEditorProps {
  url?: string;
  onContentChange?: (next: string) => void;
  meta?: NoumLayoutToolMetaValues;
  elementId?: string | null;
}

export interface ImageViewProps {
  url?: string;
  isCollapse?: boolean;
  viewOnly?: boolean;
  meta?: NoumLayoutToolMetaValues;
  isCustomPreview?: boolean;
  elementId?: string | null;
}
