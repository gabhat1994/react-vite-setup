import { faker } from '@faker-js/faker';
import LoginPage from '../../../pages/loginPage';
import CommonPage from '../../../pages/commonPage';
import NoumEditPage from '../../../pages/noumEditPage';

describe(
  'CreateNoum.happy.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    beforeEach(() => {
      LoginPage.loginByApi();
    });

    it('create a basic noum', () => {
      // visit the noum
      cy.visit('/noums');

      // check that we are on noums page
      cy.url().should('include', '/noums');

      // Click the create noum button
      cy.get(
        '[data-test="ChambersRightSideBar-CreateChamberButton"] > [data-test="Button-ButtonStyled"]',
      ).click();

      // Fill the fields for NAME
      cy.get('[data-testid="CreateProject-Modal-Name"]').type(
        faker.lorem.words(3),
      );

      // Fill the fields for DESCRIPTION
      cy.get('[data-testid="CreateProject-Modal-Description"]').type(
        faker.lorem.words(10),
      );

      // Select a category from the dropdown menu
      cy.get('[data-testid="CreateProject-Modal-Category"]').click();
      cy.get(
        '[data-testid="dropdown-container"] > [data-test="Stack-StackStyled"] > :nth-child(2)',
      ).click();

      cy.get('[data-testid="Create-Noum-Button"]').click();
      CommonPage.verifyAlertMessage('Noum Created');
      cy.wait(2000);

      cy.get('[data-testid="closeChamberEditMode"]').click();

      NoumEditPage.buildFromScratch().addContentElementOnly();
      cy.wait(2000);

      NoumEditPage.saveAsDraft().publishUpdates();
    });
  },
);
