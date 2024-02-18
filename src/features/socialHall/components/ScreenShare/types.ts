import { type UserOutput } from '@/apollo/generated/types';

export type ScreenShareProps = {
  userFeeds: UserOutput[] | null | undefined;
  isFullScreen: boolean;
  screenShareElemId: string;
  fullScreenElemId: string;
  clientWidth: number;
  clientHeight: number;
  showChatPanel?: boolean;
  showMembersPanel?: boolean;
};
