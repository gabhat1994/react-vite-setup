import { type ImgHTMLAttributes, type MouseEventHandler } from 'react';
import { type Icons } from '@/components/Icon/Icon';
import { type Maybe } from '@/common/types';

export const AvatarSize = {
  XXXXL: 'XXXXL',
  XXXL: 'XXXL',
  XXL: 'XXL',
  XVL: 'XVL',
  XL: 'XL',
  L: 'L',
  M: 'M',
  S: 'S',
} as const;

export type AvatarSizeType = keyof typeof AvatarSize;

export interface CommonAvatarProps {
  /** default undefined - will render a placeholder avatar in this case */
  url?: string | null;
  /** default "L" */
  size?: AvatarSizeType;
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
  spinnerColor?: string;
  overlayColor?: string;
  onHandleUpload?: () => void;
  onGenerateImage?: () => void;
}

export interface AvatarEditIconProps {
  name: keyof typeof Icons;
  size?: AvatarSizeType;
  color?: string;
  edit: boolean;
  isUploading?: boolean;
  onClick?: MouseEventHandler<HTMLInputElement>;
}

type HTMLAvatarProps = ImgHTMLAttributes<HTMLInputElement>;

export type AvatarProps = HTMLAvatarProps & CommonAvatarProps;
