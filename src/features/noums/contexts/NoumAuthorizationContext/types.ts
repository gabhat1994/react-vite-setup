import {
  type NoumRolePermissionLevel,
  PermissibleElementType,
  ElementTypeEnum,
} from '@/apollo/generated/types';
import { type NoumRolePermissionGroupForAuthorizationFragment } from '@/apollo/graphql';

export const defaultNoumRoleNames = [
  'Noum Owner',
  'Manager',
  'Guest',
  'Non-Member',
  // TODO: Add more default role names
] as const;
export type DefaultNoumRoleName = typeof defaultNoumRoleNames[number];
export type NoumRole =
  | {
      name: DefaultNoumRoleName;
      isDefault: true;
    }
  | {
      name: string;
      isDefault: false;
    };

const noumPermissions = [
  'edit-noum',
  'invite-users',
  'assign-user-roles',
  'custom-noum-preview',
  'broadcast-noum',
  'add-noum-element',
  'remove-noum-element',
  'set-noum-theme',
  'publish-noum',
  'set-noum-element-permissions',
  'link-noums',
  'connect-in-unpublished-mode',
  'subscribe',
  'archive-noum',
] as const;

export type NoumPermissionName = typeof noumPermissions[number];
type NoumPermissionItem = {
  isActive: boolean;
  id: NoumPermissionName;
};

export type NoumPermission = {
  level: NoumRolePermissionLevel.Noum;
  elementType: null;
  permissions: NoumPermissionItem[];
};

export const elementTypeEnumPermissionMap: {
  [key in ElementTypeEnum]?: {
    permissibleElementType: PermissibleElementType;
    permissionNameForCheckingEnabled: ElementPermission<PermissibleElementType>;
  };
} = {
  [ElementTypeEnum.Wallet]: {
    permissibleElementType: PermissibleElementType.Payment,
    permissionNameForCheckingEnabled: 'view-wallet-element',
  },
};

const elementPermissionsMap = {
  [PermissibleElementType.Calendar]: ['create-event', 'view-event-element'],
  [PermissibleElementType.FileManager]: [
    'upload-file',
    'download-any-file',
    'download-files-only-uploaded-by-self',
    'view-file-manager-element',
    'edit-file',
    'delete-file',
  ],
  [PermissibleElementType.Image]: ['view-image-element'],
  [PermissibleElementType.InvoiceTool]: [
    'add-invoice-as-tool',
    'delete-invoice-as-tool',
    'add-invoice-within-tool',
    'view-invoice',
    'download-invoice',
    'delete-invoice',
    'change-status-of-invoice',
    'pay-invoice',
    'confirm-invoice',
    'share-invoice',
    'view-invoice-element',
  ],
  [PermissibleElementType.Messages]: [
    'create-new-message-conversation',
    'create-new-group-message-conversation',
    'view-message-element',
  ],
  [PermissibleElementType.Payment]: [
    'create-wallet',
    'connect-bank-account',
    'add-card',
    'send-payment',
    'view-wallet-element',
    'manage-wallet',
  ],
  [PermissibleElementType.Posts]: [
    'create-posts',
    'view-posts',
    'like-posts',
    'comment-posts',
    'view-post-element',
  ],
  [PermissibleElementType.QuickQuestions]: [
    'view-quick-questions',
    'add-quick-question',
    'answer-quick-question',
    'close-remove-question',
    'view-quick-question-element',
  ],
  [PermissibleElementType.Text]: ['view-text-element'],
  [PermissibleElementType.Video]: ['view-video-element'],
  [PermissibleElementType.ContractTool]: [
    'view-contract-element',
    'add-contract-sow',
    'edit-contract-sow',
    'delete-contract-sow',
    'view-owned-contracts-sows',
    'view-contract-sow-element',
  ],
} as const;

export type ElementPermission<ElementType extends PermissibleElementType> =
  typeof elementPermissionsMap[ElementType][number];
type ElementPermissionItem<ElementType extends PermissibleElementType> = {
  isActive: boolean;
  id: ElementPermission<ElementType>;
};
export type NoumElementPermission<ElementType extends PermissibleElementType> =
  {
    level: NoumRolePermissionLevel.Element;
    elementType: ElementType;
    permissions: ElementPermissionItem<ElementType>[];
  };

export interface NoumAuthorizationContextValues {
  role: NoumRole | null;
  permissions: NoumRolePermissionGroupForAuthorizationFragment[];
  refetchNoumAuthorizationData: () => Promise<void>;
}
