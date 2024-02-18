import { SortOperator } from '@/apollo/generated/types';
import {
  type GetRepliesByCommentIdQueryVariables,
  useGetRepliesByCommentIdQuery,
} from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import { isValidPostId } from '../../PostElement/helpers';

export type UseRepliesListVariables = Pick<
  GetRepliesByCommentIdQueryVariables,
  'commentId' | 'limit' | 'sortOrder'
>;

type UseCommentsListOptions = {
  id: string;
  reversed?: boolean;
  enabled?: boolean;
};

export const useRepliesList = ({
  id,
  reversed,
  enabled,
}: UseCommentsListOptions) => {
  const { variables, ...repliesQuery } = useGetRepliesByCommentIdQuery({
    variables: {
      limit: 1,
      offset: 0,
      commentId: id,
      sortOrder: SortOperator.Desc,
    },
    fetchPolicy: 'cache-and-network',
    skip: !isValidPostId(id) || !enabled,
    notifyOnNetworkStatusChange: true,
  });

  const replies = cleanList(repliesQuery?.data?.getRepliesByCommentId?.data);

  const repliesVariables: UseRepliesListVariables = {
    limit: variables?.limit,
    commentId: variables?.commentId,
    sortOrder: variables?.sortOrder,
  };

  return {
    ...repliesQuery,
    replies: reversed ? replies?.reverse() : replies,
    count: repliesQuery?.data?.getRepliesByCommentId?.count ?? 0,
    variables: repliesVariables,
  };
};
