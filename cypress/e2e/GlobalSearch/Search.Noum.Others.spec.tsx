import HomePage from '../../pages/homePage';
import SearchPage from '../../pages/searchPage';
import CommonPage from '../../pages/commonPage';
import LoginPage from '../../pages/loginPage';
import data from '../../fixtures/data.json';

describe(
  'Search.Noum.Others.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    beforeEach(() => {
      LoginPage.loginByApi();
    });

    it('Able to search a noum event', () => {
      // verify Homepage elements
      const value = data['global.search.data.event'];
      const noResult = data['global.search.no.result'];
      HomePage.goToHomePage();

      // search for an event and verify it is listed on the results
      HomePage.searchAndVerifyResult(value);

      // view all results and verify the event is listed in All tab
      HomePage.viewAllSearchResults();
      SearchPage.resultList.contains(value).should('be.visible');
      cy.wait(2000);

      // view event tab results and verify the event is listed
      SearchPage.eventTab.click();
      CommonPage.spinner.should('be.visible');
      CommonPage.spinner.should('not.exist');
      SearchPage.resultListFirstRow.should('have.text', value);

      // view noum tab results and verify the event is Not listed
      SearchPage.projectNoumTab.click();
      CommonPage.spinner.should('be.visible');
      CommonPage.spinner.should('not.exist');
      SearchPage.emptyResultList.should('have.text', noResult);

      // view member tab results and verify the event is Not listed
      SearchPage.homeNoumTab.click();
      CommonPage.spinner.should('be.visible');
      CommonPage.spinner.should('not.exist');
      SearchPage.emptyResultList.should('have.text', noResult);

      // view post tab results and verify the event is Not listed
      SearchPage.postTab.click();
      CommonPage.spinner.should('be.visible');
      CommonPage.spinner.should('not.exist');
      SearchPage.emptyResultList.should('have.text', noResult);
    });

    it('Able to search a noum post', () => {
      // verify Homepage elements
      const value = data['global.search.data.post'];
      const noResult = data['global.search.no.result'];
      HomePage.goToHomePage();

      // search for a noum post and verify it is listed on the results
      HomePage.searchAndVerifyResult(value);

      // view all results and verify the post is listed in All tab
      HomePage.viewAllSearchResults();
      SearchPage.resultList.contains(value).should('be.visible');
      cy.wait(2000);

      // view post tab results and verify the post is listed
      SearchPage.postTab.click();
      CommonPage.spinner.should('be.visible');
      CommonPage.spinner.should('not.exist');
      SearchPage.resultList.contains(value).should('be.visible');

      // view member tab results and verify the post is Not listed
      SearchPage.homeNoumTab.click();
      CommonPage.spinner.should('be.visible');
      CommonPage.spinner.should('not.exist');
      SearchPage.emptyResultList.should('have.text', noResult);

      // view event tab results and verify the post is Not listed
      SearchPage.eventTab.click();
      CommonPage.spinner.should('be.visible');
      CommonPage.spinner.should('not.exist');
      SearchPage.emptyResultList.should('have.text', noResult);

      // view noum tab results and verify the post is Not listed
      SearchPage.projectNoumTab.click();
      CommonPage.spinner.should('be.visible');
      CommonPage.spinner.should('not.exist');
      SearchPage.emptyResultList.should('have.text', noResult);
    });

    it('Able to search a project Noum', () => {
      // verify Homepage elements
      const value = data['global.search.data.noum'];
      const noResult = data['global.search.no.result'];
      HomePage.goToHomePage();

      // search for a project noum and verify it is listed on the results
      HomePage.searchAndVerifyResult(value);

      // view all results and verify the project noum is listed in All tab
      HomePage.viewAllSearchResults();
      SearchPage.resultList.contains(value).should('be.visible');
      cy.wait(2000);

      // view noum tab results and verify the project noum is listed
      SearchPage.projectNoumTab.click();
      CommonPage.spinner.should('be.visible');
      CommonPage.spinner.should('not.exist');
      SearchPage.resultListFirstRow.should('have.text', value);

      // view member tab results and verify the project noum is Not listed
      SearchPage.homeNoumTab.click();
      CommonPage.spinner.should('be.visible');
      CommonPage.spinner.should('not.exist');
      SearchPage.emptyResultList.should('have.text', noResult);

      // view event tab results and verify the project noum is Not listed
      SearchPage.eventTab.click();
      CommonPage.spinner.should('be.visible');
      CommonPage.spinner.should('not.exist');
      SearchPage.emptyResultList.should('have.text', noResult);

      // view post tab results and verify the project noum is Not listed
      SearchPage.postTab.click();
      CommonPage.spinner.should('be.visible');
      CommonPage.spinner.should('not.exist');
      SearchPage.emptyResultList.should('have.text', noResult);
    });

    it('Not able to search a non-noumena member', () => {
      // verify Homepage elements
      const value = data['global.search.data.nm'];
      const noResult = data['global.search.no.result'];
      HomePage.goToHomePage();

      // search for non-noumena member and verify it is not listed on the results
      HomePage.searchValue(value);

      // verify no results found
      HomePage.noResultList.contains(noResult).should('be.visible');
    });
  },
);
