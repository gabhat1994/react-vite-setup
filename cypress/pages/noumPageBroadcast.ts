import CommonPage from './commonPage';
import CommonModal from './commonModal';

class NoumPageBroadcast {
  // generic
  get fieldDropDown() {
    return cy.xpath('//a[@data-testid="dropdown-value"]');
  }

  get startBroadcastBtn() {
    return cy.xpath(
      '//*[@data-testid="chamber-broadcast-create-btn" or @data-testid="chamber-broadcast-create-campaign-btn"]',
    );
  }

  get entireCommunityChechbox() {
    return cy.xpath(
      '//div[contains(.,"Entire Community (Everyone)")]/child::span[@data-testid="checkbox"]',
    );
  }

  get myCircleChechbox() {
    return cy.xpath(
      '//div[contains(.,"My Circle")]/child::span[@data-testid="checkbox"]',
    );
  }

  get membersConnectedChechbox() {
    return cy.xpath(
      '//div[contains(.,"Members Connected to My Noums")]/child::span[@data-testid="checkbox"]',
    );
  }

  get followersChechbox() {
    return cy.xpath(
      '//div[contains(.,"Followers of My Noum")]/child::span[@data-testid="checkbox"]',
    );
  }

  get cancelBtn() {
    return cy.get('[data-testid="chamber-campaign-cancel-action"]');
  }

  get broadcastBtn() {
    return cy.get('[data-testid="chamber-campaign-create-action"]');
  }

  get campaignSection() {
    return cy.get('[data-testid="campaign-testid"]');
  }

  get activeCampaignOptionBtn() {
    return cy.xpath(
      '//div[@data-testid="campaign-testid" and contains(.,"Active")]/child::div//div[@data-test="Container"]',
    );
  }

  get cancelCampaignBtn() {
    return cy.get('[data-testid="chamber-broadcast-cancel-btn"]');
  }

  get cancelledCampaign() {
    return cy.get(
      '//div[@data-testid="campaign-testid" and contains(.,"Cancelled")]',
    );
  }

  startBroadcastToEntireCommunity() {
    this.startBroadcast('entire_community');
  }

  startBroadcastToMyCircle() {
    this.startBroadcast('my_circle');
  }

  startBroadcastToMyConnectedMembers() {
    this.startBroadcast('members_connected');
  }

  startBroadcastToMyFollowers() {
    this.startBroadcast('followers');
  }

  startBroadcast(toWho: string) {
    cy.wait(2000);
    this.startBroadcastBtn.click();

    if (toWho.toLowerCase() === 'entire_community') {
      this.entireCommunityChechbox.click();
    } else if (toWho.toLowerCase() === 'my_circle') {
      this.myCircleChechbox.click();
    } else if (toWho.toLowerCase() === 'members_connected') {
      this.membersConnectedChechbox.click();
    } else if (toWho.toLowerCase() === 'followers') {
      this.followersChechbox.click();
    } else {
      throw new Error('Incorrect selection of toWho');
    }

    this.broadcastBtn.click();
    CommonPage.verifyAlertMessage('Broadcast started');
    this.activeCampaignOptionBtn.should('be.visible');
    CommonModal.close();
  }

  cancelActiveCampaign() {
    this.activeCampaignOptionBtn.click();
    this.fieldDropDown.should('be.visible').contains('Cancel Campaign').click();
    cy.contains('Are you sure you want to cancel this campaign?').should(
      'be.visible',
    );
    this.cancelCampaignBtn.click();
    CommonPage.verifyAlertMessage('Campaign Cancelled');
  }
}
export default new NoumPageBroadcast();
