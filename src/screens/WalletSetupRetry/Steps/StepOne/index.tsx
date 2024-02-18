import { type FC, useContext } from 'react';
import { type SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { dateAtTime } from '@/utils/date';
import {
  useUpdateUserKycMutation,
  useUpdateUserProfileMutation,
} from '@/apollo/graphql';
import { Spacer } from '@/layout';
import { TextField } from '@/components/TextField';
import { MaskedDatePicker } from '@/components/DatePicker/MaskedDatepicker/MaskedDatePicker';
import countries from '@/assets/json/countries.json';
import CountryPicker from '@/components/CounteryPicker/CountryPicker';
import { Button } from '@/components/Button';
import { DeviceTypeEnum, useDeviceType, useError, useToast } from '@/hooks';
import { FormText, FormHelperText, FormWrapper, Note } from '../styles';
import { type FormValues } from './types';
import { SetupWalletContext } from '../../context';
import { calculateAge } from './helper';
import userDetailsInputSchema from './data';

const FormPersonalInformation: FC = () => {
  const logger = useError();
  const deviceType = useDeviceType();
  const { addErrorToast } = useToast();
  const { t } = useTranslation();
  const { handleNextStep, currentUser, setPayLoad } =
    useContext(SetupWalletContext);

  const [updateUserProfileMutation, { loading: profileLoading }] =
    useUpdateUserProfileMutation({
      onError: (error) => {
        logger.logError(
          error,
          'updateUserProfileSetupWallet-wallet-retry',
          true,
        );
      },
    });
  const [updateUserKycMutation, { loading: kycLoading }] =
    useUpdateUserKycMutation({
      onError: (error) => {
        logger.logError(error, 'updateUserKycSetupWallet-wallet-retry', true);
      },
    });

  const {
    getValues,
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(userDetailsInputSchema),
    defaultValues: {
      firstName: currentUser.firstName || '',
      lastName: currentUser.lastName || '',
      dateOfBirth: currentUser.dateOfBirth
        ? new Date(currentUser.dateOfBirth)
        : undefined,
      citizenship: currentUser.citizenship || 'us',
      ssn: currentUser.ssn || '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (_values) => {
    const { firstName, lastName, ssn, dateOfBirth, citizenship } = _values;
    const date = dateAtTime(dateOfBirth!.toDateString())
      .split(' ')[0]
      .split('/');

    if (
      calculateAge(`${date[2]}-${date[0]}-${date[1]}`) < 18 ||
      calculateAge(`${date[2]}-${date[0]}-${date[1]}`) > 125
    ) {
      addErrorToast(t('noumena.money.setupWallet.date.error'));
    } else {
      if (!setPayLoad) return;
      setPayLoad((_payload) => ({
        ..._payload,
        firstName,
        lastName,
        ssn,
        dateOfBirth: `${date[2]}-${date[0]}-${date[1]}`,
        citizenship: countries.find(
          (_country) =>
            _country.name.toLocaleLowerCase() ===
            citizenship.toLocaleLowerCase(),
        )?.iso2,
        country: citizenship,
      }));
      const { errors: profileError } = await updateUserProfileMutation({
        variables: {
          input: {
            firstName,
            lastName,
            citizenship: countries.find(
              (_country) =>
                _country.name.toLocaleLowerCase() ===
                citizenship.toLocaleLowerCase(),
            )?.iso2,
          },
        },
      });

      const { errors: kycError } = await updateUserKycMutation({
        variables: {
          input: {
            ssn,
            dob: `${date[2]}-${date[0]}-${date[1]}`,
          },
        },
      });

      if (!profileError && !kycError) {
        handleNextStep();
      }
    }
  };

  return (
    <FormWrapper isMobile={DeviceTypeEnum.MOBILE === deviceType}>
      <FormText
        font="heading-s-bold"
        colorToken="--text-body-header-neutral-default"
        textAlign="center"
      >
        {t('noumena.money.retryWallet.personal_information.form_text')}
      </FormText>
      <Spacer height={16} />
      <FormHelperText
        font="body-l"
        colorToken="--text-body-neutral-default"
        textAlign="center"
      >
        {t('noumena.money.setupWallet.personal_information.form_sub_text')}
      </FormHelperText>
      <Spacer height={32} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: '100%', paddingBottom: '16px' }}
      >
        <TextField
          data-testid="step-one-firstName"
          label={t('noumena.legal.first_name')}
          {...register('firstName', {
            required: {
              value: true,
              message: t(`noumena.input.not_empty`),
            },
          })}
          value={getValues('firstName')}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <Spacer height={16} />
        <TextField
          data-testid="step-one-lastName"
          label={t('noumena.legal.last_name')}
          {...register('lastName', {
            required: {
              value: true,
              message: t(`noumena.input.not_empty`),
            },
          })}
          value={getValues('lastName')}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
        <Spacer height={16} />
        <Controller
          control={control}
          name="dateOfBirth"
          data-testid="step-one-dob"
          render={({ field: { onChange, value } }) => (
            <MaskedDatePicker
              required
              layout="dropdown"
              onChange={onChange}
              value={value}
              placement="bottom-end"
              label={t('noumena.date_of_birth')}
              maxDate={new Date()}
              error={Boolean(errors.dateOfBirth)}
              helperText={errors.dateOfBirth?.message}
              fromYear={new Date().getFullYear() - 100}
            />
          )}
        />
        <Spacer height={16} />
        <Controller
          data-testid="step-one-country"
          control={control}
          name="citizenship"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <CountryPicker
              onCountryCodeChange={onChange}
              value={value}
              disabled={true}
            />
          )}
        />
        <Note
          font="footnote"
          colorToken="--text-input-neutral-default"
          leftMargin
        >
          {t('noumena.money.setupWallet.personal_information.wallet_note')}
        </Note>
        <Spacer height={16} />
        <TextField
          data-testid="step-one-ssn"
          label={t('noumena.ssn_esn')}
          {...register('ssn', {
            required: {
              value: true,
              message: t(`noumena.input.not_empty`),
            },
          })}
          value={getValues('ssn')}
          error={!!errors.ssn}
          helperText={errors.ssn?.message}
        />
        <Spacer height={16} />
        <Note font="footnote-bold" colorToken="--text-body-neutral-disabled">
          {t(
            'noumena.money.setupWallet.personal_information.encryption_heading',
          )}
        </Note>
        <Spacer height={1} />
        <Note font="footnote" colorToken="--text-body-neutral-disabled">
          {t('noumena.money.setupWallet.personal_information.encryption_note')}
        </Note>
        <Spacer height={16} />
        <Note font="footnote-bold" colorToken="--text-body-neutral-disabled">
          {t(
            'noumena.money.setupWallet.personal_information.creditScore_heading',
          )}
        </Note>
        <Spacer height={1} />
        <Note font="footnote" colorToken="--text-body-neutral-disabled">
          {t('noumena.money.setupWallet.personal_information.creditScore_note')}
        </Note>
        <Spacer height={16} />
        <Button
          data-testid="step-one-submit-button"
          type="submit"
          primary
          size="full"
          disabled={!isDirty || !isValid || profileLoading || kycLoading}
          loading={profileLoading || kycLoading}
        >
          {t('noumena.next.text')}
        </Button>
      </form>
    </FormWrapper>
  );
};
export default FormPersonalInformation;
