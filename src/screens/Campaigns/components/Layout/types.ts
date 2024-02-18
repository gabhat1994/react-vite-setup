import { type ReactNode } from 'react';

type Layout = {
  children: ReactNode;
};

export type TMain = Required<Pick<Layout, 'children'>>;
export type TCard = Required<Pick<Layout, 'children'>>;
