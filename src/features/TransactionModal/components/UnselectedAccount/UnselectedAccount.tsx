/* eslint-disable no-param-reassign */
import { useContext, type FC } from 'react';
import { t } from 'i18next';
import { differenceInMinutes } from 'date-fns';
import mainWallet from '@/assets/images/noumena-filled-logo.svg';
import convertToCurrency from '@/utils/currencyToCurrency';
import { CurrencyEnum } from '@/apollo/generated/types';
import { Spacer } from '@/layout';
import { MINUTES_TO_SHOW_ACCOUNT_BALANCE } from '@/constants/payments';
import { Button, TSpan } from '@/components';
import { BankUtil } from '@/features/money/utils/bank';
import ChamberProfile from '@/assets/images/chamber_default.png';
import { TransactionAccountsUtil } from '@/features/money/utils';
import { ComponentStates, type TAccount } from '../../types';
import { Account, Image } from '../styles';
import {
  UnselectedAccountWrapper,
  Name,
  Description,
  AccountInformation,
} from './style';
import { PaymentStateContext } from '../../contexts/PaymentStateContext';
import { PaymentDataContext } from '../../contexts/PaymentDataContext';

interface AccountProps {
  account: TAccount;
}

const UnselectedAccount: FC<AccountProps> = ({ account }) => {
  const {
    accountName,
    maskAccountNumber,
    balance,
    walletName,
    createdAt,
    chamber,
    status,
    id,
  } = account;

  const { setPaymentState } = useContext(PaymentStateContext);
  const { setBankAccountId } = useContext(PaymentDataContext);
  const isBankAccount = TransactionAccountsUtil.isBank(account);
  const isWallet = TransactionAccountsUtil.isWallet(account);

  const name = isWallet ? walletName : `${accountName}****${maskAccountNumber}`;

  const amount = convertToCurrency(balance || 0, CurrencyEnum.Usd, 2);

  const hideBalance =
    differenceInMinutes(Date.now(), new Date(createdAt!)) >
      MINUTES_TO_SHOW_ACCOUNT_BALANCE ||
    (isBankAccount && !balance);

  const canUserVerify = isBankAccount && BankUtil.canUserVerify(status);

  const bankAccountVerificationFailed =
    isBankAccount && BankUtil.isVerificationFailed(status);

  const onVerify = () => {
    setPaymentState(ComponentStates.VERIFY_BANK_ACCOUNT);
    setBankAccountId(id);
  };

  const applyVerificationStyles =
    isBankAccount && BankUtil.isPendingVerification(status);

  return (
    <UnselectedAccountWrapper applyVerificationStyles={applyVerificationStyles}>
      <Image
        src={
          (isBankAccount && BankUtil.isActive(status)) || !isBankAccount
            ? chamber?.profileImage || mainWallet
            : ChamberProfile
        }
        alt="noum-logo"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = mainWallet;
        }}
      />
      <AccountInformation applyVerificationStyles={applyVerificationStyles}>
        <Account>
          {hideBalance && <Spacer height={5} />}
          <Name>{name}</Name>
          {!hideBalance && (
            <Description>
              {isBankAccount && BankUtil.isActive(status)
                ? t('noumena.money.payment.available.balance', {
                    balanceString: `${amount}`,
                  })
                : `${amount}`}
            </Description>
          )}
          {isBankAccount && !BankUtil.isActive(status) && (
            <TSpan
              font="footnote"
              colorToken="--text-tablecell-body-neutral-default"
              textAlign="start"
            >
              {canUserVerify
                ? t('noumena.money_details.bank.pending_verfication_status2')
                : bankAccountVerificationFailed
                ? t('noumena.money_details.bank.verification_failed')
                : t('noumena.money_details.bank.pending_verfication_status3')}
            </TSpan>
          )}
        </Account>
        {canUserVerify && (
          <Button size="small" secondary onClick={onVerify}>
            {t('noumena.verify')}
          </Button>
        )}
      </AccountInformation>
    </UnselectedAccountWrapper>
  );
};

export default UnselectedAccount;
