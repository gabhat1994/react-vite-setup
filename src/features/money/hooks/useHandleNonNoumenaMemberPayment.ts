import { type ApolloError } from '@apollo/client';
import { captureException } from '@sentry/react';
import { useNonNoumenaMemberConnectedSpaceLazyQuery } from '@/apollo/graphql';

interface Props {
  chamberId: string;
}

interface ResponseT {
  isConnectedToNoum: boolean;
  error: ApolloError | undefined;
}
const useHandleNonNoumenaMemberPayment = () => {
  const [getConnectedSpace, { loading }] =
    useNonNoumenaMemberConnectedSpaceLazyQuery({
      fetchPolicy: 'cache-and-network',
    });

  const isNonNoumenaMemberConnected = async ({
    chamberId,
  }: Props): Promise<ResponseT> => {
    const { data, error } = await getConnectedSpace({
      variables: { id: chamberId },
    });
    const isConnectedToNoum = data?.getSpaceById?.isConnected || false;
    if (error) {
      captureException(error, {
        tags: { section: 'non-noumena-member-connected space' },
      });
    }
    return { isConnectedToNoum, error };
  };

  return { isNonNoumenaMemberConnected, loading };
};

export default useHandleNonNoumenaMemberPayment;
