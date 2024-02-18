import {
  type PostCommentsQueryVariables,
  usePostCommentsQuery,
} from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import { isValidPostId } from '../../PostElement/helpers';
import { COMMENTS_LIMIT } from '../constants';

export type UseCommentsListVariables = Pick<
  PostCommentsQueryVariables,
  'postId' | 'limit'
>;

type UseCommentsListOptions = {
  postId: string;
};

export const useCommentsList = ({ postId }: UseCommentsListOptions) => {
  const { variables, ...postCommentsQuery } = usePostCommentsQuery({
    variables: {
      limit: COMMENTS_LIMIT,
      offset: 0,
      postId,
    },
    fetchPolicy: 'cache-and-network',
    skip: !isValidPostId(postId),
    notifyOnNetworkStatusChange: true,
  });

  const comments = cleanList(postCommentsQuery?.data?.postComments?.data);

  const commentsVariables: UseCommentsListVariables = {
    limit: variables?.limit,
    postId: variables?.postId!,
  };

  return {
    ...postCommentsQuery,
    comments,
    count: postCommentsQuery?.data?.postComments?.count ?? 0,
    variables: commentsVariables,
  };
};
