/* eslint-disable no-await-in-loop */
import axios from 'axios';
import { faker } from '@faker-js/faker';
import accessLocalStorage from '@/constants/accessLocalStorage';
import { setLocalStorage } from '@/utils/localStorage';
import onboardingStatusLocalStorage from '@/constants/onboardingStatusLocalStorage';
import 'cypress-iframe';
import 'cypress-xpath';

/// <reference types="cypress" />
Cypress.Commands.add('login', async (email?: string) => {
  let i = 0;
  do {
    try {
      const urlVerify = `${Cypress.env(
        'VITE_API_URL',
      )}/user/v1/auth/signin?credentialType=PASSWORD`;
      const verifyResponse = await axios.post(urlVerify, {
        email: email || Cypress.env('AUTO_USER_ONE'),
        password: `${Cypress.env('AUTO_USER_PASSWORD')}`,
      });

      const { accessToken, refreshToken } = verifyResponse.data.token;

      const { user } = verifyResponse.data;

      setLocalStorage(accessLocalStorage.ACCESS_TOKEN, accessToken);
      setLocalStorage(accessLocalStorage.REFRESH_TOKEN, refreshToken);
      setLocalStorage(accessLocalStorage.USER, {
        _id: user._id,
        status: user.status,
        userStatus: user.userStatus,
      });
      setLocalStorage(
        onboardingStatusLocalStorage.ONBOARDING_COMPLETE_STATUS,
        true,
      );

      return;
    } catch (error: unknown) {
      console.error(error);
      console.error('[API] Error login in with email');
      i++;
    }
  } while (i < 3);
});

Cypress.Commands.add(
  'register',
  async (
    email: string,
    _otp: string,
    activateUser?: boolean,
    referralCode?: string,
  ) => {
    let i = 0;
    do {
      try {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const password = `${Cypress.env('AUTO_USER_PASSWORD')}`;
        const finalOtp = _otp;

        const urlLogin = `${Cypress.env(
          'VITE_API_URL',
        )}/user/v1/otp/login-email-v2`;
        const loginHeaders = { token: '', device: 'WEB' };
        const loginBody = { email, isLogin: false };
        await axios.post(urlLogin, loginBody, { headers: loginHeaders });

        const urlVerify = `${Cypress.env(
          'VITE_API_URL',
        )}/user/v1/otp/verify-login-email`;
        await axios.post(urlVerify, {
          email,
          isVerify: true,
          otp: finalOtp,
          ...(activateUser && {
            referralCode:
              referralCode ||
              (Cypress.env('AUTO_REFERRAL_CODE')
                ? Cypress.env('AUTO_REFERRAL_CODE')
                : ''),
          }),
        });

        const urlSignup = `${Cypress.env(
          'VITE_API_URL',
        )}/user/v1/auth/signup-v4`;
        const headers = { token: '', device: 'WEB' };
        const body = {
          email,
          firstName,
          lastName,
          password,
        };
        const verifyResponse = await axios.post(urlSignup, body, { headers });

        const { accessToken, refreshToken } = verifyResponse.data.token;

        const { user } = verifyResponse.data;

        setLocalStorage(accessLocalStorage.ACCESS_TOKEN, accessToken);
        setLocalStorage(accessLocalStorage.REFRESH_TOKEN, refreshToken);
        setLocalStorage(accessLocalStorage.USER, {
          _id: user._id,
          status: user.status,
          userStatus: user.userStatus,
        });
        setLocalStorage(
          onboardingStatusLocalStorage.ONBOARDING_COMPLETE_STATUS,
          true,
        );

        const endpoint = `${Cypress.env('VITE_API_URL')}/api/v1/query`;

        const graphqlQuery = {
          operationName: 'submitOnboardingQuestionnaire',
          query:
            'mutation submitOnboardingQuestionnaire($input: [submitOnboardingQuestionnaire]) {\n  submitOnboardingQuestionnaire(input: $input) {\n    userStatus\n    __typename\n  }\n}',
          variables: {
            input: [
              {
                questionId: '636340a1d1b4cfc58759939c',
                answer: 'Gen X (41-55)',
              },
              {
                questionId: '632be1607003c70096be762d',
                answer: 'Full-time job but working on a side hustle',
              },
              {
                questionId: '6359035b844d4764725c2912',
                answer: 'Grower',
              },
              {
                questionId: '632be1607003c70096be762e',
                answer: 'United States',
                countryCode: 'us',
              },
              {
                questionId: '632be1607003c70096be762f',
                answer: 'Affiliate Marketing',
              },
              {
                questionId: '632be1607003c70096be7630',
                answer: '$200,000 - $300,000',
              },
              {
                questionId: '632be1607003c70096be7631',
                answer: 'Single LLC',
              },
            ],
          },
        };

        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `JWT ${accessToken}`,
          },
          body: JSON.stringify(graphqlQuery),
        };

        await fetch(endpoint, options);

        return {
          firstName,
          lastName,
          referralCode: user.referralCode,
        };
      } catch (error: unknown) {
        console.error(error);
        console.error('[API] Error login in with email');
        i++;
      }
    } while (i < 3);

    return undefined;
  },
);

Cypress.Commands.add('logout', async () => {
  setLocalStorage(accessLocalStorage.ACCESS_TOKEN);
  setLocalStorage(accessLocalStorage.REFRESH_TOKEN);
  setLocalStorage(accessLocalStorage.USER);
  setLocalStorage(onboardingStatusLocalStorage.ONBOARDING_COMPLETE_STATUS);

  Promise.resolve();
});

Cypress.Commands.add('getRTEElement', () => cy.get('[data-testid="rte-area"]'));
