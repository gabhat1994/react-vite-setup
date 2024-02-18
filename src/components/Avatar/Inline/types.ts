import { type ImgHTMLAttributes } from 'react';

export const InlineAvatarSize = {
  XXL: 'XXL',
  XL: 'XL',
  L: 'L',
  M: 'M',
  S: 'S',
} as const;

export type InlineAvatarSizeType = keyof typeof InlineAvatarSize;

interface CommonInlineAvatarProps {
  /** default undefined - will render a placeholder avatar in this case */
  urls: (string | undefined)[];
  /** default "L" */
  size?: InlineAvatarSizeType;
  /** if image requires border */
  borderedImage?: boolean;
}

type HTMLInlineAvatarProps = ImgHTMLAttributes<HTMLImageElement>;

export type InlineAvatarProps = HTMLInlineAvatarProps & CommonInlineAvatarProps;
