import { useCallback } from 'react';
import { t } from 'i18next';
import * as Sentry from '@sentry/react';
import { useGetSubWalletBalanceLazyQuery } from '@/apollo/graphql';
import { useToast } from '@/hooks/toast';

export function useSubWalletDeleteHelper() {
  const { addToast } = useToast();

  const handleError = useCallback(
    (networkError: String | Error | null) => {
      addToast(
        'error',
        'none',
        `${t('noumena.toast_error.text')}: ${networkError}`,
      );
    },
    [addToast],
  );

  const [gqlGetSubWalletBalance] = useGetSubWalletBalanceLazyQuery();

  const subWalletDeleteHelper = useCallback(
    async (
      chamberId: string | null | undefined,
      regularDeleteFlow: () => void,
      handleCloseNonZeroWalletModal: () => void,
    ) => {
      if (chamberId) {
        await gqlGetSubWalletBalance({
          variables: {
            chamberId,
          },
          onError: (err) => {
            if (err instanceof Error) {
              handleError(err?.message);
              Sentry.captureException(new Error(err?.message), {
                tags: {
                  section: 'gqlGetSubWalletBalance',
                },
              });
            }
          },
          onCompleted: (res) => {
            if (
              res?.getSubWalletBalance?.amount?.value &&
              res?.getSubWalletBalance?.amount?.value > 0
            ) {
              handleCloseNonZeroWalletModal();
            } else {
              regularDeleteFlow();
            }
          },
        });
      }
    },
    [gqlGetSubWalletBalance, handleError],
  );

  return { subWalletDeleteHelper };
}

export default useSubWalletDeleteHelper;
