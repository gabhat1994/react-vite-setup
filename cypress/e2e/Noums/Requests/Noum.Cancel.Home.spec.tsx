import { faker } from '@faker-js/faker';
import NoumManage from 'cypress/pages/noumManage';
import LoginPage from '../../../pages/loginPage';
import NoumPage from '../../../pages/noumPage';
import HomePage from '../../../pages/homePage';
import NoumListPage from '../../../pages/noumListPage';
import NoumEditPage from '../../../pages/noumEditPage';

let noumName = '';

describe('Noum.Cancel.Home.spec.tsx', () => {
  before(() => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));
    noumName = faker.lorem.words(3);
    HomePage.goToHomePage();
    NoumListPage.goToNoumPage().createProjectNoum(noumName, 'Story', 'Private');
    NoumEditPage.publishUpdates();
  });

  it('connect to project', () => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ONE'));
    // search for the project noum and view it
    HomePage.searchAndViewTheResult(noumName);
    NoumPage.headerName.should('have.text', noumName);

    // request noum connection
    NoumPage.requestConnectBtn
      .should('have.text', 'Request to Connect')
      .click();
    NoumPage.requestConnectBtn.should('have.text', 'Request Sent');
  });

  it('cancel user connection request', () => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ONE'));
    HomePage.goToHomeNoum();

    // cancel request
    NoumManage.viewRequestInviteModal()
      .cancelMyRequest(noumName)
      .closeModal();


    // search for the hom noum and verify request cancel it
    HomePage.searchAndViewTheFirstResult(noumName);
    NoumPage.requestConnectBtn
    .should('have.text', 'Request to Connect');
  });

});
