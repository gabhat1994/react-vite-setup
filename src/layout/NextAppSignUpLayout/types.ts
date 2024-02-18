import { type ReactElement } from 'react';
import { type Property } from 'csstype';

export type NextAppSignUpLayoutProps = {
  dynamicHeight?: boolean;
  dynamicWidth?: boolean;
  overflow?: Property.Overflow;
  children: ReactElement | ReactElement[];
  onBackClick?: () => void;
  showBackButton: boolean;
};
