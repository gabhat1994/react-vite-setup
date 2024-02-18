import { type MouseEventHandler } from 'react';
import { type Maybe } from '@/common/types';
import { type ChangeMeta } from '@/screens/Chamber/components/Element/types';
import { type NoumLayoutToolMetaValues } from '@/screens/Chamber/components/ElementWrapper/types';

export interface EditPreUploadProps {
  isDraggingOver: boolean;
  error: boolean;
  onClick?: MouseEventHandler<HTMLInputElement>;
}

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

export interface VideoEditorProps {
  url?: string;
  onContentChange?: (next: string, meta?: ChangeMeta) => void;
  meta?: NoumLayoutToolMetaValues;
  elementId?: string | null;
}
