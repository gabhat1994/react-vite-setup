import { TSpan } from '@/components';
import { useBreakpoints } from '@/hooks';
import { type SubscriptionFragment } from '@/apollo/graphql/fragments/subscription.generated';
import { format } from 'date-fns';
import convertToCurrency from '@/utils/currencyToCurrency';
import { AllCurrencyEnum } from '@/apollo/generated/types';
import { PlanPriceUtils } from '@/features/money/utils';
import { type Maybe } from 'graphql/jsutils/Maybe';
import { useMyInvoiceByIdQuery } from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import { Wrapper, PaymentInformationStack } from './styles';

type PaymentSectionProps = {
  plan?: SubscriptionFragment;
  latestInvoiceId?: Maybe<number>;
  latestInvoiceStatus?: Maybe<string>;
};

export const PaymentSection = ({
  plan,
  latestInvoiceId,
  latestInvoiceStatus,
}: PaymentSectionProps) => {
  const { isSmallerThanLaptop } = useBreakpoints();

  const { data } = useMyInvoiceByIdQuery({
    skip: !latestInvoiceId || latestInvoiceStatus !== 'payment_due',
    variables: {
      input: {
        invoice_id: latestInvoiceId,
      },
    },
  });

  const cleanedData = cleanList(data?.getSelectedInvoiceDetails);
  const isLastPaymentFailed =
    cleanList(cleanedData[0]?.linked_payments)[0]?.txn_status === 'failure';

  return (
    <Wrapper
      padding={isSmallerThanLaptop ? 16 : 24}
      gap={isSmallerThanLaptop ? 16 : 24}
    >
      <TSpan
        font="heading-xs-bold"
        colorToken="--text-card-header-neutral-highlighted"
      >
        Payment
      </TSpan>
      <PaymentInformationStack>
        {isLastPaymentFailed && (
          <>
            <TSpan
              font="body-m-bold"
              colorToken="--text-tablecell-header-danger-primary-highlighted"
            >
              Your payment method was declined
            </TSpan>
            <TSpan
              font="footnote"
              colorToken="--text-tablecell-body-danger-primary-default"
            >
              Update it and try again
            </TSpan>
          </>
        )}
        <TSpan font="body-m-bold" colorToken="--text-card-neutral-highlighted">
          Upcoming scheduled payment
        </TSpan>
        {plan?.next_billing_at && (
          <TSpan font="footnote" colorToken="--text-card-neutral-default">
            {format(new Date(plan?.next_billing_at), 'dd MMM yyyy')}
          </TSpan>
        )}
        {plan?.plan_price && (
          <TSpan font="body-l" colorToken="--text-card-neutral-highlighted">
            {convertToCurrency(
              PlanPriceUtils.convertCentsToDollars(plan?.plan_price),
              AllCurrencyEnum.Usd,
              2,
            )}
          </TSpan>
        )}
      </PaymentInformationStack>
    </Wrapper>
  );
};
