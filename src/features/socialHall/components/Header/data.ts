import { t } from 'i18next';
import { type SocialHallHeaderMenuOptionProps } from './types';

export const hostNotBuzzMenuOption: SocialHallHeaderMenuOptionProps[] = [
  {
    key: 'see_event_attendees',
    label: t('noumena.social_hall.see_event_attendees'),
    value: 'see_event_attendees',
    iconName: 'groups_m',
    labelColor: '--icon-tablecell-neutral-highlighted',
    type: 'value',
  },
  {
    key: 'invite_users',
    label: t('noumena.social_hall.invite_users'),
    value: 'invite_users',
    iconName: 'invite_m',
    labelColor: '--icon-tablecell-neutral-highlighted',
    type: 'value',
  },
  {
    key: 'copy_the_event_link',
    label: t('noumena.social_hall.copy_event_link'),
    value: 'copy_the_event_link',
    iconName: 'copy_m',
    labelColor: '--icon-tablecell-neutral-highlighted',
    type: 'value',
  },
  {
    key: 'leave_and_cancel_event',
    label: t('noumena.social_hall.leave_and_cancel_event'),
    value: 'leave_and_cancel_event',
    iconName: 'close_m',
    labelColor: '--icon-tablecell-danger-primary-default',
    intent: 'danger',
    type: 'value',
  },
];

export const cohostNotBuzzMenuOption: SocialHallHeaderMenuOptionProps[] = [
  {
    key: 'see_event_attendees',
    label: t('noumena.social_hall.see_event_attendees'),
    value: 'see_event_attendees',
    iconName: 'groups_m',
    labelColor: '--icon-tablecell-neutral-highlighted',
    type: 'value',
  },
  {
    key: 'invite_users',
    label: t('noumena.social_hall.invite_users'),
    value: 'invite_users',
    iconName: 'invite_m',
    labelColor: '--icon-tablecell-neutral-highlighted',
    type: 'value',
  },
  {
    key: 'leave_event',
    label: t('noumena.social_hall.leave_event'),
    value: 'leave_event',
    iconName: 'close_m',
    labelColor: '--icon-tablecell-danger-primary-default',
    type: 'value',
  },
];

export const hostBuzzDesktopMenuOptions: SocialHallHeaderMenuOptionProps[] = [
  {
    key: 'change_room_name',
    label: t('noumena.social_hall.change_room_name'),
    value: 'change_room_name',
    iconName: 'edit_m',
    labelColor: '--icon-tablecell-neutral-highlighted',
    type: 'value',
  },
];

export const hostPostEventDesktopMenuOptions: SocialHallHeaderMenuOptionProps[] =
  [
    {
      key: 'see_event_attendees',
      label: t('noumena.social_hall.see_event_attendees'),
      value: 'see_event_attendees',
      iconName: 'groups_m',
      labelColor: '--icon-tablecell-neutral-highlighted',
      type: 'value',
    },
    {
      key: 'invite_users',
      label: t('noumena.social_hall.invite_users'),
      value: 'invite_users',
      iconName: 'invite_m',
      labelColor: '--icon-tablecell-neutral-highlighted',
      type: 'value',
    },
  ];

export const hostBuzzMobileMenuOptions: SocialHallHeaderMenuOptionProps[] = [
  {
    key: 'start_main_event',
    label: t('noumena.social_hall.start_main_event'),
    value: 'start_main_event',
    iconName: 'wave_right_and_left_m',
    labelColor: '--icon-tablecell-neutral-highlighted',
    type: 'value',
  },
  {
    key: 'change_room_name',
    label: t('noumena.social_hall.change_room_name'),
    value: 'change_room_name',
    iconName: 'edit_m',
    labelColor: '--icon-tablecell-neutral-highlighted',
    type: 'value',
  },
];

export const attendeeNotBuzzMenuOptions: SocialHallHeaderMenuOptionProps[] = [
  {
    key: 'see_event_attendees',
    label: t('noumena.social_hall.see_event_attendees'),
    value: 'see_event_attendees',
    iconName: 'groups_m',
    labelColor: '--icon-tablecell-neutral-highlighted',
    type: 'value',
  },
];

export const attendeeBuzzMenuOptions: SocialHallHeaderMenuOptionProps[] = [
  {
    key: 'change_room_name',
    label: t('noumena.social_hall.change_room_name'),
    value: 'change_room_name',
    iconName: 'edit_m',
    labelColor: '--icon-tablecell-neutral-highlighted',
    type: 'value',
  },
];
