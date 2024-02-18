describe(
  'PhoneLogin.exceptions.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    beforeEach(() => {
      cy.visit(`/login`);

      cy.wait(2000);

      // Click Phone Number Tab
      cy.get('[data-testid="tab-0"]').check();
    });

    it.skip('should show an error when invalid phone number has been entered', () => {
      // Click the country code dropdown
      cy.get(
        '[data-testid="styledCountryDownArrow"] [data-testid="svgIcon"]',
      ).click();

      // Select the United Kingdom country code
      cy.get(
        '[data-testid="dropdown-container"] [data-testid="Styled-TextField"] input',
      ).type('63{enter}');

      // Enter the valid phone number
      cy.get('[data-testid="testLoginPhoneInput"]').type('0001');

      // Click the login button
      cy.get('[data-testid="testPhoneLoginButton"]').click();

      cy.get(':nth-child(2) > [data-testid="pTestId"]').contains(
        'Incorrect phone number',
      );
    });

    it.skip('should show an error if the phone number doesnt exist in the database', () => {
      // Click the country code dropdown
      cy.get(
        '[data-testid="styledCountryDownArrow"] [data-testid="svgIcon"]',
      ).click();

      // Select the United Kingdom country code
      cy.get(
        '[data-testid="dropdown-container"] [data-testid="Styled-TextField"] input',
      ).type('United Kingdom{enter}');

      // Enter the valid phone number
      cy.get('[data-testid="testLoginPhoneInput"]').type('7474741000');

      // Click the login button
      cy.get('[data-testid="testPhoneLoginButton"]').click();

      cy.contains('Your phone number does not exist');
    });

    it.skip('should show an error if the phone number is valid but incorrect OTP', () => {
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

      // Click the login button
      cy.get('[data-testid="testPhoneLoginButton"]').click();

      cy.wait(2000);

      cy.get('[data-cy="OtpInput-cy-0"]').type('0');
      cy.get('[data-cy="OtpInput-cy-1"]').type('0');
      cy.get('[data-cy="OtpInput-cy-2"]').type('0');
      cy.get('[data-cy="OtpInput-cy-3"]').type('0');

      cy.get('[data-testid="otp-submit-button"]').click();

      cy.contains('Invalid code. Please try again.');
    });
  },
);
