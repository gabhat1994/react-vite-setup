import LoginPage from '../../../pages/loginPage';
import NoumListPage from '../../../pages/noumListPage';
import CommonPage from '../../../pages/commonPage';
import NoumEditPage from '../../../pages/noumEditPage';

describe(
  'ArchiveUnarchiveNoum.happy.spec.tsx',
  {
    viewportWidth: 1980,
    viewportHeight: 1020,
  },
  () => {
    beforeEach(() => {
      LoginPage.loginByApi();
    });
    it('Archives/Unarchives a noum', () => {
      // noums are visible
      NoumListPage.goToNoumPage();

      cy.xpath(
        '//div[@aria-disabled="false" and @data-test="ChambersList-ChamberItem"]',
      ).should('be.visible');

      // select a noum
      cy.xpath(
        '(//a[@data-testid="chamberbox-testid" and not(contains(.,"Unpublished changes"))])[1]',
      ).click();
      // wait for the noum to load and click edit button
      cy.xpath('//span[@class="react-loading-skeleton"]').should('be.visible');
      cy.xpath('//span[@class="react-loading-skeleton"]', {timeout : 30000}).should('not.exist');
      cy.xpath(
        '//div[@data-testid="edit-noum-actions"]//span[@data-testid="button_text" and text()="Edit"]',
      ).click();
      CommonPage.waitForSkeletonLoader();
      NoumEditPage.addContentLast.should('be.visible');

      // archive the noum and verify it is set it to archived
      cy.get('[data-test="NoumEditOptionsNew-ThreeDotsIconWrapper"]').click();
      cy.xpath(
        '//span[@data-test="NoumEditOptionsNew-moreItems-TSpan" and text()="Archive"]',
      ).click();
      cy.get('[data-test="Modal-Content"] button:contains(Archive)').should(
        'have.text',
        'Archive',
      );
      cy.get('[data-test="Modal-Content"] button:contains(Archive)').click();
      CommonPage.verifyAlertMessage('Success: Noum status updated successfully');

      // unarchive the noum
      cy.get('[data-testid="archived-noum-actions"]').should(
        'have.text',
        'Unarchive',
      );
      cy.get('[data-testid="archived-noum-actions"]').click();
      cy.wait(1000);
      cy.get(
        '[data-test="ModalFooter-ModalFooterStyled"] button:contains(Publish)',
      ).click();

      // verify it is set it to unarchive and able to edit
      CommonPage.verifyAlertMessage('Success: Noum status updated successfully');
      cy.get(
        '[data-test="ModalFooter-ModalFooterStyled"] button:contains(Publish)',
      ).should('not.exist');
      cy.xpath(
        '//div[@data-testid="edit-noum-actions"]//span[@data-testid="button_text" and text()="Edit"]',
      ).should('be.visible');
    });
  },
);
