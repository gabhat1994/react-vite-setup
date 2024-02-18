import { faker } from '@faker-js/faker';

import HomePage from '../../../pages/homePage';
import HomeNoumPage from '../../../pages/homeNoumPage';
import LoginPage from '../../../pages/loginPage';
import HomeNoumEditPage from '../../../pages/homeNoumEditPage';

describe('Home.Profile.Update.Sanity.spec.tsx', () => {
  beforeEach(() => {
    LoginPage.loginByApi();
  });

  it('owner updates home noum profile details', () => {
    HomePage.goToHomeNoum();
    HomeNoumPage.goToEditMode();
    HomeNoumEditPage.editHomeProfile();

    const professionalTitle = `QA Automation Engineer ${faker.datatype.uuid()}`;
    const aboutMe = `QA Automation Engineer ${faker.datatype.uuid()}`;

    // update home noum profile details
    HomeNoumEditPage.setProfileAvatar();
    HomeNoumEditPage.setTitleField(professionalTitle);
    HomeNoumEditPage.setBioField(aboutMe);
    HomeNoumEditPage.setAgeField();
    HomeNoumEditPage.setYearsField();
    HomeNoumEditPage.setCityField();
    HomeNoumEditPage.saveHomeProfile();

    // verify saved profile details are reflecting
    HomeNoumEditPage.editHomeProfile();
    HomeNoumEditPage.titleField.should('have.value', professionalTitle);
    HomeNoumEditPage.bioField.should('have.text', aboutMe);
    cy.get('@ageWrap').then((ageWrap) => {
      HomeNoumEditPage.ageSelect.should('have.value', ageWrap);
    });
    cy.get('@yearsWrap').then((yearsWrap) => {
      HomeNoumEditPage.yearsSelect.should('have.value', yearsWrap);
    });
    cy.get('@cityWrap').then((cityWrap) => {
      HomeNoumEditPage.cityField.should('have.value', cityWrap);
    });
    cy.get('@avatarWrap').then((avatarWrap) => {
      HomeNoumEditPage.avatarImageSrc
        .should('have.attr', 'src')
        .and('include', avatarWrap);
    });
  });
});
