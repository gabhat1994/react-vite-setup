import DiscoveryPage from '../../../pages/discoveryPage';
import LoginPage from '../../../pages/loginPage';
import NoumListPage from '../../../pages/noumListPage';
import NoumPage from '../../../pages/noumPage';
import NoumPageBroadcast from '../../../pages/noumPageBroadcast';
import NoumPageEditView from '../../../pages/noumPageEditView';

describe('Broadcast.Noum.Connected.spec.tsx', () => {
  afterEach(() => {
    LoginPage.logoutByApi();
  });

  it('owner broadcast the noum to connected user', () => {
    // login as the owner of the noum
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ONE'));

    // visit the project noum and go to the noum
    NoumListPage.goToNoumPage().viewNoum(Cypress.env('AUTO_PROJECT_NOUM_TWO'));
    NoumPage.editNoum();
    NoumPageEditView.viewBroadcast();

    // broadcast noum to my circle
    NoumPageBroadcast.startBroadcastToMyConnectedMembers();
  });

  it('connected user verify the broadcast', () => {
    // login as the connected user of the noum
    LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));

    DiscoveryPage.goToDiscoveryPage();
    DiscoveryPage.verifyBroadcastNoum(Cypress.env('AUTO_PROJECT_NOUM_TWO'));
  });

  it('non-connected user verify the broadcast', () => {
    // login as the non-connected user of the noum
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ADMIN'));

    DiscoveryPage.goToDiscoveryPage();
    DiscoveryPage.verifyBroadcastNoum(
      Cypress.env('AUTO_PROJECT_NOUM_TWO'),
      false,
    );
  });

  it('owner cancel the broadcast of the noum', () => {
    // login as the owner of the noum
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ONE'));

    // visit the project noum and go to the noum
    NoumListPage.goToNoumPage().viewNoum(Cypress.env('AUTO_PROJECT_NOUM_TWO'));
    NoumPage.editNoum();
    NoumPageEditView.viewBroadcast();

    NoumPageBroadcast.cancelActiveCampaign();
  });
});
