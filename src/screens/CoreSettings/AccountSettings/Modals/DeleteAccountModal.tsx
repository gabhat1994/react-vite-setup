import { useState, useCallback } from 'react';
import { t } from 'i18next';
import * as Sentry from '@sentry/react';
import { Button } from '@/components/Button';
import { Modal, ModalBody, ModalHeader } from '@/components/ExtendedModal';
import { Spacer } from '@/layout';
import { Form } from '@/screens/Register/Steps/StepThree/SignUpForm/styles';
import { useDeleteAccountMutation } from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import { useToast } from '@/hooks';

import { TextField } from '@/components/TextField';
import { TSpan } from '@/components/Typography';
import { LINKS } from '@/constants/links';
import { type DeleteAccountModalProps } from '../types';
import {
  DeleteAccountParagraph,
  LinkIconWrapper,
  DeleteAccountProceed,
  DeleteFooter,
  AdvancedSettingsWrapper,
  RemoveAccount,
  CheckBoxWrapper,
  CheckBox,
  CheckBoxLabel,
  RightIcon,
  PrivacyPolicyLink,
} from '../styles';

export const DeleteAccountModal = ({
  cancelCallback,
}: DeleteAccountModalProps) => {
  const { addToast } = useToast();
  const { signOut } = useAuth();
  const [typeDeleteValue, setTypeDeleteValue] = useState('');
  const [deletePersonalDataCheckbox, setDeletePersonalDataCheckbox] =
    useState(Boolean);
  const [isOpen, toggle] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const btnType: { [key: string]: boolean } = {};

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTypeDeleteValue(event.target.value);
    },
    [],
  );

  const onCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDeletePersonalDataCheckbox(event.target.checked);
    },
    [setDeletePersonalDataCheckbox],
  );

  const [deleteAccountMutation] = useDeleteAccountMutation({
    variables: {
      input: {
        deletePII: deletePersonalDataCheckbox,
        reason: typeDeleteValue,
      },
    },
  });

  const handleSubmitSave = useCallback(async () => {
    try {
      setIsDeleting(true);
      const res = await deleteAccountMutation();
      if (res.errors) {
        addToast(
          'error',
          'icon',
          t('noumena.myaccount.account_settings_account_deleted_error'),
        );
      } else {
        addToast(
          'primary',
          'none',
          t('noumena.myaccount.account_settings_account_deleted_success'),
        );
        signOut();
      }
      setIsDeleting(false);
    } catch (error: unknown) {
      setIsDeleting(false);
      Sentry.captureException(error, {
        tags: {
          section: 'deleteAccountMutation',
        },
      });
      if (error instanceof Error) {
        addToast('error', 'icon', `${error.message}`);
      } else {
        addToast(
          'error',
          'icon',
          t('noumena.myaccount.account_settings_account_deleted_error'),
        );
      }
    }
    cancelCallback();
  }, [deleteAccountMutation, addToast, cancelCallback, signOut]);

  return (
    <Modal
      isFullScreen={false}
      open={true}
      onClose={cancelCallback}
      style={{ width: 327 }}
    >
      <ModalHeader isFullScreen={false}>
        {t('noumena.myaccount.delete_account')}
      </ModalHeader>
      <ModalBody isFullScreen={false}>
        <TSpan font="body-l" colorToken="--text-body-neutral-default">
          <DeleteAccountParagraph>
            {t('noumena.myaccount.delete_account_paragraph')}
            {deletePersonalDataCheckbox ? (
              <>
                <strong>
                  {` ${t('noumena.myaccount.delete_account_profile')}`}
                </strong>{' '}
                {t('noumena.myaccount.delete_account_and')}{' '}
                <strong>
                  {` ${t(
                    'noumena.myaccount.delete_account_personal_information',
                  )}`}
                </strong>{' '}
                {t('noumena.myaccount.delete_account_permanently')}
              </>
            ) : (
              <strong>
                {` ${t('noumena.myaccount.delete_account_profile')}`}
              </strong>
            )}
            .
          </DeleteAccountParagraph>
        </TSpan>
        <Spacer height={24} />
        <Form>
          <DeleteAccountProceed>
            <TSpan font="body-l" colorToken="--text-body-neutral-default">
              {t('noumena.myaccount.delete_account_proceed')}{' '}
              <strong>{t('noumena.myaccount.delete_account_delete')}</strong>{' '}
              {t('noumena.myaccount.delete_account_below')}
            </TSpan>
          </DeleteAccountProceed>
          <Spacer height={16} />
          <TextField
            onChange={(e) => {
              onInputChange(e);
            }}
            placeholder={t('noumena.chambers.element.posts.type_delete')}
            inputSize="normal"
          />
          <Spacer height={16} />
          <AdvancedSettingsWrapper isDisabled={isDeleting}>
            <Button
              rightIcon={
                <RightIcon
                  name="chevron_down_m"
                  isOpen={isOpen}
                  size={16}
                  onClick={() => {
                    if (!isDeleting) toggle(!isOpen);
                  }}
                  data-testid="styledCountryDownArrow"
                  isDisabled={isDeleting}
                  color="--icon-button-brand-primary-default"
                />
              }
              secondary
              textOnly
              onClick={() => {
                if (!isDeleting) toggle(!isOpen);
              }}
              data-testid="resend-verify-button"
            >
              {t('noumena.myaccount.delete_account_link_advanced')}
            </Button>
          </AdvancedSettingsWrapper>
          {isOpen && (
            <>
              <Spacer height={21} />
              <LinkIconWrapper>
                <TSpan font="body-m" colorToken="--text-body-neutral-default">
                  <RemoveAccount>
                    {t('noumena.myaccount.switch.personal_details_remove')}
                  </RemoveAccount>
                </TSpan>
                <Spacer width={16} />
                <CheckBoxWrapper>
                  <CheckBox
                    id="checkbox"
                    type="checkbox"
                    onChange={(event) => {
                      if (!isDeleting) onCheckboxChange(event);
                    }}
                    disabled={isDeleting}
                  />
                  <CheckBoxLabel htmlFor="checkbox" />
                </CheckBoxWrapper>
              </LinkIconWrapper>
            </>
          )}
        </Form>
        <Spacer height={16} />
        <Button
          secondary
          size="full"
          intent="negative"
          testId="primaryBtn"
          textTestId="primaryBtnLabel"
          onClick={handleSubmitSave}
          {...btnType}
          loading={isDeleting}
          disabled={typeDeleteValue !== 'DELETE' || isDeleting}
        >
          {t('noumena.myaccount.delete_account')}
        </Button>
        <Spacer height={16} />
        <Button
          primary
          size="full"
          intent="negative"
          onClick={cancelCallback}
          testId="secondaryBtn"
          textTestId="secondaryBtnLabel"
          disabled={isDeleting}
        >
          {t('noumena.cancel')}
        </Button>
        <Spacer height="16px" />
        <DeleteFooter>
          <TSpan font="body-s" colorToken="--text-body-neutral-default">
            {t('noumena.myaccount.delete_account_footer')}
          </TSpan>
          <PrivacyPolicyLink
            isDisabled={isDeleting}
            onClick={() => {
              if (!isDeleting) window?.open(LINKS.PRIVACY, '_blank');
            }}
            font="body-s"
            colorToken="--text-body-neutral-default"
          >
            {t('noumena.myaccount.privacy_policy')}
          </PrivacyPolicyLink>
        </DeleteFooter>
      </ModalBody>
    </Modal>
  );
};
