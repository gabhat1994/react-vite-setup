
import NotificationPage from 'cypress/pages/notificationPage';
import LoginPage from '../../../pages/loginPage';
import NoumPage from '../../../pages/noumPage';
import HomePage from '../../../pages/homePage';
import HomeNoumPage from '../../../pages/homeNoumPage';
import UtilPage from '../../../pages/utilPage';

let email = '';
let fullName = '';

describe('User.Connect.Notif.spec.tsx', () => {
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

  it('decline user connection request', () => {
    LoginPage.loginByApi(email);
    HomePage.goToHomeNoum();

    NotificationPage.declineNoumInvite(
      `${Cypress.env('AUTO_USER_TWO_NAME')} wants to connect with you.`,
    );
  });

  it('reconnect to home noum', () => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));
    // search for the project noum and view it
    HomePage.searchAndViewTheFirstResult(email);

    // request noum connection again
    NoumPage.requestConnectBtn
      .should('have.text', 'Request to Connect')
      .click();
    NoumPage.requestConnectBtn.should('have.text', 'Request Sent');
  });

  it('accept user connection request', () => {
    LoginPage.loginByApi(email);

    NotificationPage.acceptNoumInvite(
      `${Cypress.env('AUTO_USER_TWO_NAME')} wants to connect with you.`,
    );

    HomePage.goToHomeNoum();
    HomePage.connectUserCount.contains('1');
  });

  it('verify user is connected as an owner', () => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));
    HomePage.searchAndViewTheFirstResult(email);

    NotificationPage.verifyNotificationContentOnList(
      `You are now connected with ${fullName}.`,
    );

    NoumPage.userConnectBtn.should('have.text', 'Connected');
  });
});
