import { useNavigate } from 'react-router';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { t } from 'i18next';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Layout from '@/layout/MoneyLayout';
import { TSpan } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import ROUTES from '@/constants/routes';
import { Spacer } from '@/layout';
import { Card } from '@/components/Card';
import countries from '@/assets/json/countries.json';
import { Button } from '@/components/Button';
import {
  useGetPersonalInfoLazyQuery,
  useUpdateUserKycMutation,
  useUpdateUserAddressMutation,
  useUpdateUserProfileMutation,
} from '@/apollo/graphql';
import { DatePicker } from '@/components/DatePicker';
import CountryPicker from '@/components/CounteryPicker/CountryPicker';
import { TextField } from '@/components/TextField';
import { useToast } from '@/hooks';
import { TransactionModal } from '@/features/TransactionModal';
import { TransactionModalType } from '@/features/TransactionModal/types';
import {
  Container,
  ContentContainer,
  MiddleContainer,
  ContentHeaderContainer,
  ItemContainer,
  OwnerHeaderContainer,
  FormContainer,
  FormHeaderContainer,
} from './styles';
import {
  processAfterSave,
  respDataProcessor,
  updateAddressReq,
  updateUserKycReq,
  updateUserProfileReq,
} from './helper';
import { SubHeaderContainer } from '../styles';
import { type InfoType } from './types';
import userDetailsInputSchema from './data';

