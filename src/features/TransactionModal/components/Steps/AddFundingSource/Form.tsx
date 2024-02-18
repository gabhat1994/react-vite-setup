import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@/components/TextField';
import { Button, Icon } from '@/components';
import { Stack } from '@/layout';
import { Dropdown } from '@/components/Dropdown';
import { useTranslation } from 'react-i18next';
import { type DropdownValueType } from '@/components/Dropdown';
import {
  type TAddFundingSourceForm as AddFundingSourceFormType,
  type FormProps,
} from './type';
import { StyledForm, StyledStack } from './style';
import { AccountType } from './type';

const AccounTypeDropdownOptions: DropdownValueType<string>[] = [
  {
    key: 'savings',
    value: AccountType.Savings,
    label: 'Savings',
    type: 'value',
  },
  {
    key: 'checking',
    value: AccountType.Checking,
    label: 'Checking',
    type: 'value',
  },
];

export const Form = ({
  onCloseModal,
  addFundingSource,
  loading,
}: FormProps) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useFormContext<AddFundingSourceFormType>();

  return (
    <StyledForm onSubmit={handleSubmit(addFundingSource)}>
      <StyledStack vertical gap={24} fullWidth padding={8}>
        <Stack vertical fullWidth gap={12}>
          <Controller
            control={control}
            name="accountName"
            render={({ field: { onChange, value } }) => (
              <TextField
                name="accountName"
                type="text"
                value={value}
                label={t('noumena.accountName')}
                error={!!errors.accountName}
                onChange={onChange}
                helperText={errors.accountName?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="accountType"
            render={({ field: { value, onChange } }) => (
              <Dropdown
                containerStyle={{
                  padding: '0',
                }}
                observerMinHeight="0px"
                hideIcons
                placement="bottom-start"
                options={AccounTypeDropdownOptions}
                inputValue={value ?? ''}
                onSelectOption={(e) => {
                  onChange(e.value);
                }}
                usePortal={false}
              >
                {({ inputProps, inputRef, toggle }) => (
                  <TextField
                    readOnly
                    {...inputProps}
                    ref={inputRef}
                    value={value ?? ''}
                    label={t('noumena.accountType')}
                    onChange={(e) => {
                      onChange(e.currentTarget.value);
                    }}
                    rightIcon={
                      <Icon
                        name="chevron_down_m"
                        size={16}
                        onClick={toggle}
                        color="--icon-input-neutral-default"
                      />
                    }
                  />
                )}
              </Dropdown>
            )}
          />
          <Controller
            control={control}
            name="routingNumber"
            render={({ field: { onChange, value } }) => (
              <TextField
                blockEmptySpaces
                name="routingNumber"
                type="text"
                value={value}
                label={t('noumena.routingNumber')}
                error={!!errors.routingNumber}
                onChange={onChange}
                helperText={errors.routingNumber?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="accountNumber"
            render={({ field: { onChange, value } }) => (
              <TextField
                blockEmptySpaces
                name="accountNumber"
                type="text"
                value={value}
                label={t('noumena.accountNumber')}
                error={!!errors.accountNumber}
                onChange={onChange}
                helperText={errors.accountNumber?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="reAccountNumber"
            render={({ field: { onChange, value } }) => (
              <TextField
                blockEmptySpaces
                name="reAccountNumber"
                type="text"
                value={value}
                label={t('noumena.reAccountNumber')}
                error={!!errors.reAccountNumber}
                onChange={onChange}
                helperText={errors.reAccountNumber?.message}
              />
            )}
          />
        </Stack>
        <Stack gap={16} fullWidth>
          <Button size="full" tertiary onClick={onCloseModal}>
            {t(`noumena.cancel`)}
          </Button>
          <Button
            size="full"
            type="submit"
            primary
            disabled={!isValid || loading}
            loading={loading}
          >
            {t(`noumena.money.money-detail.Continue`)}
          </Button>
        </Stack>
      </StyledStack>
    </StyledForm>
  );
};
