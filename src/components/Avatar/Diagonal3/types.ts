import { type ImgHTMLAttributes } from 'react';
import { type Maybe } from '@/common/types';

export const DiagonalAvatar3Size = {
  XL: 'XL',
  L: 'L',
  M: 'M',
  S: 'S',
} as const;

export type DiagonalAvatar3SizeType = keyof typeof DiagonalAvatar3Size;

interface CommonDiagonalAvatar3Props {
  /** default undefined - will render a placeholder avatar in this case */
  urls: Maybe<string>[];
  /** default "L" */
  size?: DiagonalAvatar3SizeType;
  isInline?: boolean;
}

type HTMLDiagonalAvatar3Props = ImgHTMLAttributes<HTMLImageElement>;

export type DiagonalAvatar3Props = HTMLDiagonalAvatar3Props &
  CommonDiagonalAvatar3Props;
