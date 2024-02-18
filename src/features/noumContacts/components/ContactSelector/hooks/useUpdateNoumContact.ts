import { useCallback } from 'react';
import {
  SearchableNoumContactFragmentDoc,
  useUpdateNoumContactMutation,
} from '@/apollo/graphql';
import { type NoumContactFormValues } from '@/features/noumContacts/hooks/contactForm';
import { ContactFormMapper } from '@/features/noumContacts/utils/contactFormMapper';
import { type SearchableNoumContact } from '@/features/noumContacts/types';

export function useUpdateNoumContact() {
  const [updateNoumContactMutation] = useUpdateNoumContactMutation();

  const updateNoumContact = useCallback(
    (contactId: string, values: NoumContactFormValues) =>
      updateNoumContactMutation({
        variables: {
          input: ContactFormMapper.toUpdateNoumContactInput(contactId, values),
        },
        update(cache, result, { variables }) {
          const updatedContact = result.data?.updateNoumContact;
          if (!updatedContact) {
            return;
          }

          cache.updateFragment<SearchableNoumContact>(
            {
              fragment: SearchableNoumContactFragmentDoc,
              id: cache.identify({
                __typename: 'SearchableNoumContact',
                _id: variables?.input.contactId,
              }),
              fragmentName: 'SearchableNoumContact',
            },
            (data) => ({
              ...data,
              ...updatedContact,
              __typename: 'SearchableNoumContact',
              fullName: updatedContact.displayName,
              email: updatedContact.userId.email || values.email,
              user: updatedContact.userId,
            }),
          );
        },
      }),
    [updateNoumContactMutation],
  );

  return [updateNoumContact];
}
