import { type AlertType } from '@/components/Toast/types';

export const alertColor: Record<AlertType, string> = {
  success: 'var(--bg-snackbar-success-primary-default)',
  error: 'var(--bg-snackbar-danger-primary-default)',
  primary: 'var(--bg-snackbar-neutral-default)',
  subtle: 'var(--bg-snackbar-neutral-light)',
};

export const alertFontColor: Record<AlertType, string> = {
  success: 'var(--text-snackbar-neutral-alt-default)',
  error: 'var(--text-snackbar-neutral-alt-default)',
  primary: 'var(--text-snackbar-neutral-alt-default)',
  subtle: 'var(--text-snackbar-neutral-default)',
};
