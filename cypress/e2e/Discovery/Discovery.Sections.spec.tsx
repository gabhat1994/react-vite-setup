import HomePage from '../../pages/homePage';
import LoginPage from '../../pages/loginPage';
import DiscoveryPage from '../../pages/discoveryPage';

describe('Discovery.Sections.spec.tsx', () => {
  beforeEach(() => {
    LoginPage.loginByApi();
  });

  it('Discovery page should load', () => {
    // navigate to Discovery page
    HomePage.goToHomePage();
    DiscoveryPage.goToDiscoveryPage();

    DiscoveryPage.verifyNoumListSection('Featured');
    DiscoveryPage.verifyNoumListSection('My Circle');
    DiscoveryPage.verifyNoumListSection('Popular');

    DiscoveryPage.verifyShowAllForFeatures();
    DiscoveryPage.goToDiscoveryPage();

    DiscoveryPage.verifyShowAllForMyCircle();
    DiscoveryPage.goToDiscoveryPage();

    DiscoveryPage.verifyShowAllForPopular();
  });
});
