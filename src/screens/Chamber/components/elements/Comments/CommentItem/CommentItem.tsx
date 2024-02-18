import { ActionType } from '@/apollo/generated/types';
import {
  type PostCommentFragment,
  type ThreadOutputFragment,
} from '@/apollo/graphql';
import { Button } from '@/components';
import { type DropdownValueType } from '@/components/Dropdown';
import { TSpan } from '@/components/Typography';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly, useToast } from '@/hooks';
import { Spacer } from '@/layout';
import CommentAvatar from '@/screens/Chamber/components/elements/Comments/CommentItem/CommentAvatar';
import {
  NameWrapper,
  StyledName,
  StyledText,
} from '@/screens/Community/Comments/styles';
import { MOBILE_POST_TAG_0 } from '@/screens/Community/consts';
import {
  returnParsedTagsArray,
  returnParsedTagsArrayWeb,
} from '@/screens/Community/utils';
import { distanceDate } from '@/utils/date';
import { UserUtil } from '@/utils/user';
import parse from 'html-react-parser';
import { isEmpty } from 'lodash';
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router';
import generate from 'uniqid';
import { RepliesList } from '../RepliesList/RepliesList';
import {
  ButtonWrap,
  CommentContainer,
  CommentsItemContainer,
  CommentsListWrapper,
  HeadLine,
} from '../styles';
import { CommentsUtils } from '../utils';
import CommentActions from './CommentActions.tsx';

type CommentItemProps = {
  postId: string;
  isPostOwner?: boolean;
  item: ThreadOutputFragment | PostCommentFragment;
  isReply?: boolean;
  hasMoreReplies?: boolean;
  hasInitialReplies?: boolean;
  isLastItem?: boolean;
  onDelete?: (postId?: string, commentId?: string | null) => void;
};

export const CommentItem = ({
  item,
  isReply,
  postId,
  onDelete,
  hasMoreReplies = false,
  isPostOwner = false,
  isLastItem = false,
  hasInitialReplies = false,
}: CommentItemProps) => {
  const {
    flags: { postItemTimestamp },
  } = useLaunchDarkly();

  const navigate = useNavigate();
  const { addToast } = useToast();
  const [showInput, setShowInput] = useState(false);
  const [replyClicked, setReplyClicked] = useState(false);
  const commentRef = useRef<HTMLDivElement | null>(null);

  const manageInActiveClickEvent = useCallback(() => {
    setReplyClicked(true);
    const clickTimeout = setTimeout(() => {
      setReplyClicked(false);
      clearInterval(clickTimeout);
    }, 3600);
  }, [setReplyClicked]);
  const { t } = useTranslation();
  const { content, uid, __typename: type, _id: commentId } = item;
  const { isUnregistered, user } = useAuth();

  const handleReply = () => {
    if (user?.userStatus === ActionType.Pending) {
      if (replyClicked) return;
      addToast('primary', 'none', t(`noumena.community.userIsNotActive.reply`));
      manageInActiveClickEvent();
      return;
    }

    setShowInput((prev) => !prev);
  };

  useEffect(() => {
    if (showInput) {
      commentRef.current?.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  }, [showInput]);

  const parsedContentArr = useMemo(() => returnParsedTagsArray(item), [item]);

  const isFromMobile = content?.includes(MOBILE_POST_TAG_0);
  const parsedContentArrWeb = useMemo(
    () => returnParsedTagsArrayWeb(item, undefined, isUnregistered),
    [item, isUnregistered],
  );

  const handleCommentAction = (option: DropdownValueType<string>) => {
    if (option.value === 'Delete') {
      onDelete?.(postId, commentId);
    }
  };

  const isCommentsAndReplyActionsEnabled = useMemo(() => {
    const isAdmin = user?.roles?.some((role) => role?.roleType === 'ADMIN');
    return !!(item?.uid?._id === user?._id || isAdmin || isPostOwner);
  }, [user, item, isPostOwner]);

  const onClickUser = useCallback(() => {
    if (uid?.chamber?._id && !isUnregistered && !UserUtil.isUnregistered(uid))
      navigate(generatePath(ROUTES.NOUM, { id: uid.chamber._id }));
  }, [isUnregistered, navigate, uid]);

  if (isEmpty(item)) return null;

  return (
    <CommentContainer>
      <CommentAvatar uid={uid} onClick={onClickUser} isReply={isReply} />
      <CommentsItemContainer>
        <CommentsListWrapper
          isReply={isReply}
          hasReplies={hasMoreReplies || hasInitialReplies}
        >
          <HeadLine data-testid="headline">
            <NameWrapper rightSpace={isCommentsAndReplyActionsEnabled}>
              <StyledName
                font="body-m-bold"
                colorToken="--text-comment-header-neutral-highlighted"
                onClick={onClickUser}
                disabled={isUnregistered || UserUtil.isUnregistered(uid)}
              >
                {UserUtil.renderName(uid)}
              </StyledName>
            </NameWrapper>

            {postItemTimestamp && item.createdAt && (
              <TSpan
                font="systemInfo-m"
                colorToken="--text-timestamp-neutral-default"
              >
                {distanceDate(item.createdAt)}
              </TSpan>
            )}
            {isCommentsAndReplyActionsEnabled && (
              <CommentActions
                onHandleSelect={handleCommentAction}
                type={isReply ? 'reply' : undefined}
              />
            )}
          </HeadLine>
          <Spacer width={4} />
          {isFromMobile ? (
            <StyledText
              font="body-m"
              colorToken="--text-comment-neutral-highlighted"
            >
              {parsedContentArr?.map((el) => (
                <Fragment key={generate()}>
                  {typeof el === 'string' ? parse(el) : el}
                </Fragment>
              ))}
            </StyledText>
          ) : (
            <StyledText
              font="body-m"
              colorToken="--text-comment-neutral-highlighted"
            >
              {parsedContentArrWeb?.map((el) => (
                <Fragment key={generate()}>
                  {typeof el === 'string' ? parse(el) : el}
                </Fragment>
              ))}
            </StyledText>
          )}
          {type === 'Comments' && (
            <ButtonWrap>
              <Button size="small" neutral onClick={handleReply} textOnly>
                <TSpan
                  font="button-s"
                  colorToken="--text-button-brand-primary-default"
                >
                  {t('noumena.comments.reply')}
                </TSpan>
              </Button>
            </ButtonWrap>
          )}
        </CommentsListWrapper>

        {CommentsUtils.isComment(item) && (
          <RepliesList
            id={item._id!}
            commentRef={commentRef}
            postId={postId}
            replyTo={item.uid}
            isLastItem={isLastItem}
            hasInitialReplies={hasInitialReplies}
            isPostOwner={isPostOwner}
            showInput={showInput}
            setShowInput={setShowInput}
            level={1}
          />
        )}
      </CommentsItemContainer>
    </CommentContainer>
  );
};
