import data from '../fixtures/data.json';
import CommonPage from './commonPage';
import LoginPage from './loginPage';

class DiscoveryPage {
  get noumContainerList() {
    return cy.xpath(
      '//div[@data-test="Discovery-Container"]//a[@data-testid="chamberbox-testid"]',
    );
  }

  get favouritesContainerList() {
    return cy.xpath(
      '//div[@data-test="Discovery-Container" and contains(.,"Favourites")]//div[@data-test="HeaderTitle"]',
    );
  }

  noumListSection(name: string) {
    return cy.xpath(
      `(//div[@data-test="Discovery-Container" and contains(.,"${name}")]/child::div[@data-testid="slider"]//a[@data-testid="chamberbox-testid"])[1]`,
    );
  }

  noumListSectionShowAll(name: string) {
    return cy.xpath(
      `//div[@data-test="Discovery-Container" and contains(.,"${name}")]/child::div[@data-testid="slider"]//span[@data-testid="button_text" and text()="Show All"]`,
    );
  }

  verifyBroadcastNoum(noum: string, isVisible = true) {
    if (isVisible === true) {
      cy.xpath(
        `//div[@data-test="Discovery-Container" and contains(.,"Featured")]/child::div[@data-testid="slider"]//a[@data-testid="chamberbox-testid" and contains(.,"${noum}") and contains(.,"Campaign Ends in 71:")]`,
      ).should('be.visible');
    } else {
      cy.xpath(
        `//div[@data-test="Discovery-Container" and contains(.,"Featured")]/child::div[@data-testid="slider"]//a[@data-testid="chamberbox-testid" and contains(.,"${noum}")]`,
      ).should('not.exist');
    }
  }

  verifyNoumListSection(name: string) {
    this.noumListSection(name).scrollIntoView().should('be.visible');
  }

  verifyShowAllForFeatures() {
    cy.xpath(
      '//div[@data-test="Discovery-Container" and contains(.,"Featured")]/child::div[@data-testid="slider"]',
    ).then(($el) => {
      if ($el.find('[data-testid="slidercontrols"]').length > 0) {
        this.noumListSectionShowAll('Featured').click();
        cy.get('[data-testid="chamberbox-testid"]')
          .should('be.visible')
          .and('have.length.gt', 4);
        cy.url().should('include', 'featured-show-all');
      }
    });
  }

  verifyShowAllForMyCircle() {
    cy.xpath(
      '//div[@data-test="Discovery-Container" and contains(.,"My Circle")]/child::div[@data-testid="slider"]',
    ).then(($el) => {
      if ($el.find('[data-testid="slidercontrols"]').length > 0) {
        this.noumListSectionShowAll('My Circle').click();
        cy.get('[data-testid="chamberbox-testid"]')
          .should('be.visible')
          .and('have.length.gt', 4);
        cy.url().should('include', 'mycircle-show-all');
      }
    });
  }

  verifyShowAllForPopular() {
    cy.xpath(
      '//div[@data-test="Discovery-Container" and contains(.,"Popular")]/child::div[@data-testid="slider"]',
    ).then(($el) => {
      if ($el.find('[data-testid="slidercontrols"]').length > 0) {
        this.noumListSectionShowAll('Popular').click();
        cy.get('[data-testid="chamberbox-testid"]')
          .should('be.visible')
          .and('have.length.gt', 4);
        cy.url().should('include', 'popular-show-all');
      }
    });
  }

  goToDiscoveryPage() {
    // go to discovery page
    cy.visit(`/discovery`);
    cy.url().should('include', data['discovery.path']);

    cy.get('[data-testid="slider"]').should('be.visible');
    CommonPage.waitForSkeletonLoader();
    this.noumContainerList.should('be.visible');
    cy.wait(2000);
    LoginPage.acceptCookies();
  }
}

export default new DiscoveryPage();
