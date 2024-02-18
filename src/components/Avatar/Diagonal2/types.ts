import { type ImgHTMLAttributes } from 'react';
import { type Maybe } from '@/common/types';

export const DiagonalAvatar2Size = {
  XL: 'XL',
  L: 'L',
  M: 'M',
  S: 'S',
} as const;

export type DiagonalAvatar2SizeType = keyof typeof DiagonalAvatar2Size;

interface CommonDiagonalAvatar2Props {
  /** default undefined - will render a placeholder avatar in this case */
  urls: Maybe<string>[];
  /** default "L" */
  size?: DiagonalAvatar2SizeType;
  isInline?: boolean;
}

type HTMLDiagonalAvatar2Props = ImgHTMLAttributes<HTMLImageElement>;

export type DiagonalAvatar2Props = HTMLDiagonalAvatar2Props &
  CommonDiagonalAvatar2Props;
