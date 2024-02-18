/// <reference types="cypress" />

// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

// Import commands.js using ES2015 syntax:
import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string): Promise<void>;
      register(
        _email: string,
        _otp: string,
        activateUser?: boolean,
        referralCode?: string,
      ): Promise<
        | { firstName: string; lastName: string; referralCode: string }
        | undefined
      >;
      logout(): Promise<void>;
      getRTEElement(): Chainable<JQuery<HTMLElement>>;
    }
  }
}

// Alternatively you can use CommonJS syntax:
// require('./commands')
