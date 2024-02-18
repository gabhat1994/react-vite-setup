import React from 'react';
import { t } from 'i18next';

import { Spacer, Stack } from '@/layout';
import { type DropdownValueType } from '@/components/Dropdown';
import { type Country } from '@/components/PhoneInput/types';

import QuestionContainer from '../QuestionContainer';

interface Props {
  questionKey: string;
  answerOptions: DropdownValueType<string | Country>[];
  error: string | undefined;
  loading: boolean;
  onChooseAnswer: (a: string | undefined) => void;
  onFocus: () => void;
  bottomGutter?: boolean;
}

const QuestionAnswers: React.FC<Props> = ({
  questionKey,
  answerOptions,
  error,
  loading,
  onChooseAnswer,
  onFocus,
  bottomGutter,
}) => (
  <Stack fullWidth vertical key={questionKey}>
    <QuestionContainer
      questionKey={questionKey}
      description={t(
        `noumena.register.onboarding_questions.${questionKey}.description`,
      )}
      answerOptions={answerOptions}
      setAnswer={onChooseAnswer}
      error={!!error}
      isLoading={loading}
      helperText={error}
      onFocus={() => onFocus()}
    />
    {bottomGutter && <Spacer height={24} />}
  </Stack>
);

export default QuestionAnswers;
