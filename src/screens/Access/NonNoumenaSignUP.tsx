import { t } from 'i18next';
import { Button, Icon, TSpan } from '@/components';
import { Main } from '@/layout/NewAuthLayout/childrenStyles';
import { Spacer, Stack } from '@/layout';
import { TextField } from '@/components/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { PasswordHelper } from '@/features/social-authentication';
import { useBreakpoints } from '@/hooks';
import {
  Body,
  Form,
  PasswordContainer,
  TooltipContainer,
  Footer,
  FooterNote,
  TermsLink,
} from './stylesv2';
import {
  type NonNMSignUpForm,
  type NonNoumenaSignUPProps,
} from './accessTypes';

export const NonNoumenaSignUp = ({
  loading,
  visible,
  analysis,
  showHelper,
  handleSignup,
  analyzePassword,
  handleTermsOfUse,
  toggleFieldFocus,
  toggleVisibility,
}: NonNoumenaSignUPProps) => {
  const devices = useBreakpoints();
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useFormContext<NonNMSignUpForm>();

  return (
    <Main justify="center">
      <form onSubmit={handleSubmit(handleSignup)}>
        <Form>
          <TSpan
            font="heading-m-bold"
            colorToken="--text-modal-header-neutral-default"
          >
            {t('noumena.sign_up.title')}
          </TSpan>
          <Spacer height={24} />
          <TSpan
            font="body-l"
            colorToken="--text-card-header-neutral-default"
            textAlign="center"
          >
            {t('noumena.non.noumena.signup.subheading')}
          </TSpan>
          <Spacer height={32} />
          <Body>
            <Stack vertical fullWidth gap={18}>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    name="firstName"
                    value={value}
                    label={t(`noumena.first_name`)}
                    error={!!errors.firstName}
                    onChange={onChange}
                    helperText={errors.firstName?.message}
                    data-testid="firstNameInput"
                  />
                )}
              />
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    name="lastName"
                    value={value}
                    label={t(`noumena.last_name`)}
                    error={!!errors.lastName}
                    onChange={onChange}
                    helperText={errors.lastName?.message}
                    data-testid="lastNameInput"
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field: { value } }) => (
                  <TextField
                    name="email"
                    value={value}
                    label={t('noumena.email_address')}
                    error={!!errors.email}
                    data-testid="emailInput"
                    disabled
                    helperText={
                      errors.email
                        ? errors.email?.message
                        : t('noumena.non-noumena.email.message')
                    }
                  />
                )}
              />
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
                        analyzePassword(e);
                        onChange(e);
                      }}
                      onFocus={toggleFieldFocus}
                      onBlur={toggleFieldFocus}
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
                          onClick={toggleVisibility}
                        />
                      }
                    />
                    {showHelper && !devices.isSmallerThanLaptop && (
                      <TooltipContainer>
                        <PasswordHelper passwordStates={analysis} />
                      </TooltipContainer>
                    )}
                  </PasswordContainer>
                )}
              />
              {devices.isSmallerThanLaptop && showHelper && (
                <PasswordHelper passwordStates={analysis} />
              )}
            </Stack>
            <Spacer height={18} />
            <Button
              primary
              size="full"
              disabled={!isValid || loading}
              loading={loading}
              type="submit"
            >
              {t('noumena.sign_up.title')}
            </Button>
          </Body>
        </Form>
      </form>
      <Footer>
        <FooterNote textAlign="center">
          {t('noumena.signup.term.and.condition.v2')}
          <TermsLink onClick={handleTermsOfUse}>
            {t('noumena.signup.terms_of_use')}
          </TermsLink>
          .
        </FooterNote>
        <Spacer height={16} />
        <FooterNote textAlign="center">
          {t('noumena.signup.google.privacy.policy.v2')}
        </FooterNote>
      </Footer>
    </Main>
  );
};
