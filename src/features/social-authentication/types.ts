export type LogInForm = {
  email: string;
  password: string;
};

export type SignUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  referralCode?: string;
};

export type PasswordStrength = {
  hasSixCharacters: boolean;
  hasLowerCaseCharacter: boolean;
  hasUpperCaseCharacter: boolean;
  hasSpecialCharacter: boolean;
  hasNumber: boolean;
};

export type Mode = 'signup' | 'login';

export type Media = 'google' | 'linkedin';
