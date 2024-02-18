import { type MouseEventHandler } from 'react';
import { type Maybe } from '@/common/types';

export type MediaPreviewProps = {
  fileName?: string;
  fileSize?: Maybe<number>;
  url?: string;
  isUploadComplete: boolean;
  isUploadStarted: boolean;
  uploadPercentage: number;
  onClick?: MouseEventHandler<HTMLInputElement>;
};
export interface UploadFileButtonProps {
  onClick?: MouseEventHandler<HTMLInputElement>;
}
