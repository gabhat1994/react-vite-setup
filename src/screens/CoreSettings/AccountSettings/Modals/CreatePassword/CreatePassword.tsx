import { TSpan } from '@/components';
import {
  Modal,
  type IModal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { t } from 'i18next';
import { FormProvider } from 'react-hook-form';
import { useEditCreatePassword } from './useCreatePassword';
import { EnterPasswordForm } from './EnterPasswordForm';
import { OtpVerifyForm } from './OtpVerifyForm';
import { StyledTSpan } from './styles';

type CreatePasswordProps = {
  open: boolean;
  onClose: IModal['onClose'];
};

export const CreatePassword = ({ open, onClose }: CreatePasswordProps) => {
  const {
    screen,
    formMethods,
    password,
    handlers,
    loading,
    timeElapsed,
    request,
    email,
  } = useEditCreatePassword({ onPasswordUpdate: onClose });

  const EmailHeader = () => {
    let text = email;
    if (email && email.length > 30) {
      const arr = email.split('@');
      text = `${arr[0].substring(0, 30 - arr[1].length)}...@${arr[1]}`;
    }
    return (
      <StyledTSpan
        font="body-l"
        colorToken="--text-body-neutral-default"
        textAlign="center"
      >
        {t('noumena.reset.password.otp.sub.heading.one')}{' '}
        <TSpan colorToken="--text-body-neutral-highlighted">{text}</TSpan>{' '}
        {t('noumena.reset.password.otp.sub.heading.two')}
      </StyledTSpan>
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      enableCloseButton={screen === 'enter-password'}
      size={ModalSize.M}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <ModalHeader
        topPadding={0}
        tSpanProps={
          screen === 'enter-password'
            ? {
                font: 'heading-xs-bold',
              }
            : {
                font: 'heading-s-bold',
              }
        }
      >
        {screen === 'enter-password'
          ? t('noumena.create.a.password')
          : t('noumena.reset.password.otp.heading')}
      </ModalHeader>
      <FormProvider {...formMethods}>
        <ModalBody align="center" gap={screen === 'otp-verification' ? 24 : 16}>
          {screen === 'enter-password' ? (
            <TSpan
              font="body-l"
              colorToken="--text-body-neutral-default"
              textAlign="center"
            >
              {t('noumena.create.a.password.subheading')}
            </TSpan>
          ) : (
            <EmailHeader />
          )}
          {screen === 'enter-password' && (
            <EnterPasswordForm
              loading={loading.generatingOtp}
              showHelper={password.showHelper}
              analysis={password.analysis}
              visible={password.visible}
              onChangeVisibility={handlers.toggleVisibility}
              onAnalyzePassword={handlers.analyzePassword}
              onCloseModal={onClose}
              onEditOrCreatePassword={handlers.generateOtp}
            />
          )}

          {screen === 'otp-verification' && (
            <OtpVerifyForm
              loading={loading.generatingOtp}
              onConfirm={handlers.createPassword}
              timeElapsed={timeElapsed}
              nextRequestAfterInSecond={request.nextRequestAfterInSecond}
              onResendForLoggedInUser={handlers.generateOtp}
              onTimeOut={handlers.toggleTimeElapsed}
              remainingRequest={request.remainingRequest}
              onCloseModal={onClose}
              createPasswordLoading={loading.creatingPassword}
            />
          )}
        </ModalBody>
      </FormProvider>
    </Modal>
  );
};
