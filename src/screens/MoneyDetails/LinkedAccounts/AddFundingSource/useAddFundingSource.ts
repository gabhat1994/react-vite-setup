import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@/hooks';
import { useInitiateMicroDepositDwollaMutation } from '@/apollo/graphql';
import { DwollaAccountType } from '@/apollo/generated/types';
import { addFundingSourceFormSchema } from './schema';
import { AccountType, type Steps, type TAddFundingSourceForm } from './type';

export const useAddFundingSource = (successCallback?: () => void) => {
  const [step, setStep] = useState<Steps>('enter-data');

  const toast = useToast();

  const [initiateMicroDepositDwolla, { loading }] =
    useInitiateMicroDepositDwollaMutation({
      onCompleted: (res) => {
        if (res.initiateMicroDepositDwolla?.id) {
          setStep('success');
          successCallback?.();
        }
      },
      onError: (err) => {
        if (err instanceof Error) {
          toast.addErrorToast(err.message);
        }
      },
    });

  const addFundingSourceForm = useForm<TAddFundingSourceForm>({
    defaultValues: {
      accountType: AccountType.Checking,
    },
    mode: 'all',
    resolver: yupResolver(addFundingSourceFormSchema),
  });

  const [accountNumber, reAccountNumber] = addFundingSourceForm.watch([
    'accountNumber',
    'reAccountNumber',
  ]);

  useEffect(() => {
    // @TODO: find out why this is necessary for proper revalidating the form.
    if (reAccountNumber && accountNumber) {
      addFundingSourceForm.trigger(['accountNumber', 'reAccountNumber']);
    }
  }, [addFundingSourceForm, reAccountNumber, accountNumber]);

  const addFundingSource = useCallback(async () => {
    const [routingNumber, accountName, accountType] =
      addFundingSourceForm.getValues([
        'routingNumber',
        'accountName',
        'accountType',
      ]);
    await initiateMicroDepositDwolla({
      variables: {
        input: {
          name: accountName,
          accountNumber,
          routingNumber,
          accountType:
            accountType === AccountType.Checking
              ? DwollaAccountType.Checking
              : DwollaAccountType.Savings,
        },
      },
    });
  }, [accountNumber, addFundingSourceForm, initiateMicroDepositDwolla]);

  return {
    loading,
    formMethods: addFundingSourceForm,
    step,
    handlers: {
      addFundingSource,
    },
  };
};
