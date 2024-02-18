// @ts-nocheck
const envConfig =
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'devstaging' ||
  process.env.NODE_ENV === 'nightly' ||
  process.env.NODE_ENV === 'staging' ||
  process.env.NODE_ENV === 'uat' ||
  process.env.NODE_ENV === 'production'
    ? {
        path: `.env.${process.env.NODE_ENV}`,
      }
    : {};

require('dotenv').config(envConfig);

export const setupNodeEvents: Cypress.PluginConfig = (on, config) => {
  on('task', {
    log(message: string) {
      console.log(message);

      return null;
    },
  });

  return {
    ...config,
    env: {
      AUTO_REFERRAL_CODE: process.env.AUTO_REFERRAL_CODE || '',
      VITE_API_URL: process.env.VITE_API_URL || '',
      CYPRESS_API_KEY: process.env.CYPRESS_API_KEY || '',
      CYPRESS_AUTH_BY_USER: process.env.CYPRESS_AUTH_BY_USER || '',
      AUTO_REFERRAL_CODE_MAX: process.env.AUTO_REFERRAL_CODE_MAX || '',
      AUTO_REFERRAL_CODE_REJECTED:
        process.env.AUTO_REFERRAL_CODE_REJECTED || '',
      AUTO_USER_ONE: process.env.AUTO_USER_ONE || '',
      AUTO_USER_TWO: process.env.AUTO_USER_TWO || '',
      AUTO_USER_ONE_NAME: process.env.AUTO_USER_ONE_NAME || '',
      AUTO_USER_TWO_NAME: process.env.AUTO_USER_TWO_NAME || '',
      AUTO_USER_PASSWORD: process.env.AUTO_USER_PASSWORD || '',
      AUTO_PROJECT_NOUM_ONE: process.env.AUTO_PROJECT_NOUM_ONE || '',
      AUTO_PROJECT_NOUM_TWO: process.env.AUTO_PROJECT_NOUM_TWO || '',
      AUTO_CARD_FEE: process.env.AUTO_CARD_FEE || '',
      AUTO_USER_ADMIN: process.env.AUTO_USER_ADMIN || '',
      AUTO_MEMBER_SEARCH: process.env.AUTO_MEMBER_SEARCH || '',
      AUTO_USER_CONNECTED_ONE: process.env.AUTO_USER_CONNECTED_ONE || '',
      AUTO_USER_CONNECTED_TWO: process.env.AUTO_USER_CONNECTED_TWO || '',
      AUTO_USER_CONNECTED_ONE_NAME: process.env.AUTO_USER_CONNECTED_ONE_NAME || '',
      AUTO_USER_CONNECTED_TWO_NAME: process.env.AUTO_USER_CONNECTED_TWO_NAME || '',
    },
  };
};
