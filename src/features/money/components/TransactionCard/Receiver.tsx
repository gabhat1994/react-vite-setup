import { t } from 'i18next';
import { type Transactions } from '@/features/money/components/TransactionCard/type';
import * as Styles from '@/features/money/components/styles';

import { Stack } from '@/layout';
import convertToCurrency from '@/utils/currencyToCurrency';
import { type AllCurrencyEnum } from '@/apollo/generated/types';
import { useToggle } from '@/hooks';
import { TransactionUtil } from '../../utils';
import { Avatar } from './Avatar';
import { MainLabel } from './MainLabel';
import { SubLabel } from './SubLabel';
import { Bullet } from './Bullet';
import { TransactionModal } from './TransactionModal';
import { formatTimeAMPM } from '../../../../screens/MoneyDetails/helper';

export const Receiver = (props: Transactions) => {
  const {
    paymentDate,
    charges,
    currency,
    amount,
    netAmount,
    transactionReason = '',
    paymentId,
    paymentStatus,
  } = props;
  const [openModal, toggleOpenModal] = useToggle(false);
  const currencyCode = currency as AllCurrencyEnum;

  const data = TransactionUtil.getReceiverData(props);
  const validCharges = !!charges && charges > 0;
  const validAmount = !!amount && amount > 0;
  const absoluteAmount = Math.abs(amount || 0);
  const absoluteNetAmount = Math.abs(netAmount || 0);

  return (
    <Styles.WrapperStack>
      <Styles.BasicDetailsStack>
        <Avatar context="receiver" src={data?.profile} />
        <Stack vertical>
          <MainLabel
            i18nKey="noumena.transaction.from"
            name={data?.from || ''}
          />
          {data?.account && (
            <Styles.TSpanFootnote>{data?.account}</Styles.TSpanFootnote>
          )}
          <SubLabel i18nKey="noumena.transaction.to" name={data?.to || ''} />
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
            {validCharges
              ? `+ ${convertToCurrency(absoluteNetAmount, currencyCode, 2)}`
              : `+ ${convertToCurrency(absoluteAmount, currencyCode, 2)}`}
          </Styles.TSpanBold>
          <Styles.InfoIcon onClick={toggleOpenModal} />
        </Styles.AmountAndIconStack>
        {validCharges && validAmount && (
          <Styles.TSpanFootnote
            colorToken="--text-tablecell-header-neutral-default"
            textAlign="right"
          >
            {t('noumena.transaction.amount.credited', {
              amount: `${convertToCurrency(absoluteAmount, currencyCode, 2)}`,
            })}
          </Styles.TSpanFootnote>
        )}
        {validCharges && (
          <Styles.TSpanFootnote colorToken="--text-tablecell-header-neutral-default">
            {t('noumena.transaction.fee', {
              fee: `${convertToCurrency(charges, currencyCode, 2)}`,
            })}
          </Styles.TSpanFootnote>
        )}
        {openModal && (
          <TransactionModal
            open={openModal}
            onClose={toggleOpenModal}
            paymentStatus={paymentStatus || ''}
            paymentReferenceNumber={paymentId || ''}
          />
        )}
      </Stack>
    </Styles.WrapperStack>
  );
};
