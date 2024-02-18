import { faker } from '@faker-js/faker';
import NoumPage from 'cypress/pages/noumPage';
import LoginPage from '../../pages/loginPage';
import CommunityPage from '../../pages/communityPage';
import CommonPage from '../../pages/commonPage';

/*
Jira: NOUM-5208 Automation - Community Post - Update changes and add more scenarios
*/
let postText = '';
let updatedPostText = '';
describe('Community.Post.Admin.spec.tsx', () => {
  before(() => {
    postText = faker.datatype.uuid();
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ONE'));
    CommunityPage.goToCommunityScreen();
    CommunityPage.postTextToCommunityScreen(postText);
  });

  beforeEach(() => {
    // navigate to community page as admin user
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ADMIN'));
    CommunityPage.goToCommunityScreen();
  });

  it('Able to comment and like other user post', () => {
    const commentText = faker.datatype.uuid();
    CommunityPage.postCommentToCommunityScreen(postText, commentText);
    CommunityPage.likeAPost(postText);
  });

  it('Able to view profile of the user who posted', () => {
    // view user's profile by clicking their name or profile in the post section
    CommunityPage.viewUserByName(postText);
    NoumPage.backBtn.should('be.visible');
    CommonPage.waitForSkeletonLoader();
    NoumPage.headerName.should('have.text', Cypress.env('AUTO_USER_ONE_NAME'));
    NoumPage.backBtn.click();
    CommonPage.waitForSkeletonLoader();
    CommunityPage.viewUserByProfile(postText);
    CommonPage.waitForSkeletonLoader();
    NoumPage.headerName.should('have.text', Cypress.env('AUTO_USER_ONE_NAME'));
  });

  it('Able to pin a post', () => {
    // pin a post
    CommunityPage.selectPostEllipsis(postText).selectPin();
    CommonPage.verifyAlertMessage('Post is pinned successfully');
    CommunityPage.verifyPostIsPinned(true, postText);
  });

  it('Able to unpin a post', () => {
    // unpin a post
    CommunityPage.selectPostEllipsis(postText).selectUnpin();
    CommonPage.verifyAlertMessage('Post is unpinned successfully');
    CommunityPage.verifyPostIsPinned(false, postText);
  });

  it('Community page able to edit a post', () => {
    // navigate to community page
    CommunityPage.goToCommunityScreen();

    // update post
    updatedPostText = faker.datatype.uuid();
    CommunityPage.editPost(postText, updatedPostText);
  });

  it('Able to delete a post', () => {
    // try delete a post but cancel it
    CommunityPage.selectPostEllipsis(updatedPostText).selectDelete();
    CommunityPage.deleteCancelBtn.click();

    // delete a post and verify it is deleted
    CommunityPage.deletePost(updatedPostText);
  });
});
