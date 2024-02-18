import { faker } from '@faker-js/faker';
import LoginPage from '../../pages/loginPage';
import data from '../../fixtures/data.json';
import homePageSidePanel from '../../pages/homePageSidePanel';
import NoumEditPage from '../../pages/noumEditPage';
import NoumListPage from '../../pages/noumListPage';

describe('Home.Side.Panel.Action.spec.tsx', () => {
  before(() => {
    LoginPage.loginByApi();

    // verify Homepage elements
    cy.contains(data['home.knowledge.label']);
    cy.contains(data['home.go.to.home.label']);
  });

  it('access all action buttons', () => {
    // create a noum and publish the noum
    const noumName = faker.lorem.words(3);
    homePageSidePanel.viewActionMenu().viewNoumAction();
    NoumListPage.setProjectNoum(noumName, 'Story', 'Private');
    NoumEditPage.publishUpdates();

    // view Start Event Now
    // view Schedule New Event
    // view new Contract page
    // view new SOW page
    // view new Invoice page
    homePageSidePanel.viewActionMenu().startAndVerifyEventNowAction();
    homePageSidePanel.viewActionMenu().startAndVerifyScheduleNewEvent();
    homePageSidePanel.viewActionMenu().startAndVerifyContractButton();
    homePageSidePanel.viewActionMenu().startAndVerifySowButton();
    homePageSidePanel.viewActionMenu().startAndVerifyInvoiceButton();
  });
});
