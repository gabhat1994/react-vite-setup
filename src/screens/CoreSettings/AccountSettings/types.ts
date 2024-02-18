import {
  type Maybe,
  type OtpResponseOutput,
  type UserOutput,
  type UserProfileInput,
} from '@/apollo/generated/types';
import { type UserFragment } from '@/apollo/graphql/fragments';

export type EmailAddressSectionProps = {
  onEditPhoneNumberButtonClick: () => void;
  onEnablePhoneButtonClick: () => void;
  userProfileDetails: UserProfileInput;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  user?: Maybe<UserOutput | UserFragment>;
};

export type PhoneNumberSectionProps = {
  onEditEmailAddressButtonClick: () => void;
  onEnableEmailAddressButtonClick: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userProfileDetails: UserProfileInput;
  user?: Maybe<UserOutput | UserFragment>;
};

export type DeleteAccountModalProps = {
  cancelCallback: () => void;
};

export type EditPhoneNumberModalProps = {
  isEdit: boolean;
  onFailed: (type: string, data: Maybe<OtpResponseOutput | undefined>) => void;
  onSuccess: (
    type: string,
    data: Maybe<OtpResponseOutput | undefined>,
    onPhoneSuccess: string,
  ) => void;
  cancelCallback: () => void;
};

export type OtpModalProps = {
  errorMsg?: string;
  onVerifyFailed: (msg: string) => void;
  onVerifySuccess: (resp: string) => void;
  cancelCallback: () => void;
  phoneOrEmail: string;
  onEmailOrPhoneOtpFailed: (
    type: string,
    data: Maybe<OtpResponseOutput | undefined>,
  ) => void;
  onEmailOrPhoneOtpSuccess: (
    type: string,
    msg: Maybe<OtpResponseOutput | undefined>,
    email: string,
  ) => void;
  type: string;
};

export type EmailLoginFormInputs = {
  email: string;
};

export enum TypeEnum {
  phone = 'phone',
  email = 'email',
}

export type ModalType = 'create-password' | 'edit-password';
