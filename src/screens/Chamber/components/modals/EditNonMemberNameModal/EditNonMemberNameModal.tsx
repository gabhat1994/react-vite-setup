import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { cloneDeep } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';

import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';

import { TextField } from '@/components/TextField';
import { useAuth } from '@/features/auth/contexts';
import { type UserProfileInput } from '@/apollo/generated/types';
import { useUpdateProfileHelper } from '@/screens/CoreSettings/PersonalDetails/useUpdateProfileHelper';
import { formValues, userProfileInputSchema } from './data';
import { StyledForm } from './styles';
import { type EditNonMemberNameModalProps } from './types';

export const EditNonMemberNameModal = ({
  isOpen = true,
  title,
  positiveBtnLabel,
  positiveBtnType = 'primary',
  positiveBtnIntent = undefined,
  extraBtnCallback,
  confirmCallback,
  cancelCallback,
}: EditNonMemberNameModalProps) => {
  const { t } = useTranslation();
  const { user, setInitialNoumId } = useAuth();
  const { handleSave } = useUpdateProfileHelper();
  const [updateLoader, setUpdateLoader] = useState(false);
  const [initialValues, setInitialValues] = useState<UserProfileInput>();
  const {
    reset,
    register,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserProfileInput>({
    resolver: yupResolver(userProfileInputSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    },
  });
  const btnType: { [key: string]: boolean } = {};
  if (positiveBtnType) btnType[positiveBtnType] = true;
  const handleChange = useCallback(() => {
    trigger();
  }, [trigger]);

  const onSubmit: SubmitHandler<UserProfileInput> = async (data) => {
    setInitialNoumId(undefined);
    const dataToSubmit = cloneDeep(data);
    if (
      dataToSubmit.firstName !== user?.firstName ||
      dataToSubmit.lastName !== user?.lastName
    ) {
      setUpdateLoader(true);
      const isSuccess = await handleSave(dataToSubmit);
      setUpdateLoader(false);
      if (isSuccess) {
        confirmCallback();
      }
    } else confirmCallback();
  };

  const initForm = useCallback(() => {
    if (user) {
      const values = formValues(user);
      reset(values);
      setInitialValues(values);
    }
  }, [reset, user]);

  useEffect(() => {
    if (!initialValues && isOpen) {
      initForm();
    }
  }, [initForm, initialValues, isOpen]);

  const handleClose = () => {
    initForm();
    cancelCallback?.();
  };

  return (
    <Modal
      testId="editNonMemberNameModal"
      open={isOpen}
      onClose={cancelCallback ? handleClose : undefined}
      size={ModalSize.M}
      disableBackdropClick
    >
      <ModalHeader>
        {title || t(`noumena.non_member.edit_name_modal.title`)}
      </ModalHeader>
      <Spacer height="16px" />
      <ModalBody>
        <TSpan
          colorToken="--text-modal-neutral-default"
          font="body-l"
          data-testid="description"
          textAlign="center"
        >
          {t(`noumena.non_member.edit_name_modal.description`)}
        </TSpan>
        <Spacer height="16px" />
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('firstName', {
              required: {
                value: true,
                message: t(`noumena.home_noum.about_me.error.name_required`),
              },
              onChange: handleChange,
            })}
            value={getValues('firstName') ?? ''}
            label={t('noumena.home_noum.about_me.first_name_label')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <Spacer height={16} />
          <TextField
            {...register('lastName', {
              required: {
                value: true,
                message: t(`noumena.home_noum.about_me.error.name_required`),
              },
              onChange: handleChange,
            })}
            value={getValues('lastName') ?? ''}
            label={t('noumena.home_noum.about_me.last_name_label')}
            name="lastName"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            fullWidth
          />
          <Spacer height={28} />
          <Button
            size="full"
            type="submit"
            testId="primaryBtn"
            textTestId="primaryBtnLabel"
            {...btnType}
            {...(positiveBtnIntent ? { intent: positiveBtnIntent } : {})}
            loading={updateLoader}
            disabled={!isValid}
          >
            {positiveBtnLabel ||
              t(`noumena.non_member.edit_name_modal.btn.continue`)}
          </Button>
        </StyledForm>
        <Spacer height={16} />
        {extraBtnCallback && (
          <>
            <TSpan
              colorToken="--text-modal-neutral-default"
              font="body-s"
              data-testid="descriptionForExtraBtn"
              textAlign="center"
            >
              {t(
                `noumena.non_member.edit_name_modal.description_for_create_account`,
              )}
            </TSpan>
            <Spacer height={16} />
            <Button
              size="full"
              testId="extraBtn"
              textTestId="extraBtnLabel"
              onClick={extraBtnCallback}
              secondary
            >
              {t(`noumena.non_member.edit_name_modal.btn.create_an_account`)}
            </Button>
          </>
        )}
      </ModalBody>
    </Modal>
  );
};

export default EditNonMemberNameModal;
