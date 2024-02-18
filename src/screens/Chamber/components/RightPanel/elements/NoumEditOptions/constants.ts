import { t } from 'i18next';
import { type NavItemType } from './types';

export const NavigationItems: NavItemType[] = [
  {
    label: t('noumena.chamber_edit.manage_members.title'),
    value: 'manage_members',
    type: 'primary',
    show: false,
    disableBeforeFirstPublish: false,
  },
  {
    label: t('noumena.chamber_edit.visibility_settings.title'),
    value: 'visibility_settings',
    type: 'primary',
    show: false,
    disableBeforeFirstPublish: false,
  },
  {
    label: t('noumena.chamber_edit.visibility.title'),
    value: 'invites',
    type: 'primary',
    show: false,
    disableBeforeFirstPublish: true,
  },
  {
    label: t('noumena.chamber_edit.permission'),
    value: 'permission',
    type: 'primary',
    show: false,
    disableBeforeFirstPublish: true,
  },
  {
    label: t('noumena.chamber_edit.customize.title'),
    value: 'customize',
    type: 'primary',
    show: false,
    disableBeforeFirstPublish: false,
  },
  {
    label: t('noumena.chamber_edit.broadcasting'),
    value: 'broadcasting',
    type: 'primary',
    show: false,
    disableBeforeFirstPublish: true,
  },
  {
    label: t('noumena.noum_edit.custom_preview'),
    value: 'custom_preview',
    type: 'primary',
    show: false,
    disableBeforeFirstPublish: false,
  },
  {
    label: t('noumena.chamber_edit.manage_noum_ads'),
    value: 'noum_ads',
    type: 'primary',
    show: false,
    disableBeforeFirstPublish: true,
  },
  {
    label: t('noumena.chamber_edit.noumena_copilot'),
    value: 'noumena_copilot',
    type: 'primary',
    show: false,
    disableBeforeFirstPublish: false,
  },
  {
    label: t('noumena.noum_editor.save_as_a_template'),
    value: 'save_as_a_template',
    type: 'primary',
    show: false,
    disableBeforeFirstPublish: false,
  },
  {
    label: t('noumena.header.restore_last_saved.text'),
    value: 'restore_last_published_version',
    type: 'primary',
    show: false,
    disableBeforeFirstPublish: false,
  },
  {
    label: t('noumena.chamber_edit.archive'),
    value: 'archive',
    type: 'error',
    show: false,
    disableBeforeFirstPublish: false,
  },
];
