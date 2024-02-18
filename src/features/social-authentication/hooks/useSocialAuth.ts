import { type Media, type Mode } from '../types';

export const useSocialAuth = () => {
  const initiateAuth = (
    media: Media,
    mode: Mode,
    referralCode: string = '',
  ) => {
    const apiUrl = process.env.VITE_API_URL;
    const url = `${apiUrl}/user/v1/auth/${media}?mode=${mode}&referralCode=${referralCode}`;
    window.location.assign(url);
  };

  return {
    initiateAuth,
  };
};
