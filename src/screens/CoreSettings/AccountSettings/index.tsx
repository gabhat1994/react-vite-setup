import { useState, useCallback, useEffect, useMemo } from 'react';
import { t } from 'i18next';
import { Button } from '@/components/Button';
import { Spacer, Stack } from '@/layout';
import {
  type EditPhoneNumberModalProps,
  type ModalType,
} from '@/screens/CoreSettings/AccountSettings/types';
import { useAuth } from '@/features/auth/contexts';
import { useBreakpoints, useLaunchDarkly, useToast } from '@/hooks';
import {
  type Maybe,
  type OtpResponseOutput,
  type UserProfileInput,
} from '@/apollo/generated/types';
import { TSpan } from '@/components/Typography';
import { PersonalEventId } from '@/features/coreSettings';
import EmailAddressSection from '@/screens/CoreSettings/AccountSettings/EmailAddressSection';
import PhoneNumberSection from '@/screens/CoreSettings/AccountSettings/PhoneNumberSection';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { EditAndEnableEmailAddressModal } from './Modals/EditAndEnableEmailAddressModal';
import { EditAndEnablePhoneNumberModal } from './Modals/EditAndEnablePhoneNumberModal';
import { OtpModal } from './Modals/OtpModal';
import { DeleteAccountModal } from './Modals/DeleteAccountModal';
import {
  AccountWrapper,
  AccountWrapperV2,
  DeleteAccountWrapper,
  DeleteAccountWrapperV2,
  DivWrapper,
  StyledButton,
  StyledStack,
} from './styles';
import { HeaderWrapper } from '../PersonalDetails/styles';
import { PasswordSection } from './PasswordSection';
import { CreatePassword } from './Modals/CreatePassword/CreatePassword';
import { EditPassword } from './Modals/EditPassword/EditPassword';

enum AccountSettingsModal {
  EditPhoneNumber = 'EditPhoneNumber',
  EnablePhoneNumber = 'EnablePhoneNumber',
  EnableEmailAddress = 'EnableEmailAddress',
  EditEmailAddress = 'EditEmailAddress',
  DeleteAccount = 'DeleteAccount',
  Opt = 'Opt',
}

