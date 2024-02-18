import LoginPage from '../../pages/loginPage';
import CommunityPage from '../../pages/communityPage';

/*
Jira: NOUM-5208 Automation - Community Post - Update changes and add more scenarios
*/
describe('Community.Post.Report.spec.tsx', () => {
  beforeEach(() => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_ADMIN'));
  });

  it('Report a post with different types', () => {
    // navigate to community page
    CommunityPage.goToCommunityScreen();

    // report a post - different types
    CommunityPage.viewFirstPostReportModal();
    CommunityPage.reportPost('Offensive Comment or Content');

    CommunityPage.viewFirstPostReportModal();
    CommunityPage.reportPost('A Privacy or Safety Concern');

    CommunityPage.viewFirstPostReportModal();
    CommunityPage.reportPost('Jerk Rule');

    CommunityPage.viewFirstPostReportModal();
    CommunityPage.reportPost('Other', 'Test');
  });
});
