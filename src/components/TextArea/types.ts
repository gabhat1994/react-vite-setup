import { type InputHTMLAttributes } from 'react';

export type FieldValue = string | number | readonly string[] | undefined;

export interface ITextArea extends InputHTMLAttributes<HTMLTextAreaElement> {
  helperText?: string;
  error?: boolean;
  label?: string;
  resize?: boolean;
  disabled?: boolean;
  autoResize?: boolean;
  noBorder?: boolean;
  maxHeight?: number;
  showScroll?: boolean;
  lineHeight?: string;
  maxLengthPosition?: string;
  hasRightIcon?: boolean;
  rightIcon?: React.ReactNode;
  showMaxLengthText?: boolean;
}
