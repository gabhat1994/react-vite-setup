import { type TagsInput } from '@/apollo/generated/types';
import {
  useAddReplyToCommentV2Mutation,
  useDeleteReplyToCommentV2Mutation,
  type GetRepliesByCommentIdQueryVariables,
} from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import { useToast } from '@/hooks';
import { trackEvent } from '@/utils/tracking';
import { useState } from 'react';
import { COMMENT_MAX_LEN } from '../constants';
import { CommentsUtils } from '../utils';

export type UseReplyActionsOptions = {
  commentId: string;
  onCreate?: () => void;
  queryVariables?: GetRepliesByCommentIdQueryVariables;
};

export const useReplyActions = ({
  commentId,
  onCreate,
  queryVariables,
}: UseReplyActionsOptions) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<TagsInput[]>([]);
  const { addErrorToast } = useToast();

  const [addReplayMutation, { loading: addReplyLoading }] =
    useAddReplyToCommentV2Mutation({
      update: async (cache, result) => {
        if (!result.data?.addReplyToCommentV2 || !commentId) {
          return;
        }

        CommentsUtils.addReplyToCommentInCache(
          cache,
          commentId,
          result.data?.addReplyToCommentV2,
        );
        CommentsUtils.addReplyToListInCache(
          cache,
          result.data?.addReplyToCommentV2!,
          queryVariables,
        );
      },
      onCompleted: async () => {
        onCreate?.();
        setContent('');

        trackEvent('comment_on_post', {
          DeviceType: navigator.userAgent,
          UUID: user?._id,
          PostId: commentId,
        });
      },
      onError(error) {
        if (error instanceof Error) {
          addErrorToast(error.message);
        }
      },
    });

  const [deleteReplyToComment] = useDeleteReplyToCommentV2Mutation({
    update(cache, result, { variables }) {
      if (!result.data?.deleteReplyToCommentV2 || !variables?.replyId) {
        return;
      }

      CommentsUtils.removeReplyFromCommentInCache(
        cache,
        commentId,
        variables.replyId,
        user?._id ?? '',
      );

      CommentsUtils.removeReplyFromCache(
        cache,
        variables.replyId,
        queryVariables,
      );
    },
  });

  const deleteReply = (postId: string, replyId: string) => {
    deleteReplyToComment({
      variables: {
        commentId,
        postId,
        replyId,
      },
    });
  };

  const addTag = (uid: string | number) => {
    if (uid) {
      setTags((prev) => [...prev, { uid: String(uid) }]);
    }
  };

  const addReply = async () => {
    if (content) {
      const parsedContent = content.trim().slice(0, COMMENT_MAX_LEN);

      addReplayMutation({
        variables: {
          commentId,
          content: parsedContent,
          tags,
        },
      });
    }
  };

  return {
    addTag,
    deleteReply,
    addReply,
    addReplyLoading,
    content,
    tags,
    setContent,
  };
};
