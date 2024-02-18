import { useAuth } from '@/features/auth/contexts/AuthContext/AuthContext';
import { type FC, type ReactNode, useCallback, useMemo } from 'react';
import ROUTES from '@/constants/routes';
import { CookiesProvider, useCookies } from 'react-cookie';
import { useLocation } from 'react-router';
import { useToast } from '@/hooks';
import {
  useAddCookieConsentMutation,
  useGetCookieConsentQuery,
} from '@/apollo/graphql';
import { add } from 'date-fns';
import CookieConsentComponent from '@/screens/Chamber/components/modals/CookieConsent';
import { t } from 'i18next';
import { CookieConsent } from './context';

export const CookieConsentProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(['noumena-consent']);
  const location = useLocation();
  const { addToast } = useToast();

  const cookieConsentId = cookies['noumena-consent'];

  useGetCookieConsentQuery({
    skip:
      !cookieConsentId ||
      !user?._id ||
      location?.pathname.indexOf(ROUTES.ADMIN_LOGIN) > -1,
    fetchPolicy: 'network-only',
    variables: {
      cookieConsentId,
    },
    onError: (err) => {
      if (err instanceof Error) {
        if (err.message === 'User does not have access to this ID') {
          removeCookie('noumena-consent');
        } else {
          addToast('error', 'none', err.message);
        }
      }
    },
    onCompleted: (res) => {
      if (
        user?._id &&
        cookieConsentId &&
        res &&
        !res.getCookieConsent?.cookieConsent
      )
        addCookieConsent({
          variables: {
            input: {
              cookieConsentId,
              cookieConsent: true,
            },
          },
        });
    },
  });

  const [addCookieConsent] = useAddCookieConsentMutation({
    onError: (err) => {
      if (err instanceof Error) {
        addToast('error', 'none', err.message);
      }
    },
  });

  const addCookie = useCallback(
    (value: string) => {
      const date = new Date();
      const expiryDate = add(date, { years: 1 });
      setCookie('noumena-consent', value, { path: '/', expires: expiryDate });
    },
    [setCookie],
  );

  const accept = useCallback(() => {
    const date = new Date().getTime();
    const value = `${date}`;
    addCookie(value);
    if (user?._id) {
      addCookieConsent({
        variables: {
          input: {
            cookieConsentId: value,
            cookieConsent: true,
          },
        },
      });
    }
  }, [addCookie, addCookieConsent, user?._id]);

  const onMoreInfoClick = useCallback(() => {
    window.open(ROUTES.COOKIE_POLICY, '_blank');
  }, []);

  const withdraw = useCallback(async () => {
    if (user?._id && cookies['noumena-consent']) {
      await addCookieConsent({
        variables: {
          input: {
            cookieConsentId,
            cookieConsent: false,
          },
        },
        onCompleted: (res) => {
          if (res.addCookieConsent?.cookieConsentId) {
            removeCookie('noumena-consent');
            addToast(
              'success',
              'none',
              t('noumena.withdraw-consent-modal.success'),
            );
          }
        },
      });
    } else if (user?._id && !cookies['noumena-consent']) {
      addToast('error', 'none', t('noumena.withdraw-consent-modal.error'));
    } else if (!user?._id && !cookies['noumena-consent']) {
      addToast('error', 'none', t('noumena.withdraw-consent-modal.error'));
    } else {
      removeCookie('noumena-consent');
      addToast('success', 'none', t('noumena.withdraw-consent-modal.success'));
    }
  }, [
    addCookieConsent,
    addToast,
    cookieConsentId,
    cookies,
    removeCookie,
    user?._id,
  ]);

  const value = useMemo(
    () => ({ accept, onMoreInfoClick, withdraw }),
    [accept, onMoreInfoClick, withdraw],
  );

  const hideCookieConsentDialog =
    location?.pathname.indexOf(ROUTES.COOKIE_POLICY) > -1 ||
    location?.pathname.indexOf(ROUTES.ADMIN_LOGIN) > -1;

  return (
    <CookiesProvider>
      <CookieConsent.Provider value={value}>
        <>
          {children}
          {cookieConsentId || hideCookieConsentDialog ? null : (
            <CookieConsentComponent />
          )}
        </>
      </CookieConsent.Provider>
    </CookiesProvider>
  );
};

export default CookieConsentProvider;
