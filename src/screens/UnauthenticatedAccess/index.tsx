import { useCallback, useEffect, useRef } from 'react';
import { useAuth } from '@/features/auth/contexts';
import { useToast } from '@/hooks';
import { Spinner } from '@/components/Spinner';
import { IdentityServices } from '@/services/rest/identity';
import { isResponseError } from '@/services/rest/utils';
import jwtDecode from 'jwt-decode';
import { type AccessTokenPayload } from '@/apollo/client.helpers';
import { type EmailSubscriptionType } from '../CoreSettings/NotificationsSettings/types';

const UnauthenticatedAccess = () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const invoiceId = params.get('invoiceId');
  const contractId = params.get('contractId');
  const sowId = params.get('sowId');
  const unsubscribeFrom = params.get(
    'unsubscribeFrom',
  ) as EmailSubscriptionType;
  const ott = params.get('ott');

  const { signIn, user, setAuthData } = useAuth();
  const { addErrorToast } = useToast();

  const isInitialized = useRef(false);

  const handleOTTAuthentication = useCallback(async () => {
    if (!ott) return;
    const response = await IdentityServices.verifyWithOneTimeAuth(ott);

    if (isResponseError(response)) {
      addErrorToast('One-Time token authentication failed');
    } else {
      signIn({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });
    }
  }, [addErrorToast, ott, signIn]);

  useEffect(() => {
    if (isInitialized.current) return;

    const decoded = jwtDecode<AccessTokenPayload>(token ?? '');

    if (user?._id === decoded._id) {
      setAuthData({
        invoiceId: invoiceId || undefined,
        contractId: contractId || undefined,
        sowId: sowId || undefined,
        unsubscribeFrom,
      });
    } else if (token) {
      signIn({
        accessToken: token,
        invoiceId: invoiceId || undefined,
        contractId: contractId || undefined,
        sowId: sowId || undefined,
        unsubscribeFrom,
      });
    } else if (ott) {
      handleOTTAuthentication();
    }
    isInitialized.current = true;
  }, [
    contractId,
    handleOTTAuthentication,
    invoiceId,
    ott,
    setAuthData,
    signIn,
    sowId,
    token,
    unsubscribeFrom,
    user?._id,
  ]);

  return <Spinner />;
};

export default UnauthenticatedAccess;
