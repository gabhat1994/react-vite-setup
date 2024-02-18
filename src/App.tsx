import { useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useLocation } from 'react-router';
import { ApolloProvider } from '@apollo/client';
import AppRoutes from '@/routes';
import {
  LDProvider,
  RecaptchaProvider,
  StripeProvider,
  ToastProvider,
  DisablePublishOrDraftProvider,
  NetworkProvider,
  ThemeProvider,
  ChargeBeeCustomerProvider,
  CookieConsentProvider,
} from '@/providers';
import ScrollToTopNoum from '@/components/ScrollToTop';
import { trackEvent } from '@/utils/tracking';
import { AuthProvider, SessionProvider } from '@/features/auth/contexts';
import { useClient } from './hooks';
import { OnboardingProvider } from './providers/OnboardingProvider';
import { TwilioClientV3Provider } from './providers/TwilioClientV3Provider';
import { Env } from './constants/env';
import 'react-loading-skeleton/dist/skeleton.css';
import GlobalCssStyles from './GlobalCssStyles';
import { NotificationProvider } from './providers/NotificationProvider';
import { ConversationUnreadStatusProvider } from './features/conversation/contexts/ConversationUnreadStatusProvider';
import { MentionClipboardProvider } from './providers/MentionClipboardProvider';
import { PushNotificationProvider } from './features/push-notifications/contexts/PushNotification';
import { CampaignListFilterProvider } from './providers/CampaignListFilterProvider';
import { PushNotificationListeners } from './features/push-notifications/containers/PushNotificationListeners';
import { AlertNotificationsProvider } from './providers/AlertNotificationsProvider';
import { userSessionConfig } from './constants/session';

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const { client } = useClient();
  const stayOnPage = useRef<number>(new Date().getTime());

  useEffect(() => {
    trackEvent('app_open');

    // eslint-disable-next-line no-console
    console.log(`App version: ${Env.packageVersion}`);
  }, []);

  useEffect(() => {
    stayOnPage.current = new Date().getTime();

    return () => {
      trackEvent('page_view', {
        path: location.pathname,
        stay: new Date().getTime() - stayOnPage.current,
        description: 'Time in ms that the user stayed on this page.',
      });
    };
  }, [location.pathname]);

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <LDProvider>
            <RecaptchaProvider>
              <AuthProvider client={client}>
                <CookieConsentProvider>
                  <SessionProvider {...userSessionConfig}>
                    <DisablePublishOrDraftProvider>
                      <OnboardingProvider>
                        <PushNotificationProvider>
                          <AlertNotificationsProvider>
                            <NotificationProvider>
                              <StripeProvider>
                                <ChargeBeeCustomerProvider>
                                  <TwilioClientV3Provider>
                                    <ConversationUnreadStatusProvider>
                                      <NetworkProvider>
                                        <ThemeProvider>
                                          <SkeletonTheme
                                            baseColor="var(--bg-skeleton-gradient-default)"
                                            highlightColor="var(--bg-skeleton-bg-gradient-default)"
                                          >
                                            <GlobalCssStyles />
                                            <CampaignListFilterProvider>
                                              <MentionClipboardProvider>
                                                <AppRoutes />
                                              </MentionClipboardProvider>
                                            </CampaignListFilterProvider>
                                            <ScrollToTopNoum />
                                            <PushNotificationListeners />
                                          </SkeletonTheme>
                                        </ThemeProvider>
                                      </NetworkProvider>
                                    </ConversationUnreadStatusProvider>
                                  </TwilioClientV3Provider>
                                </ChargeBeeCustomerProvider>
                              </StripeProvider>
                            </NotificationProvider>
                          </AlertNotificationsProvider>
                        </PushNotificationProvider>
                      </OnboardingProvider>
                    </DisablePublishOrDraftProvider>
                  </SessionProvider>
                </CookieConsentProvider>
              </AuthProvider>
            </RecaptchaProvider>
          </LDProvider>
        </ToastProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default App;
