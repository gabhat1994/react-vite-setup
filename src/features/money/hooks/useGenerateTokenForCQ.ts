import { type GraphQLError } from 'graphql';
import * as Sentry from '@sentry/react';
import { useGenerateOneTimeTokenMutation } from '@/apollo/graphql';

interface GenerateTokenForCQT {
  token: null | string;
  error: null | GraphQLError;
}

const useGenerateTokenForCQ = () => {
  const [generateOneTimeTokenMutation] = useGenerateOneTimeTokenMutation();
  const generateTokenForCQ = async () => {
    const generatedCQToken: GenerateTokenForCQT = {
      token: null,
      error: null,
    };
    const queryResponse = await generateOneTimeTokenMutation();
    if (queryResponse.data?.generateOneTimeToken) {
      generatedCQToken.token = queryResponse.data?.generateOneTimeToken;
    } else if (queryResponse.errors) {
      const [error] = queryResponse.errors;
      generatedCQToken.error = error;
      Sentry.captureException(queryResponse.errors, {
        tags: {
          section: 'generateTokenForCQ',
        },
      });
    }
    return generatedCQToken;
  };
  return generateTokenForCQ;
};
export default useGenerateTokenForCQ;
