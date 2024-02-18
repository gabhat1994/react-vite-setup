import { t } from 'i18next';
import * as Styles from '@/features/money/components/styles';
import { type Transactions } from '@/features/money/components/TransactionCard/type';

import { Stack } from '@/layout';
import convertToCurrency from '@/utils/currencyToCurrency';
import { type AllCurrencyEnum } from '@/apollo/generated/types';
import { useToggle } from '@/hooks';

import { TransactionUtil } from '../../utils';

import { formatTimeAMPM } from '../../../../screens/MoneyDetails/helper';
import { Avatar } from './Avatar';
import { MainLabel } from './MainLabel';
import { SubLabel } from './SubLabel';
import { Bullet } from './Bullet';
import { TransactionModal } from './TransactionModal';

export const InternalTransfer = (props: Transactions) => {
  const [openModal, toggleOpenModal] = useToggle(false);
  const {
    transactionReason = '',
    charges,
    amount,
    netAmount,
    currency,
    paymentDate,
    paymentId,
    paymentStatus,
  } = props;

  const data = TransactionUtil.getTransferData(props);
  const validCharges = !!charges && charges > 0;
  const validAmount = !!amount && amount > 0;

  const currencyCode = currency as AllCurrencyEnum;
  return (
    <Styles.WrapperStack>
      <Styles.BasicDetailsStack>
        <Avatar context="internal-transfer" src={data?.profile} />
        <Stack vertical>
          <MainLabel i18nKey="noumena.transaction.to" name={data?.to || ''} />
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
          <Styles.TSpanBold colorToken="--text-tablecell-header-neutral-default">
            {convertToCurrency(
              charges ? netAmount || 0 : amount || 0,
              currencyCode,
              2,
            )}
          </Styles.TSpanBold>
          <Styles.InfoIcon onClick={toggleOpenModal} />
        </Styles.AmountAndIconStack>
        {validCharges && validAmount && (
          <Styles.TSpanFootnote
            colorToken="--text-tablecell-header-neutral-default"
            textAlign="right"
          >
            {t('noumena.transaction.amount', {
              amount: `${convertToCurrency(amount, currencyCode, 2)}`,
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
