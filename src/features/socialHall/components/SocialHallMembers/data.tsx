import { t } from 'i18next';
import { type DropdownValueType } from '@/components/Dropdown/types';
import { Icon } from '@/components/Icon';

export const moreDropdownOptionHost: DropdownValueType<string>[] = [
  {
    key: 'see_event_attendees',
    label: t('noumena.social_hall.see_event_attendees'),
    value: 'see_event_attendees',
    icon: (
      <Icon
        name="groups_m"
        color="--icon-tablecell-neutral-highlighted"
        size={24}
      />
    ),
    labelColor: '--icon-tablecell-neutral-highlighted',
    type: 'value',
  },
  {
    key: 'invite_users',
    label: t('noumena.social_hall.invite_users'),
    value: 'invite_users',
    icon: (
      <Icon
        name="invite_m"
        color="--icon-tablecell-neutral-highlighted"
        size={24}
      />
    ),
    type: 'value',
  },
];

export const personalEventDropdownOptionHost: DropdownValueType<string>[] = [
  {
    key: 'invite_users',
    label: t('noumena.social_hall.invite_users'),
    value: 'invite_users',
    icon: (
      <Icon
        name="invite_m"
        color="--icon-tablecell-neutral-highlighted"
        size={24}
      />
    ),
    type: 'value',
  },
];

export const moreDropdownOptionAttendee: DropdownValueType<string>[] = [
  {
    key: 'see_event_attendees',
    label: t('noumena.social_hall.show_event_attendees'),
    value: 'see_event_attendees',
    icon: (
      <Icon
        name="groups_m"
        color="--icon-tablecell-neutral-highlighted"
        size={24}
      />
    ),
    labelColor: '--icon-tablecell-neutral-highlighted',
    type: 'value',
  },
];

export const mobileDropdownStyles = {
  backgroundColor: 'var(--bg-button-neutral-default)',
  marginBottom: '16px',
};
