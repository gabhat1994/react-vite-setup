import { type FC, Fragment, useContext } from 'react';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { TextField } from '@/components/TextField';
import { Spacer, Stack } from '@/layout';
import { Button } from '@/components/Button';
import { ModalFooter } from '@/components/ExtendedModal';
import { PaymentStateContext } from '@/features/TransactionModal/contexts/PaymentStateContext';
import { EStates, type PayeeFormvalues } from '../types';
import { ModalContent } from '../../../../styles';

interface PayeeFormProps {
  handleNext: (state: EStates) => void | null;
  handlePayeeChange: (val: PayeeFormvalues) => void;
}

const PayeeForm: FC<PayeeFormProps> = ({ handleNext, handlePayeeChange }) => {
  const { isMobile } = useContext(PaymentStateContext);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<PayeeFormvalues>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      routingNumber: '',
      accountNumber: '',
    },
  });

  const submit = (values: PayeeFormvalues) => {
    handlePayeeChange(values);
    handleNext(EStates.PAYEE_CONFRIM);
  };

  return (
    <Fragment>
      <form style={{ width: '100%' }} onSubmit={handleSubmit(submit)}>
        <ModalContent hasSingleButton>
          <Stack fullWidth vertical align="center" justify="center">
            <Spacer height={29} />
            <TextField
              {...register('name', {
                required: `${t('noumena.input.not_empty')}`,
              })}
              label={t('noumena.money.addPayee.payee.name.label')}
              value={getValues('name')}
              error={!!errors.name}
              helperText={errors.name?.message as string}
            />
            <Spacer height={16} />
            <TextField
              maxLength={9}
              hideLengthHelperText
              {...register('routingNumber', {
                required: `${t('noumena.input.not_empty')}`,
                pattern: {
                  value: /^[0-9]+[0-9]*$/,
                  message: t('noumena.money.payment.invalid.number'),
                },
                validate: {
                  checkLength: (v) =>
                    v?.length === 9 ||
                    'Routing number should be exact 9 characters',
                },
              })}
              label={t('noumena.money.addPayee.payee.routing_number.label')}
              value={getValues('routingNumber')}
              error={!!errors.routingNumber}
              helperText={errors.routingNumber?.message as string}
            />
            <Spacer height={16} />
            <TextField
              {...register('accountNumber', {
                required: `${t('noumena.input.not_empty')}`,
                pattern: {
                  value: /^[0-9]+[0-9]*$/,
                  message: t('noumena.money.payment.invalid.number'),
                },
                validate: {
                  checkLength: (v) =>
                    v?.length > 3 ||
                    'Account number should be 4 or more characters',
                },
              })}
              label={t('noumena.money.addPayee.payee.accounting_number.label')}
              value={getValues('accountNumber')}
              error={!!errors.accountNumber}
              helperText={errors.accountNumber?.message as string}
            />
          </Stack>
        </ModalContent>
        <ModalFooter flexDirection={isMobile ? 'column' : 'row'}>
          <Button
            data-testid="add-payee-outside-noumena"
            primary
            size="full"
            type="submit"
            disabled={!isDirty || !isValid}
          >
            {t('noumena.money.payment.add.payee')}
          </Button>
        </ModalFooter>
      </form>
    </Fragment>
  );
};

export default PayeeForm;
