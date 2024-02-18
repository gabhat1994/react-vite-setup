import { addDays, differenceInCalendarMonths, getDate } from 'date-fns';
import CommonPage from './commonPage';

class HomeNoumPageEvents {
  // event elements
  get eventHeaderTitle() {
    return cy.xpath(
      '//span[@data-test="CalendarElementViewModeHeader-TSpan" and text()="Events"]',
    );
  }

  get eventAddBtn() {
    return cy.xpath('//div[@data-testid="calendar-element-header"]/button');
  }

  get eventHostingTabCount() {
    return cy.xpath(
      '//span[@data-test="CalendarOwnerEventsListCollapsed-EventCategory" and text()="Hosting"]/following-sibling::span[@data-test="CalendarOwnerEventsListCollapsed-EventCount"]',
    );
  }

  get eventCollapesBtn() {
    return cy.xpath('//div[@data-testid="calendar-collapse-button"]');
  }

  get eventTitle() {
    return cy.get('[data-test="EventItem-EventTitle"]');
  }

  get eventAddModalTitleField() {
    return cy.xpath('//input[@name="title"]');
  }

  get eventAddModalDescriptionField() {
    return cy.xpath('//textarea[@name="description"]');
  }

  get eventAddModalPrivacyPublic() {
    return cy.xpath(
      '//div[@data-testid="privacy-PUBLIC-wrapper"]//div[@data-test="PrivacySettingItem-OptionIcon"]',
    );
  }

  get eventAddModalPrivacyConnected() {
    return cy.xpath(
      '//div[@data-testid="privacy-CONNECTED-wrapper"]//div[@data-test="PrivacySettingItem-OptionIcon"]',
    );
  }

  get eventAddModalPrivacyInvitation() {
    return cy.xpath(
      '//div[@data-testid="privacy-INVITATION-wrapper"]//div[@data-test="PrivacySettingItem-OptionIcon"]',
    );
  }

  get eventAddModalPrivacy() {
    return cy.xpath(
      '//div[@data-test="PrivacySettingsField-Heading"]//input[@data-test="EventPicker-Capitalize"]',
    );
  }

  get eventAddModalCreateBtn() {
    return cy.xpath('//button[@data-testid="create-event-button"]');
  }

  get modalHeaderTitle() {
    return cy.xpath(
      '//div[@id="modal-content"]//span[contains(@data-test,"ModalHeader")]',
    );
  }

  get dropDownValue() {
    return cy.xpath(
      '//a[@data-testid="dropdown-value"] | //span[@data-test="DropdownOption-TSpan"]',
    );
  }

  addScheduleEvent() {
    this.eventAddBtn.click();
    this.dropDownValue.contains('Schedule').click();
    this.modalHeaderTitle.contains('Create a New Event').should('be.visible');
  }

  addPublicEvent(name: string, description: string, numDays: number) {
    this.addScheduleEvent();
    this.addEventWithDate(name, description, numDays, 'Public');
    this.verifyAddedEvent(name, numDays);
    return this;
  }

  addConnectedEvent(name: string, description: string, numDays: number) {
    this.addScheduleEvent();
    this.addEventWithDate(name, description, numDays, 'Connected');
    this.verifyAddedEvent(name, numDays);
    return this;
  }

  addInvitedEvent(
    name: string,
    description: string,
    numDays: number,
    emails: string,
  ) {
    this.addScheduleEvent();
    this.addEventWithDate(name, description, numDays, 'Invited Only', emails);
    this.verifyAddedEvent(name, numDays);
    return this;
  }

  updateEvent(
    existingName: string,
    newName: string,
    description: string,
    numDays: number,
    visibility = 'Public',
    emails?: string,
  ) {
    cy.wait(1000);
    cy.get('body').then(($el) => {
      if ($el.find('[data-tooltip="More Options"]').length > 0) {
        this.eventTitle
          .contains(existingName)
          .scrollIntoView()
          .should('be.visible');
        cy.xpath(
          `//div[@data-testid="event-item-testid" and contains(.,"${existingName}")]//button[@data-tooltip="More Options"]`,
        )
          .should('be.visible')
          .click();
        cy.xpath(
          '//div[@data-testid="dropdown-container"]//span[@data-test="EllipsisButton-TSpan" and text()="Edit"]',
        )
          .should('be.visible')
          .click();
      } else {
        cy.get(`[data-testid="edit-event-button"]`).click();
      }
    });

    this.addEventWithDate(newName, description, numDays, visibility, emails);
    this.verifyUpdatedEvent(newName);
    this.verifyEventDate(newName, numDays);
    return this;
  }

  verifyAddedEvent(name: string, numDays: number) {
    CommonPage.verifyAlertMessage('Event');
    CommonPage.waitForSkeletonLoader();

    cy.get('[data-testid="tab-HOSTING"]').should('be.visible').click();
    CommonPage.waitForSpinnerToNotExist();
    cy.wait(1000);
    this.eventTitle.should('be.visible').contains(name).should('be.visible');
    this.verifyEventDate(name, numDays);
  }

