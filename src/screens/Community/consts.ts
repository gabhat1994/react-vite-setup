import i18next from 'i18next';
import { UserType } from '@/apollo/generated/types';

const { t } = i18next;

export const COMMUNITY_TABS = [
  t('noumena.community.tab.all_posts'),
  t('noumena.community.tab.noumena_announcements'),
];

type TabsUsersTypes = {
  [name: string]: UserType;
};
export const TABS_USER_TYPES: TabsUsersTypes = {
  [t('noumena.community.tab.all_posts')]: UserType.All,
  [t('noumena.community.tab.my_connections')]: UserType.Connected,
  [t('noumena.community.tab.noumena_announcements')]: UserType.Admin,
};

export const MOBILE_POST_TAG_PREFIX = 'TAG_';
export const MOBILE_POST_TAG_0 = `${MOBILE_POST_TAG_PREFIX}0`;
