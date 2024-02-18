import { faker } from '@faker-js/faker';

class UtilPage {
  getRandomEmailAddress() {
    const random = Math.floor(Math.random() * 10000) + 1;
    const number = `0${random}`.slice(-4);

    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);

    const email = `testqa+${day}${month}${year}${number}@noumena.global`;
    cy.log(`email: ${email}`);
    return email;
  }

  getRandomPhoneNumber() {
    const phonenumber = `917${faker.random.numeric(7)}`;
    cy.log(`phonenumber: ${phonenumber}`);
    return phonenumber;
  }

  generateOtp() {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const value = `${day}${month}`;
    return value;
  }

  perf_check() {
    cy.window().then((window) => {
      console.log(window.performance)
      console.log(window.performance.memory.usedJSHeapSize)
      console.log(window.performance.memory.jsHeapSizeLimit)
    })
  }
}

export default new UtilPage();
