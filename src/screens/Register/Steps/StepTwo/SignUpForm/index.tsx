import { type FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { t } from 'i18next';

import { Spacer, Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { CheckboxStyle, FormStyled, FullWidthStack, Form } from './styles';

import { type SignUpFormProps } from './types';
import { useSignUpForm } from './useSignUpForm';

export const SignUpForm: FC<SignUpFormProps> = ({
  setStep,
  setUserInfo,
  userInfo,
}) => {
  const [hasReferralCode, setHasReferralCode] = useState(false);
  const [searchParams] = useSearchParams();
  const referralCodeParam = searchParams.get('referral-code') || '';
  const referralCodeFromParam = referralCodeParam.replace(/[^a-zA-Z0-9]/g, '');

  const { control, errors, isValid, loading, onSubmit } = useSignUpForm({
    userInfo,
    onSetStep: setStep,
    onChangeUserInfo: setUserInfo,
    hasRefCode: hasReferralCode,
  });

  useEffect(() => {
    if (userInfo?.referralCode) {
      setHasReferralCode(!!userInfo.referralCode);
    }
  }, [userInfo?.referralCode]);

  return (
    <FormStyled data-testid="stepTwoFormContainer">
      <Spacer height={80} />

      <TSpan
        font="heading-xs-bold"
        $fill
        colorToken="--text-body-neutral-default"
      >
        {t('noumena.sign_up.title')}
      </TSpan>

      <Spacer height={10} />

      <TSpan
        font="heading-xl-bold"
        $fill
        colorToken="--text-body-header-neutral-default"
      >
        {t('noumena.register.step2.sub_title')}
      </TSpan>

      <Spacer height={15} />

      <Form onSubmit={onSubmit}>
        <Stack vertical padding="16px 0">
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                name="firstName"
                value={value || ''}
                label={t(`noumena.first_name`)}
                onChange={onChange}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
            name="firstName"
          />

          <Spacer height={30} />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                name="lastName"
                value={value || ''}
                label={t(`noumena.last_name`)}
                onChange={onChange}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            )}
            name="lastName"
          />

          <Spacer height={11} />

          <TSpan font="body-l" $fill colorToken="--text-body-neutral-default">
            {t(`noumena.register.step2.description`)}
          </TSpan>
          <Spacer height={20} />

          <CheckboxStyle
            data-testid="stepTwoFormCheckbox"
            checked={hasReferralCode}
          >
            <input
              checked={hasReferralCode}
              data-testid="stepTwoFormInput"
              type="checkbox"
              onChange={(e) => setHasReferralCode(e.target.checked)}
              disabled={
                !!userInfo?.referralCode &&
                userInfo?.referralCode === referralCodeFromParam
              }
            />
            <TSpan font="body-l" $fill colorToken="--text-body-neutral-default">
              {t(`noumena.sign_up.referral_message`)}
            </TSpan>
          </CheckboxStyle>

          {hasReferralCode && (
            <>
              <Spacer height={32} />
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    data-testid="referralCode"
                    name="referralCode"
                    value={value || ''}
                    label={t(`noumena.referral_code`)}
                    onChange={onChange}
                    error={!!errors.referralCode}
                    helperText={errors.referralCode?.message}
                    disabled={
                      !!userInfo?.referralCode &&
                      userInfo?.referralCode === referralCodeFromParam
                    }
                  />
                )}
                name="referralCode"
              />
            </>
          )}

          <Spacer height={32} />
          <FullWidthStack>
            <Button
              data-testid="stepTwoBackButton"
              tertiary
              leftIcon={
                <Icon
                  color="--icon-button-neutral-default"
                  name="arrow_left_m"
                  size={16}
                />
              }
              style={{ minWidth: '100px' }}
              onClick={() => setStep(1)}
            >
              {t(`noumena.back.text`)}
            </Button>
            <Spacer width={16} />
            <Button
              data-testid="stepTwoSubmitButton"
              type="submit"
              primary
              size="full"
              disabled={!isValid}
              loading={loading}
            >
              {t(`noumena.next.text`)}
            </Button>
          </FullWidthStack>
        </Stack>
      </Form>
    </FormStyled>
  );
};
