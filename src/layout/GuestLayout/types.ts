import type React from 'react';

export type GuestLayoutType = 'Home' | 'Empty';

export type GuestLayoutProps = {
  type?: GuestLayoutType;
  children: React.ReactNode;
};
