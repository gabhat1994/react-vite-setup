import { type HTMLAttributes } from 'react';

export interface ICard extends HTMLAttributes<HTMLDivElement> {
  bgImageUrl?: string;
  bgImagePosition?: string;
  hasError?: boolean;
  fullWidth?: boolean;
}
