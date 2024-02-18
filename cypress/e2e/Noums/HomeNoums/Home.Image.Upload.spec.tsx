import LoginPage from '../../../pages/loginPage';
import NoumEditPage from '../../../pages/noumEditPage';
import HomePage from '../../../pages/homePage';
import HomeNoumPage from '../../../pages/homeNoumPage';

describe(
  'Home.Image.Upload.spec.tsx',
  {
    viewportWidth: 1980,
    viewportHeight: 1020,
  },
  () => {
    beforeEach(() => {
      LoginPage.loginByApi();
    });
    it('Upload image to Home Noums Element', () => {
      HomePage.goToHomeNoum();
      HomeNoumPage.goToEditMode();

      NoumEditPage.addImageElement().deleteLastSection().publishUpdates();
    });
  },
);
