import React from 'react';
import { Stack, StackItem } from '@/layout';
import { LineNumber } from './LineNumber';

interface MainRowProps {
  children: React.ReactNode;
  index: number;
  displayLineNumbers: boolean;
  actionButtons?: React.ReactNode;
  hasInputs?: boolean;
}

export function MainRow({
  index,
  children,
  displayLineNumbers,
  actionButtons,
  hasInputs = false,
}: MainRowProps) {
  return (
    <Stack gap={16} align={hasInputs ? 'start' : 'center'} fullWidth>
      {displayLineNumbers && <LineNumber index={index} hasInputs={hasInputs} />}
      <StackItem grow>{children}</StackItem>
      {actionButtons ? (
        <StackItem shrink={0} padding={hasInputs ? '7px 0 0' : undefined}>
          {actionButtons}
        </StackItem>
      ) : null}
    </Stack>
  );
}

interface SecondaryRowProps {
  children: React.ReactNode;
}

export function SecondaryRow({ children }: SecondaryRowProps) {
  return <>{children}</>;
}

interface FooterRowProps {
  children: React.ReactNode;
  actionButtons?: React.ReactNode;
}

export function FooterRow({ children, actionButtons }: FooterRowProps) {
  return (
    <StackItem grow>
      <Stack gap={24} align="center">
        {children}

        <Stack gap={8} align="center">
          {actionButtons}
        </Stack>
      </Stack>
    </StackItem>
  );
}
