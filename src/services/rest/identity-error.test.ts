import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import IdentityService from './identity';
import { CloudFlareService } from './cloudFlareService';

const mock = new MockAdapter(axios);

describe('IdentifyService', () => {
  beforeEach(() => {
    mock.reset();
    CloudFlareService.checkBlockedIP = vi.fn().mockResolvedValue({});
  });

  it('should validate referral code rejected without 422 code', async () => {
    const referralCode = '1234';

    mock.onGet().reply(422, {
      errorMessage: 'noumena.referral_code.error.422',
    });
    const { errorMessage } = await IdentityService.serviceValidateReferralCode(
      referralCode,
    );
    expect(errorMessage).toEqual('noumena.referral_code.error.422');
  });

  it('should validate referral code rejected without 403 code', async () => {
    const referralCode = '1234';

    mock.onGet().reply(403, {
      errorMessage: 'noumena.referral_code.error.403',
    });
    const { errorMessage } = await IdentityService.serviceValidateReferralCode(
      referralCode,
    );
    expect(errorMessage).toEqual('noumena.referral_code.error.403');
  });

  it('verify-login-phone failed case', async () => {
    const phone = '+123456789';
    const token = null;

    mock.onPost().reply(401, {
      errorMessage: 'Unauthorized',
    });
    const { errorMessage } = await IdentityService.signUpPhone(phone, token);
    expect(errorMessage).toEqual('Unauthorized');
  });

  it('verify-login-phone failed case', async () => {
    const phone = '+123456789';
    const otp = '123456';
    const referralCode = '1234';

    mock.onPost().reply(400, {
      errorMessage: 'Request failed with status code 400',
    });

    const { errorMessage } = await IdentityService.signUpPhoneVerification(
      phone,
      otp,
      undefined,
      referralCode,
    );
    expect(errorMessage).toEqual('Request failed with status code 400');
  });

  it('sign-up-email failed case', async () => {
    const email = 'test@noumena.global';
    const token = 'token';

    mock.onPost().reply(400, {
      errorMessage: 'Request failed with status code 400',
    });

    const { errorMessage } = await IdentityService.signUpEmail(email, token);
    expect(errorMessage).toEqual('Request failed with status code 400');
  });

  it('sign-up-email-verification failed case', async () => {
    const email = 'test@test.com';
    const otp = '123456';
    const referralCode = '1234';
    const isVerify = false;

    mock.onPost().reply(400, {
      errorMessage: 'Request failed with status code 400',
    });

    const { errorMessage } = await IdentityService.signUpEmailVerification(
      email,
      otp,
      undefined,
      referralCode,
      isVerify,
    );
    expect(errorMessage).toEqual('Request failed with status code 400');
  });

  it('service-sign-up failed case', async () => {
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

    mock.onPost().reply(400, {
      errorMessage: 'Request failed with status code 400',
    });
    const { errorMessage } = await IdentityService.serviceSignup(SignUpValues);
    expect(errorMessage).toEqual('Request failed with status code 400');
  });

  it('service-validate-phonenumber-contact failed case', async () => {
    const phoneNumber = '19806367361';

    mock.onGet().reply(400, {
      errorMessage: 'Request failed with status code 400',
    });
    const { errorMessage } = await IdentityService.validateContact(
      'phone',
      phoneNumber,
    );
    expect(errorMessage).toEqual('Request failed with status code 400');
  });

  it('service-validate-email-contact failed case', async () => {
    const email = 'test@gmail.com';

    mock.onGet().reply(400, {
      errorMessage: 'Request failed with status code 400',
    });
    const { errorMessage } = await IdentityService.validateContact(
      'email',
      email,
    );
    expect(errorMessage).toEqual('Request failed with status code 400');
  });
});
