import { faker } from '@faker-js/faker';
import LoginPage from '../../../pages/loginPage';
import NoumPage from '../../../pages/noumPage';
import NoumEditPage from '../../../pages/noumEditPage';
import NoumListPage from '../../../pages/noumListPage';

describe('Noum.ElementText.spec.tsx', () => {
  beforeEach(() => {
    LoginPage.loginByApi();
  });

  it('Should add text elements to the Toolbox and write in the test element', () => {
    // visit the noum
    NoumListPage.goToNoumPage();
    LoginPage.acceptCookies();

    // create a noum - fillup the fields - Name, Description and Category
    const noumName = faker.lorem.words(3);
    NoumListPage.createProjectNoum(noumName, 'Story', 'Private');

    // add basic project noum elements
    NoumEditPage.buildFromScratch()
      .addContentElementOnly()
      .addImageElement()
      .addVideoElement()
      .publishUpdates();

    // verify added elements are present on view mode
    NoumPage.verifyContentElementCount(1)
      .verifyImageElementCount(1)
      .verifyVideoElementCount(1);
  });
});
