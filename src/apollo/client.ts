import {
  split,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import fetch from 'cross-fetch';
import { getLocalStorage } from '@/utils/localStorage';
import accessLocalStorage from '@/constants/accessLocalStorage';
import typePolicies from './typePolicies';
import getApiUrl from './getApiUrl';
import {
  generateAuthorizationLink,
  generateRefreshLink,
  onErrorCallback,
} from './client.helpers';

const userAccessToken = getLocalStorage(accessLocalStorage.ACCESS_TOKEN);

const httpLink = createHttpLink({
  uri: `${getApiUrl()}/api/v1/query`,
  fetch,
});

const wsLink = (token?: string) =>
  new WebSocketLink(
    new SubscriptionClient(process.env.VITE_WEBSOCKET_URL ?? '', {
      reconnect: Boolean(token || userAccessToken),
      connectionParams: {
        Authorization: `JWT ${token || userAccessToken}`,
      },
    }),
  );

// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = (token?: string) =>
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink(token),
    httpLink,
  );

const errorLink = onError(onErrorCallback);

const retryLink = new RetryLink();

const refreshLink = generateRefreshLink();

const link = ApolloLink.from([
  generateAuthorizationLink(userAccessToken || ''),
  refreshLink,
  retryLink,
  errorLink,
  splitLink(),
]);

export const getLink = (accessToken?: string) =>
  ApolloLink.from([
    generateAuthorizationLink(accessToken || ''),
    refreshLink,
    retryLink,
    errorLink,
    splitLink(accessToken),
  ]);

const cache = new InMemoryCache({ typePolicies });

export const client = new ApolloClient({
  connectToDevTools: true,
  cache,
  link,
});

export const getClient = (customLink?: ApolloLink) =>
  new ApolloClient({
    connectToDevTools: true,
    cache,
    link: customLink || link,
  });

export default client;
