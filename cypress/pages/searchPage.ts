class SearchPage {
  get resultList() {
    return cy.xpath('//span[@data-test="SearchContent-StyledTSpan"]');
  }

  get resultListFirstRow() {
    return cy.xpath(
      '(//div[@data-testid="search-item"]//span[@data-test="SearchContent-StyledTSpan"])[1]',
    );
  }

  get emptyResultList() {
    return cy.xpath('//span[@data-test="Search-ContentSpan"]');
  }

  get homeNoumTab() {
    return cy.xpath('//input[@data-testid="tab-HomeNoum"]');
  }

  get eventTab() {
    return cy.xpath('//input[@data-testid="tab-Event"]');
  }

  get postTab() {
    return cy.xpath('//input[@data-testid="tab-Post"]');
  }

  get projectNoumTab() {
    return cy.xpath('//input[@data-testid="tab-ProjectNoum"]');
  }

  get allTab() {
    return cy.xpath('//input[@data-testid="tab-All"]');
  }
}
export default new SearchPage();
