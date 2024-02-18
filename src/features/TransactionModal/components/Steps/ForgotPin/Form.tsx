import { t } from 'i18next';
import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useCallback,
  useContext,
  Fragment,
} from 'react';
import { useForm } from 'react-hook-form';
import { TSpan } from '@/components/Typography';
import { Spacer, Stack } from '@/layout';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/Button';
import { ModalFooter, ModalHeader } from '@/components/ExtendedModal';
import { PaymentStateContext } from '@/features/TransactionModal/contexts/PaymentStateContext';
import { type QuestionOutput } from '@/apollo/generated/types';
import { ModalContent } from '../../styles';
import { InternalStates, type TPayLoad } from './type';
import { prepareData } from './helper';

interface FormProps {
  securityQuestions: QuestionOutput[];
  setPaylod: Dispatch<SetStateAction<TPayLoad>>;
  onChangeState: (_state: InternalStates) => void;
  resetSecurityQuestions: boolean | null | undefined;
}

interface FormValue {
  answers: { answer: string }[];
}

const Form: FC<FormProps> = ({
  securityQuestions,
  setPaylod,
  onChangeState,
  resetSecurityQuestions,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm<FormValue>({
    mode: 'onChange',
    defaultValues: {
      answers: resetSecurityQuestions
        ? [{ answer: '' }, { answer: '' }, { answer: '' }]
        : [{ answer: '' }],
    },
  });
  const { isMobile } = useContext(PaymentStateContext);

  const submit = useCallback(
    (data: FormValue) => {
      if (data.answers) {
        setPaylod((prv) => ({
          ...prv,
          securityQuestion: prepareData(securityQuestions, data.answers),
        }));
        onChangeState(InternalStates.RESET_PIN_NEW_PIN);
      }
    },
    [setPaylod, onChangeState, securityQuestions],
  );

  return (
    <Fragment>
      <ModalHeader>{t('noumena.money.forgotpin.form.heading')}</ModalHeader>
      <form style={{ width: '100%' }} onSubmit={handleSubmit(submit)}>
        <ModalContent hasSingleButton>
          <Stack vertical fullWidth align="center" justify="center">
            <TSpan font="body-l" colorToken="--text-modal-neutral-default">
              {t('noumena.reset.transaction.pin.helper.text')}
            </TSpan>
            <Spacer height={31} />
            {securityQuestions.length > 0 &&
              securityQuestions.map((securityQuestion, index) => (
                <Stack fullWidth vertical>
                  <TSpan
                    font="body-l"
                    colorToken="--text-modal-neutral-highlighted"
                  >
                    {securityQuestion.question}
                  </TSpan>
                  <Spacer height={16} />
                  <TextField
                    {...register(`answers.${index}.answer`, {
                      required: {
                        value: true,
                        message: t(`noumena.input.not_empty`),
                      },
                    })}
                    key={securityQuestion.id}
                    label={t(
                      'noumena.money.setupWallet.security_question.answer_text_field.label',
                    )}
                    value={getValues(`answers.${index}.answer`)}
                    error={
                      !!(errors?.answers && errors?.answers[index]?.answer)
                    }
                    helperText={
                      errors?.answers && errors?.answers[index]?.answer?.message
                    }
                  />
                  <Spacer height={16} />
                </Stack>
              ))}
            <TSpan font="body-m" colorToken="--link-modal-neutral-highlighted">
              {`${t('noumena.reset.transaction.pin.helper.note')} `}
              <TSpan
                font="link-m"
                colorToken="--link-modal-neutral-highlighted"
              >{`${t('noumena.support')}`}</TSpan>
            </TSpan>
          </Stack>
          <Spacer height={16} />
        </ModalContent>
        <ModalFooter isFullScreen={isMobile}>
          <Button
            primary
            size="full"
            type="submit"
            disabled={!isDirty || !isValid}
          >
            {t('noumena.continue')}
          </Button>
        </ModalFooter>
      </form>
    </Fragment>
  );
};

export default Form;
