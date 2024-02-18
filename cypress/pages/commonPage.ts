class CommonPage {
  get alertMessage() {
    return cy.get('[data-test="Alert-Message"]');
  }

  get selectMonth() {
    return cy.get('select[name="months"]');
  }

  get selectYear() {
    return cy.get('select[name="years"]');
  }

  get selectDay() {
    return cy.get('select[name="day"]');
  }

  get spinner() {
    return cy.get('[data-testid="spinner"]', { timeout: 20000 });
  }

  get skeletonLoader() {
    return cy.get('[class="react-loading-skeleton"]', { timeout: 120000 });
  }

  get backButton() {
    return cy.xpath(
      '//div[@data-testid="Nav-label" and text()="Back"] | //div[@id="AppSideNavigation"]//button[@aria-label="Back"]',
      { timeout: 60000 },
    );
  }

  verifyAlertMessage(value: string) {
    this.alertMessage.contains(value).should('be.visible');
    this.alertMessage.should('not.exist');
  }

  waitForSkeletonLoader() {
    cy.get('body').then(($el) => {
      if ($el.find('[class="react-loading-skeleton"]').length > 0) {
        this.skeletonLoader.should('not.exist');
      }
    });
  }

  waitForUnreadNotificationsCount() {
    cy.intercept(
      {
        method: 'POST',
        url: `${Cypress.env('VITE_API_URL')}/api/v1/query`,
      },
      (req) => {
        if (req.body.operationName === 'unreadNotificationsCount') {
          req.alias = 'unreadNotificationsCount';
        }
      },
    );
    cy.wait('@unreadNotificationsCount')
      .its('response.statusCode')
      .should('eq', 200);
  }

  waitForSpinnerToNotExist() {
    cy.get('body').then(($el) => {
      if ($el.find('[data-testid="spinner"]').length > 0) {
        this.spinner.should('not.exist');
      }
    });
  }

  waitForSpinnerNotBeVisible() {
    cy.get('body').then(($el) => {
      if ($el.find('[data-testid="spinner"]').length > 0) {
        this.spinner.should('not.be.visible');
      }
    });
  }
}
export default new CommonPage();
