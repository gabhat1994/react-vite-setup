import {
  type LogsOutput,
  type UserSelectedQuestionAndAnswersOutputObject,
} from '@/apollo/generated/types';
import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from 'react';

import { type Maybe } from '@/common/types';
import { type EmailSubscriptionType } from '@/screens/CoreSettings/NotificationsSettings/types';
import { type UserFragment } from '@/apollo/graphql/fragments';
import { type AuthData, type LocalAuthCredential } from './types';

export const defaultAuthContextState = {
  loading: true,
  user: null,
  masterId: '',
  isActive: false,
  isPending: false,
  isAcceptedSkipMediaTesting: false,
  isUnregistered: false,
  signIn: () => {},
  signUp: () => {},
  signOut: async () => {},
  setAuthData: () => {},
  updateUserStatus: () => {},
  onSetAcceptedSkipMediaTesting: () => {},
  refetchUserData: async () => {},
  initialNoumId: undefined,
  setInitialNoumId: () => {},
  setInitialInvoiceId: () => {},
  initialInvoiceId: undefined,
  setInitialContractId: () => {},
  initialContractId: undefined,
  setInitialSowId: () => {},
  initialSowId: undefined,
  setIsLoadingAnswers: () => {},
  isLoadingAnswers: false,
  onboardingAnswers: undefined,
  isUnauthenticated: false,
  isOpsUser: false,
  setIsOpsUser: () => {},
  initialUnsubscribeFrom: undefined,
  currentUserLoading: false,
  updateUserAdditionalInformation: () => {},
};

interface AuthContextValues {
  loading: boolean;
  user: Maybe<UserFragment>;
  masterId: string;
  isActive: boolean;
  isPending: boolean;
  isUnregistered: boolean;
  isUnauthenticated: boolean;
  isAcceptedSkipMediaTesting: boolean;
  signIn: (
    arg: LocalAuthCredential,
    utmParams?: Record<string, string>,
  ) => void;
  setAuthData: (arg: AuthData) => void;
  signUp: () => void;
  signOut: () => Promise<void>;
  updateUserStatus: (userStatus: string) => void;
  refetchUserData: () => Promise<void>;
  initialInvoiceId?: string;
  setInitialInvoiceId: (invoiceId?: string) => void;
  initialContractId?: string;
  setInitialContractId: (contractId?: string) => void;
  initialSowId?: string;
  updateUserAdditionalInformation: (metaData: LogsOutput[]) => void;
  setInitialSowId: (sowId?: string) => void;
  initialNoumId: number | undefined;
  setInitialNoumId: Dispatch<SetStateAction<number | undefined>>;
  onSetAcceptedSkipMediaTesting: (isAccepted?: boolean) => void;
  setIsLoadingAnswers: Dispatch<SetStateAction<boolean>>;
  isLoadingAnswers?: boolean;
  onboardingAnswers?: Maybe<UserSelectedQuestionAndAnswersOutputObject>;
  isOpsUser: boolean;
  setIsOpsUser: (value: boolean) => void;
  initialUnsubscribeFrom?: EmailSubscriptionType;
  currentUserLoading?: boolean;
}

export const AuthContext = createContext<AuthContextValues>(
  defaultAuthContextState,
);

export const useAuth = () => useContext(AuthContext);
