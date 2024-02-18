import { useGetUserOwnedContactsQuery } from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';

export default function useCurrentUserContact() {
  const { user } = useAuth();

  const { data } = useGetUserOwnedContactsQuery({
    variables: {
      filter: {
        userIds: [user?._id ?? ''],
      },
    },
    skip: !user?._id,
  });

  return data?.getUserOwnedContacts?.data?.find(
    (contact) => contact?.userId._id === user?._id,
  );
}
