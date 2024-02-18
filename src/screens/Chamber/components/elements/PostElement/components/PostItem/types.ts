import { type PostItemFragment } from '@/apollo/graphql';
import { type AvatarSizeType } from '@/components/Avatar/Avatar/types';
import { type DropdownValueType } from '@/components/Dropdown';
import { type UserType } from '@/features/posts/hooks';
import { type Dispatch, type SetStateAction } from 'react';

export type PostItemProps = {
  data: PostItemFragment;
  recent?: boolean;
  refetch?: () => Promise<void>;
  collapsible?: boolean;
  isPinningEnabled?: boolean;
  isMasterNoum?: boolean;
  withMarginTop?: boolean;
  showPinnedTag?: boolean;
  isCommunity?: boolean;
  selectedCustomPreviewTab?: string;
  forceRender?: boolean;
  setForceRender?: Dispatch<SetStateAction<boolean>>;
  pageView?: boolean;
  size?: AvatarSizeType;
};

export type PostActionType =
  | 'Report'
  | 'Delete'
  | 'Pin'
  | 'Unpin'
  | 'Edit'
  | undefined;

export type PostItemHeadProps = {
  data: PostItemFragment;
  isPinned?: boolean;
  options: DropdownValueType<string>[];
  userType?: UserType;
  onHandleSelect: (option: DropdownValueType<string>) => void;
  selectedCustomPreviewTab?: string;
  size?: AvatarSizeType;
  isPostAuthor?: boolean;
};

export type PostItemFooterProps = {
  data: PostItemFragment;
  userType?: UserType;
  isCommentsVisible?: boolean;
  commentsCount?: Number;
  isCommentsTextVisible?: boolean;
  handleComment: () => void;
  userId?: string;
  refetch?: () => void;
  handleThumbUp?: (a: string) => void;
};
