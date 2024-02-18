/* eslint-disable jsx-a11y/aria-role */
import { useMemo, type ReactNode } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { PermissibleElementType } from '@/apollo/generated/types';
import { NoumAuthorizationContext } from './NoumAuthorizationContext';
import { type NoumAuthorizationContextValues } from './types';
import { useNoumAuthorization } from './useNoumAuthorization';
import {
  createCustomRole,
  createDefaultRole,
  createElementPermissions,
  createNoumPermissions,
} from './mocks';

interface FakeNoumAuthorizationProviderProps
  extends NoumAuthorizationContextValues {
  children: ReactNode;
}
function FakeNoumAuthorizationProvider({
  children,
  role,
  permissions,
  refetchNoumAuthorizationData,
}: FakeNoumAuthorizationProviderProps) {
  const value = useMemo<NoumAuthorizationContextValues>(
    () => ({
      role,
      permissions,
      refetchNoumAuthorizationData,
    }),
    [permissions, refetchNoumAuthorizationData, role],
  );
  return (
    <NoumAuthorizationContext.Provider value={value}>
      {children}
    </NoumAuthorizationContext.Provider>
  );
}

function setup({
  role,
  permissions,
  refetchNoumAuthorizationData = vi.fn(),
}: Pick<FakeNoumAuthorizationProviderProps, 'role' | 'permissions'> &
  Partial<
    Pick<FakeNoumAuthorizationProviderProps, 'refetchNoumAuthorizationData'>
  >) {
  return renderHook(useNoumAuthorization, {
    wrapper: ({ children }) => (
      <FakeNoumAuthorizationProvider
        role={role}
        permissions={permissions}
        refetchNoumAuthorizationData={refetchNoumAuthorizationData}
      >
        {children}
      </FakeNoumAuthorizationProvider>
    ),
  });
}

describe('checking default role', () => {
  test('Returns true only if the role is default and matches the name', () => {
    const { result } = setup({
      role: createDefaultRole('Noum Owner'),
      permissions: [],
    });

    expect(result.current.hasDefaultRole('Noum Owner')).toBe(true);
    expect(result.current.hasDefaultRole('Guest')).toBe(false);
    expect(result.current.hasDefaultRole('Manager')).toBe(false);
    expect(result.current.hasCustomRole('Some Fake Custom Role')).toBe(false);
    expect(result.current.hasCustomRole('Noum Owner')).toBe(false);
  });
});

describe('checking custom role', () => {
  test('Returns true only if the role is custom and matches the name', () => {
    const { result } = setup({
      role: createCustomRole('Test Role'),
      permissions: [],
    });

    expect(result.current.hasCustomRole('Test Role')).toBe(true);
    expect(result.current.hasCustomRole('Some Fake Custom Role')).toBe(false);
    expect(result.current.hasDefaultRole('Guest')).toBe(false);
    expect(result.current.hasDefaultRole('Manager')).toBe(false);
    expect(result.current.hasDefaultRole('Noum Owner')).toBe(false);
  });
});

describe('checking Noum permissions', () => {
  test('Returns true only user has the permission enabled', () => {
    const { result } = setup({
      role: createCustomRole('Test Role'),
      permissions: [createNoumPermissions(['add-noum-element', 'edit-noum'])],
    });

    expect(result.current.hasNoumPermission('add-noum-element')).toBe(true);
    expect(result.current.hasNoumPermission('edit-noum')).toBe(true);
    expect(
      result.current.hasNoumPermission('connect-in-unpublished-mode'),
    ).toBe(false);
    expect(result.current.hasNoumPermission('invite-users')).toBe(false);
  });
});

describe('checking element permissions', () => {
  test('Returns true only user has the permission enabled', () => {
    const { result } = setup({
      role: createCustomRole('Test Role'),
      permissions: [
        createElementPermissions(PermissibleElementType.InvoiceTool, [
          'add-invoice-within-tool',
          'delete-invoice',
        ]),
        createElementPermissions(PermissibleElementType.Text, [
          'view-text-element',
        ]),
      ],
    });

    expect(
      result.current.hasElementPermission(
        PermissibleElementType.InvoiceTool,
        'add-invoice-within-tool',
      ),
    ).toBe(true);
    expect(
      result.current.hasElementPermission(
        PermissibleElementType.InvoiceTool,
        'delete-invoice',
      ),
    ).toBe(true);
    expect(
      result.current.hasElementPermission(
        PermissibleElementType.Text,
        'view-text-element',
      ),
    ).toBe(true);

    expect(
      result.current.hasElementPermission(
        PermissibleElementType.InvoiceTool,
        'pay-invoice',
      ),
    ).toBe(false);
    expect(
      result.current.hasElementPermission(
        PermissibleElementType.Calendar,
        'create-event',
      ),
    ).toBe(false);
  });
});
