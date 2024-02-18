import { useCallback, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { type Maybe } from 'graphql/jsutils/Maybe';
import { useAuth } from '@/features/auth/contexts';
import { IdentityServices } from '@/services/rest/identity';
import ROUTES from '@/constants/routes';
import { isResponseError } from '@/services/rest/utils';
import { SupportedComponents, CurrentUser, NotFound } from './Components';
import { InvoicePreviewForOps } from './Components/InvoicePreviewForOps';
// import ContractPreviewForOps from './Components/ContractDetailOps';
// import { SowDetailOps } from './Components/SowDetailOps';
import { ContractSow } from './ContractSow';

import { CampaignOfferOps } from './Components/CampaignOfferOps';
import { CampaignReportOps } from './Components/CampaignReportOps';
import { NoumAdsModal } from '../Chamber/components/modals/NoumAds';

interface StateType {
  authenticating: boolean;
  failed: boolean;
  token?: Maybe<string>;
  component?: Maybe<string>;
  componentParams?: object;
  signOutComplete: boolean;
  capturedParams: boolean;
  handleTokenCalled: boolean;
}
const AdminLogin = () => {
  const location = useLocation();
  const { signIn, signOut, user, setIsOpsUser } = useAuth();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') ?? undefined;
  const [state, setState] = useState<StateType>({
    authenticating: true,
    failed: false,
    signOutComplete: false,
    capturedParams: false,
    handleTokenCalled: false,
  });
  const handleToken = useCallback(
    async (token: string) => {
      const resp = await IdentityServices.verifyWithOneTimeAuth(token);
      if (isResponseError(resp)) {
        setState((prev) => ({ ...prev, authenticating: false, failed: true }));
      } else if (resp.accessToken) {
        setState((prev) => ({ ...prev, authenticating: false, failed: false }));
        signIn(
          {
            accessToken: resp.accessToken,
            refreshToken: resp.refreshToken,
          },
          {},
        );
      }
    },
    [signIn],
  );
  useEffect(() => {
    // skip if navigate to any other path
    if (!window.location.pathname.includes(ROUTES.ADMIN_LOGIN)) return;
    // capture params if not captured
    if (!state.capturedParams) {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');
      const component = queryParams.get('component');
      const componentParams = (() => {
        switch (component) {
          case SupportedComponents.CurrentUser:
            return { id: queryParams.get('id') };
          default:
            return {};
        }
      })();
      setIsOpsUser(true);
      setState((prev) => ({
        ...prev,
        token,
        component,
        componentParams,
        capturedParams: true,
      }));
    }
    // token is absolutely required
    if (!state.token) return;
    // must sign out
    if (!state.signOutComplete) {
      setState((prev) => ({
        ...prev,
        signOutComplete: true,
      }));
      signOut();
    }
    // if all conditions met then token can handles
    if (
      !user &&
      state.signOutComplete &&
      state.token &&
      !state.handleTokenCalled
    ) {
      setState((prev) => ({
        ...prev,
        handleTokenCalled: true,
      }));
      handleToken(state.token);
    }
  }, [
    user,
    state.signOutComplete,
    state.token,
    state.capturedParams,
    state.handleTokenCalled,
    handleToken,
    signOut,
    location.search,
    setIsOpsUser,
  ]);
  switch (true) {
    case !state.capturedParams:
      return <div>Wait!!Checking your request</div>;
    case !state.token:
      return <div>Token not provided</div>;
    case state.authenticating:
      return <div>Be Patient. Token is being verified!!</div>;
    case state.failed:
      return <div>Your token is useless, try again!!</div>;
    case !state.authenticating && !state.failed:
    default:
      return (
        <div>
          {(() => {
            switch (state.component) {
              case SupportedComponents.CurrentUser:
                return <CurrentUser {...state.componentParams} />;
              case SupportedComponents.Invoice:
                return <InvoicePreviewForOps />;
              case SupportedComponents.Contract:
                return (
                  <ContractSow
                    contractId={id || ''}
                    componentFromUrl={SupportedComponents.Contract}
                  />
                );
              case SupportedComponents.Sow:
                return (
                  <ContractSow
                    sowId={id || ''}
                    componentFromUrl={SupportedComponents.Sow}
                  />
                );
              case SupportedComponents.CampaignOffer:
                return <CampaignOfferOps offeriD={id || ''} />;

              case SupportedComponents.CampaignReport:
                return <CampaignReportOps reportId={id || ''} />;

              case SupportedComponents.SeoSetting:
                return (
                  <NoumAdsModal
                    isOpen={true}
                    onClose={() => null}
                    campaignId={id}
                  />
                );
              case SupportedComponents.NotFound:
              default:
                return <NotFound />;
            }
          })()}
        </div>
      );
  }
};

export default AdminLogin;
