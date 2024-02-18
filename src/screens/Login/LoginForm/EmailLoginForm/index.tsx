import { type FC, useCallback, useMemo, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Spacer, Stack } from '@/layout';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/Button';
import { EMAIL_REGEX } from '@/constants/regex';
import { type EmailLoginFormInputs, type EmailLoginFormProps } from './types';

const EmailLoginForm: FC<EmailLoginFormProps> = ({
  recaptchaToken,
  loading,
  submitLoginData,
}) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState<string>('');

  const validationSchema = useMemo(
    () =>
      yup
        .object({
          email: yup
            .string()
            .email(t('noumena.signup.error.incorrect_email'))
            .required(t('noumena.signup.error.field_cannot_be_empty')),
        })
        .required(),
    [t],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailLoginFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<EmailLoginFormInputs> = useCallback(
    async (data) => {
      submitLoginData({
        type: 'email',
        value: data.email.trim(),
      });
    },
    [submitLoginData],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.currentTarget.value);
    },
    [setEmail],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack vertical padding="16px 0">
        <TextField
          {...register('email', {
            required: {
              value: true,
              message: t('noumena.email_login_form.valid_email.field_empty'),
            },
            pattern: {
              value: EMAIL_REGEX,
              message: t('noumena.email_login_form.valid_email.error_message'),
            },
            onChange: handleChange,
          })}
          value={email}
          label={t('noumena.email_login_form.email_address.label')}
          error={!!errors.email}
          helperText={errors.email?.message}
          data-testid="testEmailLoginTextField"
        />
        <Spacer height={29.5} />
        <Button
          id="email-login-btn"
          type="submit"
          primary
          size="full"
          loading={loading}
          disabled={loading || !recaptchaToken || email.trim() === ''}
        >
          {t('noumena.login_button.text')}
        </Button>
      </Stack>
    </form>
  );
};

export default EmailLoginForm;
