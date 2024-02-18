import { type FC, useEffect } from 'react';
import { useFormContext, type ValidateResult } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Stack } from '@/layout';
import { TextField } from '@/components/TextField';
import {
  ADDRESS_REGEX,
  VALID_STATE_REGEX,
  VALID_TEXT_REGEX,
} from '@/constants/regex';
import { type AddressFormProps } from './types';

const AddressForm: FC<AddressFormProps> = ({ selectdAddress }) => {
  const { t } = useTranslation();
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    setValue(
      'street',
      `${selectdAddress ? selectdAddress.split(',')[0] : ''}`,
      { shouldValidate: true },
    );
    setValue(
      'apartment',
      `${selectdAddress ? selectdAddress.split(',')[1] : ''}`,
    );
    setValue('city', `${selectdAddress ? selectdAddress.split(',')[2] : ''}`, {
      shouldValidate: true,
    });
    setValue('state', `${selectdAddress ? selectdAddress.split(',')[3] : ''}`, {
      shouldValidate: true,
    });
    setValue(
      'postalCode',
      `${selectdAddress ? selectdAddress.split(',')[4] : ''}`,
      { shouldValidate: true },
    );
  }, [selectdAddress, setValue]);

  const validatePostalCode = (v: string): ValidateResult => {
    if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(v)) {
      return true;
    }
    return 'Enter valid zip code';
  };

  return (
    <Stack fullWidth vertical gap={16} data-testid="address-form">
      <TextField
        {...register('street', {
          required: { value: true, message: t(`noumena.input.not_empty`) },
          validate: {
            isNotIncludesSpecialCharacters: (v) =>
              ADDRESS_REGEX.test(v) || 'Special characters are not allowed',
          },
        })}
        data-testid="step-two-street"
        label={t('noumena.money.setupWallet.address.street')}
        value={getValues('street')}
        error={!!errors.street}
        helperText={errors.street?.message as undefined}
      />
      <TextField
        {...register('apartment', {
          validate: {
            isNotIncludesSpecialCharacters: (v) =>
              ADDRESS_REGEX.test(v) ||
              v.length === 0 ||
              'Special characters are not allowed',
          },
        })}
        error={!!errors.apartment}
        data-testid="step-one-apartment"
        label={t('noumena.money.setupWallet.address.apartment_optional')}
        value={getValues('apartment')}
        helperText={errors.apartment?.message as undefined}
      />
      <TextField
        {...register('city', {
          required: { value: true, message: t(`noumena.input.not_empty`) },
          validate: {
            isValidText: (v) => VALID_TEXT_REGEX.test(v) || 'Invalid input',
          },
        })}
        data-testid="step-one-city"
        label={t('noumena.money.setupWallet.address.city')}
        value={getValues('city')}
        error={!!errors.city}
        helperText={errors.city?.message as undefined}
      />
      <Stack fullWidth gap={16}>
        <TextField
          {...register('state', {
            required: { value: true, message: t(`noumena.input.not_empty`) },
            validate: {
              isValidState: (v) =>
                VALID_STATE_REGEX.test(v) ||
                'State must be a 2-letter abbreviation',
            },
          })}
          data-testid="step-one-state"
          label={t('noumena.money.setupWallet.address.state')}
          value={getValues('state')}
          error={!!errors.state}
          helperText={errors.state?.message as undefined}
        />
        <TextField
          {...register('postalCode', {
            required: { value: true, message: t(`noumena.input.not_empty`) },
            validate: {
              // isGreaterThanZero: (v) => v > 0 || 'Enter valid zip code',
              // isNonDecimal: (v) => !v.includes('.') || 'Enter valid zip code',
              isValidPostalCode: (v) => validatePostalCode(v),
            },
          })}
          // type="number"
          data-testid="step-one-zip-code"
          label={t('noumena.money.setupWallet.address.zip_code')}
          value={getValues('postalCode')}
          error={!!errors.postalCode}
          helperText={errors.postalCode?.message as undefined}
        />
      </Stack>
    </Stack>
  );
};

export default AddressForm;
