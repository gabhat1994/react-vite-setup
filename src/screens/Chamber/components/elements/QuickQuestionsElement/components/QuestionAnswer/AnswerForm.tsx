import { Icon } from '@/components/Icon';
import { TextArea } from '@/components/TextArea';
import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ButtonUtils } from '@/components/Button/utils';
import { useAddAnswerHelper } from '../../hooks/useAddAnswerHelper';
import { SendButton, StyledForm, StyledTextArea, SubConatiner } from './styles';
import { type QuestionSchema } from './types';

const elementSchema = yup
  .object({
    answer: yup.string().required().max(600),
  })
  .required();

type AnswerFormProps = {
  questionId: string;
  disabled?: boolean;
  onRefetch?: () => Promise<void>;
};

export const AnswerForm: React.FC<AnswerFormProps> = ({
  questionId,
  disabled,
  onRefetch,
}) => {
  const {
    handleSubmit,
    watch,
    control,
    formState: { isValid },
  } = useForm<QuestionSchema>({
    resolver: yupResolver(elementSchema),
    mode: 'all',
    reValidateMode: 'onSubmit',
    defaultValues: {
      answer: '',
    },
  });

  const answer = watch('answer');

  const { addAnswer, loading } = useAddAnswerHelper({
    questionId,
    onSuccess: onRefetch,
  });

  const onSubmit = (values: QuestionSchema) => {
    addAnswer(values.answer);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} disabled={!isValid}>
      <SubConatiner fullWidth align="center" gap={8}>
        <StyledTextArea value={answer}>
          <Controller<QuestionSchema, 'answer'>
            name="answer"
            control={control}
            render={({ field: { ...fieldProps } }) => (
              <TextArea
                data-testid="tTextArea"
                autoResize
                disabled={disabled}
                resize={false}
                maxLength={600}
                maxLengthPosition="end"
                showMaxLengthText={false}
                label={t('noumena.quick_questions.type_your_answer')}
                {...fieldProps}
              />
            )}
          />
        </StyledTextArea>
        <SendButton
          data-testid="tSendButton"
          type="submit"
          neutral
          size="small"
          {...ButtonUtils.getTooltipProps({
            message: t('noumena.quick_questions.answser.no_permission'),
            visible: disabled,
            position: 'top-center',
          })}
          disabled={disabled || !isValid}
          loading={loading}
        >
          <Icon
            name="send_m"
            size={24}
            color={
              isValid
                ? '--icon-button-brand-secondary-default'
                : '--icon-button-neutral-disabled'
            }
          />
        </SendButton>
      </SubConatiner>
    </StyledForm>
  );
};
