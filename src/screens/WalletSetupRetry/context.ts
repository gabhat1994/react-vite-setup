import { createContext } from 'react';
import {
  type SetupWalletContextTypes,
  type TPayload,
  type TUser,
} from './types';

export const initPayLoad: TPayload = {
  firstName: '',
  lastName: '',
  email: '',
  address1: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
  dateOfBirth: '',
  ssn: '',
  citizenship: '',
};

export const initCurrentUser: TUser = {
  firstName: '',
  lastName: '',
  email: '',
  citizenship: '',
  dateOfBirth: '',
  ssn: '',
  address: null,
};

export const SetupWalletContext = createContext<SetupWalletContextTypes>({
  handleNextStep: () => null,
  handlePreviousStep: () => null,
  setPayLoad: null,
  currentUser: initCurrentUser,
  payLoad: initPayLoad,
  setPasscode: null,
  passCode: null,
  setState: () => null,
});
