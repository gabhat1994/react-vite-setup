import { FormProvider } from 'react-hook-form';
import NewAuthLayout from '@/layout/NewAuthLayout';
import { useResetPassword } from './useResetPassword';
import { EmailVerificationForm } from './EmailVerificationForm';
import { OTPVerify } from './OTPVerify';
import { CreatePasswordForm } from './CreatePasswordForm';
import { Success } from './Success';

export const ResetPassword = () => {
  const { formMethods, handlers, password, step, ...rest } = useResetPassword();

  return (
    <NewAuthLayout
      dynamicWidth
      overflow="auto"
      showBackButton={rest.showBackButton}
      onBackClick={handlers.handleBack}
      disableBackButton={rest.disableBackButton}
    >
      {step === 'enter-email' && (
        <FormProvider {...formMethods.emailForm}>
          <EmailVerificationForm
            onGenerateOtp={handlers.generateOtp}
            loading={rest.loading}
          />
        </FormProvider>
      )}

      {step === 'otp-validation' && (
        <FormProvider {...formMethods.emailForm}>
          <OTPVerify
            loading={rest.loading}
            timeElapsed={rest.timeElapsed}
            remainingRequest={rest.request.remainingRequest}
            nextRequestAfterInSecond={rest.request.nextRequestAfterInSecond}
            onTimeOut={handlers.onToggleTimer}
            onResend={handlers.generateOtp}
            onConfirm={handlers.verifyOtpFunc}
          />
        </FormProvider>
      )}

      {step === 'create-password' && (
        <FormProvider {...formMethods.createPasswordForm}>
          <CreatePasswordForm
            passwordAnalysis={password.analysis}
            showHelper={password.showPasswordHelper}
            isPasswordVisible={password.visible}
            loading={rest.loading}
            onFocusChanged={handlers.toggleIsFieldFocused}
            onPasswordAnalysis={handlers.analyzePassword}
            togglePasswordVisibility={handlers.toggleVisibility}
            onCreatePassword={handlers.resetPasswordFunc}
          />
        </FormProvider>
      )}

      {step === 'success' && <Success onLogin={handlers.login} />}
    </NewAuthLayout>
  );
};
