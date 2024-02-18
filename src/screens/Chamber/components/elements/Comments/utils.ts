import {
  GetRepliesByCommentIdDocument,
  PostCommentFragmentDoc,
  PostCommentsDocument,
  type CommentOutputFragment,
  type GetRepliesByCommentIdQuery,
  type PostCommentFragment,
  type PostCommentsQuery,
  type ThreadOutputFragment,
} from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import { type ApolloCache } from '@apollo/client';
import { type UseRepliesListVariables } from './hooks/useRepliesList';
import { type UseCommentsListVariables } from './hooks/useCommentsList';

const isComment = (
  comment: PostCommentFragment | ThreadOutputFragment,
): comment is PostCommentFragment => comment?.__typename === 'Comments';

const isThread = (
  comment: PostCommentFragment | ThreadOutputFragment,
): comment is ThreadOutputFragment => comment?.__typename === 'ThreadOutput';

function addCommentToListInCache(
  cache: ApolloCache<unknown>,
  comment: CommentOutputFragment,
  variables?: UseCommentsListVariables,
) {
  if (!variables?.postId || !variables?.limit) {
    return;
  }

  cache.updateQuery<PostCommentsQuery, UseCommentsListVariables>(
    {
      query: PostCommentsDocument,
      variables,
    },
    (prevData) => {
      if (!prevData) {
        return null;
      }

      return {
        ...prevData,
        postComments: {
          ...prevData?.postComments,
          data: [
            { ...comment, __typename: 'Comments' },
            ...cleanList(prevData?.postComments?.data),
          ],
          count: (prevData?.postComments?.count ?? 0) + 1,
        },
      };
    },
  );
}

function removeCommentFromCache(
  cache: ApolloCache<unknown>,
  commentId: string,
  variables?: UseCommentsListVariables,
) {
  if (!variables?.postId || !variables?.limit) {
    return;
  }

  cache.updateQuery<PostCommentsQuery, UseCommentsListVariables>(
    {
      query: PostCommentsDocument,
      variables,
    },
    (prevData) => {
      if (!prevData) {
        return null;
      }
      return {
        ...prevData,
        postComments: {
          ...prevData.postComments,
          data: cleanList(prevData.postComments?.data).filter(
            (item) => item?._id !== commentId,
          ),
          count: (prevData.postComments?.count ?? 1) - 1,
        },
      };
    },
  );
}

function addReplyToListInCache(
  cache: ApolloCache<unknown>,
  reply: ThreadOutputFragment,
  variables?: UseRepliesListVariables,
) {
  cache.updateQuery<GetRepliesByCommentIdQuery>(
    {
      query: GetRepliesByCommentIdDocument,
      variables,
    },
    (prevData) => {
      if (!prevData) {
        return null;
      }
      return {
        ...prevData,
        getRepliesByCommentId: {
          ...prevData?.getRepliesByCommentId,
          data: [reply, ...(prevData?.getRepliesByCommentId?.data ?? [])],
          count: (prevData?.getRepliesByCommentId?.count ?? 0) + 1,
        },
      };
    },
  );
}

function addReplyToCommentInCache(
  cache: ApolloCache<unknown>,
  commentId: string,
  reply: ThreadOutputFragment,
) {
  cache.updateFragment<PostCommentFragment>(
    {
      fragment: PostCommentFragmentDoc,
      id: cache.identify({
        __typename: 'Comments',
        _id: commentId,
      }),
      fragmentName: 'PostComment',
    },
    (prevData) => {
      if (!prevData) {
        return null;
      }
      return {
        ...prevData,
        replies: {
          ...prevData?.replies,
          __typename: 'ReplyOutput',
          firstReply: {
            ...reply,
            _id: reply?._id ?? '',
          },
          total: (prevData?.replies?.total ?? 0) + 1,
          userIdList: [
            {
              _id: {
                ...reply?.uid,
                _id: reply?.uid?._id ?? '',
              },
            },
            ...cleanList(prevData?.replies?.userIdList),
          ],
        },
      };
    },
  );
}

function removeReplyFromCommentInCache(
  cache: ApolloCache<unknown>,
  commentId: string,
  replyId: string,
  userId: string,
) {
  cache.updateFragment<PostCommentFragment>(
    {
      fragment: PostCommentFragmentDoc,
      id: cache.identify({
        __typename: 'Comments',
        _id: commentId,
      }),
      fragmentName: 'PostComment',
    },
    (prevData) => {
      if (!prevData) {
        return null;
      }
      return {
        ...prevData,
        replies: {
          ...prevData?.replies,
          firstReply:
            prevData.replies?.firstReply?._id === replyId
              ? null
              : prevData.replies?.firstReply,
          total: (prevData?.replies?.total ?? 1) - 1,
          userIdList:
            prevData?.replies?.userIdList?.filter(
              (item) => item?._id?._id !== userId,
            ) ?? [],
        },
      };
    },
  );
}

function removeReplyFromCache(
  cache: ApolloCache<unknown>,
  replyId: string,
  variables?: UseRepliesListVariables,
) {
  cache.updateQuery<GetRepliesByCommentIdQuery>(
    {
      query: GetRepliesByCommentIdDocument,
      variables,
    },
    (prevData) => ({
      ...prevData,
      getRepliesByCommentId: {
        ...prevData?.getRepliesByCommentId,
        data: cleanList(prevData?.getRepliesByCommentId?.data).filter(
          (item) => item?._id !== replyId,
        ),
        count: (prevData?.getRepliesByCommentId?.count ?? 1) - 1,
      },
    }),
  );
}

export const CommentsUtils = {
  isComment,
  isThread,
  addCommentToListInCache,
  removeCommentFromCache,
  addReplyToListInCache,
  removeReplyFromCache,
  addReplyToCommentInCache,
  removeReplyFromCommentInCache,
};
