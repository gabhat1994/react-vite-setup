import { type ApolloClient, type NormalizedCacheObject } from '@apollo/client';
import { useCallback } from 'react';
import { client, getLink } from '@/apollo/client';
import { getLocalStorage } from '@/utils/localStorage';
import accessLocalStorage from '@/constants/accessLocalStorage';

type ApolloClientHookType = {
  client: ApolloClient<NormalizedCacheObject>;
  initClient: () => void;
};

export const useClient = (): ApolloClientHookType => {
  const initClient = useCallback(() => {
    const accessToken = getLocalStorage(accessLocalStorage.ACCESS_TOKEN);
    const link = getLink(accessToken);
    client.setLink(link);
  }, []);

  return { client, initClient };
};

export default useClient;
