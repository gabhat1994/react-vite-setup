import {
  ApolloLink,
  type Observable,
  type Operation,
  type NextLink,
  type FetchResult,
} from '@apollo/client/core';

import { OperationQueuing } from './RefreshTokenLink.queue';

type FetchAccessToken = (...args: unknown[]) => Promise<Response>;
type HandleFetch<AccessTokenPayloadType> = (
  accessTokenPayload: AccessTokenPayloadType,
  operation: Operation,
) => void;
type HandleError = (err: Error, operation: Operation) => void;
type IsTokenValidOrUndefined = (
  operation: Operation,
  ...args: unknown[]
) => boolean;

// Used for any Error for data from the server
// on a request with a Status >= 300
// response contains no data or errors
// type ServerError = Error & {
//   response: Response;
//   result: Record<string, any>;
//   statusCode: number;
// };

// Thrown when server's response is cannot be parsed
// type ServerParseError = Error & {
//   response: Response;
//   statusCode: number;
//   bodyText: string;
// };

export class TokenRefreshLink<
  AccessTokenPayloadType = string,
> extends ApolloLink {
  private isTokenValidOrUndefined: IsTokenValidOrUndefined;

  private fetchAccessToken: FetchAccessToken;

  private handleFetch: HandleFetch<Response>;

  private handleError: HandleError;

  private fetching: boolean;

  private queue: OperationQueuing;

  constructor(params: TokenRefreshLink.Options<AccessTokenPayloadType>) {
    super();
    this.isTokenValidOrUndefined = params.isTokenValidOrUndefined;
    this.fetchAccessToken = params.fetchAccessToken;
    this.handleFetch = params.handleFetch;
    this.handleError =
      typeof params.handleError === 'function'
        ? params.handleError
        : (err) => {
            throw new Error(err.message);
          };

    this.fetching = false;
    this.queue = new OperationQueuing();
  }

  public request(
    operation: Operation,
    forward: NextLink,
  ): Observable<FetchResult> | null {
    if (typeof forward !== 'function') {
      throw new Error(
        '[Token Refresh Link]: Token Refresh Link is a non-terminating link and should not be the last in the composed chain',
      );
    }
    // If token does not exist, which could mean that this is a not registered
    // user request, or if it is not expired -- act as always
    if (this.isTokenValidOrUndefined(operation)) {
      return forward(operation);
    }

    if (!this.fetching) {
      this.fetching = true;
      this.fetchAccessToken()
        .then((payload) => this.handleFetch(payload, operation))
        .catch((error) => this.handleError(error, operation))
        .finally(() => {
          this.fetching = false;
          this.queue.consumeQueue();
        });
    }

    return this.queue.enqueueRequest({
      operation,
      forward,
    });
  }
}

export namespace TokenRefreshLink {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface Options<AccessTokenPayloadType> {
    /**
     * Indicates the current state of access token expiration. If the token is not yet expired or the user does not require a token (guest), then true should be returned.
     */
    isTokenValidOrUndefined: IsTokenValidOrUndefined;

    /**
     * When the new access token is retrieved, an app might persist it in memory (consider avoiding local storage) for use in subsequent requests.
     */
    handleFetch: HandleFetch<Response>;

    /**
     * Callback which receives a fresh token from Response
     */
    fetchAccessToken: FetchAccessToken;

    /**
     * Token fetch error callback. Allows to run additional actions like logout. Don't forget to handle Error if you are using this option
     */
    handleError?: HandleError;
  }
}
