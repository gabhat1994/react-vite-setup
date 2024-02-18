import { t } from 'i18next';
import * as Sentry from '@sentry/react';
import { useCreateQuestionMutation } from '@/apollo/graphql';
import { useToast } from '@/hooks';
import { convertDateToUtcNoon } from '@/utils/date';
import { type EditElementSchema } from './types';

type UseAddQuestionHelperOptions = {
  refetch?: () => void;
  onSuccess: () => void;
};

export function useAddQuestionHelper({
  onSuccess,
}: UseAddQuestionHelperOptions) {
  const { addToast } = useToast();

  const [createQuestion, { loading }] = useCreateQuestionMutation();

  const handleSaveChanges = async (
    noumId: string,
    values: EditElementSchema,
  ) => {
    const convertedDate = convertDateToUtcNoon(new Date(values.date));

    await createQuestion({
      variables: {
        input: {
          body: values.question,
          spaceId: noumId,
          questionImage: values.url,
          expiryDate: convertedDate?.toISOString(),
        },
      },
      onError: ({ networkError = null, graphQLErrors = [] }) => {
        const [err] = graphQLErrors;
        const error = t('noumena.toast_error.text');
        const errorMessage = err?.message
          ? `${error}: ${err?.message}`
          : `${error}: ${networkError}`;

        addToast('error', 'none', `${errorMessage}`);

        Sentry.captureException(new Error(err?.message ?? networkError), {
          tags: {
            section: 'createQuestionMutation',
          },
        });
      },
      onCompleted: () => {
        addToast(
          'success',
          'none',
          `${t('noumena.chamber_edit.add_question.question_saved')}`,
        );
        onSuccess();
      },
    });
  };

  return {
    loading,
    handleSaveChanges,
  };
}
