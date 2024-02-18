import type React from 'react';

export type LayoutType = 'Chambers' | 'Discovery' | 'MyAccount' | 'Money';

export type LayoutProps = {
  rightContent?: React.ReactNode;
  type?: LayoutType;
  children: React.ReactNode;
  hideLeftMenu?: boolean;
  subHeader?: React.ReactNode;
  backgroundColor?: string;
  onGoBack?: () => void;
  fullWidthContainer?: boolean;
};
