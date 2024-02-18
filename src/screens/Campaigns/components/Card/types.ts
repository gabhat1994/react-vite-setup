import { type ReactNode } from 'react';
import { type TProps } from '@/components/Typography/Typography';

type Title = { children: ReactNode } & TProps;
type Label = { children: ReactNode } & TProps;

export type { Title, Label };
