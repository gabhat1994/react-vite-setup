import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import ROUTES from '@/constants/routes';

import { useUploadDocumentStatusQuery } from '@/apollo/graphql';
import { Spinner } from '@/components';
import { DocumentStatusV2 } from '@/features/money/types';
import { useToast } from '@/hooks';
import { t } from 'i18next';
import { SubmittedScreen } from './SubmittedScreen';
import { ApplicationReview as UploadComponent } from './ApplicationReview';

const ApplicationReviewV2 = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { addSuccessIconToast } = useToast();
  const { loading: fetchingDocStatus } = useUploadDocumentStatusQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ getWalletBalance }) => {
      const { docStatus } = getWalletBalance || {};
      const documentAlreadySubmitted = Object.values(DocumentStatusV2).includes(
        docStatus as DocumentStatusV2,
      );

      if (documentAlreadySubmitted) {
        addSuccessIconToast(
          t('noumena.money.setupWallet.document.already.uploaded'),
        );
        navigate(ROUTES.MONEY);
      }
    },
  });

  const onSave = useCallback(() => {
    setStep(1);
  }, []);

  const handleNavigation = useCallback(() => {
    navigate(ROUTES.MONEY);
  }, [navigate]);

  if (fetchingDocStatus) {
    return <Spinner />;
  }

  return step === 0 ? (
    <UploadComponent onSuccessfulUpload={onSave} />
  ) : (
    <SubmittedScreen onButtonClick={handleNavigation} />
  );
};
export default ApplicationReviewV2;
