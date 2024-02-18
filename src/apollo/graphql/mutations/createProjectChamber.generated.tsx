/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateProjectChamberMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.ProjectChamberInput>;
}>;


export type CreateProjectChamberMutation = { __typename?: 'Mutation', createProjectChamber?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, description?: string | null, profileImage?: string | null, status?: string | null, type?: string | null, projectType?: string | null, permission?: string | null, followersCount?: number | null, isFollowing?: boolean | null, isConnected?: boolean | null, connectionsCount?: number | null, connectionId?: string | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, elements?: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null } | null> | null, networks?: Array<{ __typename?: 'NetworkOutput', _id?: string | null } | null> | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, location?: string | null } | null } | null };


export const CreateProjectChamberDocument = gql`
    mutation createProjectChamber($input: ProjectChamberInput) {
  createProjectChamber(input: $input) {
    _id
    name
    title
    description
    profileImage
    status
    type
    projectType
    permission
    followersCount
    isFollowing
    isConnected
    connectionsCount
    connectionId
    category {
      _id
      name
    }
    elements {
      _id
      elementType
    }
    networks {
      _id
    }
    uid {
      _id
      firstName
      middleName
      lastName
      location
    }
  }
}
    `;
export type CreateProjectChamberMutationFn = Apollo.MutationFunction<CreateProjectChamberMutation, CreateProjectChamberMutationVariables>;

/**
 * __useCreateProjectChamberMutation__
 *
 * To run a mutation, you first call `useCreateProjectChamberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectChamberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectChamberMutation, { data, loading, error }] = useCreateProjectChamberMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectChamberMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectChamberMutation, CreateProjectChamberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectChamberMutation, CreateProjectChamberMutationVariables>(CreateProjectChamberDocument, options);
      }
export type CreateProjectChamberMutationHookResult = ReturnType<typeof useCreateProjectChamberMutation>;
export type CreateProjectChamberMutationResult = Apollo.MutationResult<CreateProjectChamberMutation>;
export type CreateProjectChamberMutationOptions = Apollo.BaseMutationOptions<CreateProjectChamberMutation, CreateProjectChamberMutationVariables>;