/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PlanIdQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PlanIdQuery = { __typename?: 'Query', getAvailableSubscriptions: Array<{ __typename?: 'SubscriptionOutput', item_price_id?: string | null, plan_category?: Types.Plan_Category_Enum | null, subscription_id: number }> };


export const PlanIdDocument = gql`
    query planId {
  getAvailableSubscriptions {
    item_price_id
    plan_category
    subscription_id
  }
}
    `;

/**
 * __usePlanIdQuery__
 *
 * To run a query within a React component, call `usePlanIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlanIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlanIdQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlanIdQuery(baseOptions?: Apollo.QueryHookOptions<PlanIdQuery, PlanIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlanIdQuery, PlanIdQueryVariables>(PlanIdDocument, options);
      }
export function usePlanIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlanIdQuery, PlanIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlanIdQuery, PlanIdQueryVariables>(PlanIdDocument, options);
        }
export type PlanIdQueryHookResult = ReturnType<typeof usePlanIdQuery>;
export type PlanIdLazyQueryHookResult = ReturnType<typeof usePlanIdLazyQuery>;
export type PlanIdQueryResult = Apollo.QueryResult<PlanIdQuery, PlanIdQueryVariables>;