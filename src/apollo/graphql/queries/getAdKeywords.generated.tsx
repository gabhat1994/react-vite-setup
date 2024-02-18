/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AdKeyWordsQueryVariables = Types.Exact<{
  promptText: Types.Scalars['String'];
  options?: Types.InputMaybe<Types.PromptOptionsInput>;
}>;


export type AdKeyWordsQuery = { __typename?: 'Query', getAdKeywords?: any | null };


export const AdKeyWordsDocument = gql`
    query adKeyWords($promptText: String!, $options: PromptOptionsInput) {
  getAdKeywords(promptText: $promptText, options: $options)
}
    `;

/**
 * __useAdKeyWordsQuery__
 *
 * To run a query within a React component, call `useAdKeyWordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdKeyWordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdKeyWordsQuery({
 *   variables: {
 *      promptText: // value for 'promptText'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useAdKeyWordsQuery(baseOptions: Apollo.QueryHookOptions<AdKeyWordsQuery, AdKeyWordsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdKeyWordsQuery, AdKeyWordsQueryVariables>(AdKeyWordsDocument, options);
      }
export function useAdKeyWordsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdKeyWordsQuery, AdKeyWordsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdKeyWordsQuery, AdKeyWordsQueryVariables>(AdKeyWordsDocument, options);
        }
export type AdKeyWordsQueryHookResult = ReturnType<typeof useAdKeyWordsQuery>;
export type AdKeyWordsLazyQueryHookResult = ReturnType<typeof useAdKeyWordsLazyQuery>;
export type AdKeyWordsQueryResult = Apollo.QueryResult<AdKeyWordsQuery, AdKeyWordsQueryVariables>;