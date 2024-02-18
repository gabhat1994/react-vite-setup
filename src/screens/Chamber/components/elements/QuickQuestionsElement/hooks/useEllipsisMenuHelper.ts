import { useMemo, useCallback } from 'react';
import * as Sentry from '@sentry/react';
import { t } from 'i18next';
import { useToast } from '@/hooks';
import {
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
} from '@/apollo/graphql';
import { type QuestionModalProps } from '../modals/QuestionModal/types';

export const useEllipsisMenuHelper = ({
  questionId,
  isClosedModal,
  onClose,
  refetch,
}: QuestionModalProps) => {
  const { addToast } = useToast();

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

  const handleSuccess = useCallback(() => {
    addToast(
      'primary',
      'none',
      isClosedModal
        ? t('noumena.quick_questions.modal.close_success')
        : t('noumena.quick_questions.modal.delete_success'),
    );
    if (refetch) {
      refetch();
    }
    if (onClose) {
      onClose();
    }
  }, [addToast, isClosedModal, onClose, refetch]);

  const [deleteQuestionMutation, { loading: loadingDelete }] =
    useDeleteQuestionMutation();
  const [closeQuestionMutation, { loading: loadingUpdate }] =
    useUpdateQuestionMutation();

  const loading = useMemo(
    () => loadingDelete || loadingUpdate,
    [loadingDelete, loadingUpdate],
  );

  const deleteQuestion = useCallback(async () => {
    await deleteQuestionMutation({
      variables: { questionId },
      onError: ({ networkError = null, graphQLErrors = [] }) => {
        const [err] = graphQLErrors;
        handleError(err?.message ?? networkError);
        Sentry.captureException(new Error(err?.message ?? networkError), {
          tags: {
            section: 'deleteQuestionMutation',
          },
        });
      },
      onCompleted: handleSuccess,
    });
  }, [deleteQuestionMutation, handleError, handleSuccess, questionId]);

  const closeQuestion = useCallback(async () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    await closeQuestionMutation({
      variables: {
        questionId,
        input: {
          expiryDate: date.toDateString(),
        },
      },
      onError: ({ networkError = null, graphQLErrors = [] }) => {
        const [err] = graphQLErrors;
        handleError(err?.message ?? networkError);
        Sentry.captureException(new Error(err?.message ?? networkError), {
          tags: {
            section: 'updateQuestionMutation',
          },
        });
      },
      onCompleted: handleSuccess,
    });
  }, [closeQuestionMutation, handleError, handleSuccess, questionId]);

  return { loading, deleteQuestion, closeQuestion };
};
