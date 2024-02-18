import { type ImgHTMLAttributes } from 'react';
import { type Maybe } from '@/common/types';

export const ProfileSize = {
  XXXXL: 'XXXXL',
  XXXL: 'XXXL',
  XXL: 'XXL',
  XVL: 'XVL',
  XL: 'XL',
  L: 'L',
  M: 'M',
  S: 'S',
} as const;

export type ProfileSizeType = keyof typeof ProfileSize;

export interface CommonProfileProps {
  /** default undefined - will render a placeholder avatar in this case */
  url?: string | null;
  /** default "L" */
  size?: ProfileSizeType;
  /** default false */
  editable?: boolean;
  /** default undefined */
  onClear?: () => void;
  /** default undefined */
  onClose?: () => void;
  /** default undefined */
  fileSize?: Maybe<number>;
  /** default undefined */
  isUploadStarted?: boolean;
  /** default undefined */
  isUploadComplete?: boolean;
  /** default undefined */
  onlyEditable?: boolean;
  /** maximum file size in MB for uploading, default undefined */
  maximumFileSize?: number;
  /** default image place holder */
  defaultImagePlaceHolder?: string;

  disabled?: boolean;
  /* Custom width */
  width?: number;
  /* Custom height */
  height?: number;
  /** Custom Border Radius */
  borderRadius?: number;

  opacity?: number;
  overridedIcon?: 'arrow_up_m' | 'arrow_down_m';
  isBanner?: boolean;
  isLoadingBanner?: boolean;
  onHandleUpload?: () => void;
  onGenerateImage?: () => void;
}

type HTMLAvatarProps = ImgHTMLAttributes<HTMLInputElement>;

export type AvatarProps = HTMLAvatarProps & CommonProfileProps;

export type ProfileImageActionType =
  | 'add-new-image'
  | 'generate-image-with-genius'
  | 'remove-image';
