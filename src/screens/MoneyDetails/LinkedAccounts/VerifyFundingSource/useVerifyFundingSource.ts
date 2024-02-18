import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import {
  useGetAccountByIdQuery,
  useVerifyMicroDepositDwollaMutation,
} from '@/apollo/graphql';
import { useToast } from '@/hooks';
import { CurrencyEnum } from '@/apollo/generated/types';
import { useTranslation } from 'react-i18next';
import { verifyFundingSourceFormSchema } from './schema';
import { type Steps, type TVerifyFundingSourceForm } from './type';

export const useVerifyFundingSource = (accountId: string | null) => {
  const toast = useToast();
  const { t } = useTranslation();
  const [failureCount, setFailureCount] = useState<number>(0);
  const [step, setStep] = useState<Steps>('verify-account');

  const { refetch, loading: accountInfoLoading } = useGetAccountByIdQuery({
    variables: {
      id: accountId!,
    },
    skip: !accountId,
    onError: (err) => {
      if (err instanceof Error) {
        toast.addErrorToast(err.message);
      }
    },
    onCompleted: (data) => {
      if (data.getAccountById?.microDeposits) {
        const failedDeposits = data.getAccountById?.microDeposits.filter(
          (deposit) => deposit?.status === 'FAILED',
        );
        setFailureCount(failedDeposits.length);
        if (failedDeposits.length === 3) {
          setStep('failure');
        }
      }
    },
  });

  const verifyFundingSourceForm = useForm<TVerifyFundingSourceForm>({
    mode: 'all',
    resolver: yupResolver(verifyFundingSourceFormSchema),
  });

  const [verifyMicroDepositDwolla, { loading: verfiyLoading }] =
    useVerifyMicroDepositDwollaMutation({
      onCompleted: (res) => {
        if (res.verifyMicroDepositDwolla?.id) {
          toast.addSuccessIconToast(
            t('nouman.money_details.bank_account_verification_complete'),
          );
        }
      },
      onError: (err) => {
        if (err instanceof Error) {
          toast.addErrorToast(err.message);
          refetch();
        }
      },
    });

  const loading = verfiyLoading || accountInfoLoading;

  const verifyFundingSource = useCallback(
    async (bankAccountId: string | null | undefined, refresh?: () => void) => {
      const amount1 = verifyFundingSourceForm.getValues('amount1');
      const amount2 = verifyFundingSourceForm.getValues('amount2');
      if (!amount1 || !amount2 || !bankAccountId) return;
      await verifyMicroDepositDwolla({
        variables: {
          input: {
            id: bankAccountId,
            microDeposits: {
              amount1: {
                currency: CurrencyEnum.Usd,
                value: Number(amount1),
              },
              amount2: {
                currency: CurrencyEnum.Usd,
                value: Number(amount2),
              },
            },
          },
        },
        onCompleted: (data) => {
          if (data.verifyMicroDepositDwolla?.id && refresh) {
            refresh();
          }
        },
      });
    },
    [verifyFundingSourceForm, verifyMicroDepositDwolla],
  );

  return {
    loading,
    formMethods: verifyFundingSourceForm,
    handlers: {
      verifyFundingSource,
    },
    step,
    failureCount,
  };
};
