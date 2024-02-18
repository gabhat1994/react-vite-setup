import { IdentityServices } from '@/services/rest/identity';

export const useSendOTP = () => {
  const submitOtpByTypedValue = async (
    otp: string | undefined,
    typedEmail: string,
    phone: string,
    signal?: AbortSignal,
  ) => {
    if (otp?.trim().length === 4 && otp.indexOf(' ') < 0) {
      return typedEmail
        ? IdentityServices.signUpEmailVerification(
            typedEmail,
            otp,
            signal,
            undefined,
            true,
          )
        : IdentityServices.signUpPhoneVerification(
            phone,
            otp,
            signal,
            undefined,
            true,
          );
    }
    return null;
  };
  return {
    submitOtpByTypedValue,
  };
};
