import { Icon } from '@/components';
import { type DropdownValueType } from '@/components/Dropdown';
import { compact } from 'lodash';
import { type TFunction } from 'react-i18next';

export enum NoumEditorOwnerActionNames {
  ManageMembers = 'ManageMembers',
  VisibilitySettings = 'VisibilitySettings',
  LinkNoums = 'LinkNoums',
  UnlinkNoums = 'UnlinkNoums',
  NewContract = 'NewContract',
  NewSow = 'NewSow',
  NewInvoice = 'NewInvoice',
  ResignFromManager = 'ResignFromManager',
}

type GetEllipsisMenuOptionsProps = {
  isNoumLinked: boolean;
  hasAccessToManageMembersView: boolean;
  isElementPermissionsEnabled: boolean;
  hasLinkNoumPermission: boolean;
  canResignFromManager: boolean;
  t: TFunction;
};
export function getEllipsisMenuOptions({
  isNoumLinked,
  hasAccessToManageMembersView,
  isElementPermissionsEnabled,
  hasLinkNoumPermission,
  canResignFromManager,
  t,
}: GetEllipsisMenuOptionsProps): DropdownValueType<
  NoumEditorOwnerActionNames,
  string
>[] {
  return compact([
    hasAccessToManageMembersView && {
      value: NoumEditorOwnerActionNames.ManageMembers,
      key: NoumEditorOwnerActionNames.ManageMembers,
      type: 'value',
      label: t('noumena.chamber.editor_owner_actions.manage_members'),
      icon: (
        <Icon
          name="groups_m"
          size={24}
          color="--text-tablecell-header-neutral-highlighted"
        />
      ),
    },
    isElementPermissionsEnabled && {
      value: NoumEditorOwnerActionNames.VisibilitySettings,
      key: NoumEditorOwnerActionNames.VisibilitySettings,
      type: 'value',
      label: t('noumena.chamber.editor_owner_actions.visibility_settings'),
      icon: (
        <Icon
          name="eye_on_m"
          size={24}
          color="--text-tablecell-header-neutral-highlighted"
        />
      ),
    },
    hasLinkNoumPermission && {
      value: NoumEditorOwnerActionNames.LinkNoums,
      key: NoumEditorOwnerActionNames.LinkNoums,
      type: 'value',
      label: t('noumena.link_noums.link_noums', {
        linkNo: '',
      }),
      icon: (
        <Icon
          name="link_m"
          size={24}
          color="--text-tablecell-header-neutral-highlighted"
        />
      ),
    },
    hasLinkNoumPermission &&
      isNoumLinked && {
        value: NoumEditorOwnerActionNames.UnlinkNoums,
        key: NoumEditorOwnerActionNames.UnlinkNoums,
        type: 'value',
        label: t('noumena.link_noums.unlink'),
        intent: 'danger',
        icon: (
          <Icon
            name="unlink_m"
            size={24}
            color="--text-tablecell-header-danger-primary-highlighted"
          />
        ),
      },
    canResignFromManager && {
      value: NoumEditorOwnerActionNames.ResignFromManager,
      key: NoumEditorOwnerActionNames.ResignFromManager,
      type: 'value',
      label: t('noumena.chamber.editor_owner_actions.resign_from_manager'),
      intent: 'danger',
      icon: (
        <Icon
          name="close_m"
          size={24}
          color="--text-tablecell-header-danger-primary-highlighted"
        />
      ),
    },
  ]);
}

export function getPlusMenuOptions(
  isContractToolEnabled: boolean,
  isInvoiceToolEnabled: boolean,
  t: TFunction,
): DropdownValueType<string, string>[] {
  return compact([
    !!isInvoiceToolEnabled && {
      value: NoumEditorOwnerActionNames.NewInvoice,
      key: NoumEditorOwnerActionNames.NewInvoice,
      type: 'value',
      label: t('noumena.chamber.editor_owner_actions.new_invoice'),
    },
    !!isContractToolEnabled && {
      value: NoumEditorOwnerActionNames.NewContract,
      key: NoumEditorOwnerActionNames.NewContract,
      type: 'value',
      label: t('noumena.chamber.editor_owner_actions.new_contract'),
    },
    !!isContractToolEnabled && {
      value: NoumEditorOwnerActionNames.NewSow,
      key: NoumEditorOwnerActionNames.NewSow,
      type: 'value',
      label: t('noumena.chamber.editor_owner_actions.new_sow'),
    },
  ]);
}
