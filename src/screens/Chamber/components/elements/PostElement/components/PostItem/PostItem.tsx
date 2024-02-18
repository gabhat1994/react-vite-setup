import {
  ActionType,
  PostVisibility,
  type Reaction,
  type UserOutput,
} from '@/apollo/generated/types';
import {
  useDeletePostMutation,
  usePinPostMutation,
  usePostCommentsCountQuery,
} from '@/apollo/graphql';
import OwnerDefaultImage from '@/assets/images/profile_default.png';
import { InlineAvatar } from '@/components/Avatar/Inline/Inline';
import { type DropdownValueType } from '@/components/Dropdown';
import { TSpan } from '@/components/Typography';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import {
  useGetUserType,
  usePermissions,
  type UserType,
} from '@/features/posts/hooks';
import { useError, useLaunchDarkly, useToast } from '@/hooks';
import useEvent from '@/hooks/useEvent';
import { Stack } from '@/layout';
import { CustomPreviewTabEnum } from '@/screens/Chamber/CustomPreview/constants';
import CommentsList from '@/screens/Chamber/components/elements/Comments';
import { DeletePost } from '@/screens/Chamber/components/elements/PostElement/modals/DeletePost';
import ParsedContent from '@/screens/Community/ParsedContent';
import { cleanList } from '@/utils/list';
import { UserUtil } from '@/utils/user';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  generatePath,
  matchPath,
  useLocation,
  useNavigate,
} from 'react-router';
import generate from 'uniqid';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { usePostElement } from '../../PostElementProvider';
import { isValidPostId } from '../../helpers';
import CreatePost from '../../modals/CreatePost';
import { ReportPostModal } from '../../modals/ReportPostModal';
import PostRichTextEditor from '../PostRichTextEditor';
import PostItemFooter from './PostItemFooter';
import PostItemHead from './PostItemHead';
import PostMedia from './PostMedia';
import { defaultPostActionOptions, pinningOptions } from './data';
import {
  Container,
  ItemReaction,
  RecentTitle,
  ShowMore,
  TextWrapper,
} from './styles';
import { type PostActionType, type PostItemProps } from './types';
import { PostItemUtils } from './utils';

