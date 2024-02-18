import { faker } from '@faker-js/faker';
import NoumPageView from '../../../pages/noumPageView';
import NoumPagePost from '../../../pages/noumPagePost';
import NoumListPage from '../../../pages/noumListPage';
import CommonPage from '../../../pages/commonPage';
import LoginPage from '../../../pages/loginPage';
import data from '../../../fixtures/data.json';

let postText = '';

describe('Noum.Post.Text.Sanity.spec.tsx', () => {
  beforeEach(() => {
    LoginPage.loginByApi();
  });
  it('Post a text in a Project Noum', () => {
    // noums are visible
    cy.visit('noums');
    NoumListPage.waitForManageNoums();

    // select a noum and wait for the noum to load
    NoumListPage.noumContainer
      .contains(Cypress.env('AUTO_PROJECT_NOUM_ONE'))
      .click();
    NoumPageView.waitViewNoumPageToLoad();

    // generate a string to use for posting
    postText = faker.datatype.uuid();
    // post a text content
    NoumPagePost.postCreateSection.click();
    NoumPagePost.postModalTextBox.type(postText);
    NoumPagePost.postModalSubmitBtn.click();

    // verify post is displayed
    CommonPage.verifyAlertMessage(data['community.post.text.success.message']);
    NoumPagePost.postModalSubmitBtn.should('not.exist');
    NoumPagePost.postContentList.contains(postText).should('be.be.visible');
  });

  it('Like, comment, reply and delete a Post in a Project Noum', () => {
    // noums are visible
    cy.visit('noums');
    NoumListPage.waitForManageNoums();

    // select a noum and wait for the noum to load
    NoumListPage.noumContainer
      .contains(Cypress.env('AUTO_PROJECT_NOUM_ONE'))
      .click();
    NoumPageView.waitViewNoumPageToLoad();

    // like, comment, reply and delete a post
    const commentText = faker.datatype.uuid();
    const replyText = faker.datatype.uuid();
    NoumPagePost.likePostContentFirstTime(postText)
      .commentToAPost(postText, commentText)
      .replyToPostComment(postText, commentText, replyText)
      .deletePost(postText);
  });
});
