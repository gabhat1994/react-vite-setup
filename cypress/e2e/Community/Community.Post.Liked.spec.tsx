import { faker } from '@faker-js/faker';
import LoginPage from '../../pages/loginPage';
import CommunityPage from '../../pages/communityPage';

describe(
  'Community.Post.Liked.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    beforeEach(() => {
      LoginPage.loginByApi();
    });

    it('Community page able to like and unlike a post', () => {
      // generate a string to use for posting
      const postText = `Automation Text Post - ${faker.datatype.number({
        min: 1000,
        max: 99999,
      })}`;

      // navigate to community page and make sure it is fully loaded before posting
      CommunityPage.goToCommunityScreen();

      // create a post to be liked and unliked
      CommunityPage.postTextToCommunityScreen(postText);

      // like the created post
      CommunityPage.postLikeTextByText(postText)
        .scrollIntoView()
        .should('be.visible');
      CommunityPage.postLikeTextByText(postText).click();
      // validate like text is not present
      // validate liked text is present
      // validate liked icon is enabled
      // validate liked message for single post is displayed
      CommunityPage.postLikeTextByText(postText).should('not.exist');
      CommunityPage.postLikedIconByText(postText)
        .scrollIntoView()
        .should('be.visible');
      CommunityPage.postLikedTextByText(postText)
        .scrollIntoView()
        .should('be.visible');
      CommunityPage.postLikedSingleMessageByText(postText)
        .scrollIntoView()
        .should('be.visible');

      // unlike the created post
      CommunityPage.postLikedTextByText(postText)
        .scrollIntoView()
        .wait(1000)
        .click();
      // validate like text is  present
      // validate liked text is not present
      // validate liked icon is not enabled
      // validate liked message for single post is not displayed
      CommunityPage.postLikeTextByText(postText)
        .scrollIntoView()
        .should('be.visible');
      CommunityPage.postLikedIconByText(postText).should('not.exist');
      CommunityPage.postLikedTextByText(postText).should('not.exist');
      CommunityPage.postLikedSingleMessageByText(postText).should('not.exist');
    });
  },
);
