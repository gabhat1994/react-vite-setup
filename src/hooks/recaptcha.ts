import { useContext } from 'react';
import { RecaptchaContext } from '@/providers/RecaptchaProvider';

export const useRecaptcha = () => {
  const { token, refresh, returnNewReCaptcha } = useContext(RecaptchaContext);

  return {
    recaptchaToken: token,
    refreshRecaptchaToken: refresh,
    returnNewReCaptcha,
  };
};

export default useRecaptcha;