  verifyUpdatedEvent(name: string) {
    CommonPage.verifyAlertMessage('Changes has been saved.');
    cy.wait(1000);
    this.eventTitle.should('be.visible').contains(name).should('be.visible');
  }

  verifyEventDate(name: string, days: number) {
    const value = new Date();
    const date = addDays(value, days);
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1; // Months start at 0!
    const dd = date.getDate();
    let day = `${dd}`;
    let month = `${mm}`;
    if (dd < 10) day = `0${dd}`;
    if (mm < 10) month = `0${mm}`;
    const formattedToday = `${day}/${month}/${yyyy}`;

    cy.log(`formattedToday: ${formattedToday}`);
    cy.xpath(
      `//div[@data-testid="event-item-testid" and contains(.,"${name}")]//div[@data-test="EventItem-EventBadgeWrapper" and contains(.,"${formattedToday}")]`,
    ).should('be.visible');
  }

  addEventWithDate(
    name: string,
    description: string,
    numDays: number,
    visibility: string,
    emails?: string,
  ) {
    this.eventAddModalTitleField.clear().type(name);
    this.eventAddModalDescriptionField.clear().type(description);
    this.setDatePicker(numDays);

    this.eventAddModalPrivacy.click();
    this.dropDownValue.contains(visibility).click();

    if (emails !== undefined) {
      this.inviteUsers(emails);
    }

    this.eventAddModalCreateBtn.click();
    return this;
  }

  inviteUsers(emails: string) {
    const list = emails.split(',');
    const arraySize = list.length;

    cy.xpath(
      '//button[@data-testid="add-host-btn" and contains(.,"Invite")]',
    ).click();
    list.forEach((email) => {
      cy.get('[data-test="EventMemberInputV2-SearchInputField"]')
        .click()
        .type(email);
      cy.get('[data-test="UserOptionItem-DropDownLabel"]')
        .should('have.length', 1)
        .click();
      cy.wait(500);
    });
    cy.xpath(
      '//div[@data-testid="event-invite-members"]//span[@data-test="AddMemberHeader-TSpan"]',
    ).should('have.text', `(${arraySize})`);
    cy.get('[data-testid="add-new-member"]').click();
  }

  viewHostingTab() {
    cy.get('body').then(($el) => {
      if ($el.find('[data-testid="tab-HOSTING"]').length > 0) {
        cy.get('[data-testid="tab-ATTENDING"]').click();
        cy.get('[data-testid="tab-HOSTING"]').click();
      } else {
        cy.get('[data-testid="tab-HOSTING"]').click();
      }
    });
    CommonPage.waitForSpinnerToNotExist();
    return this;
  }

  viewEventSummaryModal(name: string) {
    this.eventTitle
      .contains(name)
      .scrollIntoView()
      .should('be.visible')
      .click();
    cy.get('[data-test="EventDetail-Content"]').should('be.visible');
    return this;
  }

  viewAttendeeModal() {
    cy.get('[data-test="ModalFooter-ModalFooterStyled"]')
      .find('[data-test="EventAttendees-EventAttendeesNote"]')
      .first()
      .click();
    CommonPage.waitForSpinnerNotBeVisible();
    return this;
  }

  verifyAttendeePendingTab(isExist: boolean, name = null) {
    cy.get('[name="pending"]').click();
    cy.wait(2000);
    if (isExist === true) {
      cy.get('[data-test="AttendeesView-TSpan"]').should('be.visible');
      if (name !== null) {
        cy.get('[data-testid="event-attendee-item"]')
          .contains(name)
          .should('be.visible');
      }
    } else {
      cy.get('[data-testid="event-attendee-item"]').should('not.exist');
    }
    return this;
  }

  verifyAttendeesTab(count: number) {
    cy.get('[name="attending"]').click();
    cy.xpath('//div[@data-testid="stack"]/span[@data-test="AttendeesView-TSpan"][1]')
      .should('be.visible')
      .should('have.length', count);
    return this;
  }

  closeAllModals() {
    cy.get('body').then(($el) => {
      const ctr = $el.find('[data-testid="modal_close_btn"]').length;
      for (let i = 0; i < ctr; i++) {
        cy.get('[data-testid="modal_close_btn"]').last().click();
      }
    });

    return this;
  }

  setDatePicker(numDays: number) {
    cy.get('[data-testid="date-picker-date-field"]').then(() => {
      const value = new Date();
      const newValue = addDays(value, numDays);
      const diff = differenceInCalendarMonths(newValue, value);
      const day = getDate(newValue);

      cy.log(`current date: ${value}`);
      cy.log(`    new date: ${newValue}`);
      cy.log(`        diff: ${diff}`);
      cy.log(` day to pick: ${day}`);

      cy.get('[data-testid="date-picker-date-field"]').click();
      for (let i = 0; i < diff; i++) {
        cy.get('[name="next-month"]').click();
        cy.wait(500);
      }
      cy.get('[name="day"]').contains(day).click();
    });
  }
}

export default new HomeNoumPageEvents();
