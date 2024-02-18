import { type NoumTransactionFragment } from '@/apollo/graphql';
import { TSpan } from '@/components';
import { useBreakpoints } from '@/hooks';
import { Stack } from '@/layout';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { NoumCard } from '../NoumCard';
import { Wrapper } from './styles';

interface IPayAsYouGo {
  noDataFound: boolean;
  noums: (NoumTransactionFragment | null | undefined)[];
}

export const PayAsYouGo = ({ noums, noDataFound }: IPayAsYouGo) => {
  const { t } = useTranslation();
  const { isSmallerThanLaptop } = useBreakpoints();

  return (
    <Wrapper
      fullWidth
      padding={isSmallerThanLaptop ? 16 : 24}
      gap={isSmallerThanLaptop ? 16 : 24}
    >
      <TSpan
        font="heading-xs-bold"
        colorToken="--text-card-header-neutral-highlighted"
      >
        {t('noumena.plan_summary.pay_as_you_go')}
      </TSpan>
      {noDataFound && (
        <TSpan font="body-m" colorToken="--text-placeholder-neutral-default">
          No Plans Found
        </TSpan>
      )}
      <Stack vertical fullWidth gap={8}>
        {noums &&
          noums.map((noum) => (
            <NoumCard
              key={noum?.noum_transaction_fee_id}
              chamberName={noum?.chamber_id?.name}
              valid_till={
                noum?.valid_till
                  ? format(new Date(noum?.valid_till), 'dd/MM/yyyy')
                  : null
              }
              profileImage={noum?.chamber_id?.profileImage}
              planId={noum?.subscription_id?.subscription_id}
            />
          ))}
      </Stack>
    </Wrapper>
  );
};
