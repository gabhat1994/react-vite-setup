import React from 'react';
import { t } from 'i18next';
import {
  EditAndEnableButton,
  PhoneInputBox,
  TextHeader,
} from '@/screens/CoreSettings/AccountSettings/styles';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { PhoneInput } from '@/components/PhoneInput';
import { LabelGroup } from '@/components/StorybookHelpers/LabelWrap';
import { Button } from '@/components/Button';
import { type EmailAddressSectionProps } from './types';

const PhoneNumberSection: React.FC<EmailAddressSectionProps> = ({
  onEditPhoneNumberButtonClick,
  userProfileDetails,
  handleChange,
  onEnablePhoneButtonClick,
  user,
}) => (
  <div>
    {user?.phone ? (
      <>
        <TextHeader>
          <TSpan
            font="heading-xs-bold"
            colorToken="--text-card-header-neutral-highlighted"
          >
            {t('noumena.phone_login_form.phone.label')}
          </TSpan>
        </TextHeader>
        <Spacer height={32} />
        <PhoneInputBox>
          <PhoneInput
            onPhoneChange={() => {}}
            onChange={handleChange}
            value={`+${userProfileDetails.phone}` || undefined}
            label={t('noumena.phone_login_form.phone.label')}
            disabled
          />
        </PhoneInputBox>
        <Spacer height={16} />
        <LabelGroup columns={1}>
          <EditAndEnableButton
            testId="edit-phone"
            secondary
            onClick={onEditPhoneNumberButtonClick}
          >
            {t('noumena.myaccount.account_settings_edit')}
          </EditAndEnableButton>
        </LabelGroup>
      </>
    ) : (
      <div>
        <TextHeader>
          <TSpan
            font="heading-xs-bold"
            colorToken="--text-card-header-neutral-highlighted"
          >
            {t('noumena.phone_login_form.phone.label')}
          </TSpan>
        </TextHeader>
        <Spacer height={32} />
        <TSpan font="body-m" colorToken="--text-body-neutral-default">
          {t('noumena.account.settings_to_login')}
        </TSpan>
        <Spacer height={24} />
        <Button testId="edit-phone" primary onClick={onEnablePhoneButtonClick}>
          {t('noumena.account.settings_to_enable_phone')}
        </Button>
      </div>
    )}
  </div>
);

export default PhoneNumberSection;
