import { useEffect, useState } from 'react';
import { useError } from '@/hooks/useError';
import {
  useAllowPassCodeResetQuery,
  useGetSecurityQuestionsResetLazyQuery,
} from '@/apollo/graphql';
import { type QuestionOutput } from '@/apollo/generated/types';

export function useResetSecurityQuestions() {
  const [resetSecurityQuestions, setResetSecurityQuestions] = useState<
    boolean | null | undefined
  >();
  const [questions, setQuestions] = useState<QuestionOutput[]>([]);
  const { logError } = useError();

  const [getSecurityQuestions] = useGetSecurityQuestionsResetLazyQuery({
    fetchPolicy: 'cache-and-network',
    onError: (error) => {
      logError(error, 'GetSecurityQUestions');
    },
    onCompleted: ({ getSecurityQuestionsForReset }) => {
      if (resetSecurityQuestions) {
        setQuestions(getSecurityQuestionsForReset);
      } else {
        const randomIndex = Math.floor(Math.random() * 3);
        setQuestions([
          {
            id: getSecurityQuestionsForReset[randomIndex].id,
            question: getSecurityQuestionsForReset[randomIndex].question,
          },
        ]);
      }
    },
  });

  const { data, error } = useAllowPassCodeResetQuery({
    variables: {},
    onError: () => {
      logError(error, 'allowPassCodeReset');
    },
  });

  useEffect(() => {
    setResetSecurityQuestions(data?.allowPassCodeReset?.allowReset);
    if (typeof data?.allowPassCodeReset?.allowReset === 'boolean') {
      getSecurityQuestions();
    }
  }, [data, getSecurityQuestions]);

  return { resetSecurityQuestions, questions };
}

export default useResetSecurityQuestions;
