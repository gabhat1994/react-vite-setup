import { faker } from '@faker-js/faker';
import NoumListPage from '../../../pages/noumListPage';
import LoginPage from '../../../pages/loginPage';
import NoumPage from '../../../pages/noumPage';
import NoumEditPage from '../../../pages/noumEditPage';
import NoumPageView from '../../../pages/noumPageView';
import NoumPageEditView from '../../../pages/noumPageEditView';
import HomePage from '../../../pages/homePage';

let noumName = '';

describe('Noum.Creation.Sanity.spec.tsx', () => {
  beforeEach(() => {
    LoginPage.loginByApi();
  });

  it('Create a Project Noum', () => {
    // navigate to noums page
    cy.visit('noums');
    NoumListPage.waitForManageNoums();
    NoumListPage.noumList.should('be.visible');

    // create a a secret noum
    noumName = faker.lorem.words(3);
    NoumListPage.createProjectNoum(noumName, 'Story', 'Secret');
    // NoumPage.addContentElement();

    // Save as draft and Publish updates
    NoumEditPage.publishUpdates();

    // verify published element
    NoumPage.headerName.should('have.text', noumName);
    cy.wait(10000);
  });

  it('Archived a Project Noum', () => {
    // search for the project noum and view it
    HomePage.searchAndViewTheResult(noumName);
    NoumPageView.waitViewNoumPageToLoad();
    NoumPage.headerName.should('have.text', noumName);

    // archive the noum
    NoumPage.editNoum();
    NoumPageEditView.viewArchiveModal().confirmArchiveNoum();
  });
});
