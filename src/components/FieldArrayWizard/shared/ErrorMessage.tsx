import { type FieldError, type FieldErrorsImpl, type Merge } from 'react-hook-form';
import { FormError } from '@/components/FormError';

interface ErrorMessageProps {
  message?: string | FieldError | Merge<FieldError, FieldErrorsImpl>;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return <FormError message={message} />;
}
