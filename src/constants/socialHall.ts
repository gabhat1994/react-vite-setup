export const SDK_SCREEN_SHARING_CODEC = 'vp8';
export const SDK_VIDEO_CODEC = 'vp8';

export const AGORA_EVENT = {
  EXCEPTION: 'exception',
  USER_LEFT: 'user-left',
  MEMBER_LEFT: 'MemberLeft',
  USER_JOINED: 'user-joined',
  USER_PUBLISHED: 'user-published',
  VOLUME_INDICATOR: 'volume-indicator',
  USER_UNPUBLISHED: 'user-unpublished',
  USER_INFO_UPDATED: 'user-info-updated',
  CONNECTION_STATE_CHANGE: 'connection-state-change',
};

export const USER_ROLE_HOST = 'host';
export const USER_ROLE_AUDIENCE = 'audience';

export const SDK_MODE_LIVE = 'live'; // this will be used in case of MAIN_EVENT, so that audience can be controlled by host

export const USER_OFFLINE_REASON = {
  QUIT: 'Quit',
  BECOME_AUDIENCE: 'BecomeAudience',
  SERVER_TIME_OUT: 'ServerTimeOut',
};

export const USER_PUBLISH_STATE = {
  MUTE_AUDIO: 'mute-audio',
  MUTE_VIDEO: 'mute-video',
  ENABLE_LOCAL_VIDEO: 'enable-local-video',
  UNMUTE_AUDIO: 'unmute-audio',
  UNMUTE_VIDEO: 'unmute-video',
  DISABLE_LOCAL_VIDEO: 'disable-local-video',
};

export const CUSTOM_GROUP_EVENTS = {
  GROUP_NAME_CHANGED: '@GROUP_NAME_CHANGED',
  NEWGROUPEVENT: 'NEWGROUPEVENT',
};

export const EVENT_NAMES = {
  JOINED_WITHOUT_KNOCK: 'JOINED_WITHOUT_KNOCK',
};
