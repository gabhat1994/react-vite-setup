import { type UserOptionMenuProps } from './types';

export const demoUsers = [
  {
    _id: '61a885f93eb5863ce0000001',
    firstName: 'Rimin',
    profile: {
      profilePicture:
        'https://noumena-img.s3-accelerate.amazonaws.com/6266301efa505c0a0d58b1a9/profile/DnghvoCyTi9Cw9nm3tao3',
    },
  },
  {
    _id: '61a885f93eb5863ce0000002',
    firstName: 'Yongjin',
    profile: {
      profilePicture:
        'https://noumena-img.s3-accelerate.amazonaws.com/6266301efa505c0a0d58b1a9/profile/DnghvoCyTi9Cw9nm3tao3',
    },
  },
  {
    _id: '61a885f93eb5863ce0000003',
    firstName: 'Yunlai',
    profile: {
      profilePicture:
        'https://noumena-img.s3-accelerate.amazonaws.com/6266301efa505c0a0d58b1a9/profile/DnghvoCyTi9Cw9nm3tao3',
    },
  },
  {
    _id: '61a885f93eb5863ce0000004',
    firstName: 'Peng',
    profile: {
      profilePicture:
        'https://noumena-img.s3-accelerate.amazonaws.com/6266301efa505c0a0d58b1a9/profile/DnghvoCyTi9Cw9nm3tao3',
    },
  },
  {
    _id: '61a885f93eb5863ce0000005',
    firstName: 'Jack',
    profile: {
      profilePicture:
        'https://noumena-img.s3-accelerate.amazonaws.com/6266301efa505c0a0d58b1a9/profile/DnghvoCyTi9Cw9nm3tao3',
    },
  },
  {
    _id: '61a885f93eb5863ce0000006',
    firstName: 'Michel',
    profile: {
      profilePicture:
        'https://noumena-img.s3-accelerate.amazonaws.com/6266301efa505c0a0d58b1a9/profile/DnghvoCyTi9Cw9nm3tao3',
    },
  },
];

const seeHomeNoum: UserOptionMenuProps = {
  key: 'see_home_noum',
  label: 'see_home_noum',
  value: 'see_home_noum',
  iconName: 'profile_m',
  labelColor: '--text-tablecell-header-neutral-highlighted',
  type: 'value',
};

const muteUser: UserOptionMenuProps = {
  key: 'mute_user',
  label: 'mute_user',
  value: 'mute_user',
  iconName: 'mic_off_m',
  labelColor: '--text-tablecell-header-neutral-highlighted',
  type: 'value',
};

const removeFromEvent: UserOptionMenuProps = {
  key: 'remove_from_event',
  label: 'remove_from_event',
  value: 'remove_from_event',
  iconName: 'close_m',
  labelColor: '--text-tablecell-header-danger-primary-highlighted',
  type: 'value',
};

const inviteToStage: UserOptionMenuProps = {
  key: 'invite_to_stage',
  label: 'invite_to_stage',
  value: 'invite_to_stage',
  iconName: 'mic_on_m',
  labelColor: '--text-tablecell-header-neutral-highlighted',
  type: 'value',
};

const cancelInviteToStage: UserOptionMenuProps = {
  key: 'cancel_invite_to_stage',
  label: 'cancel_invite_to_stage',
  value: 'cancel_invite_to_stage',
  iconName: 'mic_off_m',
  labelColor: '--text-tablecell-header-neutral-highlighted',
  type: 'value',
};

const moveToAudience: UserOptionMenuProps = {
  key: 'move_to_audience',
  label: 'move_to_audience',
  value: 'move_to_audience',
  iconName: 'groups_m',
  labelColor: '--text-tablecell-header-neutral-highlighted',
  type: 'value',
};

export const stageEventHostMenuOptions: UserOptionMenuProps[] = [seeHomeNoum];

export const prepostEventAudience: UserOptionMenuProps[] = [
  seeHomeNoum,
  removeFromEvent,
];

export const prepostInstantEventAudience: UserOptionMenuProps[] = [
  seeHomeNoum,
  muteUser,
  removeFromEvent,
];

export const stageEventCoHostMenuOptions: UserOptionMenuProps[] = [
  seeHomeNoum,
  muteUser,
  removeFromEvent,
];

export const stageUserMenuOptions: UserOptionMenuProps[] = [
  seeHomeNoum,
  muteUser,
  moveToAudience,
  removeFromEvent,
];

export const audienceUserMenuOptions: UserOptionMenuProps[] = [
  seeHomeNoum,
  inviteToStage,
  removeFromEvent,
];

export const invitedUserMenuOptions: UserOptionMenuProps[] = [
  seeHomeNoum,
  cancelInviteToStage,
  removeFromEvent,
];
