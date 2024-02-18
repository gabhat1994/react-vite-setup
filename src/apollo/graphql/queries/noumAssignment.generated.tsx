/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumDropDownListFragmentDoc } from '../fragments/campaign.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type NoumAssignmentQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  filters?: Types.InputMaybe<Types.ProjectChamberFilter>;
}>;


export type NoumAssignmentQuery = { __typename?: 'Query', getOwnProjectChambers?: { __typename?: 'SpaceOutputResponse', count?: number | null, data?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, profileImage?: string | null, name?: string | null, projectType?: string | null } | null> | null } | null };


export const NoumAssignmentDocument = gql`
    query noumAssignment($limit: Int, $filters: ProjectChamberFilter) {
  getOwnProjectChambers(limit: $limit, filter: $filters) {
    count
    data {
      ...NoumDropDownList
    }
  }
}
    ${NoumDropDownListFragmentDoc}`;

/**
 * __useNoumAssignmentQuery__
 *
 * To run a query within a React component, call `useNoumAssignmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useNoumAssignmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNoumAssignmentQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useNoumAssignmentQuery(baseOptions?: Apollo.QueryHookOptions<NoumAssignmentQuery, NoumAssignmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NoumAssignmentQuery, NoumAssignmentQueryVariables>(NoumAssignmentDocument, options);
      }
export function useNoumAssignmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NoumAssignmentQuery, NoumAssignmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NoumAssignmentQuery, NoumAssignmentQueryVariables>(NoumAssignmentDocument, options);
        }
export type NoumAssignmentQueryHookResult = ReturnType<typeof useNoumAssignmentQuery>;
export type NoumAssignmentLazyQueryHookResult = ReturnType<typeof useNoumAssignmentLazyQuery>;
export type NoumAssignmentQueryResult = Apollo.QueryResult<NoumAssignmentQuery, NoumAssignmentQueryVariables>;