import { type UserOutputFragment } from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import { NetworkStatus } from '@apollo/client';
import { forwardRef } from 'react';
import CommentItem from '../CommentItem';
import { RepliesListSkeleton } from '../CommentSkeleton';
import LoadMore from '../LoadMore/LoadMore';
import { useRepliesList } from '../hooks/useRepliesList';
import { useReplyActions } from '../hooks/useReplyActions';
import { CommentsContainer, CommentsListContainer } from '../styles';
import { ReplyInput } from './ReplyInput';

type RepliesListProps = {
  isPostOwner?: boolean;
  id: string;
  showInput?: boolean;
  setShowInput: (value: boolean) => void;
  postId?: string;
  commentRef?: React.RefObject<HTMLDivElement>;
  hasInitialReplies?: boolean;
  level: number;
  replyTo?: Maybe<UserOutputFragment>;
  isLastItem?: boolean;
};

export const RepliesList = forwardRef(
  ({
    id,
    isPostOwner = false,
    showInput = false,
    commentRef,
    postId,
    level,
    replyTo,
    setShowInput,
    hasInitialReplies = false,
    isLastItem = false,
  }: RepliesListProps) => {
    const { replies, count, networkStatus, variables, fetchMore } =
      useRepliesList({
        id,
        reversed: true,
        enabled: hasInitialReplies,
      });

    const hasMore = replies?.length < count;

    const onCreateReply = () => {
      setShowInput(false);
    };

    const { deleteReply } = useReplyActions({
      commentId: id,
      queryVariables: variables,
    });

    const handleLoadMore = async () => {
      fetchMore({
        variables: {
          offset: replies.length,
          limit: 100,
        },
      });
    };

    return (
      <CommentsListContainer
        data-testid="RepliesListContainer"
        withPaddingTop={hasInitialReplies || !!replies?.length}
      >
        {hasInitialReplies && !replies?.length ? (
          <RepliesListSkeleton />
        ) : replies.length ? (
          <>
            {hasMore && (
              <LoadMore
                handleLoadMore={handleLoadMore}
                isReplies
                loading={networkStatus === NetworkStatus.fetchMore}
                replies={replies}
                count={count - replies.length}
              />
            )}
            <CommentsContainer
              data-testid="CommentsContainer"
              hasReplies
              hasMore={hasMore}
            >
              {replies.map((reply, index) => (
                <CommentItem
                  onDelete={() => {
                    if (reply?._id && postId) {
                      deleteReply(postId, reply._id);
                    }
                  }}
                  isPostOwner={isPostOwner}
                  postId={id}
                  isReply
                  key={reply._id}
                  hasMoreReplies={!!replies[index + 1]}
                  item={reply}
                  isLastItem={index === replies.length - 1}
                />
              ))}
            </CommentsContainer>
          </>
        ) : null}

        <ReplyInput
          commentId={id}
          level={level}
          onCreate={onCreateReply}
          commentRef={commentRef}
          hasReplies={replies.length > 0}
          isLastItem={isLastItem}
          queryVariables={variables}
          replyTo={replyTo}
          showInput={showInput}
        />
      </CommentsListContainer>
    );
  },
);
