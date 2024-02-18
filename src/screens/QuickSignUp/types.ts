import { type ReactElement } from 'react';

export type QuickSignUpScreenLayoutProps = {
  children: ReactElement | ReactElement[];
  onBackClick?: () => void;
  showBackButton?: boolean;
};
