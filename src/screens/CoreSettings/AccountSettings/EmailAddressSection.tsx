import React from 'react';
import { t } from 'i18next';
import {
  EditAndEnableButton,
  ActionButton,
  EmailInputBox,
  EmailInputBoxV2,
  TextHeader,
  StyledStack,
} from '@/screens/CoreSettings/AccountSettings/styles';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { TextField } from '@/components/TextField';
import { LabelGroup } from '@/components/StorybookHelpers/LabelWrap';
import { Button } from '@/components/Button';
import { type PhoneNumberSectionProps } from '@/screens/CoreSettings/AccountSettings/types';
import { useBreakpoints } from '@/hooks';

const EmailAddressSection: React.FC<
  PhoneNumberSectionProps & { isNewSignUp: boolean }
> = ({
  onEditEmailAddressButtonClick,
  onEnableEmailAddressButtonClick,
  handleChange,
  userProfileDetails,
  user,
  isNewSignUp,
}) => {
  const { isMobile } = useBreakpoints();
  return (
    <div>
      {user?.email ? (
        <>
          <TextHeader>
            <TSpan
              font={isNewSignUp ? 'body-xl-bold' : 'heading-xs-bold'}
              colorToken="--text-card-header-neutral-highlighted"
            >
              {t('noumena.email_address')}
            </TSpan>
          </TextHeader>
          {!isNewSignUp && <Spacer height={24} />}
          {isNewSignUp ? (
            <StyledStack fullWidth vertical={isMobile} gap={16} borderBottom>
              <EmailInputBoxV2>
                <TextField
                  onChange={handleChange}
                  value={userProfileDetails.email || undefined}
                  label={t('noumena.email_login_form.email_address.label')}
                  data-testid="testEmailLoginTextField"
                  disabled
                />
              </EmailInputBoxV2>
              <ActionButton
                testId="edit-email"
                tertiary
                onClick={onEditEmailAddressButtonClick}
              >
                {t('noumena.myaccount.account_settings_edit_email_address')}
              </ActionButton>
            </StyledStack>
          ) : (
            <>
              <EmailInputBox>
                <TextField
                  onChange={handleChange}
                  value={userProfileDetails.email || undefined}
                  label={t('noumena.email_login_form.email_address.label')}
                  data-testid="testEmailLoginTextField"
                  disabled
                />
              </EmailInputBox>
              <Spacer height={16} />
              <LabelGroup columns={1}>
                <EditAndEnableButton
                  testId="edit-email"
                  secondary
                  onClick={onEditEmailAddressButtonClick}
                >
                  {t('noumena.myaccount.account_settings_edit_email_address')}
                </EditAndEnableButton>
              </LabelGroup>
            </>
          )}
        </>
      ) : (
        <>
          <TextHeader>
            <TSpan
              font="heading-xs-bold"
              colorToken="--text-card-header-neutral-highlighted"
            >
              {t('noumena.phone_login_form.phone.label')}
            </TSpan>
          </TextHeader>
          <Spacer height={20} />
          <TSpan font="body-m" colorToken="--text-body-neutral-default">
            {t('noumena.account.settings_to_login')}
          </TSpan>
          <Spacer height={20} />
          <Button
            testId="edit-email"
            primary
            onClick={onEnableEmailAddressButtonClick}
          >
            {t('noumena.account.settings_to_enable_email')}
          </Button>
        </>
      )}
    </div>
  );
};

export default EmailAddressSection;
