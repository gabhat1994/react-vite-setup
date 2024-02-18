import { type ReactNode } from 'react';

import { useLaunchDarkly } from '@/hooks';
import { NoumLegacyConnectionProvider } from './LegacyConnection/NoumLegacyConnectionProvider';
import { NoumMembershipProviderProvider } from './Membership/NoumMembershipProvider';

interface NoumUserConnectionProviderProps {
  children: ReactNode;
}

export function NoumUserConnectionProvider({
  children,
}: NoumUserConnectionProviderProps) {
  const { flags } = useLaunchDarkly();

  return flags.elementPermission ? (
    <NoumMembershipProviderProvider>{children}</NoumMembershipProviderProvider>
  ) : (
    <NoumLegacyConnectionProvider>{children}</NoumLegacyConnectionProvider>
  );
}
