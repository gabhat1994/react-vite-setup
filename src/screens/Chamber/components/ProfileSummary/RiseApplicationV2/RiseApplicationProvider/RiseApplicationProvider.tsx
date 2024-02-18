import { useGetNoumClassByNoumIdQuery } from '@/apollo/graphql';
import { useRiseQuestions } from '@/features/noums/hooks/spaceQuery';
import { type FC, type ReactNode, useMemo, useCallback, useState } from 'react';
import { SpaceUtils } from '@/utils/space';
import { RiseApplicationStepTranslationKey, type TResultJson } from '../types';
import { useNoumContext } from '../../../../ViewChamber/ChamberProvider';
import { RiseApplicationContext } from './context';

export const RiseApplicationProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { space } = useNoumContext();
  const [canSubmit, setCanSubmit] = useState(false);
  const [checked, setChecked] = useState<{
    principlesYou: boolean;
    essays: boolean;
  }>({
    principlesYou: false,
    essays: false,
  });

  const {
    applicationId,
    resultJson,
    refetch,
    status,
    questions,
    parentNoumId,
  } = useRiseQuestions(space?._id);

  const { data } = useGetNoumClassByNoumIdQuery({
    skip: !parentNoumId || !SpaceUtils.isRiseApplicationNoum(space),
    variables: {
      noumId: parentNoumId!,
    },
  });

  const {
    businessFinancialProjectionStatus,
    BusinessPlanStatus,
    identityStatus,
    nativeStatus,
    financialCreditStatus,
    financialCashflowStatus,
    principleYouStatus,
  } = (resultJson || {}) as TResultJson;

  const identityCompletion = identityStatus === 'SUBMITTED';
  const nativeCompletion = nativeStatus === 'SUBMITTED';
  const financialCompletion =
    financialCashflowStatus === 'SUBMITTED' &&
    financialCreditStatus === 'SUBMITTED';
  const businessCompletion =
    businessFinancialProjectionStatus === 'SUBMITTED' &&
    BusinessPlanStatus === 'SUBMITTED';
  const principlesYouCompletion = principleYouStatus === 'SUBMITTED';

  const riseFormCompletion =
    identityCompletion &&
    nativeCompletion &&
    financialCompletion &&
    businessCompletion;

  const enableApplicationSubmission =
    riseFormCompletion && principlesYouCompletion && checked.essays;

  const noOfEssays = questions?.length ?? 0;

  const isClassDeleted = data?.getNoumClassByNoumId?.isDeleted ?? false;

  const essayQuestionAnswered = useMemo(
    () =>
      (questions || []).some((essayKey) => {
        const answer = String(resultJson?.[essayKey?.id as keyof JSON] || '');
        const cleanAnswer =
          (answer && answer?.replace(/(<([^>]+)>)/gi, '')) || '';
        return cleanAnswer.length < 200;
      }),
    [questions, resultJson],
  );

  const isStepCompleted = useCallback(
    (step: RiseApplicationStepTranslationKey): boolean => {
      switch (step) {
        case RiseApplicationStepTranslationKey.IDENTITY:
          return identityCompletion;
        case RiseApplicationStepTranslationKey.NATIVE:
          return nativeCompletion;
        case RiseApplicationStepTranslationKey.FINANCIAL:
          return financialCompletion;
        case RiseApplicationStepTranslationKey.BUSINESS:
          return businessCompletion;
        case RiseApplicationStepTranslationKey.PRINCIPLES_YOU:
          return principlesYouCompletion;
        default:
          return false;
      }
    },
    [
      businessCompletion,
      financialCompletion,
      identityCompletion,
      nativeCompletion,
      principlesYouCompletion,
    ],
  );

  const value = useMemo(
    () => ({
      applicationId,
      status,
      noOfEssays,
      isClassDeleted,
      essayQuestionAnswered,
      refresh: refetch,
      isStepCompleted,
      checked,
      setChecked,
      enableApplicationSubmission,
      canSubmit,
      setCanSubmit,
      resultJson,
      identityCompletion,
    }),
    [
      applicationId,
      essayQuestionAnswered,
      isClassDeleted,
      noOfEssays,
      refetch,
      status,
      isStepCompleted,
      checked,
      setChecked,
      enableApplicationSubmission,
      canSubmit,
      setCanSubmit,
      resultJson,
      identityCompletion,
    ],
  );

  return (
    <RiseApplicationContext.Provider value={value}>
      {children}
    </RiseApplicationContext.Provider>
  );
};

export default RiseApplicationProvider;
