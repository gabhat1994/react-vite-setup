import React, { useEffect } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useGetUserForContactCreationQuery } from '@/apollo/graphql';
import { Button } from '@/components/Button';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Modal } from '@/components/ExtendedModal/Modal';
import { Spinner } from '@/components/Spinner';
import { TextField } from '@/components/TextField';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Stack, StackItem } from '@/layout';
import { getErrorProps } from '@/utils/forms';
import { UserUtil } from '@/utils/user';
import {
  type NoumContactFormValues,
  SelectedUserType,
  useNoumContactForm,
} from '../../hooks/contactForm';
import { type SearchableNoumContact } from '../../types';
import { ContactFormMapper } from '../../utils/contactFormMapper';
import { CountrySelector } from './CountrySelector/CountrySelector';
import S from './styles';
import { UserField } from './UserField/UserField';

type ContactFormModalProps = {
  contact?: SearchableNoumContact;
  isOpenModal: boolean;
  onClose: () => void;
  onConfirm: (values: NoumContactFormValues) => void;
};
export const ContactFormModal: React.FC<ContactFormModalProps> = ({
  contact,
  isOpenModal,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const { isMobile } = useBreakpoints();

  const defaultValues = contact
    ? ContactFormMapper.fromSearchableNoumContact(contact)
    : ContactFormMapper.getDefaultValues();

  const form = useNoumContactForm({
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    setValue,
    getValues,
    watch,
    reset,
  } = form;

  const [userId, userType] = watch(['userId', 'userType']);

  const { data, loading } = useGetUserForContactCreationQuery({
    variables: {
      id: userId,
    },
    skip: userType !== SelectedUserType.Existing,
  });

  const selectedUserData = data?.user;
  const isEditMode = !!contact;

  useEffect(() => {
    if (!selectedUserData) {
      return;
    }

    const formValues = getValues();

    const { userAddress, ...user } = selectedUserData;
    setValue('fullName', formValues.fullName || UserUtil.renderFullName(user), {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue(
      'contactName',
      formValues.contactName || UserUtil.renderFullName(user),
    );
    setValue('email', (formValues.email || user.email) ?? '');
    setValue('title', (formValues.title || user.title) ?? '');
    setValue('street', (formValues.street || userAddress?.street) ?? '');
    setValue(
      'apartmentNo',
      (formValues.apartmentNo || userAddress?.apartment) ?? '',
    );
    setValue('city', (formValues.city || userAddress?.city) ?? '');
    setValue('state', (formValues.state || userAddress?.state) ?? '');
    setValue('zipCode', (formValues.zipCode || userAddress?.zipcode) ?? '');
  }, [getValues, selectedUserData, setValue]);

  return (
    <Modal
      isFullScreen={isMobile}
      open={isOpenModal}
      testId="add_new_contact_modal"
      size={ModalSize.L}
      onClose={onClose}
      isScrollableContent
      enableCloseButton
      disableBackdropClick
    >
      {loading && <Spinner />}
      <form onSubmit={handleSubmit(onConfirm)}>
        <FormProvider {...form}>
          <ModalHeader>
            {isEditMode
              ? t('noumena.noum_contacts.contact_form.title.edit')
              : t('noumena.noum_contacts.contact_form.title.add')}
          </ModalHeader>
          <ModalBody hasScrollBar>
            <Stack gap={24} vertical fullWidth>
              <S.Section>
                <S.SectionTitle>
                  {t('noumena.noum_contacts.contact_form.basic_information')}
                </S.SectionTitle>

                <S.SectionBody>
                  <UserField
                    canChangeUser={!isEditMode}
                    selectedUserData={selectedUserData}
                    userType={userType}
                    onSelectUser={(option) => {
                      setValue('fullName', option.value.fullName);
                      setValue('userType', option.value.userType);
                      setValue('contactName', option.value.fullName);
                    }}
                    onResetUser={() => {
                      reset(ContactFormMapper.getDefaultValues());
                    }}
                  />

                  <Controller
                    control={control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label={t(
                          'noumena.noum_contacts.contact_form.fields.email',
                        )}
                        disabled={
                          isEditMode ||
                          (userType === SelectedUserType.Existing &&
                            !!selectedUserData?.email)
                        }
                        {...getErrorProps(
                          fieldState,
                          selectedUserData && selectedUserData.email
                            ? t(
                                'noumena.noum_contacts.contact_form.fields.email.from_user_no_edit',
                                { firstName: selectedUserData.firstName ?? '' },
                              )
                            : undefined,
                        )}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="contactName"
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label={t(
                          'noumena.noum_contacts.contact_form.fields.contact_name',
                        )}
                        {...getErrorProps(
                          fieldState,
                          t(
                            'noumena.noum_contacts.contact_form.fields.contact_name.helper_text',
                          ),
                        )}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="title"
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label={t(
                          'noumena.noum_contacts.contact_form.fields.title',
                        )}
                        {...getErrorProps(fieldState)}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="companyName"
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label={t(
                          'noumena.noum_contacts.contact_form.fields.company_name',
                        )}
                        {...getErrorProps(fieldState)}
                      />
                    )}
                  />
                </S.SectionBody>
              </S.Section>
              <S.Section>
                <S.SectionTitle>
                  {t('noumena.noum_contacts.contact_form.billing_details')}
                </S.SectionTitle>
                <S.SectionBody>
                  <Controller
                    control={control}
                    name="country"
                    render={({ field: { ref, ...fieldProps }, fieldState }) => (
                      <CountrySelector
                        label={t(
                          'noumena.noum_contacts.contact_form.fields.country',
                        )}
                        {...fieldProps}
                        {...getErrorProps(fieldState)}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="city"
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label={t(
                          'noumena.noum_contacts.contact_form.fields.city',
                        )}
                        {...getErrorProps(fieldState)}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="street"
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label={t(
                          'noumena.noum_contacts.contact_form.fields.street',
                        )}
                        {...getErrorProps(fieldState)}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="apartmentNo"
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label={t(
                          'noumena.noum_contacts.contact_form.fields.apartment_no',
                        )}
                        {...getErrorProps(fieldState)}
                      />
                    )}
                  />
                  <Stack gap={8} fullWidth>
                    <StackItem grow={1}>
                      <Controller
                        control={control}
                        name="state"
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            label={t(
                              'noumena.noum_contacts.contact_form.fields.state',
                            )}
                            {...getErrorProps(fieldState)}
                          />
                        )}
                      />
                    </StackItem>
                    <StackItem grow={1}>
                      <Controller
                        control={control}
                        name="zipCode"
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            label={t(
                              'noumena.noum_contacts.contact_form.fields.zip_code',
                            )}
                            {...getErrorProps(fieldState)}
                          />
                        )}
                      />
                    </StackItem>
                  </Stack>
                </S.SectionBody>
              </S.Section>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Stack fullWidth gap={16}>
              <Button
                primary
                size="full"
                testId="confirm_btn"
                tertiary
                grow
                loading={false}
                onClick={onClose}
                disabled={isSubmitting}
              >
                {t('noumena.cancel')}
              </Button>
              <Button
                primary
                type="submit"
                size="full"
                loading={isSubmitting}
                softDisabled={!isValid}
                disabled={isSubmitting}
              >
                {isEditMode
                  ? t('noumena.noum_contacts.contact_form.cta.submit.edit')
                  : t('noumena.noum_contacts.contact_form.cta.submit.add')}
              </Button>
            </Stack>
          </ModalFooter>
        </FormProvider>
      </form>
    </Modal>
  );
};
