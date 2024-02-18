import LoginPage from '../../../pages/loginPage';

describe(
  'View.happy.spec.tsx',
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    before(() => {
      LoginPage.loginByApi();
    });

    it('Visits the Noums View Mode page', () => {
      cy.visit('noums');
    });
  },
);
