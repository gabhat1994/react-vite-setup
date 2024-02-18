import { type ChangeEvent } from 'react';
import { type PasswordStrength } from '@/features/social-authentication';

export type NonNMSignUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type NonNoumenaSignUPProps = {
  loading: boolean;
  visible: boolean;
  analysis: PasswordStrength;
  showHelper: boolean;
  handleSignup: (values: NonNMSignUpForm) => Promise<void>;
  analyzePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  toggleFieldFocus: () => void;
  toggleVisibility: () => void;
  handleTermsOfUse: () => void;
};

export type SuccessPops = {
  loading: boolean;
  onGoToNoumena: () => void;
};
export type InvalidLinkPops = {
  onGoToLogin: () => void;
};

export type Auth = {
  accessToken: string;
  refreshToken: string;
  noumId: number;
};

export type Screen = 'signup' | 'success' | 'invalid-link';
