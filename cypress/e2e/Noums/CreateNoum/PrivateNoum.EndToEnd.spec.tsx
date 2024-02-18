import { faker } from '@faker-js/faker';
import HomePage from 'cypress/pages/homePage';
import NoumPagePost from 'cypress/pages/noumPagePost';
import NotificationPage from 'cypress/pages/notificationPage';
import LoginPage from '../../../pages/loginPage';
import NoumPage from '../../../pages/noumPage';
import NoumEditPage from '../../../pages/noumEditPage';
import NoumListPage from '../../../pages/noumListPage';
import UtilPage from '../../../pages/utilPage';
import CommonPage from '../../../pages/commonPage';
import MoneyPage from '../../../pages/moneyPage';
import data from '../../../fixtures/data.json';
import NoumPageEditView from '../../../pages/noumPageEditView';
import NoumPageCustomPreview from '../../../pages/noumPageCustomPreview';
import NoumPageCustomize from '../../../pages/noumPageCustomize';
import NoumPageView from '../../../pages/noumPageView';

let email = 'testqa+2809239659@noumena.global';
let noumName = 'fugit voluptatem explicabo';

describe('PrivateNoum.EndToEnd.spec.tsx', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.getCookies().should('be.empty');
  });

  afterEach(() => {
    LoginPage.logoutByApi();
  });

  it('owner creates a noum with all elements', () => {
    // register a new user
    email = UtilPage.getRandomEmailAddress();
    const otp = UtilPage.generateOtp();
    cy.register(email, otp, true);

    // setup wallet
    MoneyPage.setupWallet(data['money.pin']);
    LoginPage.acceptCookies();

    // visit the noum
    NoumListPage.goToNoumPage();
    LoginPage.acceptCookies();

    // create a noum - fillup the fields - Name, Description and Category
    noumName = faker.lorem.words(3);
    NoumListPage.createProjectNoum(noumName, 'Story', 'Private');

    // add all project noum elements
    NoumEditPage.buildFromScratch()
      .addContentElementOnly()
      .addImageElement()
      .addVideoElement()
      .addQuickQuestionElement()
      .addMessageElement()
      .addEventElement()
      .addPostElement()
      .addFileElement()
      .addWalletElement()
      .saveAsDraft()
      .publishUpdates();

    // verify added elements are present on view mode
    NoumPage.verifyContentElementCount(1)
      .verifyImageElementCount(1)
      .verifyVideoElementCount(1)
      .verifyElementPresent('Events')
      .verifyElementPresent('Files')
      .verifyElementPresent('Quick Questions')
      .verifyElementPresent('Posts')
      .verifyElementPresent('Messages')
      .verifyElementPresent(`${noumName} Wallet`);
  });

  it('owner of project noum do some activities', () => {
    // login as the owner of the noum
    LoginPage.loginByApi(email);
    // visit the project noum and go to the noum
    NoumListPage.goToNoumPage().viewNoum(noumName);

    // do the following actions to noum
    // 1. add a question
    // 2. add a file
    // 3. add an event
    // 4. post a text content
    // 5. liked a post
    const question = faker.lorem.words(3);
    const event = faker.lorem.words(3);
    const filename = faker.lorem.words(3);
    const postText = faker.datatype.uuid();
    const commentText = faker.lorem.words(3);
    const replyText = faker.lorem.words(3);
    const updatedPostText = faker.datatype.uuid();

    // do some activities on home noum
    NoumPage.addQuestionToElement(question)
      .addFirstEventToElement(event)
      .addFileToElement(filename, data['path.image']);
    NoumPagePost.postTextToElement(postText)
      .likePostContentFirstTime(postText)
      .commentToAPost(postText, commentText)
      .replyToPostComment(postText, commentText, replyText)
      .editTextToElement(postText, updatedPostText)
      .deleteComment(replyText)
      .deleteComment(commentText)
      .deletePost(updatedPostText)
      .postTextToElement(postText);
  });

  it('user follows and request connection of the noum', () => {
    cy.log(`email:${email}`);
    cy.log(`noumName:${noumName}`);

    // login as the other user
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ONE'));

    // search for the project noum and view it
    HomePage.searchAndViewTheResult(noumName);
    NoumPage.headerName.should('have.text', noumName);

    // verify elements that a non-connected and non-follower can see
    NoumPage.noumSectionCount.should('not.exist');

    // follow the noum
    // verify follower's default elements to see
    NoumPage.followBtn.should('have.text', 'Follow').click();
    CommonPage.spinner.should('not.exist');
    NoumPage.followBtn.should('have.text', 'Following');
    NoumPage.followerHeader.should('have.text', '1Follower');
    NoumPage.noumSectionCount.should('have.length', 1);

    // request noum connection and check button label's changed
    NoumPage.requestConnectBtn
      .should('have.text', 'Request to Connect')
      .click();
    NoumPage.requestConnectBtn.should('have.text', 'Request Sent');
    cy.wait(10000);
  });

  it('owner of project noum approves connection request', () => {
    // login as the owner of the noum
    LoginPage.loginByApi(email);
    HomePage.goToHomePage();

    // validate notifications got from being followed and request connection
    NotificationPage.bellIcon.click();
    NotificationPage.sideModalContent.should('be.visible');
    NotificationPage.sideModalContentListItems
      .contains('wants to connect to ')
      .should('be.visible');
    NotificationPage.sideModalContentListItems
      .contains('followed')
      .should('be.visible');
    NotificationPage.sideModalContentCloseIcon.click();
    NotificationPage.sideModalContent.should('not.exist');

    // visit the project noum
    NoumListPage.goToNoumPage();

    // verify connection request on See all Requests & Invites modal
    NoumListPage.seeAllRequestInviteLink.click();
    NoumListPage.modalReceivedRequestContainerList.should('be.visible');
    NoumListPage.modalAllRequestInviteCloseBtn.click();

    // verify connection request on Manage Noums page
    NoumListPage.receivedRequestContainerList.should('be.visible');
    NoumListPage.receivedRequestAcceptBtn.should('be.visible');
    NoumListPage.receivedRequestDeclineBtn.should('be.visible');
    NoumListPage.receivedRequestAcceptBtn.click();

    // go to the noum
    NoumListPage.viewNoum(noumName);

    // verify connected and followers count
    NoumPage.connectedMembersCount.should('have.text', '1');
    NoumPage.followerMembersCount.should('have.text', '1');
    NoumPage.eventCount.should('have.text', '1');
  });

  it('connected user interact with the noum', () => {
    // login as the other user noums are visible
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ONE'));

    // view connected noum
    NoumListPage.goToNoumPage();
    NoumListPage.viewNoumInConnectedTab(noumName);

    // verify elements that a connected user can see
    NoumPage.verifyContentElementCount(1)
      .verifyImageElementCount(1)
      .verifyVideoElementCount(1)
      .verifyElementPresent('Events')
      .verifyElementPresent('Files')
      .verifyElementPresent('Quick Questions')
      .verifyElementPresent('Posts')
      .verifyElementPresent('Messages')
      .verifyElementPresent(`${noumName} Wallet`);
    // verify connected users button labels
    NoumPage.userConnectBtn.should('have.text', 'Connected');
    NoumPage.followBtn.should('have.text', 'Following');
    NoumPage.connectedMembersCount.should('have.text', '1');
    NoumPage.followerMembersCount.should('have.text', '1');
    NoumPage.eventCount.should('have.text', '1');

    // do the following actions to connected noum
    // 1. add an answer
    // 2. add a question
    // 3. add a file
    const answer = faker.lorem.words(3);
    const question = faker.lorem.words(3);
    const filename = faker.lorem.words(3);

    NoumPage.addAnswerToQuestionElement(answer);
    NoumPage.addQuestionToElement(question);
    NoumPage.addFileToElement(filename, data['path.image']);
  });

  it('connected user interact with the noum again', () => {
    cy.log(`email:${email}`);
    cy.log(`noumName:${noumName}`);

    // login as the other user noums are visible
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ONE'));

    // view connected noum
    NoumListPage.goToNoumPage();
    NoumListPage.viewNoumInConnectedTab(noumName);

    // do the following actions to connected noum
    // 1. add a post text
    // 2. send a message
    // 3. liked a post
    const postText = faker.datatype.uuid();
    const updatedPostText = faker.datatype.uuid();
    const commentText = faker.datatype.uuid();
    const replyText = faker.datatype.uuid();
    const message = faker.lorem.words(3);

    NoumPagePost.postTextToElement(postText)
      .likePostContentFirstTime(postText)
      .commentToAPost(postText, commentText)
      .replyToPostComment(postText, commentText, replyText)
      .editTextToElement(postText, updatedPostText)
      .deleteComment(replyText)
      .deleteComment(commentText)
      .deletePost(updatedPostText)
      .postTextToElement(postText);

    NoumPage.sendTextMessageToFirstResultUser(message);

    // favourite the project and verify it on noum page
    NoumPage.favouriteIcon.click();
    CommonPage.verifyAlertMessage('Added to Favourites');
    // view connected noum
    NoumPage.backBtn.click();
    NoumListPage.verifyNoumIsFavourite(noumName).viewNoumInConnectedTab(
      noumName,
    );

    // unfavourite the project and verify it on noum page
    NoumPage.favouriteIcon.click();
    CommonPage.verifyAlertMessage('Removed from Favourite');
    NoumPage.backBtn.click();
    CommonPage.waitForSkeletonLoader();
    NoumListPage.sortNewestToOldest().verifyNoumIsFavourite(noumName, false);
  });

  it('owner of project noum do some activities again', () => {
    // login as the owner of the noum
    LoginPage.loginByApi(email);
    // visit the project noum and go to the noum
    NoumListPage.goToNoumPage().viewNoum(noumName);

    const message = faker.datatype.uuid();
    NoumPage.sendMessageToUserByEmail(Cypress.env('AUTO_USER_ONE'), message);
  });

  it('owner of project noum do custom preview', () => {
    // login as the owner of the noum
    LoginPage.loginByApi(email);

    // visit the project noum and go to the noum
    NoumListPage.goToNoumPage().viewNoum(noumName);
    NoumPage.editNoum();
    NoumPageEditView.viewCustomPreview();

    // unhide elements and arrange it
    NoumPageCustomPreview.unhideElement('TEXT')
      .unhideElement('VIDEO')
      .unhideElement('QUICK_QUESTIONS')
      .unhideElement('CALENDAR')
      .unhideElement('IMAGE')
      .saveCustomPreview();

    // Publish updates and Confirm published
    NoumEditPage.publishUpdates();
  });

  it('non-connected user verifies custom preview', () => {
    // login as the other user noums are visible
    LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));
    HomePage.searchAndViewTheResult(noumName);

    // verify displayed elements
    NoumPage.verifyContentElementCount(1)
      .verifyImageElementCount(1)
      .verifyVideoElementCount(1)
      .verifyElementPresent('Quick Questions')
      .verifyElementPresent('Events');
    // verify hidden elements
    NoumPage.verifyElementPresent('Files', false)
      .verifyElementPresent('Posts', false)
      .verifyElementPresent('Messages', false)
      .verifyElementPresent('Wallet', false);

    // verify arrange element
    // NoumPage.elementTitle.first().should('have.text', 'Image Element');
    // verify connected users button labels
    NoumPage.requestConnectBtn.should('have.text', 'Request to Connect');
    NoumPage.followBtn.should('have.text', 'Follow');

    // login as the connected user noums are visible
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ONE'));

    // view connected noum
    NoumListPage.goToNoumPage();
    NoumListPage.viewNoumInConnectedTab(noumName);

    // verify elements that a connected user can see
    NoumPage.verifyContentElementCount(1)
      .verifyImageElementCount(1)
      .verifyVideoElementCount(1)
      .verifyElementPresent('Quick Questions')
      .verifyElementPresent('Events')
      .verifyElementPresent('Files')
      .verifyElementPresent('Posts')
      .verifyElementPresent('Messages')
      .verifyElementPresent(`${noumName} Wallet`);
  });

  it('owner of project noum customized it', () => {
    // login as the owner of the noum
    LoginPage.loginByApi(email);

    // visit the project noum and go to the noum
    NoumListPage.goToNoumPage().viewNoum(noumName);
    NoumPage.editNoum();
    NoumPageEditView.viewCustomized();

    // select and save theme
    NoumPageCustomize.selectTheme('Celtic Blue')
      .selectHeadingTextFont('Alegreya')
      .selectBodyTextFont('Alegreya')
      .selectButtonsLabelsTextFont('Alegreya')
      .closeCustomized();

    // Publish updates and Confirm published
    NoumEditPage.publishUpdates();
    NoumPageView.verifyNoumCustomStyle('celtic-blue').verifyNoumCustomFont(
      'Alegreya',
    );
  });

  it('connected user can view customized noum', () => {
    // login as connected user of the noum
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ONE'));

    // visit the project noum and go to the noum
    // search for the project noum and view it
    HomePage.searchAndViewTheResult(noumName);
    NoumPageView.waitNoumPageToLoad(noumName)
      .verifyNoumCustomStyle('celtic-blue')
      .verifyNoumCustomFont('Alegreya');
  });
});
