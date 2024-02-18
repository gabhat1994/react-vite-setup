import { type ReactElement } from 'react';

export type SignUpValues = {
  email?: string;
  phone?: string;
  firstName: string;
  lastName: string;
  dob?: string;
  additionalInfo?: string;
  profile: {
    socialLinks: {
      link?: string;
      name?: string;
    }[];
  };
  referralCode?: string;
};

export type OnboardingScreenLayoutProps = {
  children: ReactElement | ReactElement[];
};

export type QuickSignUpValues = {
  email?: string;
  firstName: string;
  lastName: string;
  noumId?: string;
};
