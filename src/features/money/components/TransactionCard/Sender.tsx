import { t } from 'i18next';
import * as Styles from '@/features/money/components/styles';
import { type Transactions } from '@/features/money/components/TransactionCard/type';

import { Stack } from '@/layout';
import { type AllCurrencyEnum } from '@/apollo/generated/types';
import convertToCurrency from '@/utils/currencyToCurrency';
import { useToggle } from '@/hooks';
import { TransactionUtil } from '../../utils';
import { Avatar } from './Avatar';
import { MainLabel } from './MainLabel';
import { SubLabel } from './SubLabel';
import { Bullet } from './Bullet';
import { TransactionModal } from './TransactionModal';
import { formatTimeAMPM } from '../../../../screens/MoneyDetails/helper';

export const Sender = (props: Transactions) => {
  const {
    transactionReason = '',
    netAmount,
    amount,
    charges,
    createUserId,
    updatedUserId,
    paymentDate,
    currency,
    paymentId,
    paymentStatus,
  } = props;
  const [openModal, toggleOpenModal] = useToggle(false);
  const showFeesForSender =
    (createUserId === updatedUserId || !updatedUserId) && !!charges;

  const currencyCode = currency as AllCurrencyEnum;

  const data = TransactionUtil.getSenderData(props);
  const absoluteAmount = Math.abs(amount || 0);
  const absoluteNetAmount = Math.abs(netAmount || 0);

  return (
    <Styles.WrapperStack>
      <Styles.BasicDetailsStack>
        <Avatar context="sender" src={data?.profile} />
        <Stack vertical fullWidth>
          <MainLabel i18nKey="noumena.transaction.to" name={data?.to || ''} />
          {data?.account && (
            <Styles.TSpanFootnote>{data?.account}</Styles.TSpanFootnote>
          )}
          <SubLabel
            i18nKey="noumena.transaction.from"
            name={data?.from || ''}
          />
          <Styles.TransactionInformation>
            <Styles.TSpanFootnote colorToken="--text-tablecell-body-neutral-default">
              {formatTimeAMPM(paymentDate)}
            </Styles.TSpanFootnote>
            <Bullet />
            <Styles.TSpanFootnote colorToken="--text-tablecell-body-neutral-default">
              {transactionReason}
            </Styles.TSpanFootnote>
          </Styles.TransactionInformation>
        </Stack>
      </Styles.BasicDetailsStack>
      <Stack vertical align="end">
        <Styles.AmountAndIconStack>
          <Styles.TSpanBold colorToken="--text-tablecell-header-neutral-highlighted">
            {showFeesForSender
              ? `- ${convertToCurrency(absoluteNetAmount, currencyCode, 2)}`
              : `- ${convertToCurrency(absoluteAmount || 0, currencyCode, 2)}`}
          </Styles.TSpanBold>
          <Styles.InfoIcon onClick={toggleOpenModal} />
        </Styles.AmountAndIconStack>
        {showFeesForSender && (
          <Styles.TSpanFootnote
            colorToken="--text-tablecell-header-neutral-default"
            textAlign="right"
          >
            {t('noumena.transaction.amount', {
              amount: `- ${convertToCurrency(absoluteAmount, currencyCode, 2)}`,
            })}
          </Styles.TSpanFootnote>
        )}
        {showFeesForSender && (
          <Styles.TSpanFootnote colorToken="--text-tablecell-header-neutral-default">
            {t('noumena.transaction.fee', {
              fee: `${convertToCurrency(charges, currencyCode, 2)}`,
            })}
          </Styles.TSpanFootnote>
        )}
      </Stack>
      {openModal && (
        <TransactionModal
          open={openModal}
          onClose={toggleOpenModal}
          paymentStatus={paymentStatus || ''}
          paymentReferenceNumber={paymentId || ''}
        />
      )}
    </Styles.WrapperStack>
  );
};
