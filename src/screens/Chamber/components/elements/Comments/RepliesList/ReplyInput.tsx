import { ActionType } from '@/apollo/generated/types';
import { type UserOutputFragment } from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import { TSpan } from '@/components';
import { Separator } from '@/components/Separator/Separator';
import { useAuth } from '@/features/auth/contexts';
import { Stack } from '@/layout';
import { UserUtil } from '@/utils/user';
import React from 'react';
import CommentItemAdd from '../CommentItem/ComentItemAdd';
import {
  useReplyActions,
  type UseReplyActionsOptions,
} from '../hooks/useReplyActions';
import { CommentInputContainer } from '../styles';

type ReplyInputProps = {
  commentRef?: React.RefObject<HTMLDivElement>;
  level: number;
  hasReplies?: boolean;
  isLastItem?: boolean;
  replyTo?: Maybe<UserOutputFragment>;
  showInput?: boolean;
} & Pick<UseReplyActionsOptions, 'queryVariables' | 'commentId' | 'onCreate'>;

export const ReplyInput: React.FC<ReplyInputProps> = ({
  level,
  replyTo,
  showInput,
  commentId,
  queryVariables,
  isLastItem,
  commentRef,
  hasReplies = false,
  onCreate,
}) => {
  const { user } = useAuth();
  const isInputVisible = user?.userStatus !== ActionType.Pending && showInput;

  const { setContent, addReply, content, addReplyLoading, addTag } =
    useReplyActions({
      commentId,
      queryVariables,
      onCreate,
    });

  return (
    <Stack fullWidth ref={commentRef}>
      {isInputVisible ? (
        <Stack
          ref={commentRef}
          vertical
          gap={8}
          padding={!hasReplies ? '16px 0 0' : undefined}
          fullWidth
          data-testid="reply-textarea-wrapper"
        >
          <Stack padding="0 0 0 8px">
            <TSpan font="footnote" colorToken="--text-input-neutral-default">
              Replying to {UserUtil.renderFullName(replyTo)}
            </TSpan>
          </Stack>
          <CommentInputContainer level={level}>
            <CommentItemAdd
              onSubmit={setContent}
              createComment={addReply}
              isReply
              value={content}
              isSubmitting={addReplyLoading}
              addTag={addTag}
            />
          </CommentInputContainer>
          {!isLastItem && <Separator fullWidth noMargin />}
        </Stack>
      ) : null}
    </Stack>
  );
};
