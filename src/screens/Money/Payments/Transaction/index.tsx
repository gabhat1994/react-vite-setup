import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import convertToCurrency from '@/utils/currencyToCurrency';
import mainWallet from '@/assets/images/main-wallet.svg';
import { Spacer } from '@/layout/Stack/Spacer';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { Stack } from '@/layout';
import { type AllCurrencyEnum } from '@/apollo/generated/types';
import { formatTimeAMPM } from '../../../MoneyDetails/helper';
import { type Transaction } from '../Wallets/types';
import {
  Wrapper,
  Profile,
  ProfileWarpper,
  TransactionDetails,
  AccountName,
  Account,
  TransactionAmout,
  AmountWarpper,
  Charges,
} from './styles';

const TransactionCard: FC<Transaction> = ({
  sourceDetail,
  destinationDetail,
  paymentDate,
  amount,
  transactionReason,
  currency,
  charges,
}) => {
  const { t } = useTranslation();
  const device = useDeviceType();
  return (
    <Wrapper
      style={{ paddingLeft: device === DeviceTypeEnum.TABLET ? '16px' : '0px' }}
      justify="space-between"
    >
      <Stack fullWidth style={{ width: '70%' }}>
        <ProfileWarpper>
          <Profile src={mainWallet} alt="profile" />
        </ProfileWarpper>
        <Spacer height={16} />
        <TransactionDetails>
          <AccountName>
            {t(`noumena.money.money-detail.viewStatements.from`)}{' '}
            {`${sourceDetail?.name || ''} ${sourceDetail?.maskNumber || ''} ${
              sourceDetail?.accountName || ''
            }`}
          </AccountName>
          <AccountName>
            {t(`noumena.money.money-detail.viewStatements.to`)}{' '}
            {`${destinationDetail?.name || ''}  ${
              destinationDetail?.accountName || ''
            }`}
          </AccountName>
          <Account>
            {`${formatTimeAMPM(paymentDate)} `}
            {transactionReason}
          </Account>
        </TransactionDetails>
      </Stack>
      <AmountWarpper vertical align="end" justify="center">
        <TransactionAmout>
          {`${Number(amount) < 0 ? '' : '+'}${convertToCurrency(
            Number(amount),
            currency! as AllCurrencyEnum,
            2,
          )}`}
        </TransactionAmout>
        {Boolean(charges) && (
          <Charges>
            {`Fee: ${convertToCurrency(
              charges!,
              currency! as AllCurrencyEnum,
              2,
            )}`}
          </Charges>
        )}
      </AmountWarpper>
    </Wrapper>
  );
};
export default TransactionCard;
