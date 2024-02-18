import { type ReactElement } from 'react';
import { type Property } from 'csstype';


export type AuthScreenLayoutProps = {
  type: 'login' | 'signup' | 'login2x' | 'confirm' | 'onboarding';
  dynamicHeight?: boolean;
  dynamicWidth?: boolean;
  overflow?: Property.Overflow;
  children: ReactElement | ReactElement[];
  showBackButton?: boolean;
  onBackClick?: () => void;
};
