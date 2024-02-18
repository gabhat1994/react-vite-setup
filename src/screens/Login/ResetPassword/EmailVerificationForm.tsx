import { Button, TSpan } from '@/components';
import { t } from 'i18next';
import { Spacer, Stack } from '@/layout';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@/components/TextField';
import { useBreakpoints } from '@/hooks';
import * as S from '../stylesv2';
import { type EmailForm } from './type';

type EmailVerificationFormProps = {
  onGenerateOtp: (value: { email: string }) => void;
  loading: boolean;
};

export const EmailVerificationForm = ({
  onGenerateOtp,
  loading,
}: EmailVerificationFormProps) => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useFormContext<EmailForm>();
  const { isMobile } = useBreakpoints();

  return (
    <>
      <form onSubmit={handleSubmit(onGenerateOtp)}>
        <S.Form>
          <Stack vertical gap={32} align="center">
            <Stack vertical gap={16} align="center">
              <TSpan
                font="heading-m-bold"
                colorToken="--text-modal-header-neutral-default"
              >
                {t('noumena.reset.password.heading')}
              </TSpan>
              <TSpan
                font="body-l"
                colorToken="--text-body-neutral-default"
                textAlign="center"
              >
                {t('noumena.reset.password.sub.heading')}
              </TSpan>
            </Stack>
            <S.Body gap={16}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    name="email"
                    value={value || ''}
                    onChange={onChange}
                    label={t('noumena.email_login_form.email_address.label')}
                    error={!!errors.email}
                    helperText={errors.email?.message as string}
                    data-testid="loginEmailTextField"
                  />
                )}
              />
              {!isMobile && (
                <Button
                  type="submit"
                  primary
                  size="full"
                  disabled={!isValid || loading}
                  loading={loading}
                >
                  {t('noumena.next.text')}
                </Button>
              )}
            </S.Body>
          </Stack>
          <S.Footer align="end">
            {isMobile && (
              <Button
                type="submit"
                primary
                size="full"
                disabled={!isValid || loading}
                loading={loading}
              >
                {t('noumena.next.text')}
              </Button>
            )}
            <Spacer height={isMobile ? 16 : 32} />
            <S.FooterNote textAlign="center">
              {t('noumena.signup.google.privacy.policy.v2')}
            </S.FooterNote>
          </S.Footer>
        </S.Form>
      </form>
    </>
  );
};
