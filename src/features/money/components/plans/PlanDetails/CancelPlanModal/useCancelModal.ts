import { useState } from 'react';
import { useToast } from '@/hooks';
import { useCancelSubscriptionMutation } from '@/apollo/graphql';
import { useNavigate } from 'react-router';
import ROUTES from '@/constants/routes';
import { type Steps } from './types';
import { ReasonsList as reasonList } from './constant';

export const useCancelModal = (planId?: number) => {
  const [step, setStep] = useState<Steps>('submit');
  const toast = useToast();
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState('');
  const [cancelSubscription, { loading: canceling }] =
    useCancelSubscriptionMutation({
      onCompleted: () => {
        navigate(ROUTES.MY_PLAN);
        toast.addSuccessIconToast(
          'Subscription cancelled. All Noums from this Plan have been archived.',
        );
      },
    });

  const handRemove = () => {
    setStep('feedback');
  };

  const handReset = () => {
    setStep('submit');
  };
  const handleSubmitRequest = () => {
    if (!planId || !selectedReason) return;
    cancelSubscription({
      variables: {
        subscription_id: planId,
        reason: selectedReason,
      },
    });
  };

  const updateCancellationReason = (reason: string) => {
    setSelectedReason(reason);
  };

  return {
    step,
    handRemove,
    handleSubmitRequest,
    handReset,
    reasonList,
    updateCancellationReason,
    canceling,
    selectedReason,
  };
};
