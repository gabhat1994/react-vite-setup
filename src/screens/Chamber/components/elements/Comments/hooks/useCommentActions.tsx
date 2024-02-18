import { type TagsInput } from '@/apollo/generated/types';
import {
  useAddCommentToPostMutation,
  useRemoveCommentMutation,
  type PostCommentsQueryVariables,
} from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import { useToast } from '@/hooks';
import { trackEvent } from '@/utils/tracking';
import { useState } from 'react';
import { COMMENT_MAX_LEN } from '../constants';
import { CommentsUtils } from '../utils';

export type UseCommentActionsOptions = {
  id: string;
  onCreate?: () => void;
  onRemove?: () => void;
  queryVariables?: PostCommentsQueryVariables;
};

export const useCommentActions = ({
  id,
  onCreate,
  onRemove,
  queryVariables,
}: UseCommentActionsOptions) => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<TagsInput[]>([]);
  const { addErrorToast } = useToast();
  const { user } = useAuth();

  const [addCommentMutation, { loading: addCommentLoading }] =
    useAddCommentToPostMutation({
      update(cache, result) {
        if (!result.data?.addCommentToPost) {
          return;
        }

        CommentsUtils.addCommentToListInCache(
          cache,
          result.data?.addCommentToPost,
          queryVariables,
        );
      },
    });

  const [removeCommentMutation] = useRemoveCommentMutation({
    update(cache, result, { variables }) {
      if (!result.data?.removeComment || !variables?.commentId) {
        return;
      }

      CommentsUtils.removeCommentFromCache(
        cache,
        variables.commentId,
        queryVariables,
      );
    },
  });

  const addTag = (uid: string | number) => {
    if (uid) {
      setTags((prev) => [...prev, { uid: String(uid) }]);
    }
  };

  const deleteComment = async (postId: string, commentId: string) => {
    try {
      await removeCommentMutation({
        variables: {
          _id: postId,
          commentId,
        },
      });
      onRemove?.();
    } catch (error) {
      if (error instanceof Error) {
        addErrorToast(error.message);
      }
    }
  };

  const createNewComment = async () => {
    if (!content) {
      return;
    }
    try {
      const parsedContent = content.trim().slice(0, COMMENT_MAX_LEN);

      await addCommentMutation({
        variables: {
          _id: id,
          content: parsedContent,
          tags,
        },
      });

      onCreate?.();
      setContent('');
      setTags([]);

      trackEvent('comment_on_post', {
        DeviceType: navigator.userAgent,
        UUID: user?._id,
        PostId: id,
      });
    } catch (error) {
      if (error instanceof Error) {
        addErrorToast(error.message);
      }
    }
  };

  return {
    deleteComment,
    setContent,
    content,
    createNewComment,
    addCommentLoading,
    addTag,
  };
};
