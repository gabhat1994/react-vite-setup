import { type ReactNode } from 'react';
import { TSpan } from '../Typography';

interface FormErrorProps {
  message: ReactNode;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <TSpan font="footnote" colorToken="--text-input-danger-primary-default">
      {message}
    </TSpan>
  );
}
