import { useNavigate } from 'react-router';
import { useGetWalletQuery } from '@/apollo/graphql';
import { useToast } from '@/hooks';
import ROUTES from '@/constants/routes';
import { KycNoumenaStatusEnum } from '@/apollo/generated/types';
import { t } from 'i18next';

export function useRedirectToMoneyPage() {
  const navigate = useNavigate();
  const toast = useToast();

  useGetWalletQuery({
    onCompleted: (data) => {
      if (
        data.getWalletBalance?.noumenaStatus !== KycNoumenaStatusEnum.Approved
      ) {
        navigate(`${ROUTES.MONEY}`);
        toast.addErrorToast(t('noumena.money-detail.block_view'));
      }
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.addErrorToast(err.message);
      }
    },
  });
}
