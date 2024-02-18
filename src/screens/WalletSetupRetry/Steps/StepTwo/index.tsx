import {
  type FC,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AddressDropdown } from '@/features/location/components';
import { Button } from '@/components/Button';
import { Spacer, Stack } from '@/layout';
import { Icon } from '@/components/Icon';
import { DeviceTypeEnum, useDeviceType, useError, useToast } from '@/hooks';
import { useUpdateUserAddressMutation } from '@/apollo/graphql';
import {
  FormText,
  FormHelperText,
  FormWrapper,
  Note,
  FormButtons,
} from '../styles';
import AddressForm from './AddressForm';
import { type FormValues } from './types';
import { SetupWalletContext } from '../../context';

type AddressField = keyof FormValues;
const fieldsToUpdate: AddressField[] = [
  'apartment',
  'street',
  'city',
  'state',
  'postalCode',
];

const FormAddress: FC = () => {
  const {
    handleNextStep,
    setPayLoad,
    payLoad,
    handlePreviousStep,
    currentUser: { address },
  } = useContext(SetupWalletContext);

  const { t } = useTranslation();
  const { addErrorToast } = useToast();
  const logger = useError();
  const deviceType = useDeviceType();

  const [updateUserAddressMutation, { loading }] = useUpdateUserAddressMutation(
    {
      onCompleted: () => handleNextStep(),
      onError: (error) => {
        logger.logError(
          error,
          'updateUserAddressSetupWallet-wallet-retry',
          true,
        );
      },
    },
  );
  const enteredAddress = useMemo(
    () =>
      payLoad.postalCode
        ? {
            city: payLoad.city,
            state: payLoad.state,
            country: payLoad.country,
            postalCode: payLoad.postalCode,
            street: payLoad.street,
            apartment: payLoad.apartment,
          }
        : null,
    [payLoad],
  );

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(
    Boolean(address || enteredAddress),
  );
  const methods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      street: '',
      apartment: '',
      city: '',
      state: '',
      postalCode: '',
    },
  });
  const {
    reset,
    formState: { isValid },
    setValue,
  } = methods;

  const submit = async (data: FormValues) => {
    if (!showForm) {
      setShowForm(true);
      return;
    }
    if (!setPayLoad) return;
    const payLoadCopy = {
      address1: `${data.street} ${data.apartment}`,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      street: data.street,
      apartment: data.apartment,
    };
    await updateUserAddressMutation({
      variables: {
        input: {
          street: data.street,
          apartment: data.apartment,
          city: data.city,
          state: data.state,
          zipcode: data.postalCode,
        },
      },
    });

    setPayLoad((_payload) => ({ ..._payload, ...payLoadCopy }));
  };

  const onLookupFailed = useCallback(() => {
    addErrorToast(`${t('noumena.money.setupWallet.lookup.fail.text')}`);
    setShowForm(true);
  }, [addErrorToast, t]);

  useEffect(() => {
    const updateFormField = (fieldName: AddressField, value: string) => {
      setValue(fieldName, value, {
        shouldValidate: true,
        shouldDirty: true,
      });
    };
    if (address || enteredAddress) {
      fieldsToUpdate.forEach((fieldName) => {
        const enteredValue = enteredAddress?.[fieldName] || '';
        const addressValue = address?.[fieldName] || '';
        updateFormField(fieldName, enteredValue || addressValue);
      });
    }
  }, [address, enteredAddress, setValue]);
  return (
    <FormWrapper>
      <FormText
        font="heading-s-bold"
        colorToken="--text-body-header-neutral-default"
        textAlign="center"
      >
        {t('noumena.money.setupWalletRetry.address.form_text')}
      </FormText>
      <Spacer height={16} />
      <FormHelperText
        font="body-l"
        colorToken="--text-body-neutral-default"
        textAlign="center"
      >
        {t('noumena.money.setupWallet.address.form_sub_text')}
      </FormHelperText>
      <Spacer height={64} />
      <form style={{ width: '100%' }} onSubmit={methods.handleSubmit(submit)}>
        {showForm ? (
          <FormProvider {...methods}>
            <AddressForm selectdAddress={selectedAddress || ''} />
          </FormProvider>
        ) : (
          <AddressDropdown
            setSelectedAddress={setSelectedAddress}
            setShowForm={setShowForm}
            onLookupFailed={onLookupFailed}
          />
        )}
        <Spacer height={16} />
        <Note font="footnote" colorToken="--text-body-neutral-disabled">
          {t('noumena.money.setupWalletRetry.address.note')}
        </Note>
        <Spacer height={16} />
        <FormButtons>
          <Stack
            fullWidth
            style={{ justifyContent: 'space-between', gap: '16px' }}
          >
            <Button
              data-testid="step-two-back-button"
              type="button"
              style={
                deviceType === DeviceTypeEnum.MOBILE
                  ? { width: '102px' }
                  : undefined
              }
              size={deviceType !== DeviceTypeEnum.MOBILE ? 'large' : undefined}
              onClick={() => {
                if (showForm) {
                  setShowForm(false);
                  reset();
                } else {
                  handlePreviousStep();
                }
              }}
              leftIcon={
                <Icon
                  name="arrow_left_m"
                  size={24}
                  color="--icon-button-neutral-default"
                />
              }
            >
              {t('noumena.back.text')}
            </Button>
            <Button
              loading={loading}
              data-testid="step-two-submit-button"
              type="submit"
              primary
              size={deviceType !== DeviceTypeEnum.MOBILE ? 'full' : undefined}
              style={
                deviceType === DeviceTypeEnum.MOBILE
                  ? { width: '226px' }
                  : undefined
              }
              disabled={(!showForm && false) || !isValid || loading}
            >
              {showForm
                ? t('noumena.next.text')
                : t('noumena.money.setupWallet.enter.address.buuton')}
            </Button>
          </Stack>
        </FormButtons>
      </form>
    </FormWrapper>
  );
};
export default FormAddress;
