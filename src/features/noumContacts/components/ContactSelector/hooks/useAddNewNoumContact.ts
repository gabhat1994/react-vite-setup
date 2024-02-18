import { useCallback } from 'react';
import {
  AllNoumsContactsDocument,
  type AllNoumsContactsQuery,
  type AllNoumsContactsQueryVariables,
  type NoumContactUserFragment,
  NoumContactUserFragmentDoc,
  useAddNewNoumContactMutation,
} from '@/apollo/graphql';
import { NoumContactStatus } from '@/apollo/generated/types';
import { type SearchableNoumContact } from '../../../types';
import { ContactFormMapper } from '../../../utils/contactFormMapper';
import { type NoumContactFormValues } from '../../../hooks/contactForm';

export function useAddNewNoumContact() {
  const [addNewNoumContactMutation] = useAddNewNoumContactMutation();

  const addNewNoumContact = useCallback(
    (values: NoumContactFormValues) =>
      addNewNoumContactMutation({
        variables: {
          input: ContactFormMapper.toAddNewNoumContactInput(values),
        },
        update(cache, result, { variables }) {
          const newContact = result.data?.addNewNoumContact;
          if (!newContact || !variables) {
            return;
          }

          cache.updateQuery<
            AllNoumsContactsQuery,
            AllNoumsContactsQueryVariables
          >(
            {
              query: AllNoumsContactsDocument,
              variables: {
                limit: 20,
                offset: 0,
                status: NoumContactStatus.Active,
                query: null,
              },
            },
            (queryData) => {
              if (!queryData) {
                return null;
              }

              const newSearchableContact: SearchableNoumContact = {
                ...newContact,
                __typename: 'SearchableNoumContact' as const,
                fullName: variables.input.displayName,
                email: variables.input.email,
                user: newContact.userId,
                createdAt: '',
              };

              return {
                ...queryData,
                allNoumsContacts: {
                  ...queryData.allNoumsContacts,
                  count: queryData.allNoumsContacts.count + 1,
                  data: [
                    newSearchableContact,
                    ...queryData.allNoumsContacts.data,
                  ],
                },
              };
            },
          );

          // If creating a non-existing user, temporarly update the data in cache.
          // BE sends this user creation event asynchronously and it might get updated after a couple of seconds,
          // so here I'm doing an optimistic update.
          if (!variables.input.userId && newContact.userId._id) {
            cache.writeFragment<NoumContactUserFragment>({
              fragment: NoumContactUserFragmentDoc,
              id: cache.identify({
                __typename: 'UserOutput',
                _id: newContact.userId._id,
              }),
              data: {
                _id: newContact.userId._id,
                firstName: variables.input.displayName,
                lastName: null,
                email: variables.input.email,
                // TODO: Replace with enum value once it's available in schema
                userStatus: 'UNAUTHENTICATED',
                profile: null,
              },
            });
          }
        },
      }),
    [addNewNoumContactMutation],
  );

  return [addNewNoumContact];
}
