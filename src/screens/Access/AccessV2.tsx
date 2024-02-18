import { t } from 'i18next';
import { Spinner, TSpan } from '@/components';
import { FormProvider } from 'react-hook-form';
import { useBreakpoints } from '@/hooks';
import NewAuthLayout from '@/layout/NewAuthLayout';
import { TextHead } from './stylesv2';
import { useAccess } from './useAccess';
import { NonNoumenaSignUp } from './NonNoumenaSignUP';
import { Success } from './Success';
import { InValidLink } from './InvalidLink';

export const AccessV2 = () => {
  const { password, handlers, loading, validating, formMethods, screen } =
    useAccess();

  const devices = useBreakpoints();

  if (validating) {
    return (
      <NewAuthLayout overflow="auto" dynamicHeight={devices.isMobile}>
        <Spinner />
        <TextHead>
          <TSpan
            font="heading-xs-bold"
            colorToken="--text-card-neutral-highlighted"
            textAlign="center"
          >
            {t('noumena.non_member.login_loader_text')}
          </TSpan>
        </TextHead>
      </NewAuthLayout>
    );
  }

  return (
    <NewAuthLayout overflow="auto" dynamicHeight={devices.isMobile}>
      {screen === 'signup' && (
        <FormProvider {...formMethods}>
          <NonNoumenaSignUp
            analysis={password.analysis}
            loading={loading}
            visible={password.visible}
            showHelper={password.showHelper}
            analyzePassword={handlers.analyzePassword}
            handleSignup={handlers.handleSignup}
            handleTermsOfUse={handlers.termsOfUse}
            toggleFieldFocus={handlers.toggleFieldFocus}
            toggleVisibility={handlers.toggleVisibility}
          />
        </FormProvider>
      )}

      {screen === 'success' && (
        <Success onGoToNoumena={handlers.login} loading={loading} />
      )}

      {screen === 'invalid-link' && (
        <InValidLink onGoToLogin={handlers.handleLoginNavigation} />
      )}
    </NewAuthLayout>
  );
};
