import generate from 'uniqid';
import { t } from 'i18next';
import { ConnectionPermissionTypeEnum } from '@/apollo/generated/types';

import { type PermissionProps } from './types';

export const options: PermissionProps[] = [
  {
    key: generate(),
    label: t('noumena.chamber_edit.permission.guest'),
    type: 'value',
    value: ConnectionPermissionTypeEnum.Guest,
    description: t('noumena.chamber_edit.permission.guest_description'),
    labelColor: '--text-tablecell-header-neutral-highlighted',
  },
  {
    key: generate(),
    label: t('noumena.chamber_edit.permission.favorite'),
    type: 'value',
    value: ConnectionPermissionTypeEnum.Favorite,
    description: t('noumena.chamber_edit.permission.favorite_description'),
    labelColor: '--text-tablecell-header-neutral-highlighted',
  },
  {
    key: generate(),
    label: t('noumena.chamber_edit.permission.disconnect'),
    type: 'value',
    value: ConnectionPermissionTypeEnum.Disconnect,
    description: t('noumena.chamber_edit.permission.disconnect_description'),
    labelColor: '--text-tablecell-header-danger-primary-highlighted',
  },
];
