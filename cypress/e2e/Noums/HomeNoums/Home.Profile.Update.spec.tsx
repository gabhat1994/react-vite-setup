import UtilPage from '../../../pages/utilPage';
import HomeNoumPage from '../../../pages/homeNoumPage';
import CommonPage from '../../../pages/commonPage';

describe('Home.Profile.Update.spec.tsx', () => {
  before(() => {
    const email = UtilPage.getRandomEmailAddress();
    const otp = UtilPage.generateOtp();

    cy.register(email, otp, true);
  });
  it('Updates the profile on edit and publish', () => {
    cy.visit('/profile');

    HomeNoumPage.editBtn.should('be.visible');
    CommonPage.waitForSkeletonLoader();
    HomeNoumPage.editBtn.click();
    cy.get('[aria-label="noum_edit_information"]').should(
      'have.text',
      'Edit Information',
    );
    cy.get('[aria-label="noum_edit_information"]').click();
    cy.get(
      ':nth-child(4) > [data-test="TextField-StyledTextField"] > [data-test="TextField"]',
    ).type('Master');
    cy.get('[data-test="TextArea-textarea"]').click();
    cy.get(
      '[data-test="Content"] > :nth-child(1) > [data-test="TextField-StyledTextField"] > [data-test="TextField"]',
    ).click();
    cy.get('[data-testid="dropdown-value"]').last().click();
    cy.get(
      '[data-test="Content"] > :nth-child(2) > [data-test="TextField-StyledTextField"] > [data-test="TextField"]',
    ).click();
    cy.get('[data-testid="dropdown-value"]').last().click();
    cy.get('[data-test="SearchSelectAPI-TextField"]').type('Valencia, Spain');
    cy.get('[data-test="SearchSelectAPI-TextField"]').should(
      'have.value',
      'Valencia, Spain',
    );
    cy.get(
      '[data-testid="dropdown-container"] > [data-test="Stack-StackStyled"] > :nth-child(1)',
    ).click();
    cy.get(
      '[data-test="SaveButtonWrap"] > [data-test="Button-ButtonStyled"] > [data-testid="button_text"]',
    ).should('have.text', 'Save');
    cy.get(
      '[data-test="SaveButtonWrap"] > [data-test="Button-ButtonStyled"] > [data-testid="button_text"]',
    ).click();
    CommonPage.verifyAlertMessage('Success: Changes saved successfully.');
  });
});
