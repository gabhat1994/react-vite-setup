import { type Maybe } from '@/apollo/generated/types';
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from 'react';
import { type RiseApplicationStepTranslationKey } from '../types';

export const RiseApplicationContext = createContext<{
  status?: string | null;
  applicationId?: string;
  noOfEssays: number;
  enableApplicationSubmission: boolean;
  isClassDeleted: boolean;
  essayQuestionAnswered: boolean;
  canSubmit: boolean;
  refresh: () => void;
  identityCompletion: boolean;
  setCanSubmit: (value: boolean) => void;
  resultJson?: Maybe<JSON>;
  isStepCompleted: (step: RiseApplicationStepTranslationKey) => boolean;
  checked: {
    principlesYou: boolean;
    essays: boolean;
  };
  setChecked: Dispatch<
    SetStateAction<{
      principlesYou: boolean;
      essays: boolean;
    }>
  >;
}>({
  status: undefined,
  applicationId: undefined,
  enableApplicationSubmission: false,
  identityCompletion: false,
  noOfEssays: 0,
  isClassDeleted: false,
  essayQuestionAnswered: false,
  refresh: () => null,
  isStepCompleted: () => false,
  checked: {
    principlesYou: false,
    essays: false,
  },
  setChecked: () => {},
  canSubmit: false,
  setCanSubmit: () => null,
  resultJson: undefined,
});

export function useRiseApplicationContext() {
  return useContext(RiseApplicationContext);
}
