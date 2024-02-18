import { type Dispatch, type SetStateAction } from 'react';
import { type ResultType } from '../types';

export type LayoutProps = {
  selectedTab?: string;
  setResult?: Dispatch<SetStateAction<ResultType | undefined>>;
  rightContent?: React.ReactNode;
  children: React.ReactNode;
  onGoBack?(): void;
};
