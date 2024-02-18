import { NetworkStatus } from '@apollo/client';
import CommentItem from '../CommentItem';
import { CommentsListSkeleton } from '../CommentSkeleton';
import LoadMore from '../LoadMore/LoadMore';
import { COMMENTS_LIMIT } from '../constants';
import { useCommentActions } from '../hooks/useCommentActions';
import { useCommentsList } from '../hooks/useCommentsList';
import { CommentsContainer, CommentsListContainer } from '../styles';
import { CommentInput } from './CommentInput';

type CommentsProps = {
  isPostOwner?: boolean;
  id: string;
  hasInitialComments?: boolean;
  showInput?: boolean;
  handleCreate?: () => void;
  handleDelete?: () => void;
  level: number;
};

const CommentsList = ({
  id,
  isPostOwner = false,
  showInput = false,
  hasInitialComments = false,
  handleCreate,
  handleDelete,
  level,
}: CommentsProps) => {
  const { comments, count, loading, networkStatus, variables, fetchMore } =
    useCommentsList({ postId: id });

  const showSkeleton = loading && !comments.length && hasInitialComments;

  const { deleteComment } = useCommentActions({
    id,
    queryVariables: variables,
    onRemove: handleDelete,
  });

  const handleLoadMore = async () => {
    fetchMore({
      variables: {
        offset: comments.length,
        limit: COMMENTS_LIMIT,
      },
    });
  };

  return (
    <CommentsListContainer data-testid="CommentsListContainer">
      <CommentInput
        id={id}
        level={level}
        hasComments={comments.length > 0}
        onCreate={handleCreate}
        queryVariables={variables}
        showInput={showInput}
        showSkeleton={showSkeleton}
      />

      {showSkeleton ? (
        <CommentsListSkeleton />
      ) : comments.length ? (
        <CommentsContainer>
          {comments.map((comment, index) => (
            <CommentItem
              onDelete={(postId, commentId) => {
                if (postId && commentId) {
                  deleteComment(postId, commentId);
                }
              }}
              isPostOwner={isPostOwner}
              postId={id}
              key={comment._id}
              item={comment}
              hasInitialReplies={(comment.replies?.total ?? 0) > 0}
              isLastItem={index === comments.length - 1}
            />
          ))}
        </CommentsContainer>
      ) : null}

      {comments.length < count && (
        <LoadMore
          handleLoadMore={handleLoadMore}
          isReplies={false}
          replies={comments}
          loading={networkStatus === NetworkStatus.fetchMore}
          count={count - comments.length}
        />
      )}
    </CommentsListContainer>
  );
};

export default CommentsList;
