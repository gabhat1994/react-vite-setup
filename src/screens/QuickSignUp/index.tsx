import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInitialSignUp } from '@/features/onboarding/hooks';
import { SignUpForm } from '../Register/Steps/StepOne';
import { QuickSignUpScreenLayout } from './QuickSignUpScreenLayout';
import { QuickSignUpBody } from './styles';

const QuickSignUp = () => {
  const {
    setIsSigningUpFromNextApp,
    setQuickSignUpNoumID,
    setIsLoggingingUpFromNextApp,
    setBackUrl,
    backUrl,
  } = useInitialSignUp();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsSigningUpFromNextApp(true);
    setIsLoggingingUpFromNextApp(false);
    const quickNoumID = searchParams.get('quickNoumID') ?? null;
    const backurl = searchParams.get('backurl') ?? '';
    if (quickNoumID && backurl) {
      setQuickSignUpNoumID(quickNoumID);
      setBackUrl(backurl);
    }
  }, [
    searchParams,
    setIsLoggingingUpFromNextApp,
    setIsSigningUpFromNextApp,
    setQuickSignUpNoumID,
    setBackUrl,
  ]);
  const handleBack = useCallback(() => {
    window.location.href = `../noums/${backUrl}`;
  }, [backUrl]);
  return (
    <QuickSignUpScreenLayout onBackClick={handleBack}>
      <QuickSignUpBody>
        <SignUpForm />
      </QuickSignUpBody>
    </QuickSignUpScreenLayout>
  );
};
export default QuickSignUp;
