import { type ReactNode } from 'react';
import { type Property } from 'csstype';
import { type CSSProperties } from 'styled-components';

export type NewAuthLayoutProps = {
  dynamicHeight?: boolean;
  dynamicWidth?: boolean;
  overflow?: Property.Overflow;
  children: ReactNode;
  onBackClick?: () => void;
  showBackButton?: boolean;
  align?: string;
  disableBackButton?: boolean;
  fullHeightChildren?: boolean;
  minHeightChildren?: CSSProperties['minHeight'];
};
