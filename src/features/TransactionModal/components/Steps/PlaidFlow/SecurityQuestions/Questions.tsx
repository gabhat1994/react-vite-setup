import { useCallback, useContext, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { t } from 'i18next';
import generate from 'uniqid';
import { Dropdown, type DropdownValueType } from '@/components/Dropdown';
import { TSpan } from '@/components/Typography';
import { TextField } from '@/components/TextField';
import { Spacer, Stack } from '@/layout';
import { AddressRightIcon } from './style';
import { type FormValues, type TQuestions, SecurityQuestionContext } from './types';

const Questions = () => {
  const [open, setOpen] = useState(false);
  const { securityQuestions, questionsArray, setSecurityQuestions } =
    useContext(SecurityQuestionContext);
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<FormValues>();

  const generateDropDownItems = (
    val: TQuestions[] | undefined,
  ): DropdownValueType<TQuestions>[] =>
    val?.map((ques) => ({
      key: generate(),
      label: (
        <Stack>
          <TSpan
            font="input-s"
            colorToken="--text-tablecell-header-neutral-highlighted"
            data-testid="country-options"
          >
            <div style={{ padding: '0 4px' }}>{ques.question}</div>
          </TSpan>
        </Stack>
      ),
      type: 'value',
      value: ques,
    })) || [];
  const generatedQuestions: DropdownValueType<TQuestions>[] = useMemo(
    () => generateDropDownItems(questionsArray),
    [questionsArray],
  );

  const getDropDownQuestions = useCallback(
    (selectedQuestionOne: TQuestions, selectedQuestionTwo: TQuestions) => {
      if (!selectedQuestionOne.id && !selectedQuestionTwo.id)
        return generatedQuestions;
      const filteredSecondQuestionArray = questionsArray?.filter(
        (que) =>
          que.id !== selectedQuestionOne.id &&
          que.id !== selectedQuestionTwo.id,
      );
      return generateDropDownItems(filteredSecondQuestionArray);
    },
    [questionsArray, generatedQuestions],
  );

  return (
    <form style={{ width: '100%' }}>
      <Dropdown
        hideIcons
        usePortal={false}
        usePopStyle={true}
        isAnimation={false}
        containerWidth="443px"
        options={getDropDownQuestions(
          securityQuestions.questionSecond,
          securityQuestions.questionThird,
        )}
        placement="bottom-start"
        onSelectOption={(option) => {
          if (setSecurityQuestions) {
            setSecurityQuestions((prv) => ({
              ...prv,
              questionOne: option.value,
            }));
          }
        }}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        {({ inputProps, inputRef, toggle }) => (
          <TextField
            readOnly
            style={{ cursor: 'pointer' }}
            data-testid="step-five-security-question-input-one-read-only"
            label={t(
              'noumena.money.setupWallet.security_question.text_field.label',
            )}
            {...inputProps}
            ref={inputRef}
            value={securityQuestions.questionOne.question}
            rightIcon={
              <AddressRightIcon
                name="chevron_down_m"
                isOpen={open}
                size={16}
                onClick={toggle}
                color="--icon-input-neutral-default"
                data-testid="styledAddressDownArrow-one"
              />
            }
          />
        )}
      </Dropdown>
      <Spacer height={8} />
      <TextField
        disabled={!securityQuestions.questionOne.id}
        {...register('answerOne', {
          required: { value: true, message: t(`noumena.input.not_empty`) },
        })}
        style={{ cursor: 'pointer' }}
        data-testid="step-five-answer-question-one"
        label={t(
          'noumena.money.setupWallet.security_question.answer_text_field.label',
        )}
        value={getValues('answerOne')}
        error={!!errors.answerOne}
        helperText={errors?.answerOne?.message}
      />
      <Spacer height={16} />
      <Dropdown
        hideIcons
        containerWidth="443px"
        usePortal={false}
        usePopStyle={true}
        isAnimation={false}
        options={getDropDownQuestions(
          securityQuestions.questionOne,
          securityQuestions.questionThird,
        )}
        placement="bottom-start"
        onSelectOption={(option) => {
          if (setSecurityQuestions) {
            setSecurityQuestions((prv) => ({
              ...prv,
              questionSecond: option.value,
            }));
          }
        }}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        {({ inputProps, inputRef, toggle }) => (
          <TextField
            readOnly
            style={{ cursor: 'pointer' }}
            data-testid="step-five-security-question-input-two-read-only"
            label={t(
              'noumena.money.setupWallet.security_question.text_field.label1',
            )}
            {...inputProps}
            ref={inputRef}
            value={securityQuestions.questionSecond.question}
            rightIcon={
              <AddressRightIcon
                name="chevron_down_m"
                isOpen={open}
                size={16}
                onClick={toggle}
                color="--icon-input-neutral-default"
                data-testid="styledAddressDownArrow-two"
              />
            }
          />
        )}
      </Dropdown>
      <Spacer height={8} />
      <TextField
        disabled={!securityQuestions.questionSecond.id}
        {...register('answerSecond', {
          required: { value: true, message: t(`noumena.input.not_empty`) },
        })}
        style={{ cursor: 'pointer' }}
        data-testid="step-five-answer-question-two"
        label={t(
          'noumena.money.setupWallet.security_question.answer_text_field.label',
        )}
        value={getValues('answerSecond')}
        error={!!errors.answerSecond}
        helperText={errors.answerSecond?.message}
      />
      <Spacer height={16} />
      <Dropdown
        hideIcons
        usePortal={false}
        usePopStyle={true}
        isAnimation={false}
        containerWidth="443px"
        options={getDropDownQuestions(
          securityQuestions.questionOne,
          securityQuestions.questionSecond,
        )}
        placement="bottom-start"
        dropdownItemStyle={{
          fontWeight: '400',
          fontSize: '14px',
          color: 'black',
        }}
        onSelectOption={(option) => {
          if (setSecurityQuestions) {
            setSecurityQuestions((prv) => ({
              ...prv,
              questionThird: option.value,
            }));
          }
        }}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        {({ inputProps, inputRef, toggle }) => (
          <TextField
            readOnly
            style={{ cursor: 'pointer' }}
            data-testid="step-five-security-question-input-three-read-only"
            label={t(
              'noumena.money.setupWallet.security_question.text_field.label2',
            )}
            {...inputProps}
            ref={inputRef}
            value={securityQuestions.questionThird.question}
            rightIcon={
              <AddressRightIcon
                name="chevron_down_m"
                isOpen={open}
                size={16}
                onClick={toggle}
                color="--icon-input-neutral-default"
                data-testid="styledAddressDownArrow-three"
              />
            }
          />
        )}
      </Dropdown>
      <Spacer height={8} />
      <TextField
        disabled={!securityQuestions.questionThird.id}
        {...register('answerThree', {
          required: { value: true, message: t(`noumena.input.not_empty`) },
        })}
        style={{ cursor: 'pointer' }}
        data-testid="step-five-answer-question-three"
        label={t(
          'noumena.money.setupWallet.security_question.answer_text_field.label',
        )}
        value={getValues('answerThree')}
        error={!!errors.answerThree}
        helperText={errors.answerThree?.message}
      />
    </form>
  );
};

export default Questions;
