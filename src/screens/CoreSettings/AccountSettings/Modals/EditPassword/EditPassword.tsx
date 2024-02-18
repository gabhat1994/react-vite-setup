import {
  Modal,
  type IModal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { t } from 'i18next';
import { Spacer, Stack } from '@/layout';
import { Controller } from 'react-hook-form';
import { TextField } from '@/components/TextField';
import { Button, Icon } from '@/components';
import { PasswordHelper } from '@/features/social-authentication/components/PasswordHelper';
import { useEditPassword } from './useEditPassword';
import { Form } from './styles';

type CreatePasswordProps = {
  open: boolean;
  onClose: IModal['onClose'];
};

export const EditPassword = ({ open, onClose }: CreatePasswordProps) => {
  const { formMethods, oldPassword, newPassword, handlers, loading } =
    useEditPassword({
      onSuccess: onClose,
    });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = formMethods;

  return (
    <Modal open={open} onClose={onClose} enableCloseButton size={ModalSize.M}>
      <ModalHeader topPadding={0} bottomPadding={0}>
        {t('noumena.change.password')}
      </ModalHeader>
      <ModalBody align="center">
        <Spacer height={16} />
        <Form onSubmit={handleSubmit(handlers.changePassword)}>
          <Stack vertical gap={24} fullWidth>
            <Stack vertical gap={16} fullWidth>
              <Controller
                control={control}
                name="oldPassword"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    blockEmptySpaces
                    name="oldPassword"
                    type={oldPassword.visible ? 'text' : 'password'}
                    value={value}
                    label={t('noumena.current.password')}
                    error={
                      errors.oldPassword?.type === 'required'
                        ? !!errors.oldPassword
                        : undefined
                    }
                    onChange={onChange}
                    helperText={
                      errors.oldPassword?.type === 'required'
                        ? errors.oldPassword.message
                        : undefined
                    }
                    data-testid="passwordInput"
                    rightIcon={
                      <Icon
                        name={oldPassword.visible ? 'eye_off_m' : 'eye_on_m'}
                        size={24}
                        onClick={oldPassword.toggleVisibility}
                      />
                    }
                  />
                )}
              />
              <Stack vertical fullWidth>
                <Controller
                  control={control}
                  name="newPassword"
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      blockEmptySpaces
                      name="newPassword"
                      type={newPassword.visible ? 'text' : 'password'}
                      value={value}
                      label={t('noumena.new.password')}
                      error={
                        newPassword.showErrorForNewPassword
                          ? !!errors.newPassword
                          : undefined
                      }
                      onChange={(e) => {
                        handlers.analyzePassword(e);
                        onChange(e);
                      }}
                      helperText={
                        newPassword.showErrorForNewPassword
                          ? errors?.newPassword?.message
                          : undefined
                      }
                      data-testid="passwordInput"
                      rightIcon={
                        <Icon
                          name={newPassword.visible ? 'eye_off_m' : 'eye_on_m'}
                          size={24}
                          onClick={newPassword.toggleVisibility}
                        />
                      }
                    />
                  )}
                />
                {newPassword.showHelper && (
                  <PasswordHelper
                    passwordStates={newPassword.analysis}
                    hideUndeerline
                  />
                )}
              </Stack>
            </Stack>
            <Stack gap={16} fullWidth>
              <Button size="full" onClick={onClose}>
                {t('noumena.cancel')}
              </Button>
              <Button
                primary
                disabled={!isValid || loading}
                loading={loading}
                type="submit"
                size="full"
              >
                {t('noumena.change_password')}
              </Button>
            </Stack>
          </Stack>
        </Form>
      </ModalBody>
    </Modal>
  );
};
