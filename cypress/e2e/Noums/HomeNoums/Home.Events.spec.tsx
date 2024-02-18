import LoginPage from 'cypress/pages/loginPage';
import HomeNoumEditPage from 'cypress/pages/homeNoumEditPage';
import HomeNoumPageEvents from 'cypress/pages/homeNoumPageEvents';
import { faker } from '@faker-js/faker';
import UtilPage from '../../../pages/utilPage';
import HomePage from '../../../pages/homePage';
import HomeNoumPage from '../../../pages/homeNoumPage';
import NotificationPage from '../../../pages/notificationPage';

let email = '';
let emailOther = '';
let publicEvent = '';
let connectedEvent = '';
let invitedEvent = '';
let updatedPublicEvent = '';

describe('Home.Events.spec.tsx', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.getCookies().should('be.empty');
  });

  before(() => {
    // register a new user to be invited
    emailOther = UtilPage.getRandomEmailAddress();
    const otp = UtilPage.generateOtp();

    cy.register(emailOther, otp, false);
  });

  it('Able to add an event element to home noum', () => {
    // Signup new user and activate
    email = UtilPage.getRandomEmailAddress();
    const otp = UtilPage.generateOtp();
    cy.register(email, otp, false);
    HomePage.goToHomePage();

    // add event home noum element
    HomePage.goToHomeNoum();
    HomeNoumPage.goToEditMode();
    HomeNoumEditPage.addEventElement().publishUpdates();
    HomeNoumPage.verifyViewMode();
    HomeNoumPage.verifyElementPresent('Events');
  });

  it('Able to add different type of events to home noum', () => {
    // login as event host
    LoginPage.loginByApi(email);
    HomePage.goToHomeNoum();
    publicEvent = `Public ${faker.lorem.words(3)}`;
    connectedEvent = `Connected ${faker.lorem.words(3)}`;
    invitedEvent = `Invited ${faker.lorem.words(3)}`;

    // create a public, connected and invitation only events
    HomeNoumPageEvents.addPublicEvent(publicEvent, publicEvent, 1)
      .addConnectedEvent(connectedEvent, connectedEvent, 2)
      .addInvitedEvent(invitedEvent, invitedEvent, 3, emailOther)
      .viewHostingTab()
      .viewEventSummaryModal(invitedEvent)
      .verifyAttendeePendingTab(true);
  });

  it('Able to update an existing event', () => {
    // login as event host
    LoginPage.loginByApi(email);
    HomePage.goToHomeNoum();

    // update event's name, description and date
    updatedPublicEvent = `Public ${faker.lorem.words(3)}`;
    HomeNoumPageEvents.viewHostingTab().updateEvent(
      publicEvent,
      updatedPublicEvent,
      updatedPublicEvent,
      8,
    );
  });

  it('Able to verify public, connected and only invited events visibility', () => {
    // login as user who is invited
    LoginPage.loginByApi(emailOther);
    HomePage.goToHomeNoum();

    // TBD - bug NOUM-5125
    // NotificationPage.verifyEventExist(invitedEvent);
    // NotificationPage.verifyEventExist(updatedPublicEvent);
    NotificationPage.verifyEventNotExist(connectedEvent);
    NotificationPage.verifyEventBadgeCounter(true);
  });

  it('Able to decline and accept an event invite', () => {
    // login as user who is invited and decline event invite
    LoginPage.loginByApi(emailOther);
    HomePage.goToHomeNoum();

    NotificationPage.viewEventSideModal()
      .verifyEmptyAttendingTab()
      .verifyEmptyHostingTab()
      .declineEventInvitation(invitedEvent);

    // as the host of the event re-invite the user
    LoginPage.loginByApi(email);
    HomePage.goToHomeNoum();
    HomeNoumPageEvents.viewHostingTab()
      .viewEventSummaryModal(invitedEvent)
      .verifyAttendeePendingTab(false)
      .updateEvent(
        invitedEvent,
        invitedEvent,
        invitedEvent,
        4,
        'Invited Only',
        emailOther,
      )
      .verifyAttendeePendingTab(true);
  });

  it('Able to decline and accept an event invite continuation', () => {
    // login as user who is invited and accept the invite
    LoginPage.loginByApi(emailOther);
    NotificationPage.verifyEventBadgeCounter(true);
    NotificationPage.viewEventSideModal()
      .verifyEmptyAttendingTab()
      .verifyEmptyHostingTab()
      .acceptEventInvitation(invitedEvent);

    // as the host of the event - verify that an attendee is added
    LoginPage.loginByApi(email);
    HomePage.goToHomeNoum();
    HomeNoumPageEvents.viewHostingTab()
      .viewEventSummaryModal(invitedEvent)
      .verifyAttendeesTab(1)
      .verifyAttendeePendingTab(false);
  });
});
