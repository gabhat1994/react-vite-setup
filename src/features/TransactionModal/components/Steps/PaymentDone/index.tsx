import {
  type FC,
  useCallback,
  useContext,
  Fragment,
  useMemo,
  useEffect,
} from 'react';
import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import DoneImg from '@/assets/images/done.svg';
import { Button } from '@/components/Button';
import { Spacer, Stack } from '@/layout';
import convertToCurrency from '@/utils/currencyToCurrency';
import { CurrencyEnum } from '@/apollo/generated/types';
import { useAuth } from '@/features/auth/contexts';
import { ModalFooter } from '@/components/ExtendedModal';
import {
  getCustomerName,
  isAccountPayeeItem,
} from '@/features/TransactionModal/helpers';
import { UserUtil } from '@/utils/user';
import { PaymentDataContext } from '@/features/TransactionModal/contexts/PaymentDataContext';
import { PaymentStateContext } from '@/features/TransactionModal/contexts/PaymentStateContext';
import { TransactionAccountsUtil } from '@/features/money/utils';
import { PaymentStatuses, TransactionModalType } from '@/features/TransactionModal/types';
import { Payee, TipPayee } from '../../Payee';
import { ModalContent } from '../../styles';
import Image from './style';
import SelectedAccount from '../../SelectedAccount/SelectedAccount';

const PaymentDone: FC = () => {
  const { isUnregistered } = useAuth();
  const {
    source,
    destination,
    transactions,
    refetchPaymentData,
    paymentStatus,
    isStripeFlow,
  } = useContext(PaymentDataContext);

  const { handleClose, type, onSuccessfulTransaction, isMobile } =
    useContext(PaymentStateContext);

  useEffect(() => {
    onSuccessfulTransaction?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClose = useCallback(() => {
    handleClose();
    refetchPaymentData();
  }, [handleClose, refetchPaymentData]);

  const title = useMemo(() => {
    const amount = convertToCurrency(
      Number(transactions.amount),
      CurrencyEnum.Usd,
      2,
    );
    const customerName = getCustomerName(destination);
    if (type === TransactionModalType.TIP) {
      return t('noumena.money.transaction.done.users_tipped', {
        customerName,
        tipAmount: amount,
      });
    }
    return `${t('noumena.money.payment.done.heading', {
      amount,
      transaction:
        type === TransactionModalType.TRANSFER
          ? t('noumena.money.transaction.done.transfered')
          : t('noumena.money.transaction.done.paid'),
    })}${
      isUnregistered && isStripeFlow
        ? ` ${t('noumena.to')} ${customerName}`
        : ''
    }`;
  }, [destination, isStripeFlow, isUnregistered, transactions.amount, type]);
  const isSourceWallet =
    source !== 'PAY_BY_CARD' && TransactionAccountsUtil.isWallet(source);
  const isDestinationWallet =
    isAccountPayeeItem(destination) &&
    TransactionAccountsUtil.isWallet(destination);
  return (
    <Fragment>
      <ModalContent hasSingleButton>
        <Stack fullWidth vertical justify="center" align="center">
          <Image src={DoneImg} alt="done" />
          <Spacer height={24} />
          <TSpan
            font="body-xl-bold"
            colorToken="--text-modal-header-neutral-default"
          >
            {title}
          </TSpan>
          <Spacer height={8} />
          <TSpan font="body-m-bold" colorToken="--text-modal-neutral-default">
            {transactions.transactionReason}
          </TSpan>
          {type !== TransactionModalType.TIP && (
            <TSpan font="body-m-bold" colorToken="--text-modal-neutral-default">
              {`${t('noumena.status')}: ${
                paymentStatus === PaymentStatuses.PROCESSED
                  ? t('noumena.completed')
                  : t('noumena.processing')
              }`}
            </TSpan>
          )}
          <Spacer height={24} />
          <Stack fullWidth>
            <TSpan font="body-l" colorToken="--text-input-neutral-default">
              {t('noumena.uc_from')}
            </TSpan>
          </Stack>
          <SelectedAccount
            account={source}
            fetchUpdatedBalance={isSourceWallet}
            showBalance={isSourceWallet}
            customStyles={{
              backgroundColor: 'var(--bg-tablecell-neutral-alt-default)',
              borderBottom: '1px solid var(--bg-separator-neutral-default)',
              borderRadius: '0px',
            }}
          />
          <Spacer height={8} />
          <Stack fullWidth>
            <TSpan font="body-l" colorToken="--text-input-neutral-default">
              {t('noumena.uc_to')}
            </TSpan>
          </Stack>
          {destination &&
            (destination.__typename === 'AnswerOutput' ? (
              <TipPayee
                customerName={UserUtil.renderFullName(destination.user)}
                customerAvatar={destination.user?.profile?.profilePicture}
              />
            ) : (
              <Payee
                selected
                payee={destination}
                fetchUpdatedBalance={isDestinationWallet}
                customStyles={{
                  backgroundColor: 'var(--bg-tablecell-neutral-alt-default)',
                  borderBottom: '1px solid var(--bg-separator-neutral-default)',
                  borderRadius: '0px',
                }}
              />
            ))}
        </Stack>
      </ModalContent>
      <ModalFooter flexDirection={isMobile ? 'column' : 'row'}>
        <Button
          data-testid="close-button"
          secondary
          size="full"
          onClick={onClose}
        >
          {t('noumena.close')}
        </Button>
      </ModalFooter>
    </Fragment>
  );
};

export default PaymentDone;
