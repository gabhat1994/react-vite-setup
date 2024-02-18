import { faker } from '@faker-js/faker';
import LoginPage from '../../pages/loginPage';
import CommunityPage from '../../pages/communityPage';

describe(
  'Community.Post.Reply.Comment.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    beforeEach(() => {
      LoginPage.loginByApi();
    });

    it('Community page able to reply to a post comment', () => {
      // generate a string to use for post and comment
      const postText = `Automation Text Post - ${faker.datatype.number({
        min: 1000,
        max: 99999,
      })}`;
      const commentText = `Automation Text Comment - ${faker.datatype.number({
        min: 1000,
        max: 99999,
      })}`;
      const replyText = `Automation Text Reply - ${faker.datatype.number({
        min: 1000,
        max: 99999,
      })}`;

      // navigate to community page and make sure it is fully loaded before posting
      CommunityPage.goToCommunityScreen();

      // create a post to be commented
      CommunityPage.postTextToCommunityScreen(postText);

      // comment to the created post
      CommunityPage.postCommentToCommunityScreen(postText, commentText);

      // reply to a comment
      CommunityPage.postCommentTextReplyBtnByText(
        postText,
        commentText,
      ).click();
      CommunityPage.postReplyToCommentFieldByText(postText, commentText)
        .scrollIntoView()
        .should('be.visible');
      CommunityPage.postReplyToCommentFieldByText(postText, commentText).type(
        replyText,
      );
      CommunityPage.postReplyToCommentBtnByText(postText, commentText).click();

      // validate a reply to a comment it posted
      cy.wait(2000);
      CommunityPage.postReplyToCommentTextByText(postText, commentText)
        .scrollIntoView()
        .invoke('text')
        .should('eq', replyText);
    });
  },
);
