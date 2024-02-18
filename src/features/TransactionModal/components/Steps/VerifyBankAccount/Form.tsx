import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@/components/TextField';
import { Button, TSpan } from '@/components';
import { Stack } from '@/layout';
import { useTranslation } from 'react-i18next';
import {
  type TVerifyFundingSourceForm as VerifyFundingSourceFormType,
  type FormProps,
} from './type';
import { StyledForm } from './styles';

export const Form = ({
  verifyFundingSource,
  bankAccountId,
  refresh,
  failureCount,
  loading,
}: FormProps) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useFormContext<VerifyFundingSourceFormType>();

  const handleVerification = () => {
    verifyFundingSource(bankAccountId, refresh);
  };

  return (
    <StyledForm onSubmit={handleSubmit(handleVerification)}>
      <Stack vertical gap={24} fullWidth padding={8}>
        <Stack vertical fullWidth gap={12} align="center">
          <Controller
            control={control}
            name="amount1"
            render={({ field: { onChange, value } }) => (
              <TextField
                blockEmptySpaces
                name="amount1"
                type="text"
                value={value}
                label={t('noumena.amount1')}
                error={!!errors.amount1}
                onChange={onChange}
                helperText={errors.amount1?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="amount2"
            render={({ field: { onChange, value } }) => (
              <TextField
                blockEmptySpaces
                name="amount2"
                type="text"
                value={value}
                label={t('noumena.amount2')}
                error={!!errors.amount2}
                onChange={onChange}
                helperText={errors.amount2?.message}
              />
            )}
          />
          {failureCount > 0 && (
            <TSpan
              font="body-m"
              colorToken="--text-body-neutral-default"
              textAlign="center"
            >{`You have ${3 - failureCount} more attempts left.`}</TSpan>
          )}
        </Stack>
        <Stack gap={16} fullWidth>
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
      </Stack>
    </StyledForm>
  );
};
