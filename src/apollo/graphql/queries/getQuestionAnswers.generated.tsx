/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { AnswerOutputFragmentDoc } from '../fragments/noumQuestionOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetQuestionAnswersQueryVariables = Types.Exact<{
  spaceId: Types.Scalars['ID'];
  questionId: Types.Scalars['ID'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetQuestionAnswersQuery = { __typename?: 'Query', getQuestionAnswers?: { __typename?: 'AnswersOutputResponse', totalCount?: number | null, data?: Array<{ __typename?: 'AnswerOutput', _id?: string | null, body?: string | null, spaceId?: string | null, createdAt?: any | null, updatedAt?: any | null, user?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePictureThumbnail?: string | null, profilePicture?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null, tipDetails?: Array<{ __typename?: 'TipOutput', amount?: number | null, tipBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePictureThumbnail?: string | null, profilePicture?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null }> | null } | null> | null } | null };


export const GetQuestionAnswersDocument = gql`
    query getQuestionAnswers($spaceId: ID!, $questionId: ID!, $limit: Int, $offset: Int) {
  getQuestionAnswers(
    spaceId: $spaceId
    questionId: $questionId
    limit: $limit
    offset: $offset
  ) {
    data {
      ...AnswerOutput
    }
    totalCount
  }
}
    ${AnswerOutputFragmentDoc}`;

/**
 * __useGetQuestionAnswersQuery__
 *
 * To run a query within a React component, call `useGetQuestionAnswersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestionAnswersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestionAnswersQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      questionId: // value for 'questionId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetQuestionAnswersQuery(baseOptions: Apollo.QueryHookOptions<GetQuestionAnswersQuery, GetQuestionAnswersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuestionAnswersQuery, GetQuestionAnswersQueryVariables>(GetQuestionAnswersDocument, options);
      }
export function useGetQuestionAnswersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuestionAnswersQuery, GetQuestionAnswersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuestionAnswersQuery, GetQuestionAnswersQueryVariables>(GetQuestionAnswersDocument, options);
        }
export type GetQuestionAnswersQueryHookResult = ReturnType<typeof useGetQuestionAnswersQuery>;
export type GetQuestionAnswersLazyQueryHookResult = ReturnType<typeof useGetQuestionAnswersLazyQuery>;
export type GetQuestionAnswersQueryResult = Apollo.QueryResult<GetQuestionAnswersQuery, GetQuestionAnswersQueryVariables>;