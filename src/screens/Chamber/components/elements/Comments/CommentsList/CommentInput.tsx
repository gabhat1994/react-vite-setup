import { ActionType } from '@/apollo/generated/types';
import { useAuth } from '@/features/auth/contexts';
import React from 'react';
import CommentItemAdd from '../CommentItem/ComentItemAdd';
import { CommentInputContainer } from '../styles';
import {
  type UseCommentActionsOptions,
  useCommentActions,
} from '../hooks/useCommentActions';

type CommentInputProps = {
  level: number;
  showInput?: boolean;
  hasComments?: boolean;
  showSkeleton?: boolean;
} & Pick<UseCommentActionsOptions, 'queryVariables' | 'id' | 'onCreate'>;

export const CommentInput: React.FC<CommentInputProps> = ({
  level,
  hasComments,
  id,
  onCreate,
  showInput,
  queryVariables,
  showSkeleton,
}) => {
  const { user } = useAuth();
  const isInputVisible = user?.userStatus !== ActionType.Pending && showInput;

  const { setContent, content, createNewComment, addCommentLoading, addTag } =
    useCommentActions({
      id,
      onCreate,
      queryVariables,
    });

  if (!isInputVisible) {
    return null;
  }

  return (
    <CommentInputContainer
      level={level}
      hasComments={hasComments || showSkeleton}
    >
      <CommentItemAdd
        onSubmit={setContent}
        value={content}
        createComment={createNewComment}
        isReply={false}
        isSubmitting={addCommentLoading}
        addTag={addTag}
      />
    </CommentInputContainer>
  );
};
