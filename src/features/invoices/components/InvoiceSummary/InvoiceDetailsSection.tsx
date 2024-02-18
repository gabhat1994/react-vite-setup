import { format } from 'date-fns';
import { useMemo } from 'react';
import { Avatar } from '@/components/Avatar/Avatar';
import { AvatarSize } from '@/components/Avatar/Avatar/types';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';

import { PaymentTerms } from '@/apollo/generated/types';
import { type InvoiceOutputFragment } from '@/apollo/graphql';
import ChamberDefaultImage from '@/assets/images/chamber_default.png';
import S from './styles';
import { InvoiceUtils } from '../../utils/invoice';

type InvoiceDetailsSectionProps = {
  invoice: InvoiceOutputFragment;
};

const InvoiceDetailsSection: React.FC<InvoiceDetailsSectionProps> = ({
  invoice,
}) => {
  const renderDetailsRow = (
    label: string,
    value: string | null | undefined,
    icon: React.ReactNode = null,
  ) =>
    value ? (
      <S.DetailsRow>
        <TSpan font="body-m" colorToken="--text-card-neutral-default">
          {label}
        </TSpan>
        <Stack align="center" gap={8}>
          {icon}
          <TSpan
            font="body-m"
            colorToken="--text-card-header-neutral-highlighted"
          >
            {value}
          </TSpan>
        </Stack>
      </S.DetailsRow>
    ) : null;

  const paymentTermText = useMemo(() => {
    switch (invoice.paymentTerms) {
      case PaymentTerms.FullPaymentAdvance:
        return 'Payable on or Before Due Date';
      case PaymentTerms.MilestonePayment:
        return 'Milestone Payment';
      case PaymentTerms.InstallmentPayment:
        return 'Installment Payment';
      default:
        return '';
    }
  }, [invoice.paymentTerms]);

  const lateFeeText = InvoiceUtils.getLateFeeText(
    invoice.lateFeeType,
    invoice.lateFeeValue,
    invoice.currency,
  );

  return (
    <S.PageCard>
      <Stack vertical gap={16} fullWidth>
        <TSpan font="heading-xs-bold">Details</TSpan>

        <Stack fullWidth vertical gap={8}>
          {invoice.issueDate
            ? renderDetailsRow(
                'Created',
                format(new Date(invoice.issueDate), 'dd MMM yyyy'),
              )
            : null}
          {renderDetailsRow('Currency', invoice?.currency, null)}
          {renderDetailsRow('Payment Terms', paymentTermText)}
          {renderDetailsRow('Late Fee', lateFeeText)}
          {renderDetailsRow(
            'Connected Noum',
            invoice.noumId?.name,
            <Avatar
              url={invoice.noumId?.profileImage || ChamberDefaultImage}
              size={AvatarSize.M}
            />,
          )}
          {/* Hidden until it's not handled by BE */}
          {/* {renderDetailsRow(
            'Scope of Work',
            'SOW #129573',
            <Icon name="file_m" size={24} />,
          )} */}
        </Stack>
      </Stack>
    </S.PageCard>
  );
};

export default InvoiceDetailsSection;