function AccountSettings() {
  const { addToast } = useToast();
  const { user, refetchUserData } = useAuth();
  const { openModal, modalType, closeModal } = useModalManager<ModalType>();
  const { isTablet, isMobile, isSmallerThanLaptop } = useBreakpoints();
  const {
    flags: { newSignUp, socialhallUniqueLink },
  } = useLaunchDarkly();
  const [currentlyOpenModal, setCurrentlyOpenModal] =
    useState<AccountSettingsModal | null>(null);

  const [phoneOrEmail, setPhoneOrEmail] = useState('');

  const [type, setType] = useState('');

  const [userProfileDetails, setUserProfileDetails] =
    useState<UserProfileInput>({
      phone: user?.phone,
      email: user?.email,
    });

  const isPasswordExists = useMemo(
    () =>
      !!user?.credentials?.find((cred) => cred?.providerType === 'PASSWORD'),
    [user?.credentials],
  );

  const onEditPhoneNumberButtonClick = () =>
    setCurrentlyOpenModal(AccountSettingsModal.EditPhoneNumber);

  const onEditEmailAddressButtonClick = () =>
    setCurrentlyOpenModal(AccountSettingsModal.EditEmailAddress);

  const onDeleteAccountButtonClick = () =>
    setCurrentlyOpenModal(AccountSettingsModal.DeleteAccount);

  const onEnablePhoneButtonClick = () =>
    setCurrentlyOpenModal(AccountSettingsModal.EnablePhoneNumber);

  const onEnableEmailAddressButtonClick = () =>
    setCurrentlyOpenModal(AccountSettingsModal.EnableEmailAddress);

  const onPhoneOrEmailFailed = useCallback(
    (checkType: string, data: Maybe<OtpResponseOutput | undefined>) => {
      let errMsg = data?.message;
      if (data?.Status === 404) {
        errMsg =
          checkType === 'phone'
            ? t('noumena.phone_login_form.phone_number.not_exist_error')
            : t('noumena.email_login_form.email_address.not_exist_error');
      }

      addToast('error', 'none', `${t('noumena.toast_error.text')}: ${errMsg}`);
    },
    [addToast],
  );

  const onPhoneOrEmailSuccess = useCallback(
    (
      checkType: string,
      data: Maybe<OtpResponseOutput | undefined>,
      phoneNumberOrEmail: string,
    ) => {
      setType(checkType);
      setPhoneOrEmail(phoneNumberOrEmail);
      setCurrentlyOpenModal(AccountSettingsModal.Opt);
      addToast('success', 'none', t('noumena.verification_code_sent.text'));
    },
    [addToast],
  );

  const onVerifyFailed = useCallback(
    (message: string) => {
      addToast('error', 'none', `${t('noumena.toast_error.text')}: ${message}`);
    },
    [addToast],
  );

  const onVerifySuccess = useCallback(
    (message: string) => {
      addToast(
        'success',
        'none',
        `${t('noumena.toast_success.text')}: ${message}`,
      );
      setCurrentlyOpenModal(null);
      refetchUserData();
    },
    [addToast, refetchUserData],
  );

  useEffect(() => {
    setUserProfileDetails({
      phone: user?.phone,
      email: user?.email,
    });
  }, [user]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserProfileDetails({
        ...userProfileDetails,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    },
    [userProfileDetails, setUserProfileDetails],
  );

  const defaultModalProps: EditPhoneNumberModalProps = {
    isEdit: true,
    cancelCallback: () => {
      setCurrentlyOpenModal(null);
    },
    onFailed: onPhoneOrEmailFailed,
    onSuccess: onPhoneOrEmailSuccess,
  };

  const renderModal = () => {
    if (currentlyOpenModal) {
      switch (currentlyOpenModal) {
        case AccountSettingsModal.DeleteAccount:
          return (
            <DeleteAccountModal
              {...defaultModalProps}
              data-testid="deleteAccountModal"
            />
          );
        case AccountSettingsModal.EnablePhoneNumber:
          return (
            <EditAndEnablePhoneNumberModal
              {...defaultModalProps}
              isEdit={false}
              data-testid="enablePhoneNumberModal"
            />
          );
        case AccountSettingsModal.EditPhoneNumber:
          return (
            <EditAndEnablePhoneNumberModal
              {...defaultModalProps}
              data-testid="editPhoneNumberModal"
            />
          );
        case AccountSettingsModal.EnableEmailAddress:
          return (
            <EditAndEnableEmailAddressModal
              {...defaultModalProps}
              isEdit={false}
              data-testid="enableEmailAddressModal"
            />
          );
        case AccountSettingsModal.EditEmailAddress:
          return (
            <EditAndEnableEmailAddressModal
              {...defaultModalProps}
              data-testid="editEmailAddressModal"
            />
          );
        case AccountSettingsModal.Opt:
          return (
            <OtpModal
              data-testid="optModal"
              onVerifyFailed={onVerifyFailed}
              onVerifySuccess={onVerifySuccess}
              onEmailOrPhoneOtpFailed={onPhoneOrEmailFailed}
              onEmailOrPhoneOtpSuccess={onPhoneOrEmailSuccess}
              phoneOrEmail={phoneOrEmail}
              type={type}
              cancelCallback={() => {
                setCurrentlyOpenModal(null);
              }}
            />
          );
        default:
          return <></>;
      }
    }
    return <></>;
  };

  if (!user) {
    return <></>;
  }

  const Wrapper = newSignUp ? AccountWrapperV2 : AccountWrapper;

  return (
    <>
      <Wrapper>
        <HeaderWrapper>
          <TSpan
            font="heading-m-bold"
            colorToken="--text-card-header-neutral-highlighted"
          >
            {' '}
            {t('noumena.myaccount.account_settings')}
          </TSpan>
        </HeaderWrapper>
        {!isSmallerThanLaptop && <Spacer height={32} />}
        {!newSignUp && (
          <PhoneNumberSection
            user={user}
            handleChange={handleChange}
            onEnablePhoneButtonClick={onEnablePhoneButtonClick}
            onEditPhoneNumberButtonClick={onEditPhoneNumberButtonClick}
            userProfileDetails={userProfileDetails}
          />
        )}
        {!isSmallerThanLaptop && <Spacer height={36} />}
        <EmailAddressSection
          user={user}
          handleChange={handleChange}
          userProfileDetails={userProfileDetails}
          onEnableEmailAddressButtonClick={onEnableEmailAddressButtonClick}
          onEditEmailAddressButtonClick={onEditEmailAddressButtonClick}
          isNewSignUp={newSignUp}
        />
        {newSignUp && (
          <StyledStack fullWidth justify="space-between" gap={16} borderBottom>
            <PasswordSection
              label={
                isPasswordExists
                  ? t('noumena.edit.password')
                  : t('noumena.create.password')
              }
              onEditOrCreate={() =>
                openModal(
                  isPasswordExists ? 'edit-password' : 'create-password',
                )
              }
            />
          </StyledStack>
        )}
        {socialhallUniqueLink && (
          <Stack data-testid="personal-event-id-section" maxWidth={590}>
            <PersonalEventId />
          </Stack>
        )}
        {!newSignUp && (
          <DivWrapper>
            <DeleteAccountWrapper>
              <StyledButton>
                <Button
                  secondary
                  textOnly
                  onClick={onDeleteAccountButtonClick}
                  data-testid="delete-account"
                >
                  {t('noumena.myaccount.account_settings_delete_my_account')}
                </Button>
              </StyledButton>
            </DeleteAccountWrapper>
          </DivWrapper>
        )}
      </Wrapper>
      {renderModal()}
      {newSignUp && (
        <DeleteAccountWrapperV2
          align="center"
          justify={isTablet || isMobile ? 'center' : 'flex-start'}
        >
          <Button
            secondary
            textOnly
            onClick={onDeleteAccountButtonClick}
            data-testid="delete-account"
          >
            {t('noumena.myaccount.account_settings_delete_my_account')}
          </Button>
        </DeleteAccountWrapperV2>
      )}

      {modalType === 'create-password' && (
        <CreatePassword
          open={modalType === 'create-password'}
          onClose={closeModal}
        />
      )}

      {modalType === 'edit-password' && (
        <EditPassword
          open={modalType === 'edit-password'}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default AccountSettings;
