import { isValidElement, type ReactNode } from 'react';
import { Separator } from '@/components/Separator/Separator';
import { Stack, StackItem } from '@/layout';
import { SectionTitle } from './SectionTitle';
import { type SectionVariant } from './types';

interface SectionProps {
  title: ReactNode | string;
  optional?: boolean;
  variant?: SectionVariant;
  titleSideAddon?: ReactNode;
  children?: ReactNode;
  hasSeparator?: boolean;
}

export function Section({
  title,
  optional,
  variant = 'main',
  titleSideAddon,
  children,
  hasSeparator = false,
}: SectionProps) {
  return (
    <Stack gap={16} vertical fullWidth align="stretch">
      {/* Header */}
      <StackItem>
        <Stack align="center" justify="space-between">
          <Stack gap={8}>
            {isValidElement(title) ? (
              title
            ) : (
              <SectionTitle
                variant={variant}
                title={title}
                optional={optional}
              />
            )}
          </Stack>
          {titleSideAddon}
        </Stack>
      </StackItem>

      {hasSeparator && <Separator fullWidth noMargin />}

      {/* Content */}
      {children && <StackItem>{children}</StackItem>}
    </Stack>
  );
}
