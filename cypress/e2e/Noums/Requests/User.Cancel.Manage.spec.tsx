import NoumManage from 'cypress/pages/noumManage';
import LoginPage from '../../../pages/loginPage';
import NoumPage from '../../../pages/noumPage';
import HomePage from '../../../pages/homePage';
import NoumListPage from '../../../pages/noumListPage';
import HomeNoumPage from '../../../pages/homeNoumPage';
import UtilPage from '../../../pages/utilPage';

let email = '';
let fullName = '';

describe('User.Cancel.Manage.spec.tsx', () => {
  before(() => {
    email = UtilPage.getRandomEmailAddress();
    const otp = UtilPage.generateOtp();
    cy.log(otp);
    cy.register(email, otp, true);
  });

  it('connect to home noum', () => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));
    // search for the project noum and view it
    HomePage.searchAndViewTheFirstResult(email);

    // request noum connection
    NoumPage.requestConnectBtn
      .should('have.text', 'Request to Connect')
      .click();
    NoumPage.requestConnectBtn.should('have.text', 'Request Sent');

    // get home noum name
    HomeNoumPage.headerName.then(($element) => {
      fullName  = $element.text();
    })
  });

  it('cancel user connection request', () => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));
    NoumListPage.goToNoumPage();

    // cancel request
    NoumManage.viewAllRequestInviteModal()
      .cancelMyRequest(fullName)
      .closeModal();


    // search for the hom noum and verify request cancel it
    HomePage.searchAndViewTheFirstResult(email);
    NoumPage.requestConnectBtn
    .should('have.text', 'Request to Connect');
  });

});
