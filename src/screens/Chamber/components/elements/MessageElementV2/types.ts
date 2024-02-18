import { type ReactNode } from 'react';
import { type ElementWrapperProps } from '@/screens/Chamber/components/ElementWrapper';

export type MessageElementProps = ElementWrapperProps & {
  conversationHeader?: ReactNode;
  conversationBody?: ReactNode;
};
