import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useError, useToast, useToggle } from '@/hooks';
import { useEditPasswordMutation } from '@/apollo/graphql';
import { t } from 'i18next';
import { useEffect } from 'react';
import { usePasswordStrength } from '@/features/social-authentication';
import { type EditPasswordFrom } from './editPasswordTypes';
import { editPasswordSchema } from './schema';

type UseEditPasswordProps = {
  onSuccess?: () => void;
};

export const useEditPassword = ({ onSuccess }: UseEditPasswordProps) => {
  const toast = useToast();
  const logger = useError();
  const { analysis, analyzePassword } = usePasswordStrength();
  const [oldPasswordVisible, toggleOldPasswordVisibility] = useToggle(false);
  const [newPasswordVisible, toggleNewPasswordVisibility] = useToggle(false);

  const formMethods = useForm<EditPasswordFrom>({
    mode: 'all',
    resolver: yupResolver(editPasswordSchema),
  });

  const {
    watch,
    clearErrors,
    setError,
    formState: { errors },
  } = formMethods;

  const showErrorForNewPassword =
    errors.newPassword?.type === 'required' ||
    errors.newPassword?.type === 'notOneOf';

  const [editPassword, { loading }] = useEditPasswordMutation({
    onCompleted: ({ editAccountPassword }) => {
      const { success, message } = editAccountPassword || {};

      if (!success && message) {
        toast.addErrorToast(message);
        return;
      }

      if (success) {
        toast.addSuccessIconToast(
          message || t('noumena.password.edit.successful'),
        );
        onSuccess?.();
      }
    },

    onError: (error) => logger.logError(error, 'edit-password-mutation'),
  });

  const changePassword = (values: EditPasswordFrom) => {
    editPassword({
      variables: {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      },
    });
  };

  const passwords = watch();

  const showHelper = !!(formMethods.watch('newPassword') || '').length;

  useEffect(() => {
    const { oldPassword, newPassword } = passwords;
    const passwordsAreEntered = !!oldPassword && !!newPassword;
    const passwordsAreSame = oldPassword === newPassword;
    const isErrorLogged = errors.newPassword?.type === 'notOneOf';
    if (passwordsAreEntered && !passwordsAreSame && isErrorLogged) {
      clearErrors('newPassword');
      return;
    }
    if (passwordsAreEntered && passwordsAreSame && !isErrorLogged) {
      setError('newPassword', {
        type: 'notOneOf',
        message: t('noumena.same.password.error.text'),
      });
    }
  }, [clearErrors, errors.newPassword, passwords, setError]);

  return {
    formMethods,
    loading,

    oldPassword: {
      visible: oldPasswordVisible,
      toggleVisibility: toggleOldPasswordVisibility,
    },

    newPassword: {
      visible: newPasswordVisible,
      toggleVisibility: toggleNewPasswordVisibility,
      showErrorForNewPassword,
      analysis,
      showHelper,
    },

    handlers: {
      changePassword,
      analyzePassword,
    },
  };
};
