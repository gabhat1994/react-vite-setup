import { useAddAnswerMutation } from '@/apollo/graphql';
import { useToast } from '@/hooks';
import * as Sentry from '@sentry/react';
import { t } from 'i18next';
import { useCallback } from 'react';

interface UseAddAnswerHelperOptions {
  questionId: string;
  onSuccess?: () => Promise<void>;
}

export const useAddAnswerHelper = ({
  questionId,
  onSuccess,
}: UseAddAnswerHelperOptions) => {
  const { addToast } = useToast();

  const [addAnswerMutation, { loading }] = useAddAnswerMutation();

  const addAnswer = useCallback(
    async (answerBody: string) => {
      await addAnswerMutation({
        variables: { questionId, answerBody },
        onError: ({ networkError = null, graphQLErrors = [] }) => {
          const [err] = graphQLErrors;

          addToast(
            'error',
            'none',
            `${t('noumena.toast_error.text')}: ${err?.message ?? networkError}`,
          );
          Sentry.captureException(new Error(err?.message ?? networkError), {
            tags: {
              section: 'deleteQuestionMutation',
            },
          });
        },
        onCompleted: () => {
          addToast(
            'success',
            'none',
            t('noumena.chamber.quick_question.answer_published'),
          );
          onSuccess?.();
        },
      });
    },
    [addAnswerMutation, addToast, questionId, onSuccess],
  );

  return { loading, addAnswer };
};
