import type React from 'react';

export type SinglePageLayoutProps = {
  children: React.ReactNode;
  showBackButton?: boolean;
  responsiveMain?: boolean;
  loading?: boolean;
  goBackUrl?: string;
};
