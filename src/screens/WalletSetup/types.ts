import { type Dispatch, type SetStateAction } from 'react';

export enum EWalletSetup {
  TOTAL_STEPS = 6,
}

export interface TUser {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  citizenship: string | null;
  ssn: string | null;
  dateOfBirth: number | string | null;
  address: {
    apartment: string | null | undefined;
    city: string | null | undefined;
    state: string | null | undefined;
    street: string | null | undefined;
    postalCode: string | null | undefined;
  } | null;
}

export interface TPayload {
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  street?: string;
  apartment?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  dateOfBirth: number | string;
  ssn: string;
  citizenship?: string;
}

export interface SetupWalletContextTypes {
  handleNextStep: () => void;
  currentUser: TUser;
  setPayLoad: Dispatch<SetStateAction<TPayload>> | null;
  handlePreviousStep: () => void;
  payLoad: TPayload;
  setPasscode: Dispatch<SetStateAction<string | null>> | null;
  passCode: string | null;
  setState: Function;
}
