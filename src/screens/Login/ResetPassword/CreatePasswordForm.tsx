import { Button, Icon, TSpan } from '@/components';
import { t } from 'i18next';
import { Spacer } from '@/layout';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@/components/TextField';
import {
  type PasswordStrength,
  PasswordHelper,
} from '@/features/social-authentication';
import { type ChangeEvent } from 'react';
import { useBreakpoints } from '@/hooks';
import * as S from '../stylesv2';
import { PasswordContainer, TooltipContainer } from './style';
import { type CreatePasswordForm as CreatePasswordFormType } from './type';

type CreatePasswordFormProps = {
  showHelper: boolean;
  isPasswordVisible: boolean;
  loading: boolean;
  passwordAnalysis: PasswordStrength;
  onPasswordAnalysis: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocusChanged: () => void;
  togglePasswordVisibility: () => void;
  onCreatePassword: (val: CreatePasswordFormType) => void;
};

export const CreatePasswordForm = ({
  isPasswordVisible,
  passwordAnalysis,
  showHelper,
  loading,
  onPasswordAnalysis,
  onFocusChanged,
  togglePasswordVisibility,
  onCreatePassword,
}: CreatePasswordFormProps) => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useFormContext<CreatePasswordFormType>();

  const { isMobile, isSmallerThanLaptop } = useBreakpoints();

  return (
    <>
      <S.StyledForm onSubmit={handleSubmit(onCreatePassword)}>
        <S.Form>
          <TSpan
            font="heading-m-bold"
            colorToken="--text-modal-header-neutral-default"
          >
            {t('noumena.reset.create.password.heading')}
          </TSpan>
          <Spacer height={16} />
          <S.Body gap={24} align="center" fullWidth>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <PasswordContainer>
                  <TextField
                    blockEmptySpaces
                    name="password"
                    fullWidth
                    type={isPasswordVisible ? 'text' : 'password'}
                    value={value || ''}
                    label={t('noumena.password')}
                    error={!!errors.password}
                    onChange={(e) => {
                      onPasswordAnalysis(e);
                      onChange(e);
                    }}
                    helperText={errors.password?.message}
                    data-testid="passwordInput"
                    onFocus={onFocusChanged}
                    onBlur={onFocusChanged}
                    rightIcon={
                      <Icon
                        name={isPasswordVisible ? 'eye_off_m' : 'eye_on_m'}
                        size={24}
                        onClick={togglePasswordVisibility}
                      />
                    }
                  />
                  {showHelper && !isSmallerThanLaptop && (
                    <TooltipContainer>
                      <PasswordHelper passwordStates={passwordAnalysis} />
                    </TooltipContainer>
                  )}
                </PasswordContainer>
              )}
            />
            {!isMobile && (
              <Button
                type="submit"
                primary
                size="full"
                disabled={!isValid}
                loading={loading}
              >
                {t('noumena.create.password.button.text')}
              </Button>
            )}
          </S.Body>
          <Spacer height={16} />
          <S.Footer>
            {isMobile && (
              <Button
                type="submit"
                primary
                size="full"
                disabled={!isValid}
                loading={loading}
              >
                {t('noumena.create.password.button.text')}
              </Button>
            )}
            <Spacer height={isMobile ? 16 : 32} />
            <S.FooterNote textAlign="center">
              {t('noumena.signup.google.privacy.policy.v2')}
            </S.FooterNote>
          </S.Footer>
        </S.Form>
      </S.StyledForm>
    </>
  );
};
