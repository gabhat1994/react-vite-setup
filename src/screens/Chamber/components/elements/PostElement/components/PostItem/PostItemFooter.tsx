import {
  ActionType,
  PermissibleElementType,
  ReactionCategory,
} from '@/apollo/generated/types';
import {
  useAddReactionMutation,
  useRemoveReactionMutation,
} from '@/apollo/graphql';
import { Button } from '@/components';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { usePermissions } from '@/features/posts/hooks';
import { useToast } from '@/hooks';
import { trackEvent } from '@/utils/tracking';
import { UserUtil } from '@/utils/user';
import { t } from 'i18next';
import { useCallback, useMemo, useState } from 'react';
import { SpaceUtils } from '@/utils/space';
import { usePostElement } from '../../PostElementProvider';
import { ItemFooter } from './styles';
import { type PostItemFooterProps } from './types';
import { PostItemUtils } from './utils';

const PostItemFooter = (props: PostItemFooterProps) => {
  const {
    data,
    userId,
    userType,
    isCommentsVisible,
    isCommentsTextVisible,
    commentsCount,
    handleComment,
    handleThumbUp,
  } = props;
  const { addToast } = useToast();
  const [addReactionMutation] = useAddReactionMutation();
  const [removeReactionMutation] = useRemoveReactionMutation();
  const { isSpaceOwner: isOwner, space } = usePostElement();
  const isPending = userType === ActionType.Pending;
  const getUserPermission = usePermissions();
  const { hasElementPermission } = useNoumAuthorization();

  const hasLikePostsPermission = SpaceUtils.isProjectNoum(space)
    ? hasElementPermission(PermissibleElementType.Posts, 'like-posts', true) ||
      // TODO: Remove after we migrate followers to be regular member roles.
      !!space?.isFollowing
    : true;

  const isPermitted = useMemo(
    () =>
      getUserPermission('POST', 'COMMENT', isOwner ? 'OWNER' : userType) ||
      UserUtil.isInactive(data.uid),
    [data.uid, getUserPermission, isOwner, userType],
  );

  const [like, setLike] = useState(() =>
    data?.reactions?.some((r) => r?.uid?._id === userId),
  );

  const [likeClicked, setLikeClicked] = useState(false);

  const manageInActiveClickEvent = useCallback(() => {
    setLikeClicked(true);
    const clickTimeout = setTimeout(() => {
      setLikeClicked(false);
      clearInterval(clickTimeout);
    }, 3600);
  }, [setLikeClicked]);

  const toastOnLike = useCallback(() => {
    addToast('primary', 'none', t('noumena.community.userIsNotActive.like'));
    manageInActiveClickEvent();
  }, [addToast, manageInActiveClickEvent]);

  const handleLike = useCallback(async () => {
    const mutation = like ? removeReactionMutation : addReactionMutation;

    setLikeClicked(true);
    setLike((prevState) => !prevState);
    handleThumbUp?.(like ? 'UnLike' : 'LIKE');
    await mutation({
      variables: {
        _id: data._id,
        type: ReactionCategory.Like,
      },
    });
    if (like) {
      trackEvent('liked_post', {
        DeviceType: navigator.userAgent,
        PostId: data._id,
      });
    }
    setLikeClicked(false);
  }, [
    like,
    removeReactionMutation,
    addReactionMutation,
    handleThumbUp,
    data._id,
  ]);

  return (
    <ItemFooter>
      <Button
        textOnly
        disabled={!hasLikePostsPermission || likeClicked || !isPermitted}
        tooltipText={
          !hasLikePostsPermission
            ? t('noumena.post.no_permission.like_post')
            : ''
        }
        onClick={isPending ? toastOnLike : handleLike}
        tooltipPosition="top-right"
        leftIcon={
          <Icon
            name="thumb_up_m"
            size={18}
            color={PostItemUtils.getLikeColor(like)}
          />
        }
      >
        <TSpan
          font="body-m-bold"
          colorToken={PostItemUtils.getButtonColor(like)}
        >
          {like ? t('noumena.reaction.liked') : t('noumena.reaction.like')}
        </TSpan>
      </Button>

      {isCommentsVisible && (
        <Button
          onClick={handleComment}
          disabled={!isPermitted}
          textOnly
          leftIcon={
            <Icon
              name="message_m"
              size={18}
              color={PostItemUtils.getCommentIconColor(isCommentsTextVisible)}
            />
          }
        >
          <TSpan
            font="body-m-bold"
            colorToken={PostItemUtils.getCommentButtonColor(
              isCommentsTextVisible,
            )}
          >
            {commentsCount || t('noumena.reaction.comment')}
          </TSpan>
        </Button>
      )}
    </ItemFooter>
  );
};

export default PostItemFooter;
