import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Spacer } from '@/layout';
import { type AllCurrencyEnum } from '@/apollo/generated/types';
import convertToCurrency from '@/utils/currencyToCurrency';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { type AccountDetailsOfTransactionFragment } from '@/apollo/graphql/fragments';
import { DateFormaterToDDMMYYYY, formatTimeAMPM } from '../../helper';
import {
  Wrapper,
  ProfileWarpper,
  FeesWrapper,
  AmountWrapper,
  TransactionDetails,
  AccountName,
  DateWrapper,
  Account,
  TransactionAmout,
  AccountNameTo,
} from './styles';

interface Statment {
  sourceDetail: AccountDetailsOfTransactionFragment | undefined | null;
  destinationDetail: AccountDetailsOfTransactionFragment | undefined | null;
  paymentDate: string | undefined | null;
  amount: number | undefined | null;
  transactionReason: string | undefined | null;
  currency: string | undefined | null;
  id: string | undefined | null;
  charges: number | undefined | null;
  isTransactionWithOwnAccounts: boolean;
}

const StatementCard: FC<Statment> = ({
  id,
  sourceDetail,
  destinationDetail,
  paymentDate,
  amount,
  transactionReason,
  currency,
  charges,
  isTransactionWithOwnAccounts,
}) => {
  const { t } = useTranslation();
  const device = useDeviceType();
  return (
    <>
      <Wrapper
        key={id}
        style={
          device === DeviceTypeEnum.MOBILE
            ? { paddingLeft: '16px', paddingRight: '16px' }
            : {}
        }
      >
        <ProfileWarpper>
          <DateWrapper>{DateFormaterToDDMMYYYY(paymentDate)}</DateWrapper>
          <Account>{formatTimeAMPM(paymentDate)}</Account>
        </ProfileWarpper>
        <Spacer width={device === DeviceTypeEnum.MOBILE ? 32 : 56} />
        <TransactionDetails isMobile={device === DeviceTypeEnum.MOBILE}>
          <AccountName>
            <span style={{ fontWeight: '400' }}>
              {t(`noumena.money.money-detail.viewStatements.from`)}{' '}
            </span>
            {`${sourceDetail?.name || ''} ${sourceDetail?.maskNumber || ''} ${
              sourceDetail?.accountName || ''
            }`}
          </AccountName>
          <AccountNameTo>
            <span style={{ fontWeight: '400' }}>
              {t(`noumena.money.money-detail.viewStatements.to`)}{' '}
            </span>

            {`${destinationDetail?.name || ''}  ${
              destinationDetail?.accountName || ''
            }`}
          </AccountNameTo>
          <Account>{transactionReason}</Account>
        </TransactionDetails>
        <AmountWrapper>
          <TransactionAmout
            isTransactionWithOwnAccounts={isTransactionWithOwnAccounts}
          >
            {!isTransactionWithOwnAccounts
              ? Number(amount) < 0
                ? '-'
                : '+'
              : null}
            {convertToCurrency(
              Math.abs(Number(amount)),
              currency! as AllCurrencyEnum,
              2,
            )}
          </TransactionAmout>
          {Boolean(charges) && Number(charges) !== 0 ? (
            <FeesWrapper>{`Fee: ${convertToCurrency(
              charges!,
              currency! as AllCurrencyEnum,
              2,
            )}`}</FeesWrapper>
          ) : null}
        </AmountWrapper>
        <Spacer height={10} />
      </Wrapper>
    </>
  );
};
export default StatementCard;
