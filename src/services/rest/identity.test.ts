import axios from 'axios';

import IdentityService from './identity';
import { CloudFlareService } from './cloudFlareService';

vi.mock('axios');

const mockedAxios = vi.mocked(axios, true);

describe('IdentifyService', () => {
  beforeEach(() => {
    mockedAxios.post.mockReset();
    mockedAxios.get.mockReset();
    CloudFlareService.checkBlockedIP = vi.fn().mockResolvedValue({});
  });

  describe('signInPhone', () => {
    it('should call login-phone with the correct params', async () => {
      const phone = '+123456789';
      const token = 'token';
      await IdentityService.signInPhone(phone, token);

      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://noudev-api.noumenati.com/user/v1/otp/login-phone-v2',
        { phone, isLogin: true },
        { headers: { token, device: 'WEB' } },
      );
    });
  });

  describe('signInEmail', () => {
    it('should call login-email with the correct params', async () => {
      const email = 'test@noumena.global';
      const token = 'token';
      await IdentityService.signInEmail(email, token);

      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://noudev-api.noumenati.com/user/v1/otp/login-email-v2',
        { email, isLogin: true },
        { headers: { token, device: 'WEB' } },
      );
    });
  });

  describe('signInEmailVerification', () => {
    it('should call login-email-verification with the correct params', async () => {
      const email = 'test@noumena.global';
      const otp = '1231';
      await IdentityService.signInEmailVerification(email, otp);

      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://noudev-api.noumenati.com/user/v1/otp/verify-login-email',
        { email, otp },
      );
    });
  });

  describe('signInPhoneVerification', () => {
    it('should call verify-login-phone-verification with the correct params', async () => {
      const phone = '+123456789';
      const otp = '123456';
      await IdentityService.signInPhoneVerification(phone, otp);

      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://noudev-api.noumenati.com/user/v1/otp/verify-login-phone',
        { phone, otp },
      );
    });
  });
  describe('signUpPhone', () => {
    it('should call sign-up with the correct params', async () => {
      const phone = '+123456789';
      const token = '123456';
      await IdentityService.signUpPhone(phone, token);

      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://noudev-api.noumenati.com/user/v1/otp/login-phone-v2',
        { phone, isLogin: false },
        { headers: { token, device: 'WEB' } },
      );
    });

    it('should call sign-up-phone without token param', async () => {
      const phone = '+123456789';
      const token = null;
      await IdentityService.signUpPhone(phone, token);

      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://noudev-api.noumenati.com/user/v1/otp/login-phone',
        { phone, isLogin: false },
        { device: 'WEB' },
      );
    });

    it('should call sign-up-phone with recaptchaDisabled false and token', async () => {
      const phone = '+123456789';
      const token = 'token';
      const recaptchaDisabled = false;
      await IdentityService.signUpPhone(phone, token, recaptchaDisabled);

      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://noudev-api.noumenati.com/user/v1/otp/login-phone-v2',
        { phone, isLogin: false },
        { headers: { token, device: 'WEB' } },
      );
    });

    it('should call sign-up-phone with recaptchaDisabled false and no token', async () => {
      const phone = '+123456789';
      const token = null;
      const recaptchaDisabled = false;
      await IdentityService.signUpPhone(phone, token, recaptchaDisabled);

      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://noudev-api.noumenati.com/user/v1/otp/login-phone',
        { phone, isLogin: false },
        { device: 'WEB' },
      );
    });

    it('should call sign-up-phone with recaptchaDisabled true and no token', async () => {
      const phone = '+123456789';
      const token = null;
      const recaptchaDisabled = true;
      await IdentityService.signUpPhone(phone, token, recaptchaDisabled);

      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://noudev-api.noumenati.com/user/v1/otp/login-phone-v2',
        { phone, isLogin: false },
        { device: 'WEB' },
      );
    });
  });

  describe('signUpPhoneVerification', () => {
    it('should call sign-up-phone-verification with the correct params', async () => {
      const phone = '+123456789';
      const otp = '123456';
      const referralCode = '1234';
      const isVerify = false;
      await IdentityService.signUpPhoneVerification(
        phone,
        otp,
        undefined,
        referralCode,
        isVerify,
      );

      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://noudev-api.noumenati.com/user/v1/otp/verify-login-phone',
        { phone, isVerify: false, otp, referralCode },
        { signal: undefined },
      );
    });

    it('should call sign-up-phone-verificaton without `isVerify` param', async () => {
      const phone = '+123456789';
      const otp = '123456';
      const referralCode = '1234';
      await IdentityService.signUpPhoneVerification(
        phone,
        otp,
        undefined,
        referralCode,
      );

      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://noudev-api.noumenati.com/user/v1/otp/verify-login-phone',
        { phone, isVerify: false, otp, referralCode },
        { signal: undefined },
      );
    });
  });

  describe('signUpEmail', () => {
    it('should call sign-up-email with the correct params', async () => {
      const email = 'test@noumena.global';
      const token = 'token';
      await IdentityService.signUpEmail(email, token);

      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://noudev-api.noumenati.com/user/v1/otp/login-email-v2',
        { email, isLogin: false },
        { headers: { token, device: 'WEB' } },
      );
    });

    it('should call sign-up-email without token', async () => {
      const email = 'test@noumena.global';
      const token = null;
      await IdentityService.signUpEmail(email, token);

      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://noudev-api.noumenati.com/user/v1/otp/login-email',
        { email, isLogin: false },
        undefined,
      );
    });
  });

  describe('signUpEmailVerification', () => {
    it('should call signup-email-verification with the correct params', async () => {
      const email = 'test@test.com';
      const otp = '123456';
      const referralCode = '1234';
      const isVerify = false;
      await IdentityService.signUpEmailVerification(
        email,
        otp,
        undefined,
        referralCode,
        isVerify,
      );

      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://noudev-api.noumenati.com/user/v1/otp/verify-login-email',
        { email, isVerify: false, otp, referralCode },
        { signal: undefined },
      );
    });

    it('should call signup-email-verification without `isVerify`', async () => {
      const email = 'test@test.com';
      const otp = '123456';
      const referralCode = '1234';
      await IdentityService.signUpEmailVerification(
        email,
        otp,
        undefined,
        referralCode,
      );

      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://noudev-api.noumenati.com/user/v1/otp/verify-login-email',
        { email, isVerify: false, otp, referralCode },
        { signal: undefined },
      );
    });
  });

  describe('serviceSignup', () => {
    it('should call service signup', async () => {
      const SignUpValues = {
        email: 'test@test.com',
        firstName: 'first name',
        lastName: 'last name',
        profile: {
          socialLinks: [
            {
              link: 'test.com',
            },
          ],
        },
      };
      await IdentityService.serviceSignup(SignUpValues);

      mockedAxios.post.mockImplementationOnce(() => Promise.resolve({}));

      expect(mockedAxios.post).toHaveBeenCalledWith(
        `https://noudev-api.noumenati.com/user/v1/auth/signup-v4`,
        {
          email: 'test@test.com',
          firstName: 'first name',
          lastName: 'last name',
          profile: { socialLinks: [{ link: 'test.com' }] },
        },
      );
    });
  });

  describe('serviceValidateReferralCode', () => {
    it('should call service validate referral code', async () => {
      const referralCode = '1234';

      await IdentityService.serviceValidateReferralCode(referralCode);
      mockedAxios.get.mockImplementationOnce(() => Promise.resolve({}));
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://noudev-api.noumenati.com/referral/v1/codeCheck/${referralCode}`,
      );
    });
  });

  describe('serviceValidateContact', () => {
    it('should call service check if phone number exists in DB', async () => {
      const phoneNumber = '19806367361';

      await IdentityService.validateContact('phone', phoneNumber);
      mockedAxios.get.mockImplementationOnce(() => Promise.resolve(true));
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://noudev-api.noumenati.com/user/v1/auth/validate/phone/${phoneNumber}`,
      );
    });

    it('should call service check if phone number exists in DB', async () => {
      const email = 'test@gmail.com';

      await IdentityService.validateContact('email', email);
      mockedAxios.get.mockImplementationOnce(() => Promise.resolve(true));
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://noudev-api.noumenati.com/user/v1/auth/validate/email/${email}`,
      );
    });
  });
});
