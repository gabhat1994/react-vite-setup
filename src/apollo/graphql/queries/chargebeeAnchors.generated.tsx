/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { BasicPlanFragmentDoc } from '../fragments/basicPlan.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChargebeeAnchorsQueryVariables = Types.Exact<{
  forPurchase: Types.Scalars['Boolean'];
}>;


export type ChargebeeAnchorsQuery = { __typename?: 'Query', getAllPlansDetails?: Array<{ __typename?: 'PlanSettingOutput', enabled: boolean, category?: Types.Plan_Category_Enum | null, sort_index: number, plan_setting_id: number, plans: Array<{ __typename?: 'PlanItem', plan_name_id?: string | null }> } | null> | null };


export const ChargebeeAnchorsDocument = gql`
    query chargebeeAnchors($forPurchase: Boolean!) {
  getAllPlansDetails(forPurchase: $forPurchase) {
    ...BasicPlan
  }
}
    ${BasicPlanFragmentDoc}`;

/**
 * __useChargebeeAnchorsQuery__
 *
 * To run a query within a React component, call `useChargebeeAnchorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChargebeeAnchorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChargebeeAnchorsQuery({
 *   variables: {
 *      forPurchase: // value for 'forPurchase'
 *   },
 * });
 */
export function useChargebeeAnchorsQuery(baseOptions: Apollo.QueryHookOptions<ChargebeeAnchorsQuery, ChargebeeAnchorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChargebeeAnchorsQuery, ChargebeeAnchorsQueryVariables>(ChargebeeAnchorsDocument, options);
      }
export function useChargebeeAnchorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChargebeeAnchorsQuery, ChargebeeAnchorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChargebeeAnchorsQuery, ChargebeeAnchorsQueryVariables>(ChargebeeAnchorsDocument, options);
        }
export type ChargebeeAnchorsQueryHookResult = ReturnType<typeof useChargebeeAnchorsQuery>;
export type ChargebeeAnchorsLazyQueryHookResult = ReturnType<typeof useChargebeeAnchorsLazyQuery>;
export type ChargebeeAnchorsQueryResult = Apollo.QueryResult<ChargebeeAnchorsQuery, ChargebeeAnchorsQueryVariables>;