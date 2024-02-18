import { t } from 'i18next';
import { type InputListTypes } from '@/components/Tabs/types';
import { type TypeOfChamberBoxProps } from '@/components/ChamberBox/types';
import { type DropdownValueType } from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { SpaceTypeEnum } from '@/apollo/generated/types';
import { NoumScopeEnum } from './types';

export const memberCategory = '6267afe198962732993afaf5';
export const PAGE_SIZE = 10;
export const PAGE_BIG_SIZE = 20;

export const chamberHeadList: InputListTypes[] = [
  {
    id: NoumScopeEnum.Owned,
    name: NoumScopeEnum.Owned,
    image: 'terms_m',
    text: t('noumena.chamberBox.owned'),
    labelSize: 'medium',
  },
  {
    id: NoumScopeEnum.Connected,
    name: NoumScopeEnum.Connected,
    image: 'terms_m',
    text: t('noumena.connected'),
    labelSize: 'medium',
  },
  {
    id: NoumScopeEnum.Following,
    name: NoumScopeEnum.Following,
    image: 'terms_m',
    text: t('noumena.following'),
    labelSize: 'medium',
  },
  {
    id: NoumScopeEnum.Archived,
    name: NoumScopeEnum.Archived,
    image: 'terms_m',
    text: t('noumena.archived'),
    labelSize: 'medium',
  },
];

export const linkTab: InputListTypes[] = [
  {
    id: NoumScopeEnum.Linked,
    name: NoumScopeEnum.Linked,
    image: 'terms_m',
    text: t('noumena.linked'),
    labelSize: 'medium',
  },
];

export const noumTypeFilter: InputListTypes[] = [
  {
    id: 'All',
    name: 'All',
    text: t('noumena.noums.filter.noum_type_all'),
    labelSize: 'auto',
  },
  {
    id: SpaceTypeEnum.Project,
    name: SpaceTypeEnum.Project,
    text: t('noumena.noums.filter.noum_type_noum_spaces'),
    labelSize: 'auto',
  },
  {
    id: SpaceTypeEnum.Home,
    name: SpaceTypeEnum.Home,
    text: t('noumena.noums.filter.noum_type_members'),
    labelSize: 'auto',
  },
];

export const rightSideMenuOptions: DropdownValueType<string>[] = [
  {
    label: t(`noumena.noum_link.link_noums`),
    key: t(`noumena.noum_link.link_noums`),
    type: 'value',
    value: t(`noumena.noum_link.link_noums`),
    icon: (
      <Icon
        color="--icon-tablecell-neutral-highlighted"
        size={24}
        name="link_m"
      />
    ),
  },
  // TODO: Hide until we have the global Members Management list implemented.
  // {
  //   value: 'manage_members',
  //   key: 'Manage Members',
  //   type: 'value',
  //   label: t('noumena.chamber_edit.manage_members.title', {
  //     linkNo: '',
  //   }),
  //   icon: (
  //     <Icon
  //       name="groups_m"
  //       size={24}
  //       color="--text-tablecell-header-neutral-highlighted"
  //     />
  //   ),
  // },
];

export const linkedNoumMenuOptions: DropdownValueType<string>[] = [
  {
    label: t(`noumena.noum_link.link_details`),
    key: 'linkDetails',
    type: 'value',
    value: 'linkDetails',
    icon: (
      <Icon
        size={24}
        name="social_hall_m"
        color="--icon-tablecell-neutral-highlighted"
      />
    ),
  },
  {
    label: t(`noumena.noum_link.text`),
    key: 'link',
    type: 'value',
    value: 'link',
    icon: (
      <Icon
        size={24}
        name="link_m"
        color="--icon-tablecell-neutral-highlighted"
      />
    ),
  },
  {
    label: t(`noumena.noum_link.unlink_text`),
    key: 'unlink',
    type: 'value',
    value: 'unlink',
    icon: (
      <Icon
        size={20}
        name="unlink_m"
        color="--bg-button-danger-primary-default"
      />
    ),
    intent: 'danger',
  },
];

export const colorsOfCategory: TypeOfChamberBoxProps = {
  project: {
    bgColor: 'var(--bg-badge-chambers-project-default)',
    color: 'var(--text-badge-chambers-project-highlighted)',
  },
  social: {
    bgColor: 'var(--bg-badge-chambers-social-default)',
    color: 'var(--text-badge-chambers-social-highlighted)',
  },
  special: {
    bgColor: 'var(--bg-badge-chambers-special-default)',
    color: 'var(--text-badge-chambers-special-highlighted)',
  },
  investment: {
    bgColor: 'var(--bg-badge-chambers-investment-default)',
    color: 'var(--text-badge-chambers-investment-highlighted)',
  },
  story: {
    bgColor: 'var(--bg-badge-chambers-story-default)',
    color: 'var(--text-badge-chambers-story-highlighted)',
  },
  member: {
    bgColor: 'var(--bg-badge-chambers-member-default)',
    color: 'var(--text-badge-chambers-member-highlighted)',
  },
  linked: {
    bgColor: 'var(--bg-badge-chambers-linked-default)',
    color: 'var(--text-badge-chambers-member-highlighted)',
  },
  rise_application: {
    bgColor: 'var(--bg-badge-chambers-special-default)',
    color: 'var(--text-badge-chambers-special-highlighted)',
  },
  rise: {
    bgColor: 'var(--bg-badge-chambers-special-default)',
    color: 'var(--text-badge-chambers-special-highlighted)',
  },
};
