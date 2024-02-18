import { type Maybe } from '@/common/types';
import { type ChangeEvent, type Ref } from 'react';

export interface UploadChildrenProps<TargetRef extends HTMLElement> {
  triggerElRef: Ref<TargetRef>;
  fileName: Maybe<string>;
  fileSize: Maybe<number>;
  fileType: Maybe<string>;
  url?: string;
  error: boolean;
  isDraggingOver: boolean;
  isUploadStarted: boolean;
  isUploadComplete: boolean;
  uploadPercentage: number;
  onClickHandler?: () => void;
  onChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  onCloseHandler?: () => void;
  onTryAgainHandler?: () => void;
}

type TextMeta = {
  type: 'text';
  fileSize?: number;
  fileName?: string;
};

type ImageMeta = {
  type: 'image';
  fileSize?: number;
  fileName?: string;
};

type VideoMeta = {
  type: 'video';
  thumbnail: string;
  videoURL: string;
  fileSize?: number;
  fileName?: string;
};

export type UploadMeta = ImageMeta | TextMeta | VideoMeta;

export type UploadMediaType =
  | 'profile'
  | 'noum'
  | 'invoice'
  | 'sow'
  | 'post'
  | 'contract'
  | 'conversation'
  | 'wallet';
