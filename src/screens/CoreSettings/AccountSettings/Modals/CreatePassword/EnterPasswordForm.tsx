import { type ChangeEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { PasswordHelper } from '@/features/social-authentication';
import { t } from 'i18next';
import { TextField } from '@/components/TextField';
import { Button, Icon } from '@/components';
import { type PasswordStrength } from '@/features/social-authentication/types';
import { Stack } from '@/layout';
import { type EnterPasswordForm as EnterPasswordFormType } from './CreatePasswordTypes';
import { Form, PasswordContainer } from './styles';

type EnterPasswordFormProps = {
  visible: boolean;
  showHelper: boolean;
  loading: boolean;
  analysis: PasswordStrength;
  onChangeVisibility: () => void;
  onCloseModal?: () => void;
  onEditOrCreatePassword: () => void;
  onAnalyzePassword: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const EnterPasswordForm = ({
  visible,
  analysis,
  showHelper,
  loading,
  onChangeVisibility,
  onCloseModal,
  onAnalyzePassword,
  onEditOrCreatePassword,
}: EnterPasswordFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useFormContext<EnterPasswordFormType>();

  return (
    <Form onSubmit={handleSubmit(onEditOrCreatePassword)}>
      <Stack vertical gap={24} fullWidth>
        <Stack vertical fullWidth>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <PasswordContainer>
                <TextField
                  blockEmptySpaces
                  name="password"
                  type={visible ? 'text' : 'password'}
                  value={value || ''}
                  label={t('noumena.password')}
                  error={
                    errors.password?.type === 'required'
                      ? !!errors.password
                      : undefined
                  }
                  onChange={(e) => {
                    onAnalyzePassword(e);
                    onChange(e);
                  }}
                  helperText={
                    errors.password?.type === 'required'
                      ? errors.password.message
                      : undefined
                  }
                  data-testid="passwordInput"
                  rightIcon={
                    <Icon
                      name={visible ? 'eye_off_m' : 'eye_on_m'}
                      size={24}
                      onClick={onChangeVisibility}
                    />
                  }
                />
              </PasswordContainer>
            )}
          />
          {showHelper && (
            <PasswordHelper passwordStates={analysis} hideUndeerline />
          )}
        </Stack>
        <Stack gap={8} fullWidth>
          <Button size="full" onClick={onCloseModal}>
            {t('noumena.cancel')}
          </Button>
          <Button
            primary
            disabled={!isValid || loading}
            loading={loading}
            type="submit"
            size="full"
          >
            {t('noumena.create.password.button.text')}
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};
