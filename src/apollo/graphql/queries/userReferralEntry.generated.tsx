/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { UserBasicOutputFragmentDoc } from '../fragments/userBasicOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserReferralEntryQueryVariables = Types.Exact<{
  productKey?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type UserReferralEntryQuery = { __typename?: 'Query', userReferralEntry?: { __typename?: 'Referral', maxAllowedCount?: number | null, referralCode?: string | null, usedCount?: number | null, ownerUserId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, usedBy?: Array<{ __typename?: 'UserOutput', createdAt?: any | null, _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null> | null } | null };


export const UserReferralEntryDocument = gql`
    query userReferralEntry($productKey: String) {
  userReferralEntry(productKey: $productKey) {
    maxAllowedCount
    ownerUserId {
      ...UserBasicOutput
    }
    referralCode
    usedBy {
      ...UserBasicOutput
      createdAt
    }
    usedCount
  }
}
    ${UserBasicOutputFragmentDoc}`;

/**
 * __useUserReferralEntryQuery__
 *
 * To run a query within a React component, call `useUserReferralEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserReferralEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserReferralEntryQuery({
 *   variables: {
 *      productKey: // value for 'productKey'
 *   },
 * });
 */
export function useUserReferralEntryQuery(baseOptions?: Apollo.QueryHookOptions<UserReferralEntryQuery, UserReferralEntryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserReferralEntryQuery, UserReferralEntryQueryVariables>(UserReferralEntryDocument, options);
      }
export function useUserReferralEntryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserReferralEntryQuery, UserReferralEntryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserReferralEntryQuery, UserReferralEntryQueryVariables>(UserReferralEntryDocument, options);
        }
export type UserReferralEntryQueryHookResult = ReturnType<typeof useUserReferralEntryQuery>;
export type UserReferralEntryLazyQueryHookResult = ReturnType<typeof useUserReferralEntryLazyQuery>;
export type UserReferralEntryQueryResult = Apollo.QueryResult<UserReferralEntryQuery, UserReferralEntryQueryVariables>;