const AccountDetail = () => {
  const [open, setOpen] = useState(false);
  const { addToast } = useToast();
  const [gqlPersonalInfo] = useGetPersonalInfoLazyQuery({
    fetchPolicy: 'cache-and-network',
  });
  const [gqlUpdateAddress] = useUpdateUserAddressMutation();
  const [gqlUpdateUserProfile] = useUpdateUserProfileMutation();
  const [gqlUpdateUserKyc] = useUpdateUserKycMutation();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(true);
  const [info, setInfo] = useState<InfoType>({
    firstName: '',
    lastName: '',
    dob: undefined,
    ssn: '',
    citizenship: 'us',
    city: '',
    state: '',
    zipcode: '',
    street: '',
    apartment: '',
  });
  const handleNavigation = useCallback(async () => {
    navigate(ROUTES.MONEY_DETAILS);
  }, [navigate]);
  const fetch = async () => {
    const res = await gqlPersonalInfo();
    const processedDataObj = respDataProcessor(res?.data);
    setInfo(processedDataObj);
  };
  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    getValues,
    register,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<InfoType>({
    resolver: yupResolver(userDetailsInputSchema),
    mode: 'onChange',
  });
  useEffect(() => {
    if (info) {
      setValue('firstName', info.firstName, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('lastName', info.lastName, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('citizenship', info.citizenship, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('dob', info.dob, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('ssn', info.ssn || '', {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('city', info.city || '', {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('state', info.state || '', {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('zipcode', info.zipcode || '', {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('street', info.street || '', {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('apartment', info.apartment || '', {
        shouldValidate: true,
        shouldDirty: true,
      });
      trigger();
    }
  }, [info, setValue, edit, trigger]);
  const [loading, setLoading] = useState(false);
  const onSave = async () => {
    if (edit) setEdit(!edit);
    else {
      setLoading(true);
      const values = getValues();

      const addressPromise = gqlUpdateAddress({
        variables: {
          input: updateAddressReq(values),
        },
      });
      const userKycPromise = gqlUpdateUserKyc({
        variables: {
          input: updateUserKycReq(values),
        },
      });
      const personlInfoPromise = gqlUpdateUserProfile({
        variables: {
          input: updateUserProfileReq(values),
        },
      });
      try {
        await Promise.all([
          addressPromise,
          userKycPromise,
          personlInfoPromise,
        ]).then(() => {
          setInfo(processAfterSave(values));
        });
        addToast(
          'success',
          'none',
          'Account Owner Information saved Successfully.',
        );
      } catch {
        addToast('error', 'none', 'There was an error saving');
      }
      setEdit(!edit);
      setLoading(false);
    }
  };
  const subHeader = useMemo(
    () => (
      <SubHeaderContainer>
        <Icon
          name="arrow_left_m"
          size={24}
          color="--icon-button-neutral-default"
          onClick={() => handleNavigation()}
        />
        <Spacer width={20} />
        <TSpan
          font="heading-xs-bold"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {' '}
          {t(`noumena.money.money-detail.accountdetails`)}
        </TSpan>
      </SubHeaderContainer>
    ),
    [handleNavigation],
  );
  return (
    <Layout
      type="Chambers"
      data-testid="money-layout"
      hideLeftMenu={true}
      subHeader={subHeader}
    >
      <Card>
        <TSpan
          font="heading-xs-bold"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {t(`noumena.money.money-detail.addMoney`)}
        </TSpan>
        <Spacer height={20} />
        <Container>
          <ContentContainer>
            <ContentHeaderContainer>
              <TSpan
                font="body-m-bold"
                colorToken="--text-card-header-neutral-highlighted"
              >
                {t(`noumena.money.money-detail.externalTransfer`)}
              </TSpan>
            </ContentHeaderContainer>
            <ItemContainer>
              <TSpan font="body-m" colorToken="--text-card-neutral-default">
                {t(`noumena.money.money-detail.linkBank`)}
              </TSpan>
            </ItemContainer>
            <Button size="full" primary onClick={() => setOpen(true)}>
              {t(`noumena.money.money-detail.transferNow`)}
            </Button>
          </ContentContainer>
          <MiddleContainer>
            <TSpan
              font="body-m"
              colorToken="--text-placeholder-neutral-default"
            >
              {t(`noumena.money.money-detail.or`)}
            </TSpan>
          </MiddleContainer>
          <ContentContainer>
            <ContentHeaderContainer>
              <TSpan
                font="body-m-bold"
                colorToken="--text-card-header-neutral-highlighted"
              >
                {t(`noumena.money.money-detail.directDEposit`)}
              </TSpan>
            </ContentHeaderContainer>
            <ItemContainer>
              <TSpan font="body-m" colorToken="--text-card-neutral-default">
                {t(`noumena.money.money-detail.directDEposit1`)}
              </TSpan>
            </ItemContainer>
            <ItemContainer>
              <TSpan font="body-m" colorToken="--text-card-neutral-default">
                {t(`noumena.money.money-detail.directDEposit2`)}
              </TSpan>
            </ItemContainer>
            <ItemContainer>
              <TSpan font="body-m" colorToken="--text-card-neutral-default">
                {t(`noumena.money.money-detail.directDEposit3`)}
              </TSpan>
            </ItemContainer>
          </ContentContainer>
        </Container>
      </Card>
      <Spacer height={20} />
      <Card>
        <form style={{ width: '100%' }}>
          <Container>
            <OwnerHeaderContainer>
              <TSpan
                font="heading-xs-bold"
                colorToken="--text-card-neutral-highlighted"
              >
                {t(`noumena.money.money-detail.accountOwner`)}
              </TSpan>
            </OwnerHeaderContainer>
            <Button
              secondary
              size="small"
              onClick={() => onSave()}
              // disabled={(!isDirty || !isValid) && !edit}
              disabled
              loading={loading}
            >
              {edit
                ? t(`noumena.money.money-detail.edit`)
                : t(`noumena.money.money-detail.save`)}
            </Button>
          </Container>
          <Container>
            <FormHeaderContainer>
              <TSpan
                font="body-m-bold"
                colorToken="--text-card-neutral-highlighted"
              >
                {t(`noumena.money.money-detail.personalDetails`)}
              </TSpan>
            </FormHeaderContainer>
          </Container>

          <Container>
            <FormContainer>
              <TextField
                style={edit ? { background: 'white' } : undefined}
                disabled={edit}
                data-testid="step-one-firstName"
                label={t('noumena.legal.first_name')}
                {...register('firstName', {
                  required: {
                    value: true,
                    message: t(`noumena.input.not_empty`),
                  },
                })}
                value={getValues('firstName')}
                error={!!errors.firstName?.message}
                helperText={errors.firstName?.message}
              />
              <Spacer height={16} />
              <TextField
                style={edit ? { background: 'white' } : undefined}
                disabled={edit}
                data-testid="step-one-lastName"
                label={t('noumena.legal.last_name')}
                {...register('lastName', {
                  required: {
                    value: true,
                    message: t(`noumena.input.not_empty`),
                  },
                })}
                value={getValues('lastName')}
                error={!!errors.lastName?.message}
                helperText={errors.lastName?.message}
              />
              <Spacer height={16} />
              {edit ? (
                <TextField
                  style={edit ? { background: 'white' } : undefined}
                  disabled={edit}
                  data-testid="step-one-ssn"
                  label={t('noumena.date_of_birth')}
                  {...register('dob')}
                  value={getValues('dob')?.toDateString()}
                />
              ) : (
                <Controller
                  control={control}
                  name="dob"
                  data-testid="step-one-dob"
                  rules={{
                    required: {
                      value: true,
                      message: t(`noumena.input.not_empty`),
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      required
                      layout="dropdown"
                      onChange={onChange}
                      value={value}
                      label={t('noumena.date_of_birth')}
                      maxDate={new Date()}
                      fromYear={new Date().getFullYear() - 100}
                    />
                  )}
                />
              )}
            </FormContainer>
            <FormContainer>
              {edit ? (
                <TextField
                  style={edit ? { background: 'white' } : undefined}
                  disabled={edit}
                  data-testid="step-one-ssn"
                  label={t('noumena.citizenship')}
                  {...register('citizenship')}
                  value={
                    countries.find((c) => c.iso2 === getValues('citizenship'))
                      ?.name || ''
                  }
                />
              ) : (
                <Controller
                  data-testid="step-one-country"
                  control={control}
                  name="citizenship"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <CountryPicker
                      onCountryCodeChange={onChange}
                      value={value}
                    />
                  )}
                />
              )}
              <Spacer height={16} />
              <TextField
                style={edit ? { background: 'white' } : undefined}
                disabled={edit}
                data-testid="step-one-ssn"
                label={t('noumena.ssn_esn')}
                {...register('ssn', {
                  required: {
                    value: true,
                    message: t(`noumena.input.not_empty`),
                  },
                })}
                error={!!errors.ssn}
                helperText={errors.ssn?.message}
                value={getValues('ssn')}
              />
            </FormContainer>
          </Container>
          <Container>
            <FormHeaderContainer>
              <TSpan
                font="body-m-bold"
                colorToken="--text-card-neutral-highlighted"
              >
                {t(`noumena.money.money-detail.contactDetails`)}
              </TSpan>
            </FormHeaderContainer>
          </Container>
          <Container>
            <FormContainer>
              <TextField
                style={edit ? { background: 'white' } : undefined}
                disabled={edit}
                data-testid="city"
                label={t('noumena.money.setupWallet.address.city')}
                {...register('city')}
                value={getValues('city')}
              />
              <Spacer height={16} />
              <TextField
                style={edit ? { background: 'white' } : undefined}
                disabled={edit}
                data-testid="zipcode"
                label={t('noumena.zipcode')}
                {...register('zipcode')}
                value={getValues('zipcode')}
              />
              <Spacer height={16} />
              <TextField
                style={edit ? { background: 'white' } : undefined}
                disabled={edit}
                data-testid="street"
                label={t('noumena.money.setupWallet.address.street')}
                {...register('street')}
                value={getValues('street')}
              />
            </FormContainer>
            <FormContainer>
              <TextField
                style={edit ? { background: 'white' } : undefined}
                disabled={edit}
                data-testid="state"
                label={t('noumena.money.setupWallet.address.state')}
                {...register('state')}
                value={getValues('state')}
              />
              <Spacer height={16} />
              <TextField
                style={edit ? { background: 'white' } : undefined}
                disabled={edit}
                data-testid="apartment"
                label={t('apartment')}
                {...register('apartment')}
                value={getValues('apartment')}
              />
            </FormContainer>
          </Container>
        </form>
      </Card>
      {open && (
        <TransactionModal
          open={open}
          handleClose={() => setOpen(false)}
          type={TransactionModalType.TRANSFER}
        />
      )}
    </Layout>
  );
};
export default AccountDetail;
