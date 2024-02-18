import { faker } from '@faker-js/faker';
import LoginPage from '../../pages/loginPage';
import CommunityPage from '../../pages/communityPage';
import CommonPage from '../../pages/commonPage';

let postText = '';
let updatedPostText = '';

describe('Community.Post.spec.tsx', () => {
  beforeEach(() => {
    LoginPage.loginByApi();
  });

  it('Community page able to make a post', () => {
    // generate a string to use for posting
    postText = faker.datatype.uuid();

    // navigate to community page and make sure it is fully loaded before posting
    CommunityPage.goToCommunityScreen();

    // post in the text area
    CommunityPage.startConversationBox.click();
    CommunityPage.conversationModalTextBox.type(postText);
    CommunityPage.conversationModalPostBtn.click();

    // validate success snackbar is present after posting
    // validate text posted is present on the page
    CommonPage.verifyAlertMessage('New Post Published');
    CommunityPage.postedText.scrollIntoView().contains(postText).should('be.visible');
  });

  it('Community page not able to delete other user post', () => {
    // navigate to community page
    LoginPage.logoutByApi();
    LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));
    CommunityPage.goToCommunityScreen();

    // delete option is not present
    CommunityPage.selectPostEllipsis(postText);
    CommunityPage.dropDownSelection.contains('Delete').should('not.exist');
  });

  it('Community page able to edit a post', () => {
    // navigate to community page
    CommunityPage.goToCommunityScreen();

    // update post
    updatedPostText = faker.datatype.uuid();
    CommunityPage.editPost(postText, updatedPostText);
  });

  it('Community page able to delete a post', () => {
    // navigate to community page
    CommunityPage.goToCommunityScreen();

    // delete a post
    CommunityPage.deletePost(updatedPostText);
  });
});
