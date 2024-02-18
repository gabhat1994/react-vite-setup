import { useState, useEffect } from 'react';
import { useCreatePlaidLinkMutation } from '@/apollo/graphql/mutations/createPlaidToken.generated';
import { useToast } from '@/hooks';

export const usePlaidToken = () => {
  const { addToast } = useToast();
  const [plaidToken, setPlaidToken] = useState<string>('');
  const [gqlPlaidToken, { loading }] = useCreatePlaidLinkMutation({
    onCompleted: (data) => {
      const value = data.createPlaidLink?.link_token || '';
      setPlaidToken(value);
    },
    onError: (error) => {
      addToast('error', 'none', error.message);
    },
  });
  useEffect(() => {
    if (!plaidToken) gqlPlaidToken();
  }, [plaidToken, gqlPlaidToken]);
  return { plaidToken, loading };
};
