import React from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, StackItem } from '@/layout';
import { TSpan } from '../Typography';

interface FormControlProps {
  label: string;
  optional?: boolean;
  description?: string;
  children: React.ReactNode;
  horizontal?: boolean;
}

export function FormControl({
  label,
  optional,
  description,
  children,
  horizontal = false,
}: FormControlProps) {
  const { t } = useTranslation();

  if (horizontal) {
    return (
      <Stack data-testid="horizontal" gap={16} align="center" fullWidth>
        <Stack gap={4} vertical align="stretch">
          <TSpan font="body-m-bold">
            {label}
            {optional && (
              <>
                {' '}
                <TSpan
                  font="body-m"
                  colorToken="--text-tablecell-header-neutral-default"
                >
                  {t('noumena.form_control.optional')}
                </TSpan>
              </>
            )}
          </TSpan>
        </Stack>
        <StackItem grow>{children}</StackItem>
      </Stack>
    );
  }

  return (
    <Stack data-testid="vertical" gap={16} vertical align="start" fullWidth>
      <Stack gap={4} vertical fullWidth align="stretch">
        <TSpan font="body-m-bold">
          {label}
          {optional && (
            <>
              {' '}
              <TSpan
                font="body-m"
                colorToken="--text-tablecell-header-neutral-default"
              >
                {t('noumena.form_control.optional')}
              </TSpan>
            </>
          )}
        </TSpan>
        {description && (
          <TSpan font="body-m" colorToken="--text-card-neutral-default">
            {description}
          </TSpan>
        )}
      </Stack>
      {children}
    </Stack>
  );
}
