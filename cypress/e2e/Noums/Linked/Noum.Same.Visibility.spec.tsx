import { faker } from '@faker-js/faker';
import LoginPage from '../../../pages/loginPage';
import NoumListPage from '../../../pages/noumListPage';
import NoumEditPage from '../../../pages/noumEditPage';

let noumName = 'qui veritatis aut';


describe('Noum.Same.Visibility.spec.tsx', () => {
  before(() => {
    // LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));
    noumName = faker.lorem.words(3);
    // NoumListPage.goToNoumPage().createProjectNoum(noumName, 'Story', 'Private');
    // NoumEditPage.publishUpdates();
  });

  it('send an invite to user', () => {
    LoginPage.loginByApi(Cypress.env('AUTO_USER_TWO'));
    NoumListPage.goToNoumPage().sortNewestToOldest().viewNoum(noumName).viewLinkNoumsPage();
    
    // cy.xpath('//div[@data-test="ChambersRightSideBar-CreateChamberButton"]/div[@class="ellipsis-menu"]//span[@data-testid="button_text"]').click();
    // cy.xpath('//span[@data-test="EllipsisMenu-TSpan" and text()="Link Noums"]').should('be.visible').click();
    // cy.xpath('//div[@data-test="ModalFooter-ModalFooterStyled"]/button[contains(.,"Select Noums")]').should('be.visible').click();

    cy.xpath('//div[@data-test="LinkNoumOption-SelectOption" and contains(.,"AutoTest Noum 2022")]/span[@data-testid="checkbox"]').should('be.visible').click();
    cy.xpath('//div[@data-test="LinkNoumOption-SelectOption" and contains(.,"suscipit nisi reprehenderit")]/span[@data-testid="checkbox"]').should('be.visible').click();

    cy.xpath('//div[@data-test="NoumPreview-PreviewItem" and contains(.,"AutoTest Noum 2022")]').should('be.visible');
    cy.xpath('//div[@data-test="NoumPreview-PreviewItem" and contains(.,"suscipit nisi reprehenderit")]').should('be.visible');
    cy.xpath('//div[@data-test="LinkNoumActionFooter-ButtonWrapper"]//span[@data-testid="button_text" and contains(.,"Link")]').should('be.visible');
  });

});