export const PostItem = ({
  data,
  collapsible = false,
  recent,
  refetch,
  isPinningEnabled = false,
  isMasterNoum,
  isCommunity = false,
  selectedCustomPreviewTab,
  forceRender,
  setForceRender,
  pageView,
  showPinnedTag = true,
  withMarginTop,
  size,
}: PostItemProps) => {
  const {
    flags: { postRte },
  } = useLaunchDarkly();

  const isCollapsed =
    (data?.text ?? '').length > PostItemUtils.POST_COLLAPSED_MAX_LENGTH &&
    collapsible;

  const { isPinned = false } = data;
  const { t } = useTranslation();
  const { addToast, addSuccessIconToast, addErrorToast } = useToast();
  const [postAction, setPostAction] = useState<PostActionType>(undefined);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isConnected } = useNoumUserConnectionContext();
  const {
    refetchPosts,
    isSpaceOwner: isOwner,
    space,
    isCustomPreview,
    deletePost: deleteSinglePost,
    isDeleting,
  } = usePostElement();
  const [deleteCommunityPost, { loading: isDeletingCommunity }] =
    useDeletePostMutation();

  const [pinUnpinPost] = usePinPostMutation();
  const { user } = useAuth();
  const isPostAuthor = data.uid?._id === user?._id;
  const { logError } = useError();

  const [reactions, setReactions] = useState<Reaction[]>(
    cleanList(data?.reactions),
  );

  const getUserType = useGetUserType();
  const getUserPermission = usePermissions();

  const pinningOption = isPinned ? pinningOptions[1] : pinningOptions[0];

  const options = isPinningEnabled
    ? [pinningOption, ...defaultPostActionOptions]
    : defaultPostActionOptions;

  const { data: commentsCountData, refetch: refetchComments } =
    usePostCommentsCountQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        postId: data._id,
      },
      skip: !isValidPostId(data._id),
    });

  const commentsCount = commentsCountData?.postComments?.count ?? 0;

  const isNoumPage = matchPath({ path: ROUTES.NOUM }, pathname);
  const isHomePage = matchPath({ path: ROUTES.HOME_NOUM }, pathname);
  const isSinglePostPage = matchPath({ path: ROUTES.POST }, pathname);
  const isCommunityPage = matchPath({ path: ROUTES.COMMUNITY }, pathname);

  const [commentClicked, setCommentClicked] = useState(false);

  const manageInActiveClickEvent = useCallback(() => {
    setCommentClicked(true);
    const clickTimeout = setTimeout(() => {
      setCommentClicked(false);
      clearInterval(clickTimeout);
    }, 3600);
  }, [setCommentClicked]);

  const userType: UserType = useMemo(() => {
    if (user?.userStatus === ActionType.Pending) return ActionType.Pending;
    let result: UserType = 'GUEST';
    const owner = data?.uid?._id === user?._id;
    if (user?.roles) {
      const admin = user.roles.find((role) => role?.roleType === 'ADMIN');
      if (owner) result = 'OWNER';
      if (admin) result = 'ADMIN';
      if (owner && admin) result = 'ADMINOWNER';
      if (result !== 'GUEST') return result;
    }
    return isOwner || owner
      ? 'OWNER'
      : getUserType({
          feature: 'POST',
          visibility: data.visibility || PostVisibility.Follower,
          isConnected: isConnected ?? false,
          isFollowing: space?.isFollowing ?? false,
        });
  }, [isOwner, data, space, user, getUserType, isConnected]);

  const [isCommentsVisible, setIsCommentsVisible] = useState(pageView ?? false);

  const handleComment = useCallback(() => {
    if (isNoumPage && !isCustomPreview) {
      navigate({
        pathname: generatePath(ROUTES.POST, { id: data._id }),
        search: `?noumId=${data.chamber?._id}`,
      });
    } else if (isHomePage) {
      navigate({
        pathname: generatePath(ROUTES.POST, { id: data._id }),
      });
    } else {
      if (UserUtil.isInactive(data.uid)) return;
      if (!getUserPermission('POST', 'COMMENT', isOwner ? 'OWNER' : userType))
        return;
      if (!isCommentsVisible && userType === ActionType.Pending) {
        if (commentClicked) return;
        addToast(
          'primary',
          'none',
          t(`noumena.community.userIsNotActive.comment`),
        );
        manageInActiveClickEvent();
      }
      setIsCommentsVisible((prev) => {
        if (pageView) {
          return true;
        }
        if (userType === ActionType.Pending && commentsCount === 0) {
          return false;
        }
        return !prev;
      });
    }
  }, [
    addToast,
    commentClicked,
    commentsCount,
    data._id,
    data.chamber?._id,
    data.uid,
    getUserPermission,
    isCommentsVisible,
    isCustomPreview,
    isHomePage,
    isNoumPage,
    isOwner,
    manageInActiveClickEvent,
    navigate,
    pageView,
    t,
    userType,
  ]);

  const urls = useMemo<string[]>(
    () =>
      cleanList(reactions)
        .map(
          (reaction) =>
            UserUtil.getProfilePicture(reaction?.uid) || OwnerDefaultImage,
        )
        .slice(0, 3),
    [reactions],
  );

  const refreshPosts = useCallback(async () => {
    await refetch?.();
    await refetchPosts?.();
  }, [refetch, refetchPosts]);

  const deletePost = useCallback(
    async (id) => {
      if (isCommunityPage) {
        try {
          await deleteCommunityPost({
            variables: {
              _id: id,
            },
          });
          refreshPosts();
        } catch (error) {
          if (error instanceof Error) {
            addErrorToast(error.message);
          }
          logError(error, '[PostItem]: refreshPosts', false);
        }
      } else {
        const isSuccess = await deleteSinglePost(id);
        refreshPosts();
        if (isSuccess && isSinglePostPage) navigate(-1);
      }
    },
    [
      deleteCommunityPost,
      deleteSinglePost,
      isCommunityPage,
      isSinglePostPage,
      logError,
      navigate,
      refreshPosts,
      addErrorToast,
    ],
  );

  const onHandleSelect = (option: DropdownValueType<string>) => {
    setPostAction(option.value as PostActionType);
  };

  const handleDelete = () => deletePost(data._id);

  const handlePinUnpin = useCallback(async () => {
    setPostAction(undefined);
    try {
      const postData = await pinUnpinPost({
        variables: {
          postId: data._id,
        },
      });
      const pinned = postData?.data?.pinPost?.isPinned;
      addSuccessIconToast(
        t(`noumena.chambers.element.posts.success.${pinned ? 'pin' : 'unpin'}`),
      );
      setForceRender?.(!forceRender);
    } catch (error) {
      addErrorToast(
        t(
          `noumena.chambers.element.posts.error.${
            isPinned ? 'pin' : 'unpin'
          }_failed`,
        ),
      );
      logError(error, '[PostItem]: refreshPosts', false);
    }
  }, [
    pinUnpinPost,
    data._id,
    addSuccessIconToast,
    t,
    setForceRender,
    forceRender,
    addErrorToast,
    isPinned,
    logError,
  ]);

  const handleLike = useEvent((actionName: string) =>
    actionName === 'LIKE'
      ? setReactions((prev) => [
          ...prev,
          { _id: generate(), uid: user as UserOutput },
        ])
      : setReactions((prev) => prev?.filter((r) => r?.uid?._id !== user?._id)),
  );

  useEffect(() => {
    if (postAction === 'Pin' || postAction === 'Unpin') {
      handlePinUnpin();
    }
  }, [handlePinUnpin, postAction]);

  return (
    <Container withMarginTop={withMarginTop} data-testid="post-item-content">
      {postAction === 'Delete' && (
        <DeletePost
          postId={data._id}
          isDeleting={isCommunityPage ? isDeletingCommunity : isDeleting}
          onClose={() => setPostAction(undefined)}
          onDelete={handleDelete}
        />
      )}
      {postAction === 'Report' && (
        <ReportPostModal
          key={data._id}
          postId={data._id}
          onClose={() => setPostAction(undefined)}
        />
      )}
      {postAction === 'Edit' && (
        <CreatePost
          post={data}
          onClose={() => setPostAction(undefined)}
          onSuccess={() => {
            setPostAction(undefined);
            refreshPosts();
          }}
          onEdit={() => refreshPosts?.()}
          isMasterNoum={isMasterNoum}
          isCommunity={isCommunity}
        />
      )}
      {recent && (
        <RecentTitle>
          <TSpan font="body-m" colorToken="--text-body-neutral-default">
            {t('noumena.recent_post_title')}
          </TSpan>
        </RecentTitle>
      )}
      <PostItemHead
        data={data}
        isPinned={!!isPinned && showPinnedTag}
        options={options}
        userType={userType}
        onHandleSelect={onHandleSelect}
        selectedCustomPreviewTab={selectedCustomPreviewTab}
        size={size}
        isPostAuthor={isPostAuthor}
      />
      {data?.text && (
        <>
          <TextWrapper collapsible={collapsible} fullHeight>
            {postRte || data.rawJSON ? (
              <PostRichTextEditor
                initialData={data}
                isEdit={false}
                maxLength={
                  isCollapsed
                    ? PostItemUtils.POST_COLLAPSED_MAX_LENGTH
                    : undefined
                }
              />
            ) : (
              <ParsedContent isPost item={data} />
            )}
          </TextWrapper>
          {isCollapsed && (
            <Stack padding="8px 0 0">
              <ShowMore
                onClick={handleComment}
                colorToken="--text-button-brand-primary-default"
                font="body-m"
              >
                {t('noumena.elements.posts.show_more')}
              </ShowMore>
            </Stack>
          )}
        </>
      )}

      <PostMedia data={data} />

      {(reactions?.length || 0) > 0 &&
        selectedCustomPreviewTab !== CustomPreviewTabEnum.Preview && (
          <ItemReaction>
            <InlineAvatar size="M" borderedImage={true} urls={urls} />
            <TSpan font="body-s" colorToken="--text-card-neutral-default">
              {t('noumena.post.liked_this_post', {
                count: reactions?.length || 0,
              })}
            </TSpan>
          </ItemReaction>
        )}
      {selectedCustomPreviewTab !== CustomPreviewTabEnum.Preview && (
        <PostItemFooter
          data={data}
          userType={userType}
          isCommentsTextVisible={isCommentsVisible}
          isCommentsVisible
          commentsCount={commentsCount}
          handleComment={handleComment}
          handleThumbUp={handleLike}
          userId={user?._id}
        />
      )}
      {isCommentsVisible && (
        <CommentsList
          isPostOwner={isOwner}
          showInput
          id={data._id}
          hasInitialComments={commentsCount > 0}
          handleCreate={() => refetchComments()}
          handleDelete={() => refetchComments()}
          level={0}
        />
      )}
    </Container>
  );
};
