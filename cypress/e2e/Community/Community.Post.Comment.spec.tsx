import { faker } from '@faker-js/faker';
import LoginPage from '../../pages/loginPage';
import CommunityPage from '../../pages/communityPage';

describe(
  'Community.Post.Comment.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    beforeEach(() => {
      LoginPage.loginByApi();
    });

    it('Community page able to comment to a post', () => {
      // generate a string to use for post and comment
      const postText = `Automation Text Post - ${faker.datatype.number({
        min: 1000,
        max: 99999,
      })}`;
      const commentText = `Automation Text Comment - ${faker.datatype.number({
        min: 1000,
        max: 99999,
      })}`;

      // navigate to community page and make sure it is fully loaded before posting
      CommunityPage.goToCommunityScreen();

      // create a post to be commented
      CommunityPage.postTextToCommunityScreen(postText);

      // comment to the created post
      CommunityPage.postCommentIconByText(postText)
        .scrollIntoView()
        .should('be.visible');
      CommunityPage.postCommentIconByText(postText).click();
      CommunityPage.postCommentFieldByText(postText).type(commentText);
      CommunityPage.postCommentSubmitBtnByText(postText).click();

      // validate comment is posted
      // validate comment time is correct
      // validate ellipsis is visible and reply button
      CommunityPage.postCommentTextByText(postText, commentText).should(
        'be.visible',
      );
      CommunityPage.postCommentTextTimeStampByText(
        postText,
        commentText,
      ).should('be.visible');
      CommunityPage.postCommentTextEllipsisByText(postText, commentText)
        .scrollIntoView()
        .should('be.visible');
      CommunityPage.postCommentTextReplyBtnByText(postText, commentText)
        .scrollIntoView()
        .should('be.visible');
      CommunityPage.postCommentSingleCountByText(postText)
        .scrollIntoView()
        .should('be.visible');
    });
  },
);
