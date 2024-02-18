const getLikeColor = (like?: boolean) =>
  like ? '--icon-card-brand-primary-default' : '--icon-card-neutral-default';

const getButtonColor = (like?: boolean) =>
  like
    ? '--button-card-brand-primary-default'
    : '--button-card-neutral-default';

const getCommentIconColor = (isCommentsVisible?: boolean) =>
  isCommentsVisible
    ? '--icon-card-brand-primary-default'
    : '--icon-card-neutral-default';

const getCommentButtonColor = (isCommentsVisible?: boolean) =>
  isCommentsVisible
    ? '--button-card-brand-primary-default'
    : '--button-card-neutral-default';

const POST_COLLAPSED_MAX_LENGTH = 300;

export const PostItemUtils = {
  getLikeColor,
  getButtonColor,
  getCommentIconColor,
  getCommentButtonColor,
  POST_COLLAPSED_MAX_LENGTH,
};
