import { useCallback } from 'react';
import { t } from 'i18next';
import {
  useGetOnboardingQuestionAndAnswersQuery,
  useGetUserSubmittedOnboardingQuestionsAndAnswersLazyQuery,
  useSubmitOnboardingQuestionnaireMutation,
  useUpdateUserSkillsMutation,
} from '@/apollo/graphql';
import { useToast } from '@/hooks';
import { setLocalStorage } from '@/utils/localStorage';
import onboardingStatusLocalStorage from '@/constants/onboardingStatusLocalStorage';

export const useOnboardingQuestions = () => {
  const { addToast } = useToast();
  const { data, loading, error } = useGetOnboardingQuestionAndAnswersQuery();
  const [submitOnboardingQuestionnaireMutation, { loading: submitting }] =
    useSubmitOnboardingQuestionnaireMutation();
  const [updateUserSkills] = useUpdateUserSkillsMutation();

  const handleError = useCallback(
    (networkError: String | Error | null) => {
      addToast(
        'error',
        'none',
        `${t('noumena.toast_error.text')}: ${networkError}`,
      );
    },
    [addToast],
  );

  const [getAnsweredQuestions, { loading: getAnswerLoading }] =
    useGetUserSubmittedOnboardingQuestionsAndAnswersLazyQuery({
      onCompleted(resp) {
        if (resp) {
          const { getUserSubmittedOnboardingQuestionsAndAnswers: answers } =
            resp;
          setLocalStorage(
            onboardingStatusLocalStorage.ONBOARDING_COMPLETE_STATUS,
            answers,
          );
        }
      },
    });

  const handleSubmitOnboardingAnswer = useCallback(
    async (answers, skillId) => {
      const { data: res } = await submitOnboardingQuestionnaireMutation({
        variables: { input: answers },
        onCompleted: () => {},
        onError: ({ networkError = null, graphQLErrors = [] }) => {
          const [err] = graphQLErrors;
          handleError(err?.message ?? networkError);
        },
      });
      if (skillId) {
        await updateUserSkills({
          variables: { input: [skillId] },
        });
      }
      await getAnsweredQuestions();
      return res?.submitOnboardingQuestionnaire?.userStatus;
    },
    [
      handleError,
      submitOnboardingQuestionnaireMutation,
      getAnsweredQuestions,
      updateUserSkills,
    ],
  );

  return {
    questions: data?.getOnboardingQuestionAndAnswers?.data || [],
    loading: loading || getAnswerLoading,
    error,
    handleSubmitOnboardingAnswer,
    submitting,
  };
};

export default useOnboardingQuestions;
