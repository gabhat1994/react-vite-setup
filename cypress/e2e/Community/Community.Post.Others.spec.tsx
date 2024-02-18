import { faker } from '@faker-js/faker';
import LoginPage from '../../pages/loginPage';
import CommunityPage from '../../pages/communityPage';
import HomeNoumPage from '../../pages/homeNoumPage';
import CommonPage from '../../pages/commonPage';
import data from '../../fixtures/data.json';

describe('Community.Post.Others.spec.tsx', () => {
  beforeEach(() => {
    LoginPage.loginByApi();
  });

  it('able to post an image', () => {
    // generate a string to use for posting
    const postText = faker.datatype.uuid();

    // navigate to community page and make sure it is fully loaded before posting
    CommunityPage.goToCommunityScreen();

    // post in the text area with image
    CommunityPage.postImageToCommunityScreen(postText, data['path.image']);

    // validate success snackbar is present after posting
    // validate text and image are posted and present on the page
    CommonPage.verifyAlertMessage(data['community.post.text.success.message']);
    CommunityPage.postedText.scrollIntoView().should('be.visible');
    CommunityPage.postedText.should('have.text', postText).scrollIntoView();
    CommunityPage.postedImageByText(postText)
      .scrollIntoView()
      .should('be.visible');
  });

  it('able to post a video', () => {
    // generate a string to use for posting
    const postText = faker.datatype.uuid();

    // navigate to community page and make sure it is fully loaded before posting
    CommunityPage.goToCommunityScreen();

    // post in the text area with video
    CommunityPage.postVideoToCommunityScreen(postText, data['path.video']);

    // validate success snackbar is present after posting
    // validate text and video are posted and present on the page
    CommonPage.verifyAlertMessage(data['community.post.video.success.message']);
    cy.wait(10000);
    cy.reload();
    CommunityPage.postedText.scrollIntoView().should('be.visible');
    CommunityPage.postedText
      .contains(postText)
      .scrollIntoView()
      .should('be.visible');
    CommunityPage.postedVideoByText(postText)
      .scrollIntoView()
      .should('be.visible');
  });

  it('able to post a long text', () => {
    // generate a string to use for posting
    const postText = faker.lorem.words(1000);

    // navigate to community page and make sure it is fully loaded before posting
    CommunityPage.goToCommunityScreen();

    // post in the text area
    CommunityPage.postTextOnlyToCommunityScreen(postText);

    // validate success snackbar is present after posting
    // validate long text posted is present on the page
    CommonPage.verifyAlertMessage(data['community.post.text.success.message']);

    // // Get the element you want to observe
    // CommunityPage.postedText.then(($el) => {
    //   // Use a custom assertion function to check for the desired text length
    //   cy.wrap($el).invoke('text').should('have.length.greaterThan', 5000);
    // });

    CommunityPage.postedText.should(($el) => {
      const currentLength = $el.text().length; // Change .text() to .val() for input elements

      // Now you can perform assertions or actions based on the text length
      expect(currentLength).to.be.greaterThan(5000);
    });
  });

  it('able to tag users on a post', () => {
    // navigate to community page and make sure it is fully loaded before posting
    CommunityPage.goToCommunityScreen();

    // post and tag users
    CommunityPage.startConversationBox.click();
    CommunityPage.addSeveralTagUsersInPost();
    CommunityPage.conversationModalPostBtn.click();

    // validate success snackbar is present after posting
    // validate tag users are posted and present on the page
    CommonPage.verifyAlertMessage(data['community.post.text.success.message']);
    CommunityPage.verifyTagUsersIsPosted();

    // validate if user can clicked the tag users
    CommunityPage.postedTextTagLink
      .contains(data['community.post.tag.user1'])
      .click();
    HomeNoumPage.waitUntilPageIsloaded();
    HomeNoumPage.headerName
      .contains(data['community.post.tag.user1'])
      .scrollIntoView()
      .should('be.visible');
  });

  it('able to post URL link', () => {
    // navigate to community page and make sure it is fully loaded before posting
    CommunityPage.goToCommunityScreen();

    // post url
    CommunityPage.postTextOnlyToCommunityScreen(
      data['community.post.url.github'],
    );

    // validate success snackbar is present after posting
    // validate url link is posted
    CommonPage.verifyAlertMessage(data['community.post.text.success.message']);
    CommunityPage.postedText.scrollIntoView().should('be.visible');
    CommunityPage.postedTextUrlLink
      .contains(data['community.post.url.github'])
      .scrollIntoView()
      .should('be.visible');
    CommunityPage.postedTextUrlLink
      .invoke('attr', 'href')
      .should('eq', data['community.post.url.github']);
  });

  it('able to tag users on a post with text and photo', () => {
    const postText = faker.lorem.words(100);

    // navigate to community page and make sure it is fully loaded before posting
    CommunityPage.goToCommunityScreen();

    // post and tag users with image
    CommunityPage.startConversationBox.click();
    CommunityPage.addSeveralTagUsersInPost();
    // upload image
    CommunityPage.conversationModalTextBox.type(`{enter}${postText}`);
    CommunityPage.conversationModalInputFile.selectFile(data['path.image'], {
      force: true,
    });
    cy.wait(1000);
    CommunityPage.conversationModalImageUploaded
      .scrollIntoView()
      .should('be.visible');
    CommunityPage.conversationModalPostBtn.click();

    // validate success snackbar is present after posting
    // validate text and image are posted and present on the page
    CommonPage.verifyAlertMessage(data['community.post.text.success.message']);
    CommunityPage.postedText.scrollIntoView().should('be.visible');
    CommunityPage.postedText.should(($el) => {
      const currentLength = $el.text().length; // Change .text() to .val() for input elements

      // Now you can perform assertions or actions based on the text length
      expect(currentLength).to.be.greaterThan(500);
    });
    // validate tag users are posted and present on the page
    CommunityPage.verifyTagUsersIsPosted();
  });

  it('able to tag users on a post with text and video', () => {
    const postText = faker.lorem.words(100);

    // navigate to community page and make sure it is fully loaded before posting
    CommunityPage.goToCommunityScreen();

    // post and tag users
    CommunityPage.startConversationBox.click();
    CommunityPage.addSeveralTagUsersInPost();
    // upload video
    CommunityPage.conversationModalTextBox.type(`{enter}${postText}`);
    CommunityPage.conversationModalInputFile.selectFile(data['path.video'], {
      force: true,
    });
    cy.wait(1000);
    CommunityPage.conversationModalVideoUploaded.should('be.visible');
    CommunityPage.conversationModalPostBtn.click();

    // validate success snackbar is present after posting
    // validate text and video are posted and present on the page
    CommonPage.verifyAlertMessage(data['community.post.video.success.message']);
    cy.wait(5000);
    cy.reload();
    CommunityPage.postedLatestVideo.scrollIntoView().should('be.visible');
    CommunityPage.postedText.invoke('text').then((text) => {
      expect(text.length).to.be.at.least(500);
    });
    // validate tag users are posted and present on the page
    CommunityPage.verifyTagUsersIsPosted();
  });

  it('not able to post a non-accepted file type', () => {
    // generate a string to use for posting
    const postText = faker.datatype.uuid();

    // navigate to community page and make sure it is fully loaded before posting
    CommunityPage.goToCommunityScreen();

    // post in the text area with pdf file
    CommunityPage.startConversationBox.click();
    CommunityPage.conversationModalTextBox.type(postText);
    CommunityPage.conversationModalInputFile.selectFile(data['path.file.pdf'], {
      force: true,
    });
    CommonPage.verifyAlertMessage(
      data['community.post.not.supported.error.message'],
    );
  });

  it('post button is disabled when no text is supplied', () => {
    // generate a string to use for posting
    // const postText = faker.datatype.uuid();

    // navigate to community page and make sure it is fully loaded before posting
    CommunityPage.goToCommunityScreen();

    // post button is disabled
    CommunityPage.startConversationBox.click();
    CommunityPage.conversationModalPostBtn.should('be.disabled');
    CommunityPage.conversationModalInputFile.selectFile(data['path.image'], {
      force: true,
    });
    cy.wait(1000);
    CommunityPage.conversationModalImageUploaded
      .scrollIntoView()
      .should('be.visible');
    CommunityPage.conversationModalImageUploaded
      .scrollIntoView()
      .should('be.visible');
    CommunityPage.conversationModalPostBtn.click();
    CommonPage.verifyAlertMessage(data['community.post.text.success.message']);
  });

  it('cancel a post', () => {
    // generate a string to use for posting
    const postText = faker.datatype.uuid();

    // navigate to community page and make sure it is fully loaded before posting
    CommunityPage.goToCommunityScreen();

    // post button is disabled
    CommunityPage.startConversationBox.click();
    CommunityPage.conversationModalPostBtn.should('be.disabled');
    CommunityPage.conversationModalTextBox.type(postText);
    cy.wait(1000);
    CommunityPage.conversationModalPostBtn.should('be.enabled');
    CommunityPage.conversationModalCloseIcon.click();
    CommunityPage.conversationModalCloseIcon.should('not.exist');
  });

  it('view Noumena Announcements', () => {
    // navigate to community page
    CommunityPage.goToCommunityScreen();

    // view Noumena Announcements Tab
    CommunityPage.noumenaAnnouncementsTab.click();
    CommonPage.waitForSkeletonLoader();
    CommunityPage.communityPostContainers.each(($element) => {
      cy.wrap($element)
        .find('[data-test="PostItemHead-PinTabText"]')
        .scrollIntoView()
        .should('be.visible');
    });
  });
});
