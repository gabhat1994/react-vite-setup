import { type MouseEventHandler } from 'react';

export type FooterActionsProps = {
  handleLike: MouseEventHandler<HTMLDivElement>;
  handleComment: MouseEventHandler<HTMLDivElement>;
  isLiked?: boolean;
  numberOfComments?: number;
  showComments?: boolean;
  isSkeletonVisible?: boolean;
};
