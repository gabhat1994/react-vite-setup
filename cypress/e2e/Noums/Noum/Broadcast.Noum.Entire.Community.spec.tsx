import DiscoveryPage from '../../../pages/discoveryPage';
import LoginPage from '../../../pages/loginPage';
import NoumListPage from '../../../pages/noumListPage';
import NoumPage from '../../../pages/noumPage';
import NoumPageBroadcast from '../../../pages/noumPageBroadcast';
import NoumPageEditView from '../../../pages/noumPageEditView';

describe('Broadcast.Noum.Entire.Community.spec.tsx', () => {
  afterEach(() => {
    LoginPage.logoutByApi();
  });

  it('owner broadcast the noum to entire community', () => {
    // login as the owner of the noum
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ONE'));

    // visit the project noum and go to the noum
    NoumListPage.goToNoumPage().viewNoum(Cypress.env('AUTO_PROJECT_NOUM_ONE'));
    NoumPage.editNoum();
    NoumPageEditView.viewBroadcast();

    // broadcast noum to entire community
    NoumPageBroadcast.startBroadcastToEntireCommunity();
    DiscoveryPage.goToDiscoveryPage();
    DiscoveryPage.verifyBroadcastNoum(Cypress.env('AUTO_PROJECT_NOUM_ONE'));
  });

  it('connected user verify the broadcast', () => {
    // login as the connected user of the noum
    LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));

    DiscoveryPage.goToDiscoveryPage();
    DiscoveryPage.verifyBroadcastNoum(Cypress.env('AUTO_PROJECT_NOUM_ONE'));
  });

  it('non-connected user verify the broadcast', () => {
    // login as the non-connected user of the noum
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ADMIN'));

    DiscoveryPage.goToDiscoveryPage();
    DiscoveryPage.verifyBroadcastNoum(Cypress.env('AUTO_PROJECT_NOUM_ONE'));
  });

  it('owner cancel the broadcast of the noum', () => {
    // login as the owner of the noum
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ONE'));

    // visit the project noum and go to the noum
    NoumListPage.goToNoumPage().viewNoum(Cypress.env('AUTO_PROJECT_NOUM_ONE'));
    NoumPage.editNoum();
    NoumPageEditView.viewBroadcast();

    NoumPageBroadcast.cancelActiveCampaign();
    DiscoveryPage.goToDiscoveryPage();
    DiscoveryPage.verifyBroadcastNoum(
      Cypress.env('AUTO_PROJECT_NOUM_ONE'),
      false,
    );
  });
});
