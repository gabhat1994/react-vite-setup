import HomePage from '../../pages/homePage';
import SearchPage from '../../pages/searchPage';
import CommonPage from '../../pages/commonPage';
import LoginPage from '../../pages/loginPage';
import data from '../../fixtures/data.json';

describe(
  'Search.Noum.Member.Sanity.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    before(() => {
      LoginPage.loginByApi();
    });

    it('Able to search a Home Noum', () => {
      // verify Homepage elements
      const value = Cypress.env('AUTO_MEMBER_SEARCH');
      HomePage.goToHomePage();

      // search for for a home noum and verify it is listed on the results
      HomePage.globalSearchField.should('be.visible');
      HomePage.globalSearchField.type(value);
      HomePage.globalSearchResults.contains(value).should('be.visible');

      // view all results and verify the home noum is listed in All tab
      HomePage.globalSearchSeeAllResultsLink.click();
      cy.url().should('include', data['global.search.path']);
      cy.contains(data['global.search.header']);
      SearchPage.resultList.contains(value).should('be.visible');
      cy.wait(3000);

      // view member tab results and verify the home noum is listed
      SearchPage.homeNoumTab.click();
      CommonPage.spinner.should('be.visible');
      CommonPage.spinner.should('not.exist');
      SearchPage.resultListFirstRow.should('have.text', value);

      // view event tab results and verify the home noum is Not listed
      SearchPage.eventTab.click();
      CommonPage.spinner.should('be.visible');
      CommonPage.spinner.should('not.exist');
      SearchPage.emptyResultList.should(
        'have.text',
        data['global.search.no.result'],
      );

      // view post tab results and verify the home noum is Not listed
      SearchPage.postTab.click();
      CommonPage.spinner.should('be.visible');
      CommonPage.spinner.should('not.exist');
      SearchPage.emptyResultList.should(
        'have.text',
        data['global.search.no.result'],
      );
    });
  },
);
