import LoginPage from 'cypress/pages/loginPage';
import HomeNoumEditPage from 'cypress/pages/homeNoumEditPage';
import { faker } from '@faker-js/faker';
import SignupPage from 'cypress/pages/signupPage';
import UtilPage from '../../../pages/utilPage';
import HomePage from '../../../pages/homePage';
import HomeNoumPage from '../../../pages/homeNoumPage';
import NotificationPage from '../../../pages/notificationPage';
import NoumPage from '../../../pages/noumPage';
import NoumPagePost from '../../../pages/noumPagePost';
import NoumPageEvent from '../../../pages/noumPageEvent';
import MessagePage from '../../../pages/messagePage';
import NoumManage from '../../../pages/noumManage';
import CommonPage from '../../../pages/commonPage';
import HomePageSidePanel from '../../../pages/homePageSidePanel';

let email = '';
let postText = '';
let updatedPostText = '';
let event = '';

describe('Home.Completion.spec.tsx', () => {
  before(() => {
    cy.clearCookies();
    cy.getCookies().should('be.empty');
  });

  it('Able to Complete your Home Noum', () => {
    // Signup new user and activate
    email = UtilPage.getRandomEmailAddress();
    SignupPage.registerUserByEmail(email);

    let value = HomePage.computeNoumCompletionPercentage(['']);

    // Wait as the creation of Noum
    HomePage.goToHomePage();
    CommonPage.waitForUnreadNotificationsCount();
    cy.wait(5000); // just to wait for backend to send notification
    NotificationPage.verifyEventBadgeCounter(true);
    NotificationPage.verifyNotificationContentOnList(
      'Discover our features and get involved in our community.',
    );

    // open noume me modal
    HomePage.noumMeBtn.click();

    // verify Noum Me modal texts and components
    HomePage.modalNoumMeCloseBtn.should('be.visible');
    HomePage.modalGoToHomeNoumBtn.should('be.visible');
    cy.contains('Let us introduce you to the community');
    cy.contains(
      'Complete your Profile, earn tokens and we will introduce you to the community in a featured post.',
    );
    cy.contains(`Your Profile is ${value}% Complete`);
    cy.contains(
      'Once your profile is 100% complete, you will receive 100 tokens.',
    );
    HomePage.modalNoumMeCloseBtn.should('be.visible');
    HomePage.modalGoToHomeNoumBtn.should('be.visible');

    // add details on About me
    value = HomePage.computeNoumCompletionPercentage(['About me']);
    HomePage.modalAboutMeBtn.click();
    HomePage.modalAboutMeTitleField.type('QA Test Engineer');
    HomePage.modalAboutMeBioField.type('I am a QA Test Engineer');
    HomePage.modalAboutMeLocationField.type(
      'Manila, Metro Manila, Philippines',
    );
    HomePage.modalAboutMeLocationDropDown.click();
    HomePage.modalAboutMePhoto.selectFile('cypress/files/profile.png', {
      force: true,
    });
    HomePage.modalAboutMePhotoUploaded.should('be.visible');
    HomePage.modalAboutMePhotoRemoveIcon.should('be.visible');
    cy.wait(2000);
    HomePage.modalAboutMeSaveChanges.click();
    // verify if About Me is completed
    cy.wait(2000);
    HomePage.modalElement.should('not.exist');
    HomePage.modalAboutMeBtn.should('not.exist');
    cy.contains(`Your Profile is ${value}% Complete`);

    // add details on Business Brief
    value = HomePage.computeNoumCompletionPercentage([
      'About me',
      'Business Brief',
    ]);
    HomePage.modalBusinessBriefBtn.click();
    HomePage.modalBusinessBriefTitle.should('be.visible');
    const textContent = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`;
    cy.getRTEElement().click().type(textContent);
    HomePage.modalBusinessBriefSavePublish.click();
    cy.wait(1000);
    // verify if Business Brief is completed
    HomePage.modalElement.should('not.exist');
    cy.contains(`Your Profile is ${value}% Complete`);
    HomePage.modalBusinessBriefBtn.should('not.exist');

    // add details on Project & Work Experience
    value = HomePage.computeNoumCompletionPercentage([
      'About me',
      'Business Brief',
      'Project & Work Experience',
    ]);
    HomePage.modalProjectWorkExperienceBtn.click();
    HomePage.modalProjectWorkExperienceTitle.should('be.visible');
    HomePage.modalProjectWorkExperienceAddBtn.click();
    HomePage.modalProjectWorkExperienceElementTitle.should('be.visible');
    HomePage.modalElementTitleField.type('Test Element');
    cy.getRTEElement().click().type(textContent);
    HomePage.modalElementSaveBtn.click();
    cy.wait(1000);
    // verify if Project & Work Experience is completed
    HomePage.modalElement.should('not.exist');
    cy.contains(`Your Profile is ${value}% Complete`);
    HomePage.modalProjectWorkExperienceBtn.should('not.exist');

    // add details on Education & Training
    value = HomePage.computeNoumCompletionPercentage([
      'About me',
      'Business Brief',
      'Project & Work Experience',
      'Education & Training',
    ]);
    HomePage.modalEducationTrainingBtn.click();
    HomePage.modalEducationTrainingitle.should('be.visible');
    HomePage.modalEducationTrainingAddBtn.click();
    HomePage.modalEducationTraininglementTitle.should('be.visible');
    HomePage.modalElementTitleField.type('Test Element');
    cy.getRTEElement().click().type(textContent);
    HomePage.modalElementSaveBtn.click();
    cy.wait(1000);
    // verify if Education & Training is completed
    HomePage.modalElement.should('not.exist');
    cy.contains(`Your Profile is ${value}% Complete`);
    HomePage.modalEducationTrainingBtn.should('not.exist');

    // // navigate to home noum
    HomePage.modalGoToHomeNoumBtn.click();
    HomeNoumPage.profileContainer.should('be.visible');

    // validate earned token for home completion
    NotificationPage.verifyEventBadgeCounter(true);
    NotificationPage.bellIcon.click();
    NotificationPage.tokenModal.should('be.visible');
    NotificationPage.tokenModalCloseIcon.should('be.visible');
    NotificationPage.tokenModalCount.invoke('text').should('eq', '100');
    cy.wait(1000);
    cy.contains('Tokens Added to Your Wallet!');
    cy.contains('Award Reason');
    cy.contains('100% Profile Completion');
    NotificationPage.tokenModalCloseIcon.click();
    NotificationPage.tokenModal.should('not.exist');

    // validate token notification
    NotificationPage.sideModalContent.should('be.visible');
    NotificationPage.sideModalContentFirstListItem
      .invoke('text')
      .should(
        'eq',
        'Wow, you just received 100 tokens for 100% profile completion!',
      );
    NotificationPage.sideModalContentCloseIcon.click();
    NotificationPage.sideModalContent.should('not.exist');
    cy.wait(1000);
  });

  it('Add other home noum elements', () => {
    const achievementsAwards = faker.lorem.words(3);
    const publicationsDesignPatents = faker.lorem.words(3);
    const personalInterestsElement = faker.lorem.words(3);
    const socialInterestsElement = faker.lorem.words(3);
    const username = 'robertdeocampo';

    // go to home noum
    LoginPage.loginByApi(email);
    HomePage.goToHomeNoum();
    HomeNoumPage.goToEditMode();

    // add network profile urls
    HomeNoumEditPage.inputNetworkGithubUrl(username)
      .inputNetworkBehanceUrl(username)
      .inputNetworkInstagramUrl(username)
      .inputNetworkDribbleUrl(username)
      .inputNetworkLinkedinUrl(username)
      .inputNetworkTwitterUrl(username)
      .inputNetworkMediumUrl(username);

    // add other personal details
    cy.wait(2000);
    HomeNoumEditPage.addAchievementsAwardsElement(achievementsAwards)
      .addPublicationsDesignPatentsElement(publicationsDesignPatents)
      .addPersonalInterestsElement(personalInterestsElement)
      .addSocialInterestsElement(socialInterestsElement);

    // add other home noum elements
    HomeNoumEditPage.addEventElement()
      .addVideoElement()
      .addContentElement()
      .addImageElement();

    // save home noum as draft and verify the elements
    HomeNoumEditPage.saveAsDraft().returnToHomeNoumViewMode();
    HomeNoumPage.verifyViewMode();
    HomeNoumPage.verifyElementPresent('Projects & Work Experience')
      .verifyElementPresent('Education & Training')
      .verifyElementPresent('Business Brief')
      .verifyElementPresent('Messages')
      .verifyElementPresent('Posts')
      .verifyElementPresent('Skills')
      .verifyElementNotPresent('Achievements & Awards')
      .verifyElementNotPresent('Publications, Designs & Patents')
      .verifyElementNotPresent('Personal Interests')
      .verifyElementNotPresent('Social Interests')
      .verifyElementNotPresent('Events')
      .verifyElementNotPresent('Content Element')
      .verifyElementNotPresent('Image Element')
      .verifyElementNotPresent('Video Element');

    // publish home noum and verify the elements
    HomeNoumPage.goToEditMode();
    HomeNoumEditPage.publishUpdates();
    HomeNoumPage.verifyViewMode();
    HomeNoumPage.verifyElementPresent('Projects & Work Experience')
      .verifyElementPresent('Education & Training')
      .verifyElementPresent('Business Brief')
      .verifyElementPresent('Messages')
      .verifyElementPresent('Posts')
      .verifyElementPresent('My Networks')
      .verifyElementPresent('Skills')
      .verifyElementPresent('Achievements & Awards')
      .verifyElementPresent('Publications, Designs & Patents')
      .verifyElementPresent('Personal Interests')
      .verifyElementPresent('Social Interests')
      .verifyElementPresent('Events')
      .verifyContentElementCount(2)
      .verifyImageElementCount(1)
      .verifyVideoElementCount(1);
    cy.contains(achievementsAwards).scrollIntoView().should('be.visible');
    cy.contains(publicationsDesignPatents).should('be.visible');
    cy.contains(personalInterestsElement).scrollIntoView().should('be.visible');
    cy.contains(socialInterestsElement).should('be.visible');
  });

  it('Home Noum owner do some activities', () => {
    LoginPage.loginByApi(email);
    HomePage.goToHomeNoum();

    postText = faker.datatype.uuid();
    updatedPostText = faker.datatype.uuid();
    event = faker.lorem.words(3);
    const commentText = faker.lorem.words(3);
    const replyText = faker.lorem.words(3);

    // do some activities on home noum
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

  it('Home Noum owner do some activities again', () => {
    LoginPage.loginByApi(email);
    HomePage.goToHomeNoum();

    const message = faker.lorem.words(3);
    HomeNoumPage.sendMessageToUserByEmail(
      Cypress.env('AUTO_USER_TWO'),
      message,
    );
    NoumPage.addSimpleEventToElement(event);
  });

  it('User connect to Home noum', () => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));
    HomePage.searchAndViewTheFirstResult(email);

    // verify non-connected user can view
    HomeNoumPage.verifyElementPresent('Projects & Work Experience')
      .verifyElementPresent('Education & Training')
      .verifyElementPresent('Business Brief')
      .verifyElementPresent('Posts')
      .verifyElementPresent('My Networks')
      .verifyElementPresent('Skills')
      .verifyElementPresent('Achievements & Awards')
      .verifyElementPresent('Publications, Designs & Patents')
      .verifyElementPresent('Personal Interests')
      .verifyElementPresent('Social Interests')
      .verifyContentElementCount(2)
      .verifyImageElementCount(1)
      .verifyVideoElementCount(1);

    HomeNoumPage.requestToConnect();
  });

  it('owner of the noum approves connection request', () => {
    // login as the owner of the noum
    LoginPage.loginByApi(email);
    HomePage.goToHomePage();

    // validate notifications got from being followed and request connection
    NotificationPage.bellIcon.click();
    NotificationPage.sideModalContent.should('be.visible');
    NotificationPage.sideModalContentListItems
      .contains('wants to connect with you.')
      .should('be.visible');
    NotificationPage.sideModalContentCloseIcon.click();
    NotificationPage.sideModalContent.should('not.exist');

    HomePage.goToHomeNoum();

    NotificationPage.verifyNotificationContentOnList(
      `wants to connect with you.`,
    );

    NoumManage.viewRequestInviteModal()
      .verifyModalNoumRequest(Cypress.env('AUTO_USER_TWO_NAME'))
      .acceptNoumInviteInModal(Cypress.env('AUTO_USER_TWO_NAME'))
      .closeModal()
      .verifyNoumInviteNotExist(Cypress.env('AUTO_USER_TWO_NAME'));
  });

  it('Connected user do some activities', () => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));
    HomePage.searchAndViewTheFirstResult(email);
    HomeNoumPage.verifyUserConnected();

    const commentText = faker.lorem.words(3);
    const replyText = faker.lorem.words(3);
    const message = faker.datatype.uuid();

    // do some activities on home noum
    NoumPagePost.likePostContent(postText)
      .commentToAPost(postText, commentText)
      .replyToPostComment(postText, commentText, replyText)
      .reportPost('Jerk Rule')
      .verifyDeleteOptionNotExist()
      .deleteComment(replyText)
      .deleteComment(commentText);
    HomePageSidePanel.pageBackButton.click();
    CommonPage.waitForSkeletonLoader();
    NoumPageEvent.attendEvent(event);

    // Send message using Message button
    HomeNoumPage.verifyOwnedNoumsModal(false);
    HomeNoumPage.viewMessageUser();
    MessagePage.sendMessageText(message);

    // verify View Owned Noums modal
    HomePage.searchAndViewTheFirstResult(Cypress.env('AUTO_USER_ONE_NAME'));
    HomeNoumPage.verifyOwnedNoumsModal();
  });

  it('Home Noum owner do some activities', () => {
    LoginPage.loginByApi(email);
    HomePage.goToHomeNoum();

    postText = faker.lorem.words(3);
    NoumPagePost.postTextToElement(postText);
  });

  it('Admin user do some activities', () => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ADMIN'));
    HomePage.searchAndViewTheFirstResult(email);

    const commentText = faker.lorem.words(3);
    const replyText = faker.lorem.words(3);

    // do some activities on home noum as admin
    NoumPagePost.likePostContent(postText)
      .commentToAPost(postText, commentText)
      .replyToPostComment(postText, commentText, replyText)
      .deletePost(postText);
  });
});
