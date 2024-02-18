describe(
  'PhoneLogin.happy.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    it.skip('Visits the Noumena Website Login Page', () => {
      cy.visit(`/login`);

      // Click Phone Number Tab
      cy.get('[data-testid="tab-0"]').check();

      // Click the country code dropdown
      cy.get(
        '[data-testid="styledCountryDownArrow"] [data-testid="svgIcon"]',
      ).click();

      // Select the United Kingdom country code
      cy.get(
        '[data-testid="dropdown-container"] [data-testid="Styled-TextField"] input',
      ).type('United Kingdom{enter}');

      // Enter the valid phone number
      cy.get('[data-testid="testLoginPhoneInput"]').type('7474740000');

      // Need to wait for button to become enabled
      cy.wait(2000);

      // Click the login button
      cy.xpath('//button[contains(.,"Login") and not(@disabled)]').click();

      cy.wait(2000);

      // Get the OTP into each field
      cy.get('[data-cy="OtpInput-cy-0"]').type('1');
      cy.get('[data-cy="OtpInput-cy-1"]').type('2');
      cy.get('[data-cy="OtpInput-cy-2"]').type('3');
      cy.get('[data-cy="OtpInput-cy-3"]').type('4');

      // Press the login button
      cy.get('[data-testid="otp-submit-button"]').click();

      // See if we have logged in
      cy.get('[data-testid="noum-onboarding-section-testid"]').should(
        'be.visible',
      );
    });
  },
);